import React, { Component } from "react";
import { db } from "../firebase/firebase";
import MultiFileUpload from "./MultiFileUpload";

class AssignmentAttempt extends Component {
  constructor(props) {
    super(props);
  }
  state = { assignment: null, courseTitle: "MAN", userName: null };
  componentDidMount() {
    this.setState({ assignment: this.props.assignment });
    db.ref("courses/" + this.props.keyProp + "/Title")
      .once("value")
      .then(cTitle => {
        this.setState({ courseTitle: cTitle.val() });
      });
    db.ref("userInfo/" + this.props.userId + "/name")
      .once("value")
      .then(userName => {
        this.setState({ userName: userName.val() });
      });
  }
  submission = [];
  onUpload = data => {
    this.submission.push({
      fileName: data.fileName,
      url: data.url,
      score: "-",
      status: "unmarked"
    });
    if (data.total == data.totalUploaded) {
      db.ref(
        "AssignmentSubmission/" +
          this.props.keyProp +
          "/" +
          this.props.userId +
          "/section" +
          this.props.secId +
          "-subSec" +
          this.props.subSecId
      ).set({
        userId: this.props.userId,
        courseId: this.props.keyProp,
        submission: this.submission,
        courseTitle: this.state.courseTitle,
        status: 0,
        dateCreated: new Date().toUTCString(),
        section: this.props.secId,
        subSec: this.props.subSecId,
        submittedBy: this.state.userName
      });
      this.submission = [];
    }
  };
  fetchAssignments = () => {};
  render() {
    return (
      <React.Fragment>
        {this.state.assignment != null ? (
          <div className="col-md-12 lrp-15 ">
            <a href={this.state.assignment.url} download target="_blank">
              Download assignment sad
            </a>
            &nbsp;&nbsp;&nbsp;
            <label>
              {" "}
              <MultiFileUpload
                storageRef={
                  "Assignments/" + this.props.userId + this.props.keyProp
                }
                onUpload={this.onUpload}
                // dbRef={
                //   "courseFileListing/" + this.props.userId + this.props.keyProp
                // }
                keyProp={this.props.keyProp}
                // updateListing={this.updateListing}
              />
            </label>{" "}
            &nbsp;&nbsp;&nbsp;
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AssignmentAttempt;
