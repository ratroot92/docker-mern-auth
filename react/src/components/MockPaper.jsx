import React, { Component } from "react";
import { db } from "../firebase/firebase";

class MockPaper extends Component {
  constructor(props) {
    super(props);
  }
  state = { accordView: null, papers: null };
  componentDidMount() {
    db.ref(`courseExams/${this.props.id}`)
      .once("value")
      .then(cpsc => {
        if (cpsc.val() != null) {
          this.setState({ papers: cpsc.val() });
          Object.keys(this.state.papers).map(key => {
            Object.keys(this.state.papers[key]["topics"]).map(key1 => {
              var accordView = { ...this.state.accordView };

              accordView[key] = "fa fa-plus ";

              this.setState({ accordView });
            });
          });
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
          <span className="fs-24 notoFont-normal"> Papers</span>
          <span className=" float-right" style={{ marginTop: "7px" }}>
            <i class="fa fa-clock-o fa-lg" /> Duration &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;
          </span>
        </div>
        <br />

        <div className="row">
          <div className="col-sm-12">
            {this.state.papers != null
              ? Object.keys(this.state.papers).map(key1 => (
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
                          {this.state.papers[key1].topicName}
                        </span>
                      </a>
                    </div>
                    <div
                      id={key1}
                      className="accordion-body collapse in w-100 "
                    >
                      {Object.keys(this.state.papers[key1]["topics"]).map(
                        key => (
                          <React.Fragment>
                            <div
                              className="col-md-12 lrp-30"
                              onClick={() => this.props.selectPaper(key1, key)}
                            >
                              <span className="text_cyan pointer">
                                {" "}
                                <i class="fa fa-play-circle fa-lg " />{" "}
                                &nbsp;&nbsp;
                                {
                                  this.state.papers[key1]["topics"][key]
                                    .examDetails.title
                                }
                              </span>
                              <span className=" float-right">
                                <i class="fa fa-clock-o fa-lg" />{" "}
                                {
                                  this.state.papers[key1]["topics"][key]
                                    .examDetails.max_time
                                }{" "}
                                minutes
                              </span>
                            </div>
                            <div className="col-md-12 lrp-15 ptb-10">
                              <ul>
                                <li>
                                  {
                                    this.state.papers[key1]["topics"][key]
                                      .examDetails.info
                                  }
                                </li>
                                {/* {this.props.content != undefined ||
                                this.props.content != null
                                  ? Object.keys(
                                      this.props.content["section" + key][
                                        "subTopic"
                                      ]
                                    ).map(c => (
                                      <React.Fragment>
                                        
                                      </React.Fragment>
                                    ))
                                  : ""} */}
                              </ul>
                            </div>
                          </React.Fragment>
                        )
                      )}
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

export default MockPaper;
