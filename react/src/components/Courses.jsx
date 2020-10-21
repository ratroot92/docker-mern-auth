import React, { Component } from "react";
import "../assets/css/course.css";
import Loader from "./loader";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import WebNotif from "./WebNotif";
import Ratings from "./Ratings";
import Select from "react-select";
import { debounce } from "throttle-debounce";
import cookie from "react-cookies";
var myCart = null;
class Courses extends Component {
  constructor(props) {
    super(props);
    this.searchDebounced = debounce(500, this.search);
  }
  state = {
    courses: null,
    featured_courses: null,
    range_filters: [],
    filter_terms: [],
    keyword: null,
    fireObj: null,
    showLoader: true,
    sort: [{ timestamp: { order: "desc" } }],
    userId: null,

    cartAdd: false,
    cartRemove: false,
    selectedOption1: null,
    selectedOption2: null,
    inCart: false,
    tag_options: [
      {
        label: "All",
        value: "0"
      }
    ],
    instructors: [{ label: "Instructors", value: "0" }],
    options: [
      { label: "Order By", value: "0" },

      { label: "Date - High to Low", value: "1.1" },
      { label: "Date - Low to High", value: "1.2" },

      { label: "Rating - High to Low", value: "2.1" },
      { label: "Rating - Low to High", value: "2.2" },

      { label: "Price - High to Low", value: "3.1" },
      { label: "Price - Low to High", value: "3.2" }
    ]
  };

