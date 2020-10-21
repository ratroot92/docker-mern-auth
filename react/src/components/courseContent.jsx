import React, { Component } from "react";
import "../assets/css/course_content.css";
import { db } from "../firebase/firebase";
import AssignmentAttempt from "./AssignmentAttempt";

class CourseContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    accordView: null,
    keyOffset: "",
    content: null,
    assignments: null,
    mySubmissions: {}
  };
  componentDidMount() {
    if (this.props.keyOffset != undefined && this.props.keyOffset != null) {
      this.setState({ keyOffset: this.props.keyOffset });
    }
    db.ref(`assignments/${this.props.id}`)
      .once("value")
      .then(snapshot => {
        this.setState({ assignments: snapshot.val() });
      });
    db.ref(`AssignmentSubmission/${this.props.id}/${this.props.userId}`)
      .once("value")
      .then(mySubmissions => {
        if (mySubmissions.val() != null) {
          this.setState({ mySubmissions: mySubmissions.val() });
        }
      });

    db.ref(`courseExams/${this.props.id}`)
      .once("value")
      .then(cpsc => {
        if (cpsc.val() != null) {
          this.setState({ content: cpsc.val() });
          if (this.state.content) {
            Object.keys(this.state.content).map(key => {
              if (
                this.state.content[key]["topics"] != undefined &&
                this.state.content[key]["topics"] != null
              ) {
                Object.keys(this.state.content[key]["topics"]).map(key1 => {
                  var accordView = { ...this.state.accordView };

                  accordView[key] = "fa fa-plus ";

                  this.setState({ accordView });
                });
              }
            });
          }
        }
      });
  }
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
    return (
      <div className=" col-md-12 ">
        <br />
        <div className="col-md-12 lrp-0">
          <span className="fs-24 notoFont-normal"> Course content</span>
        </div>
        <br />

        <div className="row">
          <div className="col-sm-12">
            {this.state.content != null
              ? Object.keys(this.state.content).map(key1 => (
                  <div className="accordion-group" key={key1}>
                    <div className="accordion-heading">
                      <a
                        className="accordion-toggle collapsed"
                        data-toggle="collapse"
                        data-parent="toggle"
                        href={"#" + this.state.keyOffset + key1}
                        onClick={() => this.toggleAccordView(key1, 0)}
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
                          {" "}
                          {this.state.content[key1].topicName}
                        </span>
                      </a>
                    </div>
                    <div
                      id={this.state.keyOffset + key1}
                      className="accordion-body collapse in w-100 "
                    >
                      {this.state.content[key1]["topics"] != undefined &&
                      this.state.content[key1]["topics"] != null
                        ? Object.keys(this.state.content[key1]["topics"]).map(
                            key => (
                              <React.Fragment>
                                <div
                                  className="col-md-12 lrp-30"
                                  onClick={
                                    this.state.content[key1]["topics"][key][
                                      "examDetails"
                                    ]["type"] == 0
                                      ? () =>
                                          this.props.selectContentPaper(
                                            key1,
                                            key
                                          )
                                      : () =>
                                          this.props.selectSection(key1, key)
                                  }
                                >
                                  <span className=" pointer">
                                    {" "}
                                    <img
                                      src={
                                        this.state.content[key1]["topics"][key]
                                          .examDetails.contentType == "image"
                                          ? require(`../assets/image/Media.png`)
                                          : this.state.content[key1]["topics"][
                                              key
                                            ].examDetails.contentType ==
                                            "application"
                                          ? require(`../assets/image/Document.png`)
                                          : this.state.content[key1]["topics"][
                                              key
                                            ].examDetails.type == 0
                                          ? require(`../assets/image/Quiz.png`)
                                          : this.state.content[key1]["topics"][
                                              key
                                            ].examDetails.contentType == "video"
                                          ? require(`../assets/image/Live.png`)
                                          : this.state.content[key1]["topics"][
                                              key
                                            ].examDetails.type == 3
                                          ? require(`../assets/image/LiveVid.png`)
                                          : null
                                      }
                                      alt="team member"
                                      height="20"
                                    />
                                    &nbsp;&nbsp;
                                    {
                                      this.state.content[key1]["topics"][key]
                                        .examDetails.title
                                    }
                                  </span>

                                  {this.state.content[key1]["topics"][key]
                                    .examDetails.max_time != null ||
                                  this.state.content[key1]["topics"][key]
                                    .examDetails.max_time != undefined ? (
                                    <span className=" float-right">
                                      <i class="fa fa-clock-o fa-lg" />{" "}
                                      {this.state.content[key1]["topics"][key]
                                        .examDetails.max_time * 60}{" "}
                                      minutes
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-md-12 lrp-15 ptb-10">
                                  <ul>
                                    <li>
                                      {
                                        this.state.content[key1]["topics"][key]
                                          .examDetails.info
                                      }
                                    </li>
                                    {this.state.content[key1]["topics"][key]
                                      .examDetails.isAssignment &&
                                    this.state.mySubmissions != null ? (
                                      <React.Fragment>
                                        <div>
                                          <span>
                                            <b>Status:</b>
                                          </span>
                                          &nbsp;&nbsp;
                                          <span>
                                            {this.state.mySubmissions[
                                              "section" + key1 + "-subSec" + key
                                            ] != undefined
                                              ? this.state.mySubmissions[
                                                  "section" +
                                                    key1 +
                                                    "-subSec" +
                                                    key
                                                ].status == 1
                                                ? "Marked"
                                                : "Submitted, pending Result"
                                              : ""}
                                          </span>
                                        </div>
                                        <div>
                                          <span>
                                            <b>Score:</b>
                                          </span>
                                          &nbsp;&nbsp;
                                          <span>
                                            {this.state.mySubmissions[
                                              "section" + key1 + "-subSec" + key
                                            ] != undefined
                                              ? this.state.mySubmissions[
                                                  "section" +
                                                    key1 +
                                                    "-subSec" +
                                                    key
                                                ].score >= 0
                                                ? this.state.mySubmissions[
                                                    "section" +
                                                      key1 +
                                                      "-subSec" +
                                                      key
                                                  ].score
                                                : "-"
                                              : ""}
                                          </span>
                                        </div>
                                      </React.Fragment>
                                    ) : (
                                      ""
                                    )}
                                  </ul>
                                  {this.state.content[key1]["topics"][key]
                                    .examDetails.isAssignment &&
                                  this.state.assignments[key1] != undefined &&
                                  this.state.mySubmissions[
                                    "section" + key1 + "-subSec" + key
                                  ] == undefined ? (
                                    <AssignmentAttempt
                                      assignment={
                                        this.state.assignments[key1][key]
                                      }
                                      keyProp={this.props.id}
                                      userId={this.props.userId}
                                      secId={key1}
                                      subSecId={key}
                                      title={
                                        this.state.content[key1]["topics"][key]
                                          .examDetails.title
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </React.Fragment>
                            )
                          )
                        : ""}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseContent;
