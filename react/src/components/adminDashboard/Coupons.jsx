import React, { Component } from "react";
// import { db } from "../firebase/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../loader";
import Unauthorized from "../Unauthorized";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import Select from "react-select";
// import $ from "jquery";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import WebNotif from "../WebNotif";

var couponTable;

// import Datetime from "./react-datetime";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();
class Coupon extends Component {
  state = {
    destroyTable: true,
    couponData: {},
    courseData: null,
    name: "",
    code: "",
    discount: "",
    APU: "",
    GA: "",
    TAD: 0,
    options: [
      { value: 1, label: "Practice Questions" },
      { value: 2, label: "Mock Exam" },
      { value: 3, label: "Course" },
      { value: 4, label: "Universal" }
    ],
    selectedOption: { value: 1, label: "Practice Questions" },
    coptions: [
      { value: 1, label: "Practice Questions" },
      { value: 2, label: "Mock Exam" },
      { value: 3, label: "Course" }
    ],
    cselectedOption: null,
    startDate: "",
    endDate: "",
    selectedOptionDiscount: { value: 1, label: "Amount" },
    discountOption: [
      { value: 1, label: "Amount" },
      { value: 2, label: "Percentage" }
    ],
    isEdit: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref("coupon")
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({
      //         couponData: snapshot.val(),
      //         showLoader: false
      //       });
      //     }
      //   });
      // var coptions = [];
      // db.ref("courses")
      //   .orderByChild("type")
      //   .equalTo(1)
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({ courseData: snapshot.val() });
      //       Object.keys(snapshot.val()).map(key => {
      //         coptions.push({ value: key, label: snapshot.val()[key].Title });
      //       });
      //       this.setState({ coptions });
      //     }
      //   });
    }
  }
  componentDidUpdate() {
    if (this.state.destroyTable) {
      couponTable = window.$("#admin-coupons-table").DataTable({
        pageLength: 10,
        columnDefs: [
          { orderable: true, targets: [0, 4, 5, 6] },
          { orderable: false, targets: "_all" }
        ]
      });
      this.setState({ destroyTable: false });
    }
  }

  chandleChange = cselectedOption => {
    this.setState({ cselectedOption });
  };
  // handleChange = selectedOption => {
  //   this.setState({ selectedOption });
  //   var val_type = parseInt(selectedOption.value);

  //   var coptions = [];
  //   db.ref("courses")
  //     .orderByChild("type")
  //     .equalTo(val_type)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         Object.keys(snapshot.val()).map(key => {
  //           coptions.push({ value: key, label: snapshot.val()[key].Title });
  //         });
  //         this.setState({ coptions });
  //       }
  //     });
  // };
  handleChangeDiscount = selectedOptionDiscount => {
    this.setState({ selectedOptionDiscount });
  };
  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  handleChangeEnd = endDate => {
    this.setState({ endDate: endDate });
  };
  validateForm = data => {
    var obj = new WebNotif();
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == null || data[i].value == "") {
        obj.createNotification("error", data[i].slug + " is required");
        return false;
        break;
      }
    }
    return true;
  };
  // addCoupon = () => {
  //   if (this.state.isEdit == false) {
  //     this.setState({ newKey: db.ref("coupon").push().key }, () => {
  //       var couponData = { ...this.state.couponData };

  //       if (this.state.selectedOption.value == 4) {
  //         db.ref("coupon/" + this.state.newKey)
  //           .set({
  //             // name: this.state.planName,
  //             code: this.state.code,
  //             name: this.state.name,
  //             discount: this.state.discount,
  //             type: this.state.selectedOption.value,
  //             discountType: this.state.selectedOptionDiscount.value,
  //             startDate: new Date(this.state.startDate).toISOString(),
  //             endDate: new Date(this.state.endDate).toISOString(),
  //             attemptUser: this.state.APU,
  //             globalAttempt: this.state.GA,
  //             totalAttemptDone: this.state.TAD
  //           })
  //           .then(e => {
  //             couponData[this.state.newKey] = {
  //               code: this.state.code,
  //               name: this.state.name,
  //               discount: this.state.discount,
  //               type: this.state.selectedOption.value,
  //               discountType: this.state.selectedOptionDiscount.value,
  //               startDate: new Date(this.state.startDate)
  //                 .toISOString()
  //                 .split("T")[0],
  //               endDate: new Date(this.state.endDate)
  //                 .toISOString()
  //                 .split("T")[0],
  //               attemptUser: this.state.APU,
  //               globalAttempt: this.state.GA,
  //               totalAttemptDone: this.state.TAD
  //             };
  //             this.setState((prevState, props) => {
  //               couponTable.destroy();
  //               return { couponData, destroyTable: true };
  //             });
  //           });
  //       } else {
  //         db.ref("coupon/" + this.state.newKey)
  //           .set({
  //             // name: this.state.planName,
  //             code: this.state.code,
  //             name: this.state.name,
  //             discount: this.state.discount,
  //             type: this.state.selectedOption.value,
  //             discountType: this.state.selectedOptionDiscount.value,
  //             course: this.state.cselectedOption.value,
  //             startDate: new Date(this.state.startDate).toISOString(),
  //             endDate: new Date(this.state.endDate).toISOString(),
  //             attemptUser: this.state.APU,
  //             globalAttempt: this.state.GA,
  //             totalAttemptDone: this.state.TAD
  //           })
  //           .then(e => {
  //             couponData[this.state.newKey] = {
  //               code: this.state.code,
  //               name: this.state.name,
  //               discount: this.state.discount,
  //               type: this.state.selectedOption.value,
  //               course: this.state.cselectedOption.value,
  //               discountType: this.state.selectedOptionDiscount.value,
  //               startDate: new Date(this.state.startDate)
  //                 .toISOString()
  //                 .split("T")[0],
  //               endDate: new Date(this.state.endDate)
  //                 .toISOString()
  //                 .split("T")[0],
  //               attemptUser: this.state.APU,
  //               globalAttempt: this.state.GA,
  //               totalAttemptDone: this.state.TAD
  //             };
  //             this.setState((prevState, props) => {
  //               couponTable.destroy();
  //               return { couponData, destroyTable: true };
  //             });
  //           });
  //       }
  //       if (this.state.isEdit == false) {
  //         this.setState({ couponData: couponData, isEdit: false });
  //         obj.createNotification("success", "Coupon Added");
  //       }
  //       if (this.state.isEdit == true) {
  //         this.setState({ couponData: couponData, isEdit: false });
  //         obj.createNotification("success", "Coupon Updated");
  //       }
  //     });
  //   }
  // };
  // deleteCoupon = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           var couponData = { ...this.state.couponData };
  //           delete couponData[key];
  //           this.setState({ couponData });
  //           db.ref("coupon/" + key).set(null);
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Coupon Deleted ");
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // editCoupon = key => {
  //   var info = this.state.couponData[key];
  //   var typeName =
  //     info.type == 1
  //       ? "Practice Questions"
  //       : info.type == 2
  //       ? "Mock Exam"
  //       : info.type == 3
  //       ? "Course"
  //       : "Universal";
  //   var discount_type =
  //     info.discountType == 1
  //       ? { value: 1, label: "Amount" }
  //       : { value: 2, label: "Discount" };
  //   if (info.type != 4) {
  //     var courseName = this.state.courseData[info.course].Title;
  //     this.setState({
  //       course: info.course,
  //       cselectedOption: { value: info.course, label: courseName }
  //     });
  //   }
  //   this.setState({
  //     code: info.code,
  //     name: info.name,
  //     discount: info.discount,
  //     discountType: discount_type,
  //     selectedOption: { value: info.type, label: typeName },
  //     //course: info.course,
  //     //cselectedOption: { value: info.course, label: courseName },
  //     startDate: info.startDate,
  //     endDate: info.endDate,
  //     APU: info.attemptUser,
  //     GA: info.globalAttempt,
  //     TAD: info.totalAttemptDone
  //   });

  //   this.setState({ newKey: key, isEdit: true }, () => {});
  // };

  couponCourseFind = couponKey => {
    if (this.state.couponData[couponKey].course) {
      let couponCourse = this.state.coptions.find(
        course => course.value === this.state.couponData[couponKey].course
      );
      if (couponCourse) {
        return couponCourse.label;
      } else {
        return "Course Removed";
      }
    } else {
      return "Universal";
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <AdminNav />
            <WebNotif />
            <div className="col-md-12">
              <div className="row">
                <AdminSidebar />
                <br />
                <br />
                <div className="col lrp-50 ptb-30 ">
                  {this.props.permissions["add"] || this.state.isEdit ? (
                    <div className="admin-card card">
                      <div className="card-body">
                        <div className=" col-md-12">
                          <div className="row">
                            <div className="col-md-8">
                              <h5 className="card-title regular_font">
                                Coupon Details
                              </h5>
                            </div>
                            <div className="col-md-4 lrp-0">
                              <button
                                className="btn btn-green white  fs-12 "
                                // onClick={this.addCoupon}
                              >
                                Save
                              </button>{" "}
                            </div>
                          </div>
                        </div>
                        <hr className="mt-0" />
                        <div className="d-flex justify-content-center">
                          <div className="col-md-8">
                            <div className="form-group">
                              <label>
                                {" "}
                                Coupon Name <span className="clr-red">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control admin-form-control"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("name", event.target.value)
                                  )
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                Coupon Code <span className="clr-red">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control admin-form-control"
                                placeholder="Code"
                                value={this.state.code}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("code", event.target.value)
                                  )
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                Discount Type <span className="clr-red">*</span>
                              </label>
                              <Select
                                value={this.state.selectedOptionDiscount}
                                onChange={this.handleChangeDiscount}
                                options={this.state.discountOption}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                Discount <span className="clr-red">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control admin-form-control"
                                placeholder="Discount"
                                value={this.state.discount}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("discount", event.target.value)
                                  )
                                }
                              />
                            </div>

                            <div className="form-group">
                              <label>
                                {" "}
                                Type <span className="clr-red">*</span>
                              </label>
                              <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                              />
                            </div>
                            <div
                              className={
                                this.state.coptions != null &&
                                this.state.selectedOption.value != 4
                                  ? "form-group"
                                  : "hide"
                              }
                            >
                              <label>
                                Name <span className="clr-red">*</span>
                              </label>
                              <Select
                                value={this.state.cselectedOption}
                                onChange={this.chandleChange}
                                options={this.state.coptions}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                Start Date<span className="clr-red">*</span>
                              </label>
                              <br />
                              <DatePicker
                                className="form-control"
                                selected={this.state.startDate}
                                onChange={this.handleChangeStart}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                End Date <span className="clr-red">*</span>
                              </label>
                              <br />

                              <DatePicker
                                className="form-control"
                                selected={this.state.endDate}
                                onChange={this.handleChangeEnd}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                Attempt per user{" "}
                                <span className="clr-red">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control admin-form-control"
                                placeholder="Attempt per user"
                                value={this.state.APU}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("APU", event.target.value)
                                  )
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                {" "}
                                Global Attempt{" "}
                                <span className="clr-red">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control admin-form-control"
                                placeholder="Attempt per user"
                                value={this.state.GA}
                                onChange={event =>
                                  this.setState(
                                    byPropKey("GA", event.target.value)
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="admin-card card">
                    <div className="card-body">
                      <table id="admin-coupons-table" className="table">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Discount Type</th>
                            <th>Discount</th>
                            <th>Code type</th>
                            <th>Course</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>User Attempts</th>
                            <th>Global Attempts</th>
                            <th>Total Attempts Done</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        {/* <tbody>
                          {this.state.couponData == null
                            ? " Currently there is no coupon"
                            : Object.keys(this.state.couponData).map(
                                (key, index) => (
                                  <tr key={key}>
                                    <td>
                                      {this.state.couponData[key].code != null
                                        ? this.state.couponData[key].code
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key]
                                        .discountType != null
                                        ? this.state.couponData[key]
                                            .discountType == 1
                                          ? "Amount"
                                          : "Percentage"
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key].discount !=
                                      null
                                        ? this.state.couponData[key].discount
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key].type != null
                                        ? this.state.couponData[key].type == 1
                                          ? "Practice Questions"
                                          : this.state.couponData[key].type == 2
                                          ? "Mock Exam"
                                          : this.state.couponData[key].type == 3
                                          ? "Courses"
                                          : "Universal"
                                        : "-"}
                                    </td>
                                    <td>{this.couponCourseFind(key)}</td>
                                    <td>
                                      {this.state.couponData[key].startDate !=
                                      null
                                        ? this.state.couponData[
                                            key
                                          ].startDate.split("T")[0]
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key].endDate !=
                                      null
                                        ? this.state.couponData[
                                            key
                                          ].endDate.split("T")[0]
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key].attemptUser !=
                                      null
                                        ? this.state.couponData[key].attemptUser
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key]
                                        .globalAttempt != null
                                        ? this.state.couponData[key]
                                            .globalAttempt
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.state.couponData[key]
                                        .totalAttemptDone != null
                                        ? this.state.couponData[key]
                                            .totalAttemptDone
                                        : "-"}
                                    </td>
                                    <td>
                                      {this.props.permissions["update"] ? (
                                        <i
                                          className="fa fa-pencil-square-o clr-darkpurple pointer"
                                          aria-hidden="true"
                                          onClick={() => this.editCoupon(key)}
                                        />
                                      ) : (
                                        <i className="fa fa-pencil-square-o clr-darkpurple pointer disabled" />
                                      )}
                                    </td>
                                    <td>
                                      {this.props.permissions["delete"] ? (
                                        <i
                                          className="fa fa-trash clr-darkpurple pointer"
                                          aria-hidden="true"
                                          onClick={() => this.deleteCoupon(key)}
                                        />
                                      ) : (
                                        <i className="fa fa-trash clr-darkpurple pointer disabled" />
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                        </tbody>
                     */}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Coupon;
