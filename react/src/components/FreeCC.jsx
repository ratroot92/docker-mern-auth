import React, { Component } from "react";
import "../assets/css/course_content.css";
import { db } from "../firebase/firebase";

class FreeCC extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    // accordView: null,
    // freeData: null,
    // content: null
  };
  // freeData = null;
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.update) {
  //     this.fetchContent();
  //   }
  // }
  // componentDidMount() {
  //   db.ref(`courseExams/${this.props.keyProp}`)
  //     .once("value")
  //     .then(cpsc => {
  //       if (cpsc.val() != null) {
  //         this.setState({ content: cpsc.val() });
  //         Object.keys(this.state.content).map(key => {
  //           if (
  //             this.state.content[key]["topics"] != undefined &&
  //             this.state.content[key]["topics"] != null
  //           ) {
  //             Object.keys(this.state.content[key]["topics"]).map(key1 => {
  //               var accordView = { ...this.state.accordView };

  //               accordView[key] = "fa fa-plus ";

  //               this.setState({ accordView });
  //             });
  //           }
  //         });
  //       }
  //     });

  //   db.ref(`courses/${this.props.keyProp}/freeResource`)
  //     .once("value")
  //     .then(freeResource => {
  //       if (freeResource.val() != null) {
  //         this.setState({ freeData: freeResource.val() });
  //       }
  //     });
  // }
  // fetchContent = () => {
  //   db.ref(`courseExams/${this.props.keyProp}`)
  //     .once("value")
  //     .then(cpsc => {
  //       if (cpsc.val() != null) {
  //         this.setState({ content: cpsc.val() });
  //         Object.keys(this.state.content).map(key => {
  //           if (
  //             this.state.content[key]["topics"] != undefined &&
  //             this.state.content[key]["topics"] != null
  //           ) {
  //             Object.keys(this.state.content[key]["topics"]).map(key1 => {
  //               var accordView = { ...this.state.accordView };

  //               accordView[key] = "fa fa-plus ";

  //               this.setState({ accordView });
  //             });
  //           }
  //         });
  //       }
  //     });
  // };
  // toggleAccordView = (key, type) => {
  //   if (type == 0) {
  //     var accordView = { ...this.state.accordView };
  //     if (
  //       accordView[key] == undefined ||
  //       accordView[key].indexOf("plus") > -1
  //     ) {
  //       accordView[key] = "fa fa-minus ";
  //     } else {
  //       accordView[key] = "fa fa-plus ";
  //     }
  //     this.setState({ accordView });
  //   } else {
  //     var accordView1 = { ...this.state.accordView1 };
  //     if (
  //       accordView1[key] == undefined ||
  //       accordView1[key].indexOf("down") > -1
  //     ) {
  //       accordView1[key] = "fa fa-angle-up ";
  //     } else {
  //       accordView1[key] = "fa fa-angle-down";
  //     }
  //     this.setState({ accordView1 });
  //   }
  // };
  // markFree = (sectionId, subSectionId) => {
  //   var freeData = { ...this.state.freeData };
  //   if (freeData == null) {
  //     freeData = {};
  //   }

  //   if (freeData[sectionId] == undefined) {
  //     freeData[sectionId] = {};
  //   }
  //   if (freeData[sectionId][subSectionId] == undefined) {
  //     freeData[sectionId][subSectionId] = {};
  //   }
  //   freeData[sectionId][subSectionId] = this.state.content[sectionId]["topics"][
  //     subSectionId
  //   ];
  //   this.setState({ freeData });
  // };
  // saveFree = () => {
  //   db.ref("courses/" + this.props.keyProp + "/freeResource").set(
  //     this.state.freeData
  //   );
  // };
  render() {
    return (
      <React.Fragment>
        <div>
        {/* <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">Free Course Content</h5>
              <div className="col lrp-0">
                <span>
                  <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-md-7 lrp-0">
              <button className="btn btn-white fix_width_btn  btn-transparent black admin-btn">
                Preview
              </button>{" "}
              &nbsp;
              <button
                className="btn btn-white fix_width_btn btn-transparent black bold fz_14"
                onClick={this.saveFree}
              >
                Save
              </button>
              &nbsp;
            </div>
          </div>
        </div>
        <hr />
        <div className=" col-md-12 ">
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
                                  {this.state.content[key1]["topics"][key]
                                    .examDetails.isAssignment == null ? (
                                    <React.Fragment>
                                      <div className="col-md-12 lrp-30">
                                        <span className="text_cyan pointer">
                                          {" "}
                                          <i class="fa fa-play-circle fa-lg " />{" "}
                                          &nbsp;&nbsp;
                                          {
                                            this.state.content[key1]["topics"][
                                              key
                                            ].examDetails.title
                                          }
                                          &nbsp;&nbsp;
                                          <button
                                            class="btn white    btn-red black admin-btn"
                                            onClick={() =>
                                              this.markFree(key1, key)
                                            }
                                            disabled={
                                              this.state.freeData != null &&
                                              this.state.freeData[key1] !=
                                                undefined &&
                                              this.state.freeData[key1][key] !=
                                                undefined
                                                ? true
                                                : false
                                            }
                                          >
                                            {" "}
                                            <i
                                              class="fa fa-plus pointer"
                                              aria-hidden="true"
                                            />{" "}
                                            Mark Free
                                          </button>{" "}
                                        </span>
                                        {this.state.content[key1]["topics"][key]
                                          .examDetails.max_time != null ||
                                        this.state.content[key1]["topics"][key]
                                          .examDetails.max_time != undefined ? (
                                          <span className=" float-right">
                                            <i class="fa fa-clock-o fa-lg" />{" "}
                                            {
                                              this.state.content[key1][
                                                "topics"
                                              ][key].examDetails.max_time
                                            }{" "}
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
                                              this.state.content[key1][
                                                "topics"
                                              ][key].examDetails.info
                                            }
                                          </li>
                                        </ul>
                                      </div>
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )}
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
        */}
        </div>
     

        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h4 className="card-title bold regular_font">Files </h4>
              <div className="col lrp-0">
                <span>
                  {/* <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""} */}
                </span>
              </div>
            </div>
            <div className="col-md-7 lrp-0">
              &nbsp;
              <button
                className="btn btn-white fix_width_btn btn-transparent black bold fz_14"
                onClick={this.saveForm}
                {...(this.state.allowSave
                  ? { disabled: false }
                  : { disabled: true })}
              >
                Save
              </button>
              &nbsp;
              {this.state.contentType != null &&
              this.state.courseType == "1" ? (
                <button
                  className="btn admin-btn-green fix_width_btn white fz_13 bold"
                  disabled="true"
                >
                  Add File
                </button>
              ) : (
                <button
                  className="btn admin-btn-green fix_width_btn white fz_13 bold"
                  onClick={this.addSection}
                >
                  Add File
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />
                 <div className="row card-body">
                    <div className="col-md-12 live_web_border_0">
                      <div className="row ptb-20">
                        <div className="col-md-9 col_padding ">
                          <div className="pl-lg-5">
                          <img  src={require("../assets/image/designer_icon/Upload-files-here.png")} /> 
                          </div>
                        <p className="fz_12 pt-2 pl-4">Web Eng.docx</p>
                        </div>
                       <div className="col-md-1 flex_center col_padding">
                        <div className="">
                          <i className="fas fa-edit co_admin"></i>
                        </div>
                     </div>
                       <div className="col-md-2 flex_center col_padding">
                       <div className="">
                          <i className="fa fa-trash co_admin" aria-hidden="true" />
                        </div>
                     </div>
                      </div>
                    </div>
                  </div>
                 <div className="row card-body">
                    <div className="col-md-12 live_web_border_0">
                      <div className="row ptb-20">
                        <div className="col-md-9 col_padding ">
                          <div className="pl-lg-5">
                          <img  src={require("../assets/image/designer_icon/Upload-files-here.png")} /> 
                          </div>
                        <p className="fz_12 pt-2 pl-4">Web Eng.docx</p>
                        </div>
                       <div className="col-md-1 flex_center col_padding">
                        <div className="">
                          <i className="fas fa-edit co_admin"></i>
                        </div>
                     </div>
                       <div className="col-md-2 flex_center col_padding">
                       <div className="">
                          <i className="fa fa-trash co_admin" aria-hidden="true" />
                        </div>
                     </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <input type="file" name="uploadfile" id="myfile" style={{visibility:"hidden"}}/>
                     <label for="myfile" className="btn admin_btn mt-4 width-100p">Add File</label>
                    </div>

                  </div>




     
     
      </React.Fragment>
    );
  }
}

export default FreeCC;
