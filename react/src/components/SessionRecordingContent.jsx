import React, { Component } from "react";
import "../assets/css/course_content.css";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

class SessionsRecordingContent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    accordView: null,
    content: null,
    assignments: null,
    mySubmissions: {}
  };
  componentDidMount() {
    db.ref(`liveSessionsRecordings/${this.props.id}`)
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
          <span className="fs-24 notoFont-normal"> Sessions Recordings</span>
          {/* <span className=" float-right" style={{ marginTop: "7px" }}>
            <i class="fa fa-clock-o fa-lg" /> Duration &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;
          </span> */}
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
                        href={"#" + key1}
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
                      id={key1}
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
                                      src={require(`../assets/image/Live.png`)}
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

export default SessionsRecordingContent;
