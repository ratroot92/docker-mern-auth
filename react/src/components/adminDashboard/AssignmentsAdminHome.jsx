import React, { Component } from "react";
// import { db } from "../firebase/firebase";

import Unauthorized from "../Unauthorized";
import Loader from "../loader";
import AdminSidebar from "./AdminSidebar";
import RoleOptions from "../RoleOptions";
import AdminNav from "./AdminNav";
import WebNotif from "../WebNotif";
import Select from "react-select";

class AssignmentsAdminHome extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: null,
    selectedCategory: [{ label: "All", value: null }]
  };
  componentDidMount() {
    // db.ref("AssignmentSubmission")
    //   .once("value")
    //   .then(snapshot => {
    //     this.setState({ data: snapshot.val() });
    //   });
  }
  setScore = (courseId, userId, assignId, score) => {
    var data = { ...this.state.data };
    data[courseId][userId][assignId]["score"] = score;
    this.setState({ data });
  };
  RemarkAssignment = (courseId, userId, assigneId) => {
    var data = { ...this.state.data };
    data[courseId][userId][assigneId]["status"] = 0;
    this.setState({ data });
  };
  // markAssignment = (courseId, userId, assigneId) => {
  //   var data = { ...this.state.data };
  //   data[courseId][userId][assigneId]["status"] = 1;
  //   this.setState({ data });
  //   db.ref(
  //     "AssignmentSubmission/" +
  //       courseId +
  //       "/" +
  //       userId +
  //       "/" +
  //       assigneId +
  //       "/status"
  //   ).set(1);
  //   db.ref(
  //     "AssignmentSubmission/" +
  //       courseId +
  //       "/" +
  //       userId +
  //       "/" +
  //       assigneId +
  //       "/score"
  //   ).set(this.state.data[courseId][userId][assigneId].score);
  // };
  render() {
    return (
      <React.Fragment>
        <AdminNav />
        <WebNotif />
        <div className="col-md-12">
          <div className="row">
            <AdminSidebar />
            <br />
            <br />
            <div className="col">
              <div className="admin-card card">
                <div className="card-body">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-2 ">
                        <label>Category</label>
                        <Select
                          className=" mtb-10"
                          options={this.state.categories_options}
                          value={this.state.selectedCategory}
                          onChange={this.filterCategory}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Instructor</label>
                        <Select
                          className="mtb-10"
                          options={this.state.ioptions}
                          value={this.state.selectedInstructor}
                          onChange={this.filterInstructor}
                          placeholder={"Instructor"}
                        />
                      </div>
                      <div className="col-md-2">
                        <label>Status</label>
                        <Select
                          className="mtb-10"
                          options={this.state.ioptions}
                          value={this.state.selectedInstructor}
                          onChange={this.filterInstructor}
                          placeholder={"Instructor"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-12">
                    {this.state.data != null ? (
                      <table className="table table-bordered table-hover ">
                        <thead>
                          <tr>
                            <th>Student Name</th>

                            <th>Course Name </th>

                            <th>Submissions</th>
                            <th>Score </th>
                            <th>Status </th>
                            <th>Actions </th>
                          </tr>
                        </thead>
                        {/* <tbody>
                          {Object.keys(this.state.data).map(courseId =>
                            Object.keys(this.state.data[courseId]).map(userId =>
                              Object.keys(
                                this.state.data[courseId][userId]
                              ).map(assigneId => (
                                <tr>
                                  <td>
                                    {
                                      this.state.data[courseId][userId][
                                        assigneId
                                      ].submittedBy
                                    }
                                  </td>
                                  <td>
                                    {
                                      this.state.data[courseId][userId][
                                        assigneId
                                      ].courseTitle
                                    }
                                  </td>
                                  <td>
                                    {Object.keys(
                                      this.state.data[courseId][userId][
                                        assigneId
                                      ].submission
                                    ).map(id => (
                                      <React.Fragment>
                                        <div>
                                          {
                                            this.state.data[courseId][userId][
                                              assigneId
                                            ].submission[id].fileName
                                          }
                                        </div>
                                      </React.Fragment>
                                    ))}
                                  </td>

                                  <td>
                                    {
                                      <React.Fragment>
                                        <div>
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={
                                              this.state.data[courseId][userId][
                                                assigneId
                                              ].score != null
                                                ? this.state.data[courseId][
                                                    userId
                                                  ][assigneId].score
                                                : null
                                            }
                                            disabled={
                                              this.state.data[courseId][userId][
                                                assigneId
                                              ].status == 1
                                                ? true
                                                : false
                                            }
                                            onChange={event =>
                                              this.setScore(
                                                courseId,
                                                userId,
                                                assigneId,
                                                event.target.value
                                              )
                                            }
                                          />{" "}
                                        </div>
                                      </React.Fragment>
                                    }
                                  </td>
                                  <td>
                                    {this.state.data[courseId][userId][
                                      assigneId
                                    ].status == 1
                                      ? "Marked"
                                      : "Unmarked"}
                                  </td>
                                  <td>
                                    {" "}
                                    {this.state.data[courseId][userId][
                                      assigneId
                                    ].status == 0 ? (
                                      <div className="pointer">
                                        <span
                                          onClick={() =>
                                            this.markAssignment(
                                              courseId,
                                              userId,
                                              assigneId
                                            )
                                          }
                                        >
                                          Mark
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {this.state.data[courseId][userId][
                                      assigneId
                                    ].status == 1 ? (
                                      <div className="pointer">
                                        <span
                                          onClick={() =>
                                            this.RemarkAssignment(
                                              courseId,
                                              userId,
                                              assigneId
                                            )
                                          }
                                        >
                                          Remark
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </tr>
                              ))
                            )
                          )}
                        </tbody>
                     */}
                      </table>
                    ) : (
                      "No data found"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AssignmentsAdminHome;
