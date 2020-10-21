import React, { Component } from "react";
// import Select from "react-select";
import WebNotif from "../WebNotif";
import Loader from "../loader";
// import { db } from "../firebase/firebase";
import Modal from "react-responsive-modal";
import CreatableSelect from "react-select/lib/Creatable";
import Unauthorized from "../Unauthorized";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var userCourse = null;

var obj = new WebNotif();
class ManageUsersCourse extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showLoader: true,
    userData: [],

    courseType: [
      { value: "0", label: "Practice Question" },
      { value: "1", label: "Mock Exam" },
      { value: "2", label: "Course" }
    ],
    courseStatus: [
      { value: "0", label: "Active" },
      { value: "1", label: "Suspend" },
      { value: "2", label: "Complete" }
    ],
    selectedRole: { value: "3", label: "Student" },
    selectedCourseType: 0
  };

  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref(`courses`)
      //   .once("value")
      //   .then(snapshot => {
      //     this.setState({ allCourse: snapshot.val() });
      //     var course = [];
      //     var pq = [];
      //     var me = [];
      //     //  Object.keys(this.state.courses).map(key => {
      //     snapshot.forEach(function(courseData) {
      //       if (courseData.val().type == 2) {
      //         var new_option = {
      //           value: courseData.key,
      //           label: courseData.val().Title
      //         };
      //         course.push(new_option);
      //       }
      //       if (courseData.val().type == 1) {
      //         var new_option = {
      //           value: courseData.key,
      //           label: courseData.val().Title
      //         };
      //         me.push(new_option);
      //       }
      //       if (courseData.val().type == 0) {
      //         var new_option = {
      //           value: courseData.key,
      //           label: courseData.val().Title
      //         };
      //         pq.push(new_option);
      //       }
      //     });
      //     this.setState({ course, pq, me });
      //     // });
      //   });
      // db.ref(`userInfo`)
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({ userData: snapshot.val() });
      //       db.ref("userProducts")
      //         .once("value")
      //         .then(snapshot1 => {
      //           this.setState({ userCourse: snapshot1.val() });
      //           userCourse = snapshot1.val();
      //           var userData = { ...this.state.userData };

      //           snapshot.forEach(user => {
      //             if (user.val() != null) {
      //               if (
      //                 userCourse != null &&
      //                 userCourse[user.key] != undefined
      //               ) {
      //                 userData[user.key]["courseList"] = userCourse[user.key];
      //               } else {
      //                 userData[user.key]["courseList"] = {};
      //               }
      //             }
      //           });
      //           this.setState({ userData });
      //           this.setState({ render: true });
      //           this.setState({ showLoader: false });
      //         });
      //     }
      //   });
    }
  }
  // refreshData = () => {
  //   this.setState({ render: false, showLoader: true });
  //   db.ref(`courses`)
  //     .once("value")
  //     .then(snapshot => {
  //       this.setState({ allCourse: snapshot.val() });
  //       var course = [];
  //       var pq = [];
  //       var me = [];
  //       //  Object.keys(this.state.courses).map(key => {
  //       snapshot.forEach(function(courseData) {
  //         if (courseData.val().type == 2) {
  //           var new_option = {
  //             value: courseData.key,
  //             label: courseData.val().Title
  //           };
  //           course.push(new_option);
  //         }
  //         if (courseData.val().type == 1) {
  //           var new_option = {
  //             value: courseData.key,
  //             label: courseData.val().Title
  //           };
  //           me.push(new_option);
  //         }
  //         if (courseData.val().type == 0) {
  //           var new_option = {
  //             value: courseData.key,
  //             label: courseData.val().Title
  //           };
  //           pq.push(new_option);
  //         }
  //       });
  //       this.setState({ course, pq, me });
  //       // });
  //     });
  //   db.ref(`userInfo`)
  //     .once("value")
  //     .then(snapshot => {
  //       {
  //         this.setState({ userData: snapshot.val() });
  //         db.ref("userProducts")
  //           .once("value")
  //           .then(snapshot1 => {
  //             this.setState({ userCourse: snapshot1.val() });
  //             userCourse = snapshot1.val();
  //             var userData = { ...this.state.userData };

  //             snapshot.forEach(user => {
  //               if (userCourse[user.key] != undefined) {
  //                 userData[user.key]["courseList"] = userCourse[user.key];
  //               } else {
  //                 userData[user.key]["courseList"] = {};
  //               }
  //             });
  //             this.setState({ userData });
  //             this.setState({ render: true });
  //             this.setState({ showLoader: false });
  //           });
  //       }
  //     });
  // };
  handleChange = selectedRole => {
    this.setState({ newCourse: selectedRole });
  };
  handleCourseType = selectedRole => {
    this.setState({ selectedCourseType: selectedRole.value });
  };
  handleCourseStatus = selectedRole => {
    this.setState({ selectedCourseStatus: selectedRole });
  };
  deleteUser = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var userData = { ...this.state.userData };
            delete userData[key];
            this.setState({ userData });
            obj.createNotification("success", "User deleted");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
    this.refreshData();
    //db.ref(`userInfo/`+ key).set(null);
  };
  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  handleChangeEnd = endDate => {
    this.setState({ endDate: endDate });
  };

  manageUser = (key, name) => {
    this.setState({
      ModalOpen: true,
      selectedUser: name
    });
    this.fetchUserCourse(key);
  };
  onOpenModal = () => {
    this.setState({ ModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
  };
  onCloseModal1 = () => {
    this.setState({ ModalOpen1: false });
  };
  fetchUserCourse = userid => {
    // db.ref("userProducts")
    //   .once("value")
    //   .then(snapshot => {
    //     this.setState({ userCourse: snapshot.val() });
    //   });
  };
  manageCourse = (userid, courseid, title, name, status) => {
    this.setState({
      ModalOpen: true,
      selectedCourseName: title,
      selectedCourseId: courseid,
      selectedUser: name,
      selectedUserId: userid,
      selectedCourseStatus: status
    });
    if (status == -1) {
      this.setState({ selectedCourseStatus: { value: "1", label: "Suspend" } });
    } else if (status == null) {
      this.setState({ selectedCourseStatus: { value: "0", label: "Active" } });
    }
    // db.ref("userProducts/" + userid + "/" + courseid)
    //   .once("value")
    //   .then(snapshot => {
    //     this.setState({ selectedCourseEdit: snapshot.val() }, () => {});
    //   });
  };
  // addToCourse = () => {
  //   var error = false;

  //   var newCourseData = {};
  //   if (this.state.newCourse != null) {
  //     Object.keys(this.state.newCourse).map(c => {
  //       var key = this.state.newCourse[c].value;
  //       if (this.state.allCourse[key] != undefined) {
  //         newCourseData[key] = this.state.allCourse[key];
  //         newCourseData[key]["title"] = this.state.allCourse[key]["Title"];
  //         newCourseData[key]["courseId"] = key;
  //         db.ref(`roles/${this.state.selectedUserId}/role/MC/${key}`).set(true); // Updating MyCourses
  //         db.ref("userProducts/" + this.state.selectedUserId + "/" + key)
  //           .set(newCourseData[key])
  //           .then(e => {
  //             obj.createNotification(
  //               "success",
  //               this.state.newCourse[c].label + " added successfully"
  //             );
  //             this.refreshData();
  //             this.setState({ ModalOpen1: false });
  //           });
  //       }
  //     });
  //   }
  // };

  addUser = (userid, name) => {
    this.setState({
      ModalOpen1: true,
      selectedUser: name,
      selectedUserId: userid
    });
  };
  // suspendUser = () => {
  //   db.ref(
  //     "userProducts/" +
  //       this.state.selectedUserId +
  //       "/" +
  //       this.state.selectedCourseId +
  //       "/status"
  //   ).set(-1);
  //   var userCourse = { ...this.state.userCourse };
  //   userCourse[this.state.selectedUserId][this.state.selectedCourseId][
  //     "status"
  //   ] = -1;
  //   this.setState({ selectedCourseStatus: { value: "1", label: "Suspend" } });

  //   var userData = { ...this.state.userData };
  //   userData[this.state.selectedUserId]["courseList"][
  //     this.state.selectedCourseId
  //   ].status = -1;
  //   this.setState({ userCourse, userData });
  //   this.setState({ ModalOpen: false });
  // };
  // removeUser = () => {
  //   db.ref(
  //     "userProducts/" +
  //       this.state.selectedUserId +
  //       "/" +
  //       this.state.selectedCourseId
  //   ).set(null);
  //   db.ref(
  //     `roles/${this.state.selectedUserId}/role/MC/${this.state.selectedCourseId}`
  //   ).set(null);
  //   this.refreshData();

  //   this.setState({ ModalOpen: false });
  // };
  // updateStatus = () => {
  //   if (this.state.selectedCourseStatus.value == 1) {
  //     db.ref(
  //       "userProducts/" +
  //         this.state.selectedUserId +
  //         "/" +
  //         this.state.selectedCourseId +
  //         "/status"
  //     ).set(-1);
  //     var userCourse = { ...this.state.userCourse };
  //     userCourse[this.state.selectedUserId][this.state.selectedCourseId][
  //       "status"
  //     ] = -1;
  //     var userData = { ...this.state.userData };
  //     userData[this.state.selectedUserId]["courseList"][
  //       this.state.selectedCourseId
  //     ].status = -1;
  //     this.setState({ userCourse, userData });
  //     this.setState({ selectedCourseStatus: { value: "1", label: "Suspend" } });
  //   } else if (this.state.selectedCourseStatus.value == 0) {
  //     db.ref(
  //       "userProducts/" +
  //         this.state.selectedUserId +
  //         "/" +
  //         this.state.selectedCourseId +
  //         "/status"
  //     ).set(null);
  //     var userCourse = { ...this.state.userCourse };
  //     userCourse[this.state.selectedUserId][this.state.selectedCourseId][
  //       "status"
  //     ] = null;
  //     var userData = { ...this.state.userData };
  //     userData[this.state.selectedUserId]["courseList"][
  //       this.state.selectedCourseId
  //     ].status = null;
  //     this.setState({ userCourse, userData });
  //     this.setState({ selectedCourseStatus: { value: "0", label: "Active" } });
  //   } else if (this.state.selectedCourseStatus.value == 2) {
  //     db.ref(
  //       "userProducts/" +
  //         this.state.selectedUserId +
  //         "/" +
  //         this.state.selectedCourseId +
  //         "/status"
  //     ).set(1);
  //     var userCourse = { ...this.state.userCourse };
  //     userCourse[this.state.selectedUserId][this.state.selectedCourseId][
  //       "status"
  //     ] = 1;
  //     var userData = { ...this.state.userData };
  //     userData[this.state.selectedUserId]["courseList"][
  //       this.state.selectedCourseId
  //     ].status = 1;
  //     this.setState({ userCourse, userData });
  //     this.setState({
  //       selectedCourseStatus: { value: "2", label: "Complete" }
  //     });
  //   }
  // };

  render() {
    const { selectedOption, selectedCourseStatus } = this.state;

    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <AdminNav />
            <WebNotif />
            <Modal
              open={this.state.ModalOpen}
              onClose={this.onCloseModal}
              classNames={""}
              center
            >
              <div className=" modal-content submit-correction-modal ">
                <div className="modal-body zero_padding">
                  {/* start-course-model */}
                  <div>
                    <div className="modal-course-name text-center btn-purple">
                      <h4 className="white">Manage Course </h4>
                      <h5>{this.state.selectedUser}</h5>
                    </div>
                    <div className="container p-coursemodal">
                      <div className="row lrm-0">
                        <div className="col-md-8 float-left">
                          <h5 className="">{this.state.selectedCourseName}</h5>
                        </div>
                        <div className="col-md-4 float-right">
                          {this.props.permissions["update"] ? (
                            <button
                              type="button"
                              className="btn btn-warning"
                              // onClick={this.suspendUser}
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-warning disabled"
                            >
                              Suspend
                            </button>
                          )}
                          &nbsp; &nbsp; &nbsp;
                          {this.props.permissions["delete"] ? (
                            <button
                              type="button"
                              className="btn btn-danger"
                              // onClick={this.removeUser}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger disabled"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Subscription Start Date</label>
                            <br />
                            <DatePicker
                              className="form-control"
                              selected={this.state.startDate}
                              onChange={this.handleChangeStart}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Subscription End Date</label>
                            <br />
                            <DatePicker
                              className="form-control"
                              selected={this.state.endDate}
                              onChange={this.handleChangeEnd}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Pricing Plan</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              value="free"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Status</label>
                            <br />
                            <CreatableSelect
                              value={selectedCourseStatus}
                              onChange={this.handleCourseStatus}
                              options={this.state.courseStatus}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />

                      {/* {!this.state.isSubmitted ? ( */}
                      <div className="d-flex justify-content-center">
                        {this.props.permissions["update"] ? (
                          <button
                            className="btn btn-red btn-width-250 white"
                            onClick={this.updateStatus}
                          >
                            {" "}
                            Save{" "}
                          </button>
                        ) : (
                          <button className="btn btn-red btn-width-250 white disabled">
                            {" "}
                            Save{" "}
                          </button>
                        )}
                      </div>
                      {/* ) : (
                          ""
                        )} o*/}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
              open={this.state.ModalOpen1}
              onClose={this.onCloseModal1}
              classNames={""}
              center
            >
              <div className=" modal-content submit-correction-modal ">
                <div className="modal-body zero_padding">
                  {/* start-course-model */}
                  <div>
                    <div className="modal-course-name text-center btn-purple">
                      <h4 className="white">Add User to Course </h4>
                      <h5>{this.state.selectedUser}</h5>
                    </div>
                    <div className="container p-coursemodal">
                      <div className="col-md-12">
                        <div class="form-group">
                          <label>Course Type</label>
                          <CreatableSelect
                            //  value={selectedOption}
                            onChange={this.handleCourseType}
                            options={this.state.courseType}
                          />
                        </div>
                        <div class="form-group">
                          <label>Course</label>
                          <CreatableSelect
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={
                              this.state.selectedCourseType == 0
                                ? this.state.pq
                                : this.state.selectedCourseType == 1
                                ? this.state.me
                                : this.state.selectedCourseType == 2
                                ? this.state.course
                                : null
                            }
                            isMulti
                          />
                        </div>
                      </div>
                      <hr />

                      {/* {!this.state.isSubmitted ? ( */}
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-red btn-width-250 white"
                          onClick={this.addToCourse}
                        >
                          {" "}
                          Add to course{" "}
                        </button>
                      </div>
                      {/* ) : (
                          ""
                        )} o*/}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            <div className="col-md-12">
              <div className="row">
                <AdminSidebar />
                <br />
                <br />
                <div className="col lrp-50 ptb-30 ">
                  <div className="admin-card card">
                    <div className="card-body">
                      <div className="container">
                        <div className=" col-md-12">
                          <div className="row">
                            <div className="col-md-7">
                              <h5 className="card-title regular_font">
                                Manage User Course
                              </h5>
                            </div>
                        </div>
                        </div>
                        <hr />
                        <div>
                          <table className="table table-hover">
                            <thead className="text-center">
                              <th>Name</th>
                              <th>Email</th>
                              <th>Courses</th>

                              <th>Add Course</th>
                            </thead>
                            {/* <tbody className="text-center">
                              {this.state.userData == null || !this.state.render
                                ? ""
                                : Object.keys(this.state.userData).map(key => (
                                    <tr>
                                      <td>
                                        {this.state.userData[key].name == null
                                          ? "-"
                                          : this.state.userData[key].name}
                                      </td>
                                      <td>
                                        {this.state.userData[key].email == null
                                          ? "-"
                                          : this.state.userData[key].email}
                                      </td>
                                      <td>
                                        {Object.keys(
                                          this.state.userData[key]["courseList"]
                                        ).map(c =>
                                          this.state.userData[key][
                                            "courseList"
                                          ][c].Title == "" ? (
                                            ""
                                          ) : (
                                            <React.Fragment>
                                              <span
                                                className={
                                                  this.state.userData[key][
                                                    "courseList"
                                                  ][c].type == 0
                                                    ? "badge badge-light pointer white pqBadge"
                                                    : this.state.userData[key][
                                                        "courseList"
                                                      ][c].type == 1
                                                    ? "badge badge-light pointer white mockExamBadge"
                                                    : "badge badge-light pointer white courseBadge"
                                                }
                                                onClick={() =>
                                                  this.manageCourse(
                                                    key,
                                                    c,
                                                    this.state.userData[key][
                                                      "courseList"
                                                    ][c].Title,
                                                    this.state.userData[key]
                                                      .name,
                                                    this.state.userData[key][
                                                      "courseList"
                                                    ][c].status
                                                  )
                                                }
                                              >
                                                {
                                                  this.state.userData[key][
                                                    "courseList"
                                                  ][c].Title
                                                }
                                              </span>
                                              &nbsp;&nbsp;
                                            </React.Fragment>
                                          )
                                        )}
                                      </td>
                                      <td>
                                        {this.props.permissions["add"] ? (
                                          <i
                                            className="fa fa-plus clr-darkpurple pointer"
                                            aria-hidden="true"
                                            onClick={() =>
                                              this.addUser(
                                                key,
                                                this.state.userData[key].name
                                              )
                                            }
                                          />
                                        ) : (
                                          <i className="fa fa-plus clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                           */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Loader showLoader={this.state.showLoader} /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ManageUsersCourse;
