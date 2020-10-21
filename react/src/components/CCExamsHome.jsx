import React, { Component } from "react";

import PaperSection from "./PaperSection";
import CCSectionBody from "./CCSectionBody";
import { arrayMove } from "react-sortable-hoc";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../firebase/firebase";
import ShowMore from "react-show-more";
import "../assets/css/talhacss/Description_webinar.css";
var ActualData = {};

class CCExamsHome extends Component {
  state = {
    items: [],
    keyProp: null,
    activeComp: 0,
    contentType: null,
    allowSave: false,
    isEdit: false,
    courseType: null,
    icondown: '<i class="fas fa-angle-down co_green"></i>',
    iconup: '<i class="fas fa-angle-up co_green"></i>',
  
  };
  constructor(props) {
    super(props);

    ActualData = {};
  }
  PoolData = {};
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ courseTitle: nextProps.courseTitle });
  //   if (nextProps.update) {
  //     db.ref("courses/" + this.props.keyProp + "/contentType")
  //       .once("value")
  //       .then(DripFeed => {
  //         if (DripFeed.val() != null) {
  //           this.setState({ contentType: DripFeed.val() });
  //           if (Object.keys(ActualData).length == 0) {
  //             this.initDripFeed(DripFeed.val().totalWeeks);
  //           }
  //         }
  //       });
  //   }
  // }
  // componentDidMount() {
  //   this.setState({ courseTitle: this.props.courseTitle });

  //   this.setState({
  //     keyProp: this.props.keyProp,
  //     isEdit: this.props.isEdit,
  //     courseType: parseInt(this.props.courseType)
  //   });
  //   db.ref("courses/" + this.props.keyProp + "/contentType")
  //     .once("value")
  //     .then(DripFeed => {
  //       if (DripFeed.val() != null) {
  //         this.setState({ contentType: DripFeed.val() });
  //       }
  //     });
  //   db.ref("liveCourseExam/" + this.props.keyProp)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.PoolData = snapshot.val();
  //         ActualData = snapshot.val();
  //         Object.keys(snapshot.val()).map(key => {
  //           var items = [...this.state.items];
  //           items.push(
  //             <CCSectionBody
  //               examsOnly={true}
  //               remove={this.removeData}
  //               secId={key}
  //               keyProp={this.props.keyProp}
  //               fetchData={this.fetchData}
  //               permissions={this.props.permissions}
  //               secUpdate={this.sectionTitleUpdate}
  //               courseType={this.state.courseType}
  //               isEdit={this.props.isEdit}
  //               data={snapshot.val()}
  //             />
  //           );
  //           this.setState({ items });
  //         });
  //       } else {
  //         if (this.state.contentType != null && this.state.courseType == "1") {
  //           this.initDripFeed(this.state.contentType.totalWeeks);
  //         }
  //       }
  //     });
  // }
  // initDripFeed = weeks => {
  //   var items = [...this.state.items];

  //   for (var p = 0; p < weeks; p++) {
  //     items.push(
  //       <CCSectionBody
  //         remove={this.removeData}
  //         examsOnly={true}
  //         secId={"section" + items.length}
  //         fetchData={this.fetchData}
  //         permissions={this.props.permissions}
  //         data={this.PoolData}
  //         keyProp={this.props.keyProp}
  //         secUpdate={this.sectionTitleUpdate}
  //         courseType={this.state.courseType}
  //         title={"Week " + (p + 1)}
  //       />
  //     );
  //   }

  //   this.setState({ items });
  // };
  // fetchData = data => {
  //   this.PoolData = data;
  //   ActualData = data;
  //   for (let [sectionId, section] of Object.entries(this.PoolData)) {
  //     if (section.topics && Object.keys(section.topics).length > 0) {
  //       this.setState({ allowSave: true });
  //       break;
  //     } else {
  //       this.setState({ allowSave: false });
  //     }
  //   }
  // };
  // remapData = (oldIndex, newIndex) => {
  //   let myData = [];
  //   Object.keys(this.PoolData).map(key => {
  //     myData.push(this.PoolData[key]);
  //   });
  //   myData = arrayMove(myData, oldIndex, newIndex);

  //   Object.keys(myData).map(index => {
  //     this.PoolData["section" + index] = myData[index];
  //   });
  // };
  // removeData = (key, id, rowid) => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           if (this.PoolData[key] != undefined) {
  //             delete this.PoolData[key]["subTopic"][id];
  //           }
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // saveForm = () => {
  //   if (this.PoolData.length == 0) {
  //     alert("Empty Data set");
  //     return;
  //   } else {
  //     db.ref("liveCourseExam/" + this.state.keyProp).set(null);
  //     db.ref("liveCourseExam/" + this.state.keyProp)
  //       .set(this.PoolData)
  //       .then(e => {
  //         ActualData = this.PoolData;
  //         var courseContent = {};
  //         db.ref("courses/" + this.props.keyProp + "/courseExams").set(null);
  //         Object.keys(this.PoolData).map(c => {
  //           courseContent[c] = {};
  //           courseContent[c]["topicName"] = this.PoolData[c]["topicName"];
  //           courseContent[c]["topics"] = {};
  //           if (
  //             this.PoolData[c]["topics"] != undefined ||
  //             this.PoolData[c]["topics"] != null
  //           ) {
  //             Object.keys(this.PoolData[c]["topics"]).map(d => {
  //               courseContent[c]["topics"][d] = {};
  //               courseContent[c]["topics"][d] = this.PoolData[c]["topics"][d][
  //                 "examDetails"
  //               ];
  //             });
  //           }
  //         });
  //         db.ref("courses/" + this.props.keyProp + "/courseExams").set(
  //           courseContent
  //         );
  //         this.props.isUpdate(true);
  //         alert("Data posted");
  //       });
  //   }
  // };
  // addSection = () => {
  //   var items = [...this.state.items];
  //   items.push(
  //     <CCSectionBody
  //       remove={this.removeData}
  //       secId={"section" + items.length}
  //       fetchData={this.fetchData}
  //       data={this.PoolData}
  //       examsOnly={true}
  //       permissions={this.props.permissions}
  //       keyProp={this.props.keyProp}
  //       secUpdate={this.sectionTitleUpdate}
  //       courseType={this.state.courseType}
  //     />
  //   );
  //   this.setState({ items });
  // };
  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  btnshowtext = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = `Read more ${this.state.icondown}`;
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = `Read less ${this.state.iconup}`;
      moreText.style.display = "inline";
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h3 className="card-title bold regular_font">Exams</h3>
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
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  disabled="true"
                >
                  Create New Section
                </button>
              ) : (
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  onClick={this.addSection}
                >
                  Create New Section
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />

        <div className="row col_margin live_web_border_admin mtb_2v">
          <div className="col-md-2 col_padding text_file_box_Admin">
            <img
              src={require("../assets/image/photo-1528731708534-816fe59f90cb.jpg")}
              className="img_upload_webi image_borer"
              alt="upload Image"
            />
          </div>
          <div className="col-md-8 col_padding">
            <div className="row">
              <div className="col-md-10 pd_4_4">
                <h5>Web Engineering</h5>
                <p className="mb_unset  fz_13">
                  simply dummy text of the printing and typesetting industry.
                </p>
                {/* <ShowMore
                      lines={1}
                      more='Show more'
                      less='Show less'
                      anchorClass=''
                      >
                       {"hfjkdshjkhd shfjksdhkhfjksh jkhsfjkdhjk hjk"}
                  </ShowMore> */}
              </div>
              <div className="col-md-2 col_padding pd_4_4">
                <p className="mb_unset  fz_12">
                  Last Updated
                  <br />
                  August 2020
                </p>
              </div>
            </div>
            <div>
            <p className="Des_text">
                <span id="dots"></span>
                <span id="more">
                <div className="row">
              <div className="col-md-6">
                <div className="mb-1 ml-4">
                  <span className="bold">Total Marks: </span> 100
                </div>
                <div className="mb-1 ml-4">
                  <span className="bold">Min Passing Marks: </span> 33
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-1 ml-4 text-md-right mr-2">
                  <span className="bold">Duration: </span> 03 Hours
                </div>
                <div className="mb-1 ml-4 text-md-right mr-2">
                  <span className="bold">Time: </span> 06:30 PM
                </div>
              </div>
              <div className="col-md-10 ml-2 ">
                <button className="btn admin_btn show_detail_btn">
                  Show Detail
                </button>
              </div>
            </div>
        
                </span>
              </p>
              <button
                onClick={this.btnshowtext}
                id="myBtn"
                className="btnshowmore_less"
              >
                Read more{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: this.state.icondown }}
                ></span>
              </button>
              </div>

          </div>
          <div className="col-md-2 pt-25 col_padding admin_box_border">
            <div className="text-center">
              <i className="fas fa-edit co_admin"></i> &nbsp; &nbsp; Edit
            </div>
            <hr />
            <div className="text-center">
              <i className="fa fa-trash co_admin" aria-hidden="true" />
              &nbsp; &nbsp; Delete
            </div>
          </div>
        </div>
                  <br/><br/><br/><br/><br/>

                 <div className="row">
                    <div className="col-md-12 text-center">
                          <h3 className="bold">Exam Title: Web Engineering </h3>
                          <h4>Questions</h4>
                    </div>
                    </div>
                    <br/><br/>
                  <div className="row">
                    <div className="col-md-6">
                        Search   <input type="text" className="form-control fz_16" placeholder="Search"  />
                    </div>
                    <div className="col-md-3">
                    Filter   <input type="text" className="form-control fz_16" placeholder="By Type"  />
                    </div>
                    <div className="col-md-3">
                    Category   <input type="text" className="form-control fz_16" placeholder="By Category"  />
                    </div>
                  </div>
                  <br/><br/>

                  <div className="row">
                    <div className="col-md-12 live_web_border_admin">
                      <div className="row">
                        <div className="col-md-1 pt-3 col_padding text-center">
                          <h5 className="bold">No.</h5>
                          <p>1</p>
                        </div>
                        <div className="col-md-6 pt-3 col_padding text-center ">
                        <h5 className="bold">Questions</h5>
                          <p>Does virtual DOM introduced in React Js, improve website's Page Loat Time? </p>
                        </div>
                        <div className="col-md-1 pt-3 col_padding text-center ">
                        <h5 className="bold">Type</h5>
                          <p>SBA</p>
                        </div>
                        <div className="col-md-2 pt-3 col_padding text-center">
                        <h5 className="bold">Category</h5>
                          <p>Development </p>
                        </div>
                        <div className="col-md-2 pt-3 col_padding admin_box_border">
                        <div className="text-center">
                          <i className="fas fa-edit co_admin"></i> &nbsp; &nbsp; Edit
                        </div>
                        <hr />
                        <div className="text-center">
                          <i className="fa fa-trash co_admin" aria-hidden="true" />
                          &nbsp; &nbsp; Delete
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                      <br/>
                  <div className="row">
                    <div className="col-md-12 live_web_border_admin">
                      <div className="row">
                        <div className="col-md-1 pt-3 col_padding text-center">
                          <h5 className="bold">No.</h5>
                          <p>1</p>
                        </div>
                        <div className="col-md-6 pt-3 col_padding text-center ">
                        <h5 className="bold">Questions</h5>
                          <p>Does virtual DOM introduced in React Js, improve website's Page Loat Time? </p>
                        </div>
                        <div className="col-md-1 pt-3 col_padding text-center ">
                        <h5 className="bold">Type</h5>
                          <p>SBA</p>
                        </div>
                        <div className="col-md-2 pt-3 col_padding text-center">
                        <h5 className="bold">Category</h5>
                          <p>Development </p>
                        </div>
                        <div className="col-md-2 pt-3 col_padding admin_box_border">
                        <div className="text-center">
                          <i className="fas fa-edit co_admin"></i> &nbsp; &nbsp; Edit
                        </div>
                        <hr />
                        <div className="text-center">
                          <i className="fa fa-trash co_admin" aria-hidden="true" />
                          &nbsp; &nbsp; Delete
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                    <button className="btn admin_btn mt-4 width-100p">
                        Add Question
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-center mt-4 mb-4">
                          <h3 className="bold">Exam Title: Web Engineering </h3>
                          <h4>Add New Questions</h4>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-2"></div>
                      <div className="col-md-8">
                      <form>
                        <div className="mb-3">
                                <label htmlFor="validationDefault01">Type<span className="co_red">*</span></label>
                                 <div className="fz_16">
                                            <select value={this.state.discipline} id="validationDefault01" onChange={this.statechange} name="query" className="form-control co_black">
                                                <option>Choose Question Type </option>
                                                <option>Single Best Answer</option>
                                                <option>Multiple Choice Question</option>
                                            </select>
                                        </div>      
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault04">Question<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault04" placeholder="Enter your question" rows={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault06">Options<span className="co_red">*</span></label>
                                <br/>
                                 a&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> &nbsp; &nbsp;
                                b&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> <br/> <br/>
                                c&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> &nbsp; &nbsp;
                                d&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required />
                                <br/>
                                <button className="btn create_btn pd_0_5 mtb-20">
                                  Add Option
                                </button>
                          </div>
                               <div className="mb-3">
                                <label htmlFor="validationDefault03">Answer Explanation<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault03" placeholder="Enter your answer explanation here" rows={5} required />
                            </div>
                            <div className="text-center">
                            <button className="btn admin_btn bold fz_14 width-40p" type="submit">Save</button>
                            </div>
                       </form>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                    <div className="row">
                    <div className="col-md-2"></div>
                      <div className="col-md-8">
                      <form>
                        <div className="mb-3">
                                <label htmlFor="validationDefault01">Type<span className="co_red">*</span></label>
                                 <div className="fz_16">
                                            <select value={this.state.discipline} id="validationDefault01" onChange={this.statechange} name="query" className="form-control co_black">
                                                <option>Choose Question Type </option>
                                                <option>Single Best Answer</option>
                                                <option>Multiple Choice Question</option>
                                            </select>
                                        </div>      
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault04">Question<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault04" placeholder="Enter your question" rows={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault06">Options<span className="co_red">*</span></label>
                                <br/>
                                 a&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> &nbsp; &nbsp;
                                b&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> <br/> <br/>
                                c&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required /> &nbsp; &nbsp;
                                d&nbsp; &nbsp;<input type="text" className="textbox_round fz_16" id="validationDefault06"  required />
                                <br/>
                                <button className="btn create_btn pd_0_5 mtb-20">
                                  Add Option
                                </button>
                          </div>
                               <div className="mb-3">
                                <label htmlFor="validationDefault03">Answer Explanation<span className="co_red">*</span></label>
                                <textarea className="form-control fz_16" id="validationDefault03" placeholder="Enter your answer explanation here" rows={5} required />
                            </div>
                            <div className="text-center">
                            <button className="btn admin_btn bold fz_14 width-40p" type="submit">Save</button>
                            </div>
                       </form>
                      </div>
                      <div className="col-md-2"></div>
                    </div>

                    <div className="row">
                    <div className="col-md-12 mt-4">
                          <h3 className="bold">Create Exam </h3>
                    </div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-md-6">
                          <div className="mb-3">
                                <label htmlFor="validationDefault01">Exam Title<span className="co_red">*</span></label>
                                <input type="text" className="form-control fz_16" id="validationDefault01" placeholder="Enter exam title" required />
                          </div>
                          <div className="mb-3">
                                <label htmlFor="validationDefault01">Set Time<span className="co_red">*</span></label><br/>
                                <DatePicker
                                showTimeSelect
                                className="form-control cal_width"
                                selected={this.state.startDate}
                                dateFormat="Pp"
                                onChange={this.handleChangeStart}
                              />
                          </div>
                          <div className="mb-3">
                                <label htmlFor="validationDefault03">Total Marks<span className="co_red">*</span></label>
                                <input type="text" className="form-control fz_16" id="validationDefault03" placeholder="Enter total marks" required />
                          </div>
                       <div className="">
                            <button className="btn admin_btn bold fz_14 width-40p" type="submit">Create</button>
                       </div>
                  </div>
                      <div className="col-md-6">
                      <div className="mb-3">
                                <label htmlFor="validationDefault04">Set Date<span className="co_red">*</span></label><br/>
                                {/* <input type="text" className="form-control fz_16" id="validationDefault04" placeholder="Set date for exam" required /> */}
                                <DatePicker
                                showTimeSelect
                                className="form-control cal_width"
                                selected={this.state.startDate}
                                dateFormat="Pp"
                                onChange={this.handleChangeStart}
                              />
                          </div>
                          <div className="mb-3">
                                <label htmlFor="validationDefault05">Duration<span className="co_red">*</span></label>
                                <input type="number" className="form-control fz_16" id="validationDefault05" placeholder="0" required />
                          </div>
                          <div className="mb-3">
                                <label htmlFor="validationDefault06">Minimum Passing Marks<span className="co_red">*</span></label>
                                <input type="text" className="form-control fz_16" id="validationDefault06" placeholder="Minimum Passing Marks" required />
                          </div>
                      </div>
                     

                   </div>












        {/* <PaperSection
          items={this.state.items}
          courseType={this.state.courseType}
          // keyProp={this.state.keyProp}
          // isEdit={this.state.isEdit}
          remapData={this.remapData}
        /> */}
      </React.Fragment>
    );
  }
}
export default CCExamsHome;
