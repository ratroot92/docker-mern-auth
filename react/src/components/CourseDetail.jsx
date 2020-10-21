import React, { Component } from "react";
import "../assets/css/courseDetail.css";
import Navigation from "./Navigation";
import WebNotif from "./WebNotif";
import Loader from "./loader";
import Modal from "react-responsive-modal";
import ViewComp from "./ViewComp";
import arraySort from "array-sort";

import cookie from "react-cookies";
import StickyBox from "react-sticky-box";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
var myCart = null;
class CourseDetail extends Component {
  state = {
    purchased: false,
    ModalOpen: false,
    course: null,
    showLoader: true,
    loginRequest: false,
    inCart: false,
    userId: null,
    isSinglePlan: false,
    cartAdd: false,
    cartRemove: false,
    courseId: null,
    reviews: null,
    pricing: null,
    freeResource: null,
    selectedPricingKey: null,
    t1: [],
    myTestData: null,
    t2: [],
    t3: [],
    accordView: null,
    sba: 0,
    mcq: 0,
    emq: 0,
    tf: 0,
    instructor: null,
    rbtnPrice: "",
    rbtnOriginalPrice: "",
    rbtnDiscount: "",
    showInstructor: false,
    sortedPrice: {}
  };
  subcrptionOpt = (dp, op, d, pricingKey) => {
    this.setState({
      rbtnPrice: dp,
      rbtnOriginalPrice: op,
      rbtnDiscount: d,
      selectedPricingKey: pricingKey
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ userId: nextProps.userId });
  }
  componentDidMount() {
    this.setState({ userId: this.props.userId });
    const param = this.props.match.params;
    let courseId = param.id;
    this.setState({ courseId: courseId });
    if (cookie.load("mycart") !== undefined) {
      myCart = cookie.load("mycart");
    }
    if (myCart !== null && myCart[courseId] !== undefined) {
      this.setState({ inCart: true });
    }

    db.ref(`courses/${courseId}`)
      .once("value")
      .then(snapshot => {
        this.setState({ courseType: snapshot.val().type });
        this.setState({ course: snapshot.val() });
        this.setState({ pricing: snapshot.val().pricing });
        this.setState({ showInstructor: snapshot.val().showInstructor });
        if (snapshot.hasChild("instructor")) {
          this.setState({ instructor: snapshot.val().instructor });
        }
        this.setState({ showLoader: false });
        this.setState({ freeResource: snapshot.val().freeResource });
        this.priceSorting(this.state.course.pricing);
        if (this.state.course.courseFeatures != null) {
          Object.keys(this.state.course.courseFeatures).map(key => {
            if (this.state.course.courseFeatures[key] != null) {
              if (this.state.course.courseFeatures[key].type == 1) {
                this.state.t1.push(this.state.course.courseFeatures[key]);
              } else if (this.state.course.courseFeatures[key].type == 2) {
                this.state.t2.push(this.state.course.courseFeatures[key]);
              } else {
                this.state.t3.push(this.state.course.courseFeatures[key]);
              }
            }
          });
        }
      });

    // Checking if user already owns Course -- START
    db.ref(`userProducts/${this.props.userId}/${courseId}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.exists()) {
          this.setState({ purchased: true });
        }
      });
    // Checking if user already owns Course -- END

    db.ref("userRating/" + courseId)
      .once("value")
      .then(userreviews => {
        {
          this.setState({ reviews: userreviews.val() });
        }
      });
    // db.ref(`cart/${this.props.userId}/${courseId}`)
    //   .once("value")
    //   .then(snapshot => {
    //     if (snapshot.val() !== null) {
    //       this.setState({ inCart: true });
    //     }
    //   });
    // if (this.state.course.type == 0)
    {
      db.ref(`courseExamStats/${courseId}`)
        .once("value")
        .then(stats => {
          if (stats.val() != null) {
            var t1 = 0;
            var t2 = 0;
            var t3 = 0;
            var t4 = 0;
            Object.keys(stats.val()).map(statsSub => {
              Object.keys(stats.val()[statsSub]).map(keys => {
                t1 = t1 + stats.val()[statsSub][keys]["t1"];
                t2 = t2 + stats.val()[statsSub][keys]["t2"];
                t3 = t3 + stats.val()[statsSub][keys]["t3"];
                t4 = t4 + stats.val()[statsSub][keys]["t4"];
              });
            });
            this.setState({ sba: t1, mcq: t2, emq: t3, tf: t4 });
          }
        });
    }
  }
  priceSorting = data => {
    var sortedPrice = {};
    var type2 = [];
    var type3 = [];
    var type4 = [];
    var totalPlans = Object.keys(data).length;
    Object.keys(data).map(id => {
      if (id != "basePlan") {
        data[id]["pricingKey"] = id;
        data[id]["price"] = parseInt(data[id]["price"]);

        if (data[id].type == 2) {
          type2.push(data[id]);
        } else if (data[id].type == 3) {
          type3.push(data[id]);
        } else if (data[id].type == 4) {
          type4.push(data[id]);
        } else if (data[id].type == 1) {
          this.setState({ isFreeCourse: true, rbtnPrice: "Free" });
          this.setState({ selectedPricingKey: id });
        }
        if (totalPlans < 3) {
          this.setState({ selectedPricingKey: id });
        }
      }
    });
    if (totalPlans < 3) {
      this.setState({ isSinglePlan: true });
    }
    type2 = arraySort(type2, "price");
    type3 = arraySort(type3, "price");
    type4 = arraySort(type4, "price");

    sortedPrice[" "] = type2;
    sortedPrice["oneTimePurchase"] = type3;
    sortedPrice["PaymentPlan"] = type4;

    this.setState({ sortedPrice });
  };
  onOpenModal = (section, subSection) => {
    this.setState({ ModalOpen: true });
    var myTestData = null;
    myTestData = {
      URL: this.state.course.freeResource[section][subSection].examDetails.URL,
      ext: this.state.course.freeResource[section][subSection].examDetails.ext
    };
    this.setState({ myTestData });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
    this.setState({ viewPreviousAttempts: "hide" });
    this.setState({ viewCourseModel: "show-block" });
    this.setState({
      at_mode: " show-block ",
      filterBox: " hide "
    });
  };
  toggleAccordView = (key, type) => {
    if (type == 0) {
      var accordView = { ...this.state.accordView };
      if (
        accordView[key] == undefined ||
        accordView[key].indexOf("plus") > -1
      ) {
        accordView[key] = "fa fa-minus ";
      } else {
        accordView[key] = "fa fa-plus ";
      }
      this.setState({ accordView });
    } else {
      var accordView1 = { ...this.state.accordView1 };
      if (
        accordView1[key] == undefined ||
        accordView1[key].indexOf("down") > -1
      ) {
        accordView1[key] = "fa fa-angle-up ";
      } else {
        accordView1[key] = "fa fa-angle-down";
      }
      this.setState({ accordView1 });
    }
  };
  addToCart = () => {
    {
      this.setState({ cartAdd: true });

      const param = this.props.match.params;
      let courseId = param.id;
      myCart = {};
      if (cookie.load("mycart") !== undefined) {
        myCart = cookie.load("mycart");
      }
      myCart[courseId] = {
        selectedPricingKey: this.state.selectedPricingKey
      };

      cookie.save("mycart", myCart, { path: "/" });
      var obj = new WebNotif();
      obj.createNotification("success", "Added to cart");
      this.setState({ inCart: true });
    }
  };
  toggleAccordView = (key, type) => {
    if (type == 0) {
      var accordView = { ...this.state.accordView };
      if (
        accordView[key] == undefined ||
        accordView[key].indexOf("plus") > -1
      ) {
        accordView[key] = "fa fa-minus ";
      } else {
        accordView[key] = "fa fa-plus ";
      }
      this.setState({ accordView });
    } else {
      var accordView1 = { ...this.state.accordView1 };
      if (
        accordView1[key] == undefined ||
        accordView1[key].indexOf("down") > -1
      ) {
        accordView1[key] = "fa fa-angle-up ";
      } else {
        accordView1[key] = "fa fa-angle-down";
      }
      this.setState({ accordView1 });
    }
  };
  render() {
    const displayPurchase = this.state.purchased ? " none" : " block"; // To display or hide buttons for Purchasing
    const displayExplore = !this.state.purchased ? " none" : " block"; // To display or hide buttons for Explore
    return (
      <React.Fragment>
        <WebNotif />

        <Navigation
          loginRequest={this.state.loginRequest}
          cartAdd={this.state.cartAdd}
          cartremove={this.state.cartRemove}
        />

        <div className="course_detail_slider top-fix">
          <br />
          <br />
          <br />
        </div>
        <section className="mobile-sidebar">
          <br />
          <br />
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <div className="media_box" />
                <div className="col-md-12 price-text ">
                  <div>
                    {this.state.course == null
                      ? "0.0"
                      : this.state.course.pricing == null
                      ? "0.0"
                      : Object.keys(this.state.course.pricing).length > 1
                      ? Object.keys(this.state.course.pricing).map(key => (
                          <div key={key}>
                            {key}
                            <label className="bm-0 p-5 opt-label">
                              <input type="radio" name="optradio" />
                              {this.state.course.pricing[key].month}
                            </label>
                          </div>
                        ))
                      : ""}
                  </div>
                  <div className="d-flex justify-content-center pd-5">
                    <button className="btn btn-primary red_btn">
                      Add To Cart
                    </button>
                  </div>

                  <div className="d-flex justify-content-center pd-5">
                    <button className="btn btn-primary white_btn">
                      Buy Now
                    </button>
                  </div>
                  <p className="text-center">
                    <span className="text_grey text-small ">
                      {/* 30 days money back gurantee */}
                    </span>
                    &nbsp;
                  </p>
                  <hr />
                  <div className="col-md-12">
                    {this.state.course == null
                      ? ""
                      : this.state.course.AccessFeatures != undefined
                      ? Object.keys(this.state.course.AccessFeatures).map(
                          key => (
                            <span className="text-small" key={key}>
                              <i className="fa fa-star" />
                              &nbsp; {this.state.course.AccessFeatures[key]}
                              <br />
                            </span>
                          )
                        )
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container top-fix-assert">
          <div className="row">
            <StickyBox
              offsetTop={10}
              offsetBottom={25}
              className="col-md-4 course_detail_box box_shadow"
              style={{ marginBottom: "10px" }}
            >
              <div className="">
                <div className="row">
                  <div className="media_box course-video">
                    {this.state.course == null ? (
                      ""
                    ) : this.state.course.media.video != "" &&
                      this.state.course.media.video != null ? (
                      <Player
                        playsInline
                        poster={this.state.course.media.Image}
                        src={this.state.course.media.video}
                      />
                    ) : (
                      <img
                        src={this.state.course.media.Image}
                        alt="featured image"
                        height="200"
                        width="100%"
                      />
                    )}
                  </div>
                  <div className="col-md-12 price-text ">
                    <h3 className="text-center zero-margins">
                      {this.state.rbtnPrice}
                    </h3>
                    {this.state.rbtnDiscount != 0 &&
                    this.state.rbtnDiscount != null ? (
                      <React.Fragment>
                        {" "}
                        <p
                          className={
                            this.state.rbtnOriginalPrice == ""
                              ? "hide"
                              : "text-center asda"
                          }
                        >
                          <span className="text_grey text-small original-price">
                            {this.state.rbtnOriginalPrice}
                          </span>
                          &nbsp;
                          <span className="text-red text-small">
                            ({this.state.rbtnDiscount}
                            %)
                          </span>
                        </p>
                        <br />
                      </React.Fragment>
                    ) : null}
                    {this.state.rbtnPrice != 0 &&
                    this.state.rbtnPrice != null ? (
                      <hr></hr>
                    ) : null}
                    {/* ================================= */}
                    {this.state.isFreeCourse ? (
                      ""
                    ) : (
                      <React.Fragment>
                        {this.state.sortedPrice[" "] != undefined &&
                        Object.keys(this.state.sortedPrice[" "])
                          .length > 0 ? (
                          Object.keys(this.state.sortedPrice[" "])
                            .length > 1 ? (
                            <React.Fragment>
                              <p className="fs-14 clr-red">  Plan</p>
                              {Object.keys(
                                this.state.sortedPrice[" "]
                              ).map(id => (
                                <div
                                  key={
                                    this.state.sortedPrice[" "][id][
                                      "pricingKey"
                                    ]
                                  }
                                >
                                  <label className="bm-0 p-5 opt-label">
                                    <input
                                      type="radio"
                                      name="optradio"
                                      onChange={event =>
                                        this.subcrptionOpt(
                                          this.state.sortedPrice[
                                            " "
                                          ][id].currency +
                                            (this.state.sortedPrice[
                                              " "
                                            ][id].price -
                                              (this.state.sortedPrice[
                                                " "
                                              ][id].price *
                                                this.state.sortedPrice[
                                                  " "
                                                ][id].discount) /
                                                100),
                                          this.state.sortedPrice[
                                            " "
                                          ][id].currency +
                                            this.state.sortedPrice[
                                              " "
                                            ][id].price,
                                          this.state.sortedPrice[
                                            " "
                                          ][id].discount,
                                          this.state.sortedPrice[
                                            " "
                                          ][id]["pricingKey"]
                                        )
                                      }
                                    />
                                    &nbsp;&nbsp;{" "}
                                    <b>
                                      {
                                        this.state.sortedPrice[" "][
                                          id
                                        ].name
                                      }
                                    </b>
                                    &nbsp;&nbsp;
                                    {this.state.sortedPrice[" "][id]
                                      .currency +
                                      (this.state.sortedPrice[" "][
                                        id
                                      ].price -
                                        (this.state.sortedPrice[" "][
                                          id
                                        ].price *
                                          this.state.sortedPrice[
                                            " "
                                          ][id].discount) /
                                          100)}
                                  </label>
                                </div>
                              ))}
                            </React.Fragment>
                          ) : (
                            <div
                              key={
                                this.state.sortedPrice[" "][0][
                                  "pricingKey"
                                ]
                              }
                            >
                              <h3 className="text-center zero-margins">
                                {" "}
                                {this.state.sortedPrice[" "][0]
                                  .currency +
                                  (this.state.sortedPrice[" "][0]
                                    .price -
                                    (this.state.sortedPrice[" "][0]
                                      .price *
                                      this.state.sortedPrice[" "][0]
                                        .discount) /
                                      100)}
                              </h3>
                              {this.state.sortedPrice[" "][0]
                                .discount != 0 &&
                              this.state.sortedPrice[" "][0]
                                .discount != null &&
                              this.state.sortedPrice[" "][0]
                                .discount != undefined ? (
                                <p className="text-center">
                                  <span className="text_grey text-small original-price">
                                    {this.state.sortedPrice[" "][0]
                                      .currency +
                                      this.state.sortedPrice[" "][0]
                                        .price}
                                  </span>
                                  &nbsp;
                                  <span className="text-red text-small">
                                    (
                                    {
                                      this.state.sortedPrice[" "][0]
                                        .discount
                                    }
                                    %)
                                  </span>
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          )
                        ) : (
                          ""
                        )}

                        {this.state.sortedPrice["oneTimePurchase"] !=
                          undefined &&
                        this.state.sortedPrice["oneTimePurchase"].length > 0 ? (
                          !this.state.isSinglePlan ? (
                            <React.Fragment>
                              <hr />
                              <p className="fs-14 clr-red">One time Payment</p>

                              <div
                                key={
                                  this.state.sortedPrice["oneTimePurchase"][0][
                                    "pricingKey"
                                  ]
                                }
                              >
                                <label className="bm-0 p-5 opt-label">
                                  <input
                                    type="radio"
                                    name="optradio"
                                    onChange={event =>
                                      this.subcrptionOpt(
                                        this.state.sortedPrice[
                                          "oneTimePurchase"
                                        ][0].currency +
                                          (this.state.sortedPrice[
                                            "oneTimePurchase"
                                          ][0].price -
                                            (this.state.sortedPrice[
                                              "oneTimePurchase"
                                            ][0].price *
                                              this.state.sortedPrice[
                                                "oneTimePurchase"
                                              ][0].discount) /
                                              100),
                                        this.state.sortedPrice[
                                          "oneTimePurchase"
                                        ][0].currency +
                                          this.state.sortedPrice[
                                            "oneTimePurchase"
                                          ][0].price,
                                        this.state.sortedPrice[
                                          "oneTimePurchase"
                                        ][0].discount,

                                        this.state.sortedPrice[
                                          "oneTimePurchase"
                                        ][0]["pricingKey"]
                                      )
                                    }
                                  />
                                  &nbsp;&nbsp; &nbsp;&nbsp;
                                  {this.state.sortedPrice["oneTimePurchase"][0]
                                    .currency +
                                    (this.state.sortedPrice[
                                      "oneTimePurchase"
                                    ][0].price -
                                      (this.state.sortedPrice[
                                        "oneTimePurchase"
                                      ][0].price *
                                        this.state.sortedPrice[
                                          "oneTimePurchase"
                                        ][0].discount) /
                                        100)}
                                  &nbsp;&nbsp;{" "}
                                  <b>
                                    {
                                      this.state.sortedPrice[
                                        "oneTimePurchase"
                                      ][0].name
                                    }
                                  </b>
                                </label>
                              </div>
                            </React.Fragment>
                          ) : (
                            <div
                              key={
                                this.state.sortedPrice["oneTimePurchase"][0][
                                  "pricingKey"
                                ]
                              }
                            >
                              {/* <hr /> */}

                              <h3 className="text-center zero-margins">
                                {this.state.sortedPrice["oneTimePurchase"][0]
                                  .currency +
                                  (this.state.sortedPrice["oneTimePurchase"][0]
                                    .price -
                                    (this.state.sortedPrice[
                                      "oneTimePurchase"
                                    ][0].price *
                                      this.state.sortedPrice[
                                        "oneTimePurchase"
                                      ][0].discount) /
                                      100)}
                              </h3>
                              {this.state.sortedPrice["oneTimePurchase"][0]
                                .discount != 0 &&
                              this.state.sortedPrice["oneTimePurchase"][0]
                                .discount != null &&
                              this.state.sortedPrice["oneTimePurchase"][0]
                                .discount != undefined ? (
                                <p className="text-center">
                                  <span className="text_grey text-small original-price">
                                    {this.state.sortedPrice[
                                      "oneTimePurchase"
                                    ][0].currency +
                                      this.state.sortedPrice[
                                        "oneTimePurchase"
                                      ][0].price}
                                  </span>
                                  &nbsp;
                                  <span className="text-red text-small">
                                    (
                                    {
                                      this.state.sortedPrice[
                                        "oneTimePurchase"
                                      ][0].discount
                                    }
                                    %)
                                  </span>
                                </p>
                              ) : null}
                            </div>
                          )
                        ) : (
                          ""
                        )}

                        {this.state.sortedPrice["PaymentPlan"] != undefined &&
                        this.state.sortedPrice["PaymentPlan"].length > 0 ? (
                          <React.Fragment>
                            <hr />
                            <p className="fs-14 clr-red">Payment Plan</p>

                            <div
                              key={
                                this.state.sortedPrice["PaymentPlan"][0][
                                  "pricingKey"
                                ]
                              }
                            >
                              <label className="bm-0 p-5 opt-label">
                                <input
                                  type="radio"
                                  name="optradio"
                                  onChange={event =>
                                    this.subcrptionOpt(
                                      this.state.sortedPrice["PaymentPlan"][0]
                                        .currency +
                                        (this.state.sortedPrice[
                                          "PaymentPlan"
                                        ][0].price -
                                          (this.state.sortedPrice[
                                            "PaymentPlan"
                                          ][0].price *
                                            this.state.sortedPrice[
                                              "PaymentPlan"
                                            ][0].discount) /
                                            100),
                                      this.state.sortedPrice["PaymentPlan"][0]
                                        .currency +
                                        this.state.sortedPrice["PaymentPlan"][0]
                                          .price,
                                      this.state.sortedPrice["PaymentPlan"][0]
                                        .discount,

                                      this.state.sortedPrice["PaymentPlan"][0][
                                        "pricingKey"
                                      ]
                                    )
                                  }
                                />
                                &nbsp;&nbsp; &nbsp;&nbsp;
                                {this.state.sortedPrice["PaymentPlan"][0]
                                  .currency +
                                  (this.state.sortedPrice["PaymentPlan"][0]
                                    .price -
                                    (this.state.sortedPrice["PaymentPlan"][0]
                                      .price *
                                      this.state.sortedPrice["PaymentPlan"][0]
                                        .discount) /
                                      100)}
                                &nbsp;&nbsp;{" "}
                                <b>
                                  {
                                    this.state.sortedPrice["PaymentPlan"][0]
                                      .name
                                  }
                                </b>
                              </label>
                            </div>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    )}
                    <hr />{" "}
                    <div
                      className="d-flex justify-content-center pd-5"
                      ref={el => {
                        if (el) {
                          el.style.setProperty(
                            "display",
                            displayPurchase,
                            "important"
                          );
                        }
                      }}
                    >
                      {this.state.inCart == false ? (
                        this.state.selectedPricingKey == null ? (
                          <button className="btn red_btn disabled-btn" disabled>
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary red_btn"
                            onClick={this.addToCart}
                          >
                            Add To Cart
                          </button>
                        )
                      ) : (
                        <div className="col-md-12 lrp-0">
                          <Link
                            to={{
                              pathname: "/cart",
                              state: {
                                directCheckout: true
                              }
                            }}
                          >
                            <button
                              className="btn btn-primary red_btn"
                              //   onClick={this.addToCart}
                            >
                              Checkout
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                    <div
                      className="d-flex justify-content-center pd-5"
                      ref={el => {
                        if (el) {
                          el.style.setProperty(
                            "display",
                            displayPurchase,
                            "important"
                          );
                        }
                      }}
                    >
                      <div className="col-md-12 lrp-0">
                        <Link
                          to={{
                            pathname: "/cart",
                            state: {
                              directCheckout: true
                            }
                          }}
                        >
                          <button
                            className="btn white_btn disabled-btn"
                            disabled={
                              this.state.inCart ||
                              this.state.selectedPricingKey == null
                                ? true
                                : false
                            }
                            onClick={this.addToCart}
                          >
                            {" "}
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-center pd-5"
                      ref={el => {
                        if (el) {
                          el.style.setProperty(
                            "display",
                            displayExplore,
                            "important"
                          );
                        }
                      }}
                    >
                      <div className="col-md-12 lrp-0">
                        <Link
                          to={{
                            pathname: `/mycourse/${this.state.courseId}`
                         }}
                        >
                          <button className="btn btn-primary red_btn">
                            {" "}
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <div className="col-md-12">
                      <span className="fs-12 text-grey">
                        <i className="fa fa-play-circle fs-14" />
                        &nbsp; Access on Web and Mobile
                        <br />
                      </span>
                      <span className="fs-12 text-grey">
                        <i className="fa fa-star fs-14" />
                        &nbsp; Full lifetime access
                        <br />
                      </span>
                      {this.state.course == null
                        ? ""
                        : this.state.course.AccessFeatures != undefined
                        ? Object.keys(this.state.course.AccessFeatures).map(
                            key => (
                              <span className="fs-12 text-grey" key={key}>
                                <i className="fa fa-media" />
                                &nbsp; {this.state.course.AccessFeatures[key]}
                                <br />
                              </span>
                            )
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </StickyBox>
            <div className="col course_details lrp-50">
              <div className="col-md-12 white_clr" style={{ height: "300px" }}>
                <h2>
                  <b>
                    {this.state.course == null
                      ? "Course Title Here"
                      : this.state.course.Title}
                  </b>
                </h2>
                <p className="fs-12">
                  Last Updated{" "}
                  {this.state.course == null
                    ? "last updated "
                    : this.state.course.lastUpdated.split("T")[0]}
                </p>
                <div className="col-md-12">
                  <div className="row">
                    <div className="bm-10">
                      {this.state.courseId !== null ? (
                        <Ratings
                          courseId={this.state.courseId}
                          userId={null}
                          readonly={true}
                          textWhite={true}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="course_intro">
                  <p>
                    {this.state.course == null
                      ? "Course description here"
                      : this.state.course.Description}
                  </p>
                </div>
                <br />
              </div>
              <br />
              <br />

              {this.state.course != null && this.state.course.type == 0 ? (
                <section className="ptb-20 ">
                  <div
                    className="col-md-12 lrp-0"
                    style={{ marginLeft: "1.5px" }}
                  >
                    <div className="d-flex justify-space-between container lrp-0">
                      <div className="col-md-4 course_stats">
                        <p className="fs-52 clr-pink bm-0">{this.state.sba}</p>
                        SBA
                      </div>
                      <div className="col-md-4 course_stats">
                        <p className="fs-52 clr-pink bm-0">{this.state.mcq}</p>
                        MCQs
                      </div>
                      <div className="col-md-4 course_stats">
                        <p className="fs-52 clr-pink bm-0">{this.state.emq}</p>
                        EMQ
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <section className="ptb-20 mb-40 hide">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center container">
                      <div className="col-md-3 course_stats">
                        <p className="fs-40 clr-pink">20</p>
                        Total Questions
                      </div>
                      <div className="col-md-3 course_stats">
                        <p className="fs-40 clr-pink">100</p>
                        Max Score
                      </div>
                      <div className="col-md-3 course_stats">
                        <p className="fs-40 clr-pink">60 Min</p>
                        Duration
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {this.state.course != null &&
              this.state.course.courseContent != null ? (
                <React.Fragment>
                  <section className="ptb-20">
                    <div className="col-md-12">
                      <h4 name="regular_font" className="notoFont-normal">
                        {" "}
                        {this.state.course != null
                          ? this.state.course.type == 0
                            ? "Practice Question Topics "
                            : this.state.course.type == 1
                            ? "Mock Papers"
                            : "Course content"
                          : ""}
                      </h4>{" "}
                    </div>
                    <br />
                    <div className="col-sm-12 ">
                      {this.state.course.courseContent != null
                        ? Object.keys(this.state.course.courseContent).map(
                            key1 => (
                              <div className="accordion-group" key={key1}>
                                <div className="accordion-heading">
                                  <a
                                    className="accordion-toggle collapsed"
                                    data-toggle="collapse"
                                    data-parent="toggle"
                                    href={"#" + key1}
                                    onClick={() =>
                                      this.toggleAccordView(key1, 0)
                                    }
                                  >
                                    <i
                                      className={
                                        this.state.accordView != null
                                          ? this.state.accordView[key1] != null
                                            ? this.state.accordView[key1]
                                            : "fa fa-plus"
                                          : "fa fa-plus"
                                      }
                                    />
                                    &nbsp; &nbsp; &nbsp;{" "}
                                    <span className="regular_font fs-18">
                                      {""}
                                      {
                                        this.state.course.courseContent[key1]
                                          .topicName
                                      }
                                    </span>
                                  </a>
                                </div>
                                <div id={key1} className="collapse w-100">
                                  <div className="accordion-body in">
                                    {this.state.course.courseContent[key1][
                                      "topics"
                                    ] != undefined &&
                                    this.state.course.courseContent[key1][
                                      "topics"
                                    ] != null
                                      ? Object.keys(
                                          this.state.course.courseContent[key1][
                                            "topics"
                                          ]
                                        ).map(key => (
                                          <React.Fragment key={key}>
                                            <div className="col-md-12 lrp-30">
                                              {this.state.course != null &&
                                              this.state.course.type == 2 &&
                                              this.state.course.freeResource !=
                                                null &&
                                              this.state.course.freeResource[
                                                key1
                                              ] != undefined &&
                                              this.state.course.freeResource[
                                                key1
                                              ][key] != undefined ? (
                                                <React.Fragment>
                                                  <span
                                                    className="text_cyan pointer"
                                                    onClick={() => {
                                                      this.onOpenModal(
                                                        key1,
                                                        key
                                                      );
                                                    }}
                                                  >
                                                    <i className="fa fa-play-circle fa-lg" />{" "}
                                                    &nbsp;&nbsp;
                                                    {
                                                      this.state.course
                                                        .courseContent[key1][
                                                        "topics"
                                                      ][key].title
                                                    }
                                                  </span>
                                                </React.Fragment>
                                              ) : (
                                                <span className="text_grey">
                                                  <i className="fa fa-play-circle fa-lg" />{" "}
                                                  &nbsp;&nbsp;
                                                  {this.state.course.courseContent[
                                                    key1
                                                  ]["topics"][key].title.split(
                                                    "/"
                                                  ).length == 2
                                                    ? this.state.course.courseContent[
                                                        key1
                                                      ]["topics"][
                                                        key
                                                      ].title.split("/")[1]
                                                    : this.state.course
                                                        .courseContent[key1][
                                                        "topics"
                                                      ][key].title}
                                                </span>
                                              )}

                                              <span className="float-right">
                                                {this.state.course
                                                  .courseContent[key1][
                                                  "topics"
                                                ][key].max_time != null ? (
                                                  <React.Fragment>
                                                    <i className="fa fa-clock-o fa-lg" />{" "}
                                                    {this.state.course
                                                      .courseContent[key1][
                                                      "topics"
                                                    ][key].max_time +
                                                      " minutes"}
                                                  </React.Fragment>
                                                ) : (
                                                  ""
                                                )}
                                              </span>
                                            </div>

                                            <div className="col-md-12 lrp-15 ptb-10">
                                              {this.state.course.courseContent[
                                                key1
                                              ]["topics"][key].info != null ? (
                                                <ul>
                                                  <li>
                                                    {
                                                      this.state.course
                                                        .courseContent[key1][
                                                        "topics"
                                                      ][key].info
                                                    }
                                                  </li>
                                                </ul>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </React.Fragment>
                                        ))
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        : ""}
                    </div>
                  </section>
                </React.Fragment>
              ) : (
                ""
              )}
              <section>
                {this.state.course == null
                  ? ""
                  : this.state.course.courseFeatures != undefined
                  ? Object.keys(this.state.t1).map(key => (
                      <div className="container ptb-20" key={key}>
                        <div className="col-md-12  bg-white p-35 border-10 box_shadow">
                          <h4 className="notoFont-normal">
                            {this.state.t1[key].title}
                          </h4>
                          <br />
                          <div className="row ">
                            {Object.keys(this.state.t1[key].data).map(key1 => (
                              <div className="col-md-6" key={key1}>
                                <ul className="tickbullet">
                                  <li className="box_li fs-15" key={key1}>
                                    &nbsp;&nbsp;{this.state.t1[key].data[key1]}
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </section>

              <section
                className={
                  this.state.course == null ||
                  this.state.courseType == 2 ||
                  this.state.course.freeResource == null
                    ? "hide"
                    : " show-block ptb-20"
                }
              >
                <div className="container text-center">
                  <div className="ptb-30 set-border mb-15">
                    <h5
                      className={
                        this.state.course != null && this.state.course.type == 0
                          ? ""
                          : "hide"
                      }
                    >
                      Try Our Free Practice Questions
                    </h5>
                    <h5
                      className={
                        this.state.course != null && this.state.course.type == 1
                          ? ""
                          : "hide"
                      }
                    >
                      Try Our Free Mock Exam Questions
                    </h5>
                    <br />
                    <Link
                      to={{
                        pathname: "/questions",
                        state: {
                          isFree: true,
                          AttemptKey: null,
                          //    type: 0,
                          data: this.state.freeResource,
                          //     courseId: this.state.courseId,
                          courseType:
                            this.state.course != null
                              ? this.state.course.type
                              : 0
                        }
                      }}
                      data-href
                    >
                      <button className="btn btn-red btn-width-250 white fs-14 free-btn">
                        {" "}
                        Try Free Questions
                      </button>
                    </Link>
                  </div>{" "}
                </div>
              </section>
              <section>
                {this.state.course == null
                  ? ""
                  : this.state.course.courseFeatures != undefined
                  ? Object.keys(this.state.t2).map(key => (
                      <div className="container ptb-20" key={key}>
                        <div className="col-md-12 lrp-0">
                          <h4 className="notoFont-normal">
                            {this.state.t2[key].title}
                          </h4>
                          <br />
                          <div className="row">
                            {Object.keys(this.state.t2[key].data).map(key1 => (
                              <p className="plr-20" key={key1}>
                                {this.state.t2[key].data[key1]}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </section>
              <section>
                {this.state.course == null
                  ? ""
                  : this.state.course.courseFeatures != undefined
                  ? Object.keys(this.state.t3).map(key =>
                      this.state.t3[key].imgAlign == 1 ? (
                        <div className="container ptb-20" key={key}>
                          <div className="row lrm-0">
                            <img
                              src={this.state.t3[key].data.image}
                              alt="banner image"
                              width="650"
                              height="300"
                            />
                          </div>
                          <div>
                            <br />
                            <br />
                            <h4 className="notoFont-normal">
                              {this.state.t3[key].title}
                            </h4>
                            <p>{this.state.t3[key].data.detail}</p>
                          </div>
                        </div>
                      ) : this.state.t3[key].imgAlign == 2 ? (
                        <div className="container ptb-20" key={key}>
                          <div className="row">
                            <div className="col-md-8">
                              <h4 className="notoFont-normal">
                                {this.state.t3[key].title}
                              </h4>
                              <p>{this.state.t3[key].data.detail}</p>
                            </div>
                            <div className="col-md-4">
                              <img
                                src={this.state.t3[key].data.image}
                                alt="banner image"
                                width="200"
                                height="250"
                              />
                            </div>
                          </div>
                        </div>
                      ) : this.state.t3[key].imgAlign == 3 ? (
                        <div className="container ptb-20" key={key}>
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                src={this.state.t3[key].data.image}
                                alt="banner image"
                                width="200"
                                height="250"
                              />
                            </div>
                            <div className="col-md-8">
                              <h4 className="notoFont-normal">
                                {this.state.t3[key].title}
                              </h4>
                              <p>{this.state.t3[key].data.detail}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </section>

              <section
                className={
                  this.state.course == null
                    ? "hide"
                    : this.state.course.faq == null
                    ? "hide"
                    : "show-block"
                }
              >
                <div className="container ptb-20">
                  <div className="col-md-12 lrp-0">
                    <div className="col-md-12 lrp-0">
                      <h4 className="notoFont-normal">
                        Frequently Asked Questions
                      </h4>
                    </div>
                    <div className="col-md-12  lrp-0">
                      <br />
                      {this.state.course == null
                        ? ""
                        : this.state.course.faq == null
                        ? ""
                        : Object.keys(this.state.course.faq).map(key => (
                            <div className="row" key={key}>
                              <div className="col-sm-12">
                                <div className="accordion-group ">
                                  <div className="accordion-heading">
                                    <a
                                      className="accordion-toggle collapsed faq"
                                      data-toggle="collapse"
                                      data-parent="toggle"
                                      href={"#" + key}
                                    >
                                      <i className="fa fa-angle-right" /> &nbsp;
                                      &nbsp; &nbsp;
                                      {this.state.course.faq[key].question}
                                    </a>
                                  </div>
                                  <div id={key} className="collapse">
                                    <div className="accordion-inner accordion-body faq-body in">
                                      <div className="lrp-40">
                                        {this.state.course.faq[key].answer}
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

              <section>
                <div className="container ptb-20">
                  <div className="col-md-12  lrp-0">
                    <div className="col-md-12 lrp-0">
                      <h4 className="notoFont-normal">Rating and Reviews</h4>
                    </div>
                    <div className="col-md-12 lrp-0">
                      <br />
                      <div className="col-md-12 row box_shadow details_box lrm-0">
                        <table className="table table-borderd table-striped">
                          <tbody>
                            <tr>
                              <td className="overall-rating-data">
                                <div className="d-flex justify-content-center">
                                  {this.state.courseId !== null ? (
                                    <Ratings
                                      courseId={this.state.courseId}
                                      userId={this.props.userId}
                                      readonly={true}
                                      textWhite={false}
                                    />
                                  ) : null}
                                  &nbsp;&nbsp;&nbsp;{" "}
                                  <span>
                                    Rated{" "}
                                    {this.state.course !== null
                                      ? this.state.course.CourseRating.Score.toFixed(
                                          2
                                        )
                                      : null}{" "}
                                    out of 5.0 of{" "}
                                    {this.state.course !== null
                                      ? this.state.course.CourseRating.Total
                                      : null}
                                    {" Ratings"}
                                  </span>
                                </div>
                              </td>
                            </tr>
                            {this.state.reviews != null ? (
                              Object.keys(this.state.reviews).map(key => (
                                <tr key={key} className="rating-row">
                                  <td className="rating-data">
                                    <div className="col-md-12 row">
                                      <div className="col-md-3 ">
                                        <img
                                          className="profile_image"
                                          src={
                                            this.state.reviews[key].image
                                              ? this.state.reviews[key].image
                                              : "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
                                          }
                                        />
                                      </div>
                                      <div className="col-md-9 pl-5">
                                        <Ratings
                                          userId={null}
                                          readonly={true}
                                          textWhite={false}
                                          data={{
                                            Score: this.state.reviews[key].score
                                          }}
                                        />
                                        <p className="text_grey">
                                          {this.state.reviews[key].review}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr />
                            )}
                            <tr>
                              <td>
                                <br />

                                <div className="d-flex justify-content-center">
                                  <button className="btn red_out_btn fix_width_btn_lg">
                                    View more
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* <div className="favourite_heart" /> */}
        {this.state.showInstructor == true && this.state.instructor != null ? (
          <section className="ptb-20">
            <div className="bg-pink">
              <div className="container ptb-30 ">
                <div className="col-md-12 lrp-0 ">
                  <div className="col-md-12 row lrp-0 ">
                    <div className="col-md-2" />
                    <div className="col-md-4">
                      <h4 className="notoFont-normal fs-18 white">
                        About the instructor
                      </h4>
                    </div>
                  </div>
                  <br />
                  {Object.keys(this.state.instructor).map(key => (
                    <div className="col-md-12 row" key={key}>
                      <div className="col-md-2" />
                      <div className="col-md-2 ">
                        <img
                          className="profile_image"
                          height="100"
                          src={this.state.instructor[key].image}
                        />

                        <div className="d-flex justify-content-center">
                          {this.state.instructor[key].rating ? (
                            <div>
                              <br />
                              <div className="text-small">
                                <i className="fa fa-star white" /> &nbsp;&nbsp;
                                <span className="white">
                                  {this.state.instructor.rating}
                                </span>
                                <span className="white"> Rating</span>
                              </div>
                              <div className="text-small">
                                <i className="fa fa-play-circle white" />{" "}
                                &nbsp;&nbsp;
                                <span className="white">
                                  {this.state.instructor.videos}
                                </span>
                                <span className="white">Video</span>
                              </div>
                              <div className="text-small">
                                <i className="fa fa-align-right white" />{" "}
                                &nbsp;&nbsp;
                                <span className="white">
                                  {this.state.instructor.reviewsCount}
                                </span>
                                <span className="white">Reviews</span>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <span className="bold white">
                          {this.state.instructor[key].name}
                        </span>
                        <span className=" white">
                          ({this.state.instructor[key].qualification})
                        </span>
                        <br />
                        <span className="white">
                          {this.state.instructor[key].institute}
                        </span>
                        <br />
                        <p className="white fs-12">
                          <br />
                          <span>{this.state.instructor[key].introduction}</span>
                        </p>
                        <Link
                          to={{
                            pathname: "/profile/" + key,
                            state: {
                              directCheckout: true
                            }
                          }}
                        >
                          <button className="btn btn-primary btn-white-hollow fix_width_btn">
                            View profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        <section
          className={
            this.state.course != null && this.state.course.type == 0
              ? "bg-white"
              : "hide"
          }
        >
          <div className="d-flex justify-content-center pt-50">
            {/* <h5>PLATFORM FEATURES</h5> */}
            <h2 className="notoFont-normal text-black">PLATFORM FEATURES</h2>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5">
                <img
                  src={require("../assets/image/selection.png")}
                  alt="Select how You want to practice"
                  className="width-40vw"
                />
              </div>
              <div className="col-md-5 text-black fs-14">
                <p>
                  <b>Select how You want to practice</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5 text-black fs-14">
                <p>
                  {" "}
                  <b>Customize your exam the way you want</b>
                </p>{" "}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="col-md-5">
                <img
                  src={require("../assets/image/customize.png")}
                  alt="Customize your exam the way you want"
                  className="width-40vw"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5">
                {/* <img src={require("../assets/image/analyze.png")}
                  alt="Analyze and evaluate your performance"
                  className="width-40vw"
                /> */}
              </div>
              <div className="col-md-5 text-black ">
                <p className="fs-16">
                  {" "}
                  <b>Analyze and evaluate your performance</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className={
            this.state.course != null && this.state.course.type == 1
              ? "bg-white"
              : "hide"
          }
        >
          <div className="d-flex justify-content-center ptb-50">
            <h2 className="notoFont-normal text-black">PLATFORM FEATURES</h2>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5">
                <img
                  src={require("../assets/image/exam.png")}
                  alt="Real Exam Enviornment"
                  className="width-40vw"
                />
              </div>
              <div className="col-md-5 text-black fs-14">
                <p className="fs-16">
                  {" "}
                  <b>Real Exam Enviornment</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5 text-black fs-14">
                <p className="fs-16">
                  {" "}
                  <b>Attempt as many times you want</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="col-md-5">
                <img
                  src={require("../assets/image/retake.png")}
                  alt="Attempt as many times you want"
                  className="width-40vw"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 ptb-30">
            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-5">
                {/* <img
                  src={require("../assets/image/answer.png")}
                  alt="Explanation of answer"
                  className="width-40vw"
                /> */}
              </div>
              <div className="col-md-5 text-black fs-14">
                <p className="fs-16">
                  {" "}
                  <b>Explanation of answer</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free course content modal  */}
        <div className="freeResource">
          <Modal
            open={this.state.ModalOpen}
            onClose={this.onCloseModal}
            classNames={{
              overlay: "myoverlay",
              modal: "freeResource"
            }}
            center
          >
            <div className=" modal-content">
              <div className="modal-course-name text-center bg-white">
                <div className="lrp-65">
                  <div className="lrp-15 d-flex justify-content-center">
                    <h3 className="lrp-30 bg-white fs-34 bm-0">
                      Free Resource
                    </h3>
                  </div>

                  <div className="text-line" style={{}} />
                </div>
              </div>
              <div className="modal-body zero_padding">
                <div>
                  <div className="p-coursemodal freeResourceView">
                    {this.state.myTestData != null ? (
                      <ViewComp examData={this.state.myTestData} />
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>

       <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default CourseDetail;
