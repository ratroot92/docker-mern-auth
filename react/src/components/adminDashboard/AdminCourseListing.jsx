import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import Loader from "../loader";
import ToggleButton from "react-toggle-button";
import WebNotif from "../WebNotif";
import Select from "react-select";
import arraySort from "array-sort";
import FuzzySearch from "fuzzy-search";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
var searcher = null;

class AdminCourseListing extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pq: [1,2,3,4,5,6],
    originalData: [],
    showLoader: true,
    courseType: null,
    ModalOpen: false,
    categories_options: [{ label: "All", value: null }],
    selectedCategory: [{ label: "All", value: null }],
    selectedInstructor: [{ label: "All", value: null }],
    ioptions: [],
    instructor: null,
    searchKeyword: "",
    optionsDate: [
      { label: "Recent First", value: "rto" },
      { label: "Recent Last", value: "otr" }
    ],
    selectedDate: { label: "Recent First", value: "rto" }
  };
  onOpenModal = () => {
    this.setState({ ModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
  };

  componentDidMount() {
    this.setState({ courseType: parseInt(this.props.courseType) });

    var URL = "";
    if (parseInt(this.props.courseType) == 0) {
      URL = "/admin/practicequestion/new";
    } else if (parseInt(this.props.courseType) == 1) {
      URL = "/admin/mockexam/new";
    } else if (parseInt(this.props.courseType) == 2) {
      URL = "/admin/course/new";
    }
    this.setState({ editURL: URL });

  //   db.ref(`courses`)
  //     .orderByChild("type")
  //     .equalTo(parseInt(this.props.courseType))
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.setState({ pq: snapshot.val() });
  //         this.removingKeys(snapshot.val());
  //         this.setState({ originalData: snapshot.val() });
  //       }
  //       this.setState({ showLoader: false });
  //     });
  //   db.ref(`categories`)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         snapshot.forEach(tags => {
  //           var new_option = { value: tags.key, label: tags.key };
  //           var categories_options = [...this.state.categories_options];
  //           categories_options.push(new_option);
  //           this.setState({ categories_options });
  //         });
  //       }
  //     });

  //   db.ref("userInfo")
  //     .orderByChild("role")
  //     .equalTo("instructor")
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.setState({ instructor: snapshot.val() });
  //         var ioptions = [{ value: null, label: "All" }];
  //         Object.keys(this.state.instructor).map(key => {
  //           ioptions.push({
  //             value: key,
  //             label: this.state.instructor[key].name
  //           });
  //         });
  //         this.setState({ ioptions });
  //       }
  //     });
  }
  // deleteItem = (itemKey, name, idx) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: "Are you sure to delete",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref("courses/" + itemKey).set(null);
  //           var clone_pq = [...this.state.pq];
  //           clone_pq.splice(idx, 1);
  //           this.setState({ pq: clone_pq }, () => {
  //             var obj = new WebNotif();
  //             obj.createNotification("success", "Practice Question Deleted");
  //           });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // toggleSwitch = (index, key, value, name) => {
  //   var pq = { ...this.state.pq };
  //   pq[index].isShown = !value;
  //   this.setState({ pq });
  //   db.ref(`courses/` + key + "/isShown").set(!value);
  //   var obj = new WebNotif();
  //   obj.createNotification(
  //     "success",
  //     "Visibility of " + name + " is changed successfully"
  //   );
  // };

  // filterCategory = selectedCategory => {
  //   this.setState({ selectedCategory }, () => {
  //     this.Search(this.state.searchKeyword);
  //   });
  // };
  // filterInstructor = selectedInstructor => {
  //   this.setState({ selectedInstructor }, () => {
  //     this.Search(this.state.searchKeyword);
  //   });
  // };
  // filterDate = selectedDate => {
  //   this.setState({ selectedDate }, () => {
  //     this.Search(this.state.searchKeyword);
  //   });
  // };

  // removingKeys = data => {
  //   var test = [];
  //   if (data != null || data != undefined) {
  //     Object.keys(data).map(key => {
  //       data[key]["key"] = key;
  //       test.push(data[key]);
  //     });
  //   }
  //   this.setState({ pq: test, orignialData: test });

  //   searcher = new FuzzySearch(test, ["Title"], {
  //     caseSensitive: false
  //   });
  // };
  // setKeyword(keyword) {
  //   this.setState({ searchKeyword: keyword }, () => {
  //     this.Search(this.state.searchKeyword);
  //   });
  // }
  // Search = keyword => {
  //   if (searcher != null) {
  //     this.setState({ searchKeyword: keyword });
  //     const result = searcher.search(keyword);

  //     if (
  //       this.state.selectedCategory.value != null ||
  //       this.state.selectedInstructor.value != null
  //     ) {
  //       var newRes = [];
  //       for (var t = 0; t < result.length; t++) {
  //         if (
  //           this.state.selectedInstructor.value != null &&
  //           this.state.selectedCategory.value == null
  //         ) {
  //           if (result[t]["instructor"] != undefined) {
  //             Object.keys(result[t]["instructor"]).map(key => {
  //               if (this.state.selectedInstructor.value == key) {
  //                 newRes.push(result[t]);
  //               }
  //             });
  //           }
  //         } else if (
  //           this.state.selectedCategory.value != null &&
  //           this.state.selectedInstructor.value == null
  //         ) {
  //           if (result[t]["categories"] != undefined) {
  //             if (
  //               result[t]["categories"][this.state.selectedCategory.value] ==
  //               true
  //             ) {
  //               newRes.push(result[t]);
  //             }
  //           }
  //         } else {
  //           if (result[t]["instructor"] != undefined) {
  //             Object.keys(result[t]["instructor"]).map(key => {
  //               if (
  //                 this.state.selectedInstructor.value == key &&
  //                 result[t]["categories"][this.state.selectedCategory.value] ==
  //                   true
  //               ) {
  //                 newRes.push(result[t]);
  //               }
  //             });
  //           }
  //         }
  //       }
  //       if (this.state.selectedDate.value == "rto") {
  //         var test = arraySort(newRes, "dateUpdated", { reverse: true });
  //       } else {
  //         var test = arraySort(newRes, "dateUpdated");
  //       }
  //       this.setState({ pq: newRes });
  //     } else {
  //       if (this.state.selectedDate.value == "rto") {
  //         var test = arraySort(result, "dateUpdated", { reverse: true });
  //       } else {
  //         var test = arraySort(result, "dateUpdated");
  //       }
  //       this.setState({ pq: result });
  //     }
  //   }
  // };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <div className="col-md-12 mtb-25">
          <div className="row lrm-0">
            <div className="col-md-9 lrp-0">
              <h4 className="regular_font fs-26 bm-0">
                {this.props.courseType == 0
                  ? "PEC Courses"
                  : this.props.courseType == 1
                  ? "PEC Training"
                  : "Webinars"}{" "}
              </h4>
            </div>
            {this.props.permissions["add"] ? (
              <div className="col-md-3 lrp-0">
                <Link
                  to={{
                    pathname: this.state.editURL,
                    state: {
                      type: 0,
                      courseType: parseInt(this.props.courseType),
                      permissions: this.props.permissions
                    }
                  }}
                >
                  <button className="btn admin_btn white w-150p float-right bold">
                    {" "}
                    + Add New
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6 ">
              <label className="bm-0">Search</label>
              <div className="input-group md-form form-sm form-2 mtb-10">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.searchKeyword}
                  placeholder="Search"
                  aria-label="Text input with dropdown button"
                  onChange={event => this.setKeyword(event.target.value)}
                />
              </div>
            </div>

            <div className="col-md-2 ">
              <label className="bm-0">Category</label>
              <Select
                className=" mtb-10"
                options={this.state.categories_options}
                // value={this.state.selectedCategory}
                // onChange={this.filterCategory}
              />
            </div>
            <div className="col-md-2">
              <label className="bm-0">Instructor</label>
              <Select
                className="mtb-10"
                options={this.state.ioptions}
                value={this.state.selectedInstructor}
                onChange={this.filterInstructor}
                placeholder={"Instructor"}
              />
            </div>
            <div className="col-md-2">
              <label className="bm-0">Date Sorting</label>
              <Select
                className="mtb-10"
                options={this.state.optionsDate}
                value={this.state.selectedDate}
                onChange={this.filterDate}
              />
            </div>
          </div>
        </div>
        <hr></hr>
        {this.state.pq == null || this.state.pq.length == 0 ? (
          <div className="col-md-12">
            <b>No Results Found</b>
          </div>
        ) : (
          Object.keys(this.state.pq).map((key, idx) => (
            <div className="d-flex justify-content-center lrp-15" key={key}>
              <div className="card bm-20 w-100 box_shadow-listing">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 lrp-0">
                      <img
                         src={require('../../assets/image/cpd/c1.png')}
                        alt="Practise Q"
                        className="lrtbb-5 course-listing-image"
                      />
                    </div>
                    <div className="col-md-7 center-card-listing mtb-15 ">
                      <div className="row lrm-0">
                        <div className="col lrp-0">
                          <p
                            className="text-darkgrey fs-13 bm-0"
                            style={{ marginTop: "10px", marginBottom: "5px" }}
                          >
                            Course Title
                          </p>
                          <div className="row p-inherit lrm-0">
                            <h6 className="co_black fs-24">
                              {/* {this.state.pq[key].Title.toUpperCase()}{" "} */}
                              PEC Courses List
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-3 text-right">
                          <p className="text-darkgrey fs-13">
                            <span className="fs-10">Last Updated</span>
                            <br />
                            {/* {this.state.pq[key].lastUpdated.split("T")[0]} */}
                           01/16/2020
                          </p>
                        </div>
                      </div>
                      <div className="row lrm-0">
                        <div className="col-md-8 lrp-0">
                          <p className="text-darkgrey fs-11">
                            Category : &nbsp;
                            <b>
                              {/* {this.state.pq[key].categories == null
                                ? "None"
                                : Object.keys(
                                    this.state.pq[key].categories
                                  ).map(key => key + " ")} */}
                                   PEC Courses
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="row admin-course-priceDiv lrm-0 ">
                        <div
                          className="col-md-6 lrp-0"
                          style={{ paddingTop: "20px" }}
                        >
                          <p className="bm-0">
                            <b className="fs-20">
                              {/* {this.state.pq[key].Enrolled} */}
                            </b>
                            <span className="">
                            <span className="bold fs-24"> 40</span> Enrollments
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 text-right">
                          <div className="col-md-12">
                            <p className="text-darkgrey mb-0_2">Price</p>
                            <h4 className="bm-0 bold">
                              {/* ${this.state.pq[key].pricing.basePlan.price} */}
                              $102.00
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 listing-right-menu bl-grey lrp-0">
                      <div className="bb-grey p-10 row lrm-0 lm-1 ">
                        <div className="col-md-6 lrp-0 text-center">
                          Visibility{" "}
                        </div>
                        <div className="col-md-6">
                          {this.props.permissions["update"] ? (
                            <ToggleButton
                              inactiveLabel={""}
                              activeLabel={""}
                              colors={{
                                activeThumb: {
                                  base: "rgba(32, 168, 76, 0.57)"
                                },
                                inactiveThumb: {
                                  base: "#20A84C"
                                },
                                active: {
                                  base: "rgba(32, 168, 76, 0.57)",
                                  hover: "rgba(32, 168, 76, 0.57)"
                                },
                                inactive: {
                                  base: "rgba(32, 168, 76, 0.57)",
                                  hover: "rgba(32, 168, 76, 0.57)"
                                }
                              }}
                              trackStyle={{
                                height: "15px",
                                borderRadius: "10px"
                              }}
                              thumbStyle={{
                                height: "20px",
                                width: "20px"
                              }}
                              // thumbAnimateRange={[-10, 36]}
                              //thumbIcon={<ThumbIcon/>}
                              value={this.state.pq[key].isShown}
                              // onToggle={() =>
                              //   this.toggleSwitch(
                              //     key,
                              //     this.state.pq[key]["key"],
                              //     this.state.pq[key].isShown,
                              //     this.state.pq[key].Title
                              //   )
                              // }
                            />
                          ) : (
                            <ToggleButton
                              inactiveLabel={""}
                              activeLabel={""}
                              colors={{
                                activeThumb: {
                                  base: "rgba(32, 168, 76, 0.57)"
                                },
                                inactiveThumb: {
                                  base: "#20A84C"
                                },
                                active: {
                                  base: "rgba(32, 168, 76, 0.57)",
                                  hover: "rgba(32, 168, 76, 0.57)"
                                },
                                inactive: {
                                  base: "rgba(32, 168, 76, 0.57)",
                                  hover: "rgba(32, 168, 76, 0.57)"
                                }
                              }}
                              // trackStyle={styles.trackStyle}
                              // thumbStyle={styles.thumbStyle}
                              thumbAnimateRange={[-10, 36]}
                              // thumbIcon={<ThumbIcon />}
                              value={this.state.pq[key].isShown}
                            />
                          )}
                        </div>
                      </div>
                      {this.props.permissions["update"] ? (
                        <div className="bb-grey ptb-10 pl-15 pointer lm-1 ">
                          <Link
                            className="noTextDecor"
                            to={{
                              pathname:
                              //  this.state.editURL,
                              "",
                              state: {
                                key: this.state.pq[key]["key"],
                                courseType: this.state.courseType,
                                permissions: this.props.permissions
                              }
                            }}
                          >
                          <i className="fas fa-edit co_admin"></i>
                            &nbsp; &nbsp;
                            <span className="clr-black">Edit</span>
                          </Link>
                        </div>
                      ) : (
                        <div className="bb-grey ptb-10 pl-15 disabled lm-1 ">
                           <i className="fas fa-edit co_admin"></i>
                          &nbsp; &nbsp; <span className="">Edit</span>
                        </div>
                      )}
                      {this.props.permissions["delete"] ? (
                        <div
                          className="bb-grey ptb-10 pl-15  pointer lm-1 "
                          // onClick={() =>
                          //   this.deleteItem(
                          //     this.state.pq[key]["key"],
                          //     this.state.pq[key].Title,
                          //     idx
                          //   )
                          // }
                        >
                          <i
                            className="fa fa-trash co_admin"
                            aria-hidden="true"
                          />
                          &nbsp; &nbsp;<span>Delete</span>
                        </div>
                      ) : (
                        <div className="bb-grey ptb-10 pl-15  disabled lm-1 ">
                          <i
                            className="fa fa-trash co_admin"
                            aria-hidden="true"
                          />
                          &nbsp; &nbsp; Delete
                        </div>
                      )}
                      <div className="bb-grey ptb-10 pl-15  pointer lm-1 ">
                        <Link
                          className="noTextDecor"
                          to={{
                            pathname:
                              // "/viewdetail/" + this.state.pq[key]["key"],
                              "",
                            state: { key: this.state.pq[key]["key"] }
                          }}
                        >
                          <i
                            className="fa fa-eye co_admin"
                            aria-hidden="true"
                          />
                          &nbsp; &nbsp;{" "}
                          <span className="clr-black">Preview</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          ))
        )}
     

        {/* <Loader showLoader={this.state.showLoader} /> */}
      </React.Fragment>
    );
  }
}

export default AdminCourseListing;