  componentDidMount() {
    var propType = parseInt(this.props.type);
    let fireObj = db.ref("search").push().key;

    var filter_terms = [];
    var temp_type = {};
    temp_type["type"] = this.props.type;
    var temp = {};
    temp["term"] = temp_type;
    filter_terms.push(temp);
    this.setState({ filter_terms }, () => {
      this.setState({ fireObj: fireObj });
      db.ref(`search/${fireObj}`).set({
        keyword: "",
        filters: this.state.filter_terms,
        sort: this.state.sort,
        range: this.state.range_filters
      });
    });
    db.ref(`categories`)
      .once("value")
      .then(snapshot => {
        var tag_options = [...this.state.tag_options];

        snapshot.forEach(tags => {
          if (
            (Object.keys(tags.val()).length == 1 && tags.val().All != null) ||
            tags.val() == true
          ) {
            var new_option = { value: tags.key, label: tags.key };
            tag_options.push(new_option);
          } else {
            var groupOption = [];

            Object.keys(tags.val()).map(groupkey => {
              if (groupkey != "All") {
                groupOption.push({
                  label: groupkey,
                  value: tags.key + "~" + groupkey
                });
                this.setState({
                  selectedCat: {
                    value: tags.key + "~" + groupkey,
                    label: groupkey
                  }
                });
              }
            });
            groupOption.push({
              label: "Others " + tags.key,
              value: tags.key
            });
            tag_options.push({ label: tags.key, options: groupOption });
          }
          // });
        });
        this.setState({ tag_options });

        this.setState({ showLoader: false });
      });
    db.ref("userInfo")
      .orderByChild("role")
      .equalTo("instructor")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(tags => {
          var new_option = { value: tags.key, label: tags.val().name };
          var instructors = [...this.state.instructors];
          instructors.push(new_option);
          this.setState({ instructors });
        });
      });

    db.ref(`searchResult/` + fireObj + `/`).on("child_added", snapshot => {
      this.setState({ courses: snapshot.val() });

      db.ref(`searchResult/` + fireObj).set(null);
    });

    db.ref("searchCount/" + fireObj + "/").on("child_added", snapshot => {
      if (snapshot.val() == 0) {
        this.setState({ courses: null });
      }
      this.setState({ showLoader: false });

      db.ref(`searchCount/` + fireObj).set(null);
    });
  }
  handleChange = selectedOption => {
    var sort = null;
    if (selectedOption.value == "2.1") {
      sort = [{ rating: { order: "desc" } }];
    } else if (selectedOption.value == "3.1") {
      sort = [{ baseprice: { order: "desc" } }];
    } else if (selectedOption.value == "2.2") {
      sort = [{ rating: { order: "asc" } }];
    } else if (selectedOption.value == "3.2") {
      sort = [{ baseprice: { order: "asc" } }];
    } else if (selectedOption.value == "1.2") {
      sort = [{ timestamp: { order: "asc" } }];
    } else {
      sort = [{ timestamp: { order: "desc" } }];
    }
    this.setState({ showLoader: true });

    this.setState({ sort });

    db.ref(`search/${this.state.fireObj}`).set({
      keyword: this.state.keyword,
      filters: this.state.filter_terms,
      sort: sort,
      range: this.state.range_filters
    });
  };
  handleChange1 = selectedOption => {
    this.setState({ showLoader: true });

    if (selectedOption.value != "0") {
      this.setState({ selectedOption1: selectedOption.value });
      this.setState({ showLoader: true });

      var filter_terms = [];
      var temp_type = {};
      temp_type["type"] = this.props.type;
      var temp = {};
      temp["term"] = temp_type;
      filter_terms.push(temp);
      var temp_type = {};
      var tp = {};
      tp[selectedOption.value] = true;

      var temp = {};
      temp["term"] = tp;
      filter_terms.push(temp);
      if (this.state.selectedOption2 != null) {
        var tp = {};
        tp[this.state.selectedOption2] = true;

        var temp = {};
        temp["term"] = tp;
        filter_terms.push(temp);
      }

      this.setState({ filter_terms }, () => {
        db.ref(`search/${this.state.fireObj}`).set({
          keyword: this.state.keyword,
          filters: filter_terms,
          sort: this.state.sort,
          range: this.state.range_filters
        });
      });
    } else {
      this.setState({ selectedOption1: null });

      var filter_terms = [];
      var temp_type = {};
      temp_type["type"] = this.props.type;
      var temp = {};
      temp["term"] = temp_type;
      filter_terms.push(temp);
      this.setState({ filter_terms }, () => {
        db.ref(`search/${this.state.fireObj}`).set({
          keyword: this.state.keyword,
          filters: filter_terms,
          sort: this.state.sort,
          range: this.state.range_filters
        });
      });
    }
  };
  handleChange2 = selectedOption => {
    this.setState({ showLoader: true });

    if (selectedOption.value != "0") {
      this.setState({ selectedOption2: selectedOption.value });

      var filter_terms = [];
      var temp_type = {};
      temp_type["type"] = this.props.type;
      var temp = {};
      temp["term"] = temp_type;
      filter_terms.push(temp);
      var temp_type = {};
      var tp = {};
      tp[selectedOption.value] = true;
      var temp = {};
      temp["term"] = tp;
      filter_terms.push(temp);
      var tp = {};
      if (this.state.selectedOption1 !== null) {
        tp[this.state.selectedOption1] = true;

        var temp = {};
        temp["term"] = tp;

        filter_terms.push(temp);
      }
      this.setState({ filter_terms }, () => {
        db.ref(`search/${this.state.fireObj}`).set({
          keyword: this.state.keyword,
          filters: filter_terms,
          sort: this.state.sort,
          range: this.state.range_filters
        });
      });
    } else {
      this.setState({ selectedOption2: null });

      var filter_terms = [];
      var temp_type = {};
      temp_type["type"] = this.props.type;
      var temp = {};
      temp["term"] = temp_type;
      filter_terms.push(temp);
      this.setState({ filter_terms }, () => {
        db.ref(`search/${this.state.fireObj}`).set({
          keyword: this.state.keyword,
          filters: filter_terms,
          sort: this.state.sort,
          range: this.state.range_filters
        });
      });
    }
  };
  searchHandler = event => {
    this.setState({ keyword: event.target.value }, () => {
      this.searchDebounced(event);
    });
  };
  search = event => {
    db.ref(`search/${this.state.fireObj}`).set({
      keyword: this.state.keyword,
      filters: this.state.filter_terms,
      sort: this.state.sort,
      range: this.state.range_filters
    });

    event.preventDefault();
  };
  addToCart = (courseId, index) => {
    {
      this.setState({ cartAdd: true });

      myCart = {};
      if (cookie.load("mycart") !== undefined) {
        myCart = cookie.load("mycart");
      }
      myCart[courseId] = {
        courseId: courseId,
        title: this.state.courses[index]._source.Title,
        description: this.state.courses[index]._source.Description,
        image: this.state.courses[index]._source.media.Image,
        plan: "basePlan",
        type: 0
      };

      cookie.save("mycart", myCart, { path: "/" });
      var obj = new WebNotif();
      obj.createNotification("success", "Added to cart");
      this.setState({ inCart: true });
    }
    //this.setState({ loginRequest: false });
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <Navigation
          loginRequest={this.state.loginRequest}
          cartAdd={this.state.cartAdd}
          cartremove={this.state.cartRemove}
        />
        <div>
          <div className="course_slider top-fix">
            <div className="container">
              <h2 className=" course-title-banner">
                {" "}
                {this.props.type == 0
                  ? "Practice Questions"
                  : this.props.type == 1
                  ? "Mock Exams"
                  : "Courses"}
              </h2>{" "}
            </div>
          </div>
          <section className="bp-30">
            <div className="container">
              <div className="col-md-12">
                <div className="row">
                  {this.state.featured_courses == null
                    ? ""
                    : Object.keys(this.state.featured_courses).map(key => (
                        <div className="col-md-6 lrp-10" key={key}>
                          <div className="lrp-0 featured-course">
                            <div className="row container lrp-0   mtblr-0 feature-course-data">
                              <div className="w-300 ptblr-0">
                                <img
                                  src={
                                    this.state.featured_courses[key].media.Image
                                  }
                                  className="lrtbb featured-img"
                                  alt="course featured image"
                                />
                              </div>
                              <div className="col rrtbb bg-white lrp-30">
                                <p className="text-small clr-grey fet-course">
                                  Featured{" "}
                                  {this.props.type == 0
                                    ? "Practice questions"
                                    : this.props.type == 1
                                    ? "Mock exam"
                                    : "Course"}
                                </p>{" "}
                                <div>
                                  <h5 className="bm-0">
                                    {this.state.featured_courses[key].Title}
                                  </h5>
                                  <p className="fs-12 clr-grey bm-0">
                                    Last Updated:{" "}
                                    {
                                      this.state.featured_courses[
                                        key
                                      ].lastUpdated.split("T")[0]
                                    }{" "}
                                  </p>
                                  <div className="row container">
                                    <div className="bm-10">
                                      {this.state.courseId !== null ? (
                                        <Ratings
                                          courseId={key}
                                          userId={this.props.userId}
                                          readonly={true}
                                          textWhite={false}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>{" "}
                                    &nbsp;&nbsp;
                                  </div>
                                </div>
                                <div>
                                  {this.state.featured_courses == null
                                    ? ""
                                    : Object.keys(
                                        this.state.featured_courses[key]
                                          .TimeDetails
                                      ).map(time_key => (
                                        <p className="text-small bm-0">
                                          <b>{time_key.replace("_", " ")}</b> :{" "}
                                          {
                                            this.state.featured_courses[key]
                                              .TimeDetails[time_key]
                                          }
                                        </p>
                                      ))}
                                </div>
                                <p />
                                <div className="row container">
                                  <div className="col-md-5 bottom-row-card-left lrp-30">
                                    <p>
                                      {this.state.featured_courses != null &&
                                      this.state.featured_courses[key]
                                        .pricing !== null ? (
                                        Object.keys(
                                          this.state.featured_courses[key]
                                            .pricing
                                        ).length == 1 ? (
                                          <b>
                                            {" "}
                                            {
                                              this.state.featured_courses[key]
                                                .pricing[
                                                Object.keys(
                                                  this.state.featured_courses[
                                                    key
                                                  ].pricing
                                                )[0]
                                              ].currency
                                            }
                                            {
                                              this.state.featured_courses[key]
                                                .pricing[
                                                Object.keys(
                                                  this.state.featured_courses[
                                                    key
                                                  ].pricing
                                                )[0]
                                              ].price
                                            }
                                          </b>
                                        ) : (
                                          <React.Fragment>
                                            <b>
                                              {"From " +
                                                this.state.featured_courses[key]
                                                  .pricing[
                                                  Object.keys(
                                                    this.state.featured_courses[
                                                      key
                                                    ].pricing
                                                  )[0]
                                                ].currency}
                                              {
                                                this.state.featured_courses[key]
                                                  .pricing[
                                                  Object.keys(
                                                    this.state.featured_courses[
                                                      key
                                                    ].pricing
                                                  )[0]
                                                ].price
                                              }
                                            </b>
                                          </React.Fragment>
                                        )
                                      ) : (
                                        " Free"
                                      )}
                                    </p>
                                  </div>
                                  <div className="col-md-7 bottom-row-card-right lrp-30">
                                    <Link to={"/viewdetail/" + key}>
                                      <button className=" btn red_out_btn clr-red fs-13">
                                        {" "}
                                        Explore
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
          <br />
          <section className="bg-grey">
            <div className="container">
              <div className="col-md-12 bp-30">
                <div className="row">
                  <div className="col-md-6 lrp-0">
                    <form>
                      <div className="input-group md-form form-sm form-2 pl-0">
                        <input
                          className="form-control my-0 py-1 red-border height-40  searchinput"
                          type="text"
                          placeholder="Search"
                          aria-label="Search"
                          onChange={this.searchHandler.bind(this)}
                        />
                        <div className="input-group-append  height-40">
                          <button
                            className="input-group-text red lighten-3  height-40"
                            id="basic-text1"
                            onClick={this.search.bind(this)}
                          >
                            <i
                              className="fa fa-search white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-2">
                    <Select
                      className="filterBar height-40"
                      options={this.state.instructors}
                      // value={this.state.selectedOption2}
                      onChange={this.handleChange2}
                      placeholder={"Instructor"}
                    />
                  </div>
                  <div className="col-md-2 lrp-0">
                    <Select
                      className="filterBar height-40"
                      options={this.state.tag_options}
                      // value={this.state.selectedOption1}
                      onChange={this.handleChange1}
                      placeholder={"Category"}
                    />
                  </div>

                  <div className="col-md-2">
                    <Select
                      className="filterBar height-40"
                      options={this.state.options}
                      // value={this.state.selectedOption}
                      onChange={this.handleChange}
                      placeholder={"Order By"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 lrp-0">
                <h4 className=" notoFont-normal pb-20">
                  All{" "}
                  {this.props.type == 0
                    ? "Practice Questions"
                    : this.props.type == 1
                    ? "Mock Exams"
                    : "Courses"}
                </h4>
                <div className="row w-100 mx-auto d-flex pb-50">
                  {this.state.courses == null
                    ? "No data found"
                    : Object.keys(this.state.courses).map((key, index) => (
                        // this.state.courses[key]._source.type ==
                        // parseInt(this.props.type) ?
                        // (

                        <div
                          className="col-md-3 lrp-0 prp-5 bm-20 no_underline"
                          key={key}
                        >
                          <div className="card">
                            <Link
                              to={"/viewdetail/" + this.state.courses[key]._id}
                            >
                              <img
                                className="card-img-top-course img-fluid"
                                src={
                                  this.state.courses[key]._source.media.Image
                                }
                                alt="Course image"
                              />
                            </Link>
                            <div className="card-body card-body-course">
                              <Link
                                to={
                                  "/viewdetail/" + this.state.courses[key]._id
                                }
                              >
                                <div className="row container">
                                  <div className="bm-10">
                                    {this.state.courseId !== null ? (
                                      <Ratings
                                        courseId={this.state.courses[key]._id}
                                        userId={this.props.userId}
                                        readonly={true}
                                        textWhite={false}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <h6 className="fs-13">
                                    <a
                                      href={
                                        "/viewdetail/" +
                                        this.state.courses[key]._id
                                      }
                                      className="text-black"
                                    >
                                      {this.state.courses[key]._source.Title}
                                    </a>
                                  </h6>
                                </div>
                                <p className="card-text clr-grey bm-0 fs-11">
                                  {this.state.courses[key]._source.Description
                                    .length > 50
                                    ? this.state.courses[
                                        key
                                      ]._source.Description.substr(0, 50)
                                    : this.state.courses[key]._source
                                        .Description}
                                </p>
                              </Link>
                              <div className="row">
                                <div className="col-md-6 bottom-row-card-left"></div>{" "}
                                <div className="col bottom-row-card-right">
                                  {this.state.courses[key]._source != null &&
                                  this.state.courses[key]._source.pricing !==
                                    null ? (
                                    Object.keys(
                                      this.state.courses[key]._source.pricing
                                    ).length == 1 ? (
                                      <p className="text-right bm-0">
                                        <span
                                          className={
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].discount == 0 ||
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].discount == ""
                                              ? "hide clr-grey fs-11 original-price"
                                              : "show clr-grey fs-11 original-price"
                                          }
                                        >
                                          {
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].currency
                                          }
                                          {parseFloat(
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].price
                                          ).toFixed(2)}
                                        </span>
                                        &nbsp; &nbsp;
                                        <b className="fs-13 text_grey">
                                          {
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].currency
                                          }

                                          {parseFloat(
                                            this.state.courses[key]._source
                                              .pricing[
                                              Object.keys(
                                                this.state.courses[key]._source
                                                  .pricing
                                              )[0]
                                            ].price -
                                              (this.state.courses[key]._source
                                                .pricing[
                                                Object.keys(
                                                  this.state.courses[key]
                                                    ._source.pricing
                                                )[0]
                                              ].price *
                                                this.state.courses[key]._source
                                                  .pricing[
                                                  Object.keys(
                                                    this.state.courses[key]
                                                      ._source.pricing
                                                  )[0]
                                                ].discount) /
                                                100
                                          ).toFixed(2)}
                                        </b>
                                      </p>
                                    ) : (
                                      <React.Fragment>
                                        <p className="text-right bm-0">
                                          <span
                                            className={
                                              this.state.courses[key]._source
                                                .pricing[
                                                Object.keys(
                                                  this.state.courses[key]
                                                    ._source.pricing
                                                )[0]
                                              ].discount == 0 ||
                                              this.state.courses[key]._source
                                                .pricing[
                                                Object.keys(
                                                  this.state.courses[key]
                                                    ._source.pricing
                                                )[0]
                                              ].discount == ""
                                                ? "hide clr-grey fs-11 original-price"
                                                : "show clr-grey fs-11 original-price"
                                            }
                                          >
                                            {
                                              this.state.courses[key]._source
                                                .pricing[
                                                Object.keys(
                                                  this.state.courses[key]
                                                    ._source.pricing
                                                )[0]
                                              ].currency
                                            }
                                            {parseFloat(
                                              this.state.courses[key]._source
                                                .pricing[
                                                Object.keys(
                                                  this.state.courses[key]
                                                    ._source.pricing
                                                )[0]
                                              ].price
                                            ).toFixed(2)}
                                          </span>
                                          &nbsp; &nbsp;
                                          <b className="fs-13 text_grey">
                                            {Object.keys(
                                              this.state.courses[key]._source
                                                .pricing
                                            ).length <= 2
                                              ? null
                                              : "Starting from  "}

                                            {
                                              this.state.courses[key]._source
                                                .pricing["basePlan"].currency
                                            }

                                            {parseFloat(
                                              this.state.courses[key]._source
                                                .pricing["basePlan"].price -
                                                (this.state.courses[key]._source
                                                  .pricing["basePlan"].price *
                                                  this.state.courses[key]
                                                    ._source.pricing["basePlan"]
                                                    .discount) /
                                                  100
                                            ).toFixed(2)}
                                          </b>
                                        </p>
                                      </React.Fragment>
                                    )
                                  ) : (
                                    "Free"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
          <Loader showLoader={this.state.showLoader} />
        </div>
      </React.Fragment>
    );
  }
}

export default Courses;
