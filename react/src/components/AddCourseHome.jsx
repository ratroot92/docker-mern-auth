import React, { Component } from "react";
import AddCourse from "./adminDashboard/AddCourse";
import AdminCourse from "./adminDashboard/AdminCourse";
import Addfaq from "./adminDashboard/Addfaq";
import "bs-stepper/dist/css/bs-stepper.min.css";
import QPHome from "./adminDashboard/QPHome";
import FreePool from "./adminDashboard/FreePool";
import Unauthorized from "./Unauthorized";
import Coursefeature from "./Coursefeature";
import Pricing from "./adminDashboard/Pricing";
import PaperMockHome from "./PaperMockHome";
import CCHome from "./CCHome";
import FilesHome from "./FilesHome";
import CCSessionsHome from "./CCSessionsHome";
import CCExamsHome from "./CCExamsHome";
import FreeCC from "./FreeCC";
import Stepper from "bs-stepper";
import { db } from "../firebase/firebase";
import SessionsRecordings from "./SessionRecordings";
import $ from 'jquery';
var newKey = null;
class AddCourseHome extends Component {
  constructor(props) {
    super(props);
  }
  nextStep = comp => {
    this.setState({ currentComp: comp });
  };
  state = {
    newKey: null,
    isEdit: false,
    courseTitle: null,
    activeStepper: "test-l-1",
    render: false,
    courseDateType: null,
    changeFlag: false,
    update: true
  };
  componentDidMount() {
    // $(document).ready(()=>{
    //   $("li.start").siblings().css({"color": "red", "border": "2px solid red"});
    // })
    $('#stepper1 div.bs-stepper-header div.step').bind('click', function(){
      //console.log($(this.nextSibling));
      console.log($(this).removeAttr("background-color"));
      // $(this).next().css("border", "1px solid #d3d3d396");
      var x = document.getElementsByClassName("line");
      var i;
      for (i = 0; i < x.length; i++) {
       x[i].style.border = "1px solid #d3d3d396";
      }
      $(this).next().css("border", "1px solid #20A84C");
      // $(this).removeAttr("background-color");

     // $(this.nextSibling).next().css("border", "2px solid green!important");
    // alert( $('#stepper1 div.bs-stepper-header div.step ').index(this) );
  });


    // $( "div.bs-stepper-header>.step.active:eq( 2 )" ).css( "color", "red" );
    if (this.props.courseType == 2) {
      this.setState({ courseDateType: "0" });
    }
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true
    });
    if (
      this.props.keyProp == "null" ||
      this.props.keyProp == null ||
      this.props.keyProp == undefined
    ) {
      newKey = db.ref("courses").push().key;
      this.setState({
        currentComp: (
          <AddCourse
            keyProp={newKey}
            isEdit={false}
            setCourseType={this.setCourse}
            permissions={this.props.permissions}
            setTitle={this.setTitle}
            courseType={this.props.courseType}
            isChanged={this.isChanged}
            changeFlag={this.state.changeFlag}
            courseTitle={this.state.courseTitle}
          />
        ),
        newKey: newKey,
        isEdit: false,
        render: true
      });
    } else {
      newKey = this.props.keyProp;
      db.ref("courses/" + this.props.keyProp + "/Title")
        .once("value")
        .then(courseTitle => {
          this.setState({
            courseTitle: courseTitle.val(),
            currentComp: (
              <AddCourse
                keyProp={this.props.keyProp}
                isEdit={true}
                courseType={this.props.courseType}
                setTitle={this.setTitle}
                isChanged={this.isChanged}
                setCourseType={this.setCourse}
                changeFlag={this.state.changeFlag}
                permissions={this.props.permissions}
                courseTitle={courseTitle.val()}
              />
            ),
            newKey: this.props.keyProp,
            isEdit: true,
            render: true
          });
        });

    }
  }
  isChanged = flag => {
    this.setState({ changeFlag: flag });
  };
  setTitle = value => {
    this.setState({ courseTitle: value });
  };
  onSubmit(e) {
    e.preventDefault();
  }
  isUpdate = () => {
    this.setState({ update: false });
    this.setState({ update: true });
  };
  setCourse = dataType => {
    // set course type between live and recorded

    this.setState({ courseDateType: dataType });
  };
  //post data here
  //generate template on types
  //maintain previous node here
  stepperClick = (stepper_id, title) => {
    this.setState({ activeStepper: stepper_id, activeStepper_title: title });
  };

  render() {
    return (
      <React.Fragment>
        <div>
      <div id="stepper1" className="bs-stepper stepper_center">
        <div>
          <div className="bs-stepper-header ptb-20 steper_back_box">
              <div
                className="step"
                data-target="#test-l-1"
                onClick={() => this.stepperClick("test-l-1", "Details")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-1" ? (
                      <React.Fragment>
                     <span className="bs-stepper-label fontz_b fs-11">Details</span>
                       <br></br>
                       <span
                          className="bs-stepper-circle stepper-active"
                          title="Details"
                        >
                       </span>
                        <div>
                           <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i>
                        </div>
                      
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                       <span className="bs-stepper-label fontz_b fs-11">Details</span>
                       <br></br>
                       <span className="bs-stepper-circle " title="Details">
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                </a>
              </div>
              <div className="line" />
              <div
                  className={this.props.courseType == 0 ? " step show" : "hide"}
                data-target="#test-l-5"
                onClick={() => this.stepperClick("test-l-5", "Features")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-5" ? (
                      <React.Fragment>
                       <span className="bs-stepper-label fontz_b fs-11">Features</span>
                       <br></br>
                        <span
                          className="bs-stepper-circle stepper-active"
                          title="Features"
                        >
                        </span>
                        <div>
                            <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fontz_b fs-11">Features</span>
                        <br></br>
                        <span className="bs-stepper-circle " title="Features">
                       </span>
                      </React.Fragment>
                    )}

                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div className={this.props.courseType == 0 ? " line show" : "hide"} />
              <div
                className={this.props.courseType == 0 ? " step show" : "hide"}
                data-target="#test-l-2"
                onClick={() => this.stepperClick("test-l-2", "Topics")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-2" ? (
                      <div>
                      <span className="bs-stepper-label fontz_b fs-11">Topics</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title="Topics"
                      >
                      </span>
                         <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fontz_b fs-11">Topics</span>
                        <br></br>
                        <span className="bs-stepper-circle " title="Topics">
                         </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div
                className={+this.props.courseType == 0 ? "line show" : "hide"}
              />
              <div
                 className={this.props.courseType == 2 ? "hide" : "hide"}
                data-target="#test-l-3"
                onClick={() =>
                  this.stepperClick(
                    "test-l-3",
                    this.props.courseType == 0
                      ? "Questions"
                      : this.props.courseType == 1
                      ? "Paper"
                      : this.props.courseType == 2
                      ? "Content "
                      : ""
                  )
                }
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-3" ? (
                      <div>
                     <span className="bs-stepper-label fontz_b fs-11">Questions</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title={
                          this.props.courseType == 0
                            ? ""
                            : this.props.courseType == 1
                            ? ""
                            : this.props.courseType == 2
                            ? " "
                            : ""
                        }
                      >
                        {this.props.courseType == 0
                          ? ""
                          : this.props.courseType == 1
                          ? ""
                          : this.props.courseType == 2
                          ? " "
                          : ""}
                      </span>
                         <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fontz_b fs-11">
                          {this.props.courseType == 0
                            ? "Questions"
                            : this.props.courseType == 1
                            ? "Paper"
                            : this.props.courseType == 2
                            ? "Content "
                            : ""}
                        </span>
                        <br></br>
                        <span
                          className="bs-stepper-circle "
                          title={
                            this.props.courseType == 0
                              ? "Questions"
                              : this.props.courseType == 1
                              ? "Paper"
                              : this.props.courseType == 2
                              ? "Content "
                              : ""
                          }
                        >
                          {this.props.courseType == 0
                            ? ""
                            : this.props.courseType == 1
                            ? ""
                            : this.props.courseType == 2
                            ? ""
                            : ""}
                        </span>
                      </React.Fragment>
                    )}

                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div    className={this.props.courseType == 2 ? "line hide" : "hide"} />
              {/* start extra steper for course */}
              <div
                className={
                  +this.state.courseDateType == "0" &&
                  this.props.courseType == 2
                    ? " step show"
                    : "hide"
                }
                data-target="#test-l-9"
                onClick={() => this.stepperClick("test-l-9", "Sessions")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-9" ? (
                      <div>
                       <span className="bs-stepper-label fontz_b fs-11">Sessions</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title="Sessions"
                      >
                     </span>
                      <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fontz_b fs-11">Sessions</span>
                        <br></br>
                        <span className="bs-stepper-circle " title="Sessions">
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div
                className={
                  this.state.courseDateType == "0" && this.props.courseType == 2
                    ? "line show"
                    : "hide"
                }
              />
              <div
                className={
                  +this.state.courseDateType == "0" &&
                  this.props.courseType == 2
                    ? " step show"
                    : "hide"
                }
                data-target="#test-l-10"
                onClick={() => this.stepperClick("test-l-10", "Exams")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-10" ? (
                      <div>
                      <span className="bs-stepper-label fontz_b fs-11">Exam</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title="Exams"
                      >
                      </span>
                         <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fs-11">Exams</span> <br></br>
                        <span className="bs-stepper-circle " title="Exams">
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              {/* <div
                className={
                  this.state.courseDateType == "0" && this.props.courseType == 2
                    ? "line show"
                    : "hide"
                }
              /> */}
              {/* <div
                className={
                  +this.state.courseDateType == "0" &&
                  this.props.courseType == 2
                    // ? " step show"
                    ? " step hide"
                    : "hide"
                }
                className="step hide" 
                data-target="#test-l-11"
                onClick={() =>
                  this.stepperClick("test-l-11", "Session Recordings")
                }
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-11" ? (
                       <div>
                          <span className="bs-stepper-label fontz_b fs-11">   Session</span>
                           <br></br>
                          <span
                            className="bs-stepper-circle stepper-active"
                            title="Session Recordings"
                          >
                          </span>
                             <div>
                              <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i>
                               </div></div>
                    ) : (
                      <React.Fragment>
                         <span className="bs-stepper-label fs-11">
                          Session
                        </span>
                        <br></br>
                       <span
                          className="bs-stepper-circle "
                          title="Session Recordings"
                        >
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
            */}
              <div
                className={
                  this.state.courseDateType == "0" && this.props.courseType == 2
                    ? "line show"
                    : "hide"
                }
              />
              {/* end extra steper for course */}
              <div
                className={this.props.courseType == 2 ? " step show" : "hide"}
                data-target="#test-l-8"
                onClick={() => this.stepperClick("test-l-8", "Files")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-8" ? (
                                       <div>
                                       <span className="bs-stepper-label fontz_b fs-11">Pricing</span>
                                        <br></br>
                                       <span
                                         className="bs-stepper-circle stepper-active"
                                         title="Files"
                                       >
                                       </span>
                                          <div>
                                           <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i>
                                            </div></div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fs-11">Pricing</span>  <br></br>
                        <span className="bs-stepper-circle " title="Files">
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div
                className={+this.props.courseType == 2 ? "line show" : "hide"}
              />
              









              <div
                className={this.props.courseType == 2 ? " step show" : "hide"}
                data-target="#test-l-7"
                onClick={() => this.stepperClick("test-l-7", "Files")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-7" ? (
                                       <div>
                                       <span className="bs-stepper-label fontz_b fs-11">Files</span>
                                        <br></br>
                                       <span
                                         className="bs-stepper-circle stepper-active"
                                         title="Files"
                                       >
                                       </span>
                                          <div>
                                           <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i>
                                            </div></div>
                    ) : (
                      <React.Fragment>
                        <span className="bs-stepper-label fs-11">Files</span>  <br></br>
                        <span className="bs-stepper-circle " title="Files">
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              <div
                className={+this.props.courseType == 2 ? "line show" : "hide"}
              />
              










              {/* <div
                className={this.props.courseType == 2 ? " step hide" : "hide"}
                data-target="#test-l-7"
                onClick={() =>
                  this.stepperClick(
                    "test-l-7",
                    this.props.courseType == 0
                      ? " Free Pool"
                      : this.props.courseType == 1
                      ? " Free Pool"
                      : this.props.courseType == 2
                      ? " Free Content "
                      : ""
                  )
                }
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-7" ? (
                      <div>
                          <span className="bs-stepper-label fontz_b fs-11">Free Poll</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title={
                          this.props.courseType == 0
                            ? ""
                            : this.props.courseType == 1
                            ? ""
                            : this.props.courseType == 2
                            ? "  "
                            : ""
                        }
                      >
                        {this.props.courseType == 0
                          ? ""
                          : this.props.courseType == 1
                          ? ""
                          : this.props.courseType == 2
                          ? " "
                          : ""}
                      </span>
                         <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                         <span className="bs-stepper-label fontz_b fs-11">
                          {this.props.courseType == 0
                            ? " Free Pool"
                            : this.props.courseType == 1
                            ? " Free Pool"
                            : this.props.courseType == 2
                            ? " Free Content "
                            : ""}
                        </span>
                          <br></br>
                        <span
                          className="bs-stepper-circle "
                          title={
                            this.props.courseType == 0
                              ? " Free Pool"
                              : this.props.courseType == 1
                              ? " Free Pool"
                              : this.props.courseType == 2
                              ? " Free Content "
                              : ""
                          }
                        >
                          {this.props.courseType == 0
                            ? ""
                            : this.props.courseType == 1
                            ? ""
                            : this.props.courseType == 2
                            ? ""
                            : ""}
                        </span>

                      </React.Fragment>
                    )}

                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
              */}
             
             
             
             
             
             
             
             
             
             
             
             
              {/* <div className="line" /> */}
              {/* {this.props.permissions["pricing"]["read"] ? (
                <div
                  className="step"
                  data-target="#test-l-4"
                  onClick={() => this.stepperClick("test-l-4", "Pricing")}
                >
                  <a href="#">
                    <div className="stepper-box">
                      {this.state.activeStepper == "test-l-4" ? (
                        <span
                          className="bs-stepper-circle stepper-active"
                          title="Pricing"
                        >
                          Pricing
                        </span>
                      ) : (
                        <React.Fragment>
                          <span className="bs-stepper-circle " title="Pricing">
                            P
                          </span>
                          <br></br>
                          <span className="bs-stepper-label fs-11">
                            Pricing
                          </span>
                        </React.Fragment>
                      )}
                      <span className="bs-stepper-label" />
                    </div>
                  </a>
                </div>
              ) : (
                <div className="step disabled">
                  <a href="#">
                    <div className="stepper-box">
                      <span className="bs-stepper-circle">Pricing</span>
                      <span className="bs-stepper-label" />
                    </div>
                  </a>
                </div>
              )} */}
              {/* <div className="line" /> */}
              <div
                className="step"
                data-target="#test-l-6"
                onClick={() => this.stepperClick("test-l-6", "Faq")}
              >
                <a href="#">
                  <div className="stepper-box">
                    {this.state.activeStepper == "test-l-6" ? (
                      <div>
                      <span className="bs-stepper-label fontz_b fs-11">Faq</span>
                       <br></br>
                      <span
                        className="bs-stepper-circle stepper-active"
                        title="Faq"
                      >
                      </span>
                         <div>
                          <i className="fa fa-caret-down co_g20A84C" aria-hidden="true"></i> 
                      </div>
                      </div>
                    ) : (
                      <React.Fragment>
                     <span className="bs-stepper-label fontz_b fs-11">Faq</span>
                     <br></br>
                        <span className="bs-stepper-circle " title="Faq">
                        </span>
                      </React.Fragment>
                    )}
                    <span className="bs-stepper-label" />
                  </div>
                </a>
              </div>
            </div>
       </div>
            <div className="bs-stepper-content col">
              <form onSubmit={this.onSubmit}>
                <div id="test-l-1" className="content">
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.currentComp !== null
                            ? this.state.currentComp
                            : ""}
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            &nbsp; &nbsp; &nbsp;
                            <button
                              type="button" 
                              className="btn admin_btn"
                              onClick={() => this.stepper.next()}
                            >
                              <i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                               Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="test-l-2"
                  className={
                    this.props.courseType != 0 && this.state.render
                      ? "content hideimp"
                      : "content"
                  }
                >
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render ? (
                            <AdminCourse
                              keyProp={newKey}
                              isEdit={this.state.isEdit}
                              courseType={this.props.courseType}
                              permissions={this.props.permissions}
                              isUpdate={this.isUpdate}
                              courseTitle={this.state.courseTitle}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            &nbsp; &nbsp; &nbsp;
                            <button
                              type="button"
                              className="btn admin_btn"
                              onClick={() => this.stepper.next()}
                            >
                              <i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                               Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="test-l-5" className="content">
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {/* 0= course faq 1= website general faq */}
                          {this.state.render ? (
                            <Coursefeature
                              keyProp={"courses/" + newKey + "/courseFeatures/"}
                              isEdit={this.state.isEdit}
                              permissions={this.props.permissions}
                              courseTitle={this.state.courseTitle}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            &nbsp; &nbsp; &nbsp;
                            <button
                              type="button"
                              className="btn admin_btn"
                              onClick={() => this.stepper.next()}
                            >
                               <i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                               Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="test-l-6" className="content">
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {/* 0= course faq 1= website general faq */}
                          {this.state.render ? (
                            <Addfaq
                              keyProp={"courses/" + newKey + "/"}
                              permissions={this.props.permissions}
                              isEdit={this.state.isEdit}
                              courseTitle={this.state.courseTitle}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="test-l-9"
                  className={
                    (this.props.courseType != 2 ||
                      this.state.courseDateType == null) &&
                    this.state.render
                      ? "content hideimp"
                      : "content"
                  }
                >
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render == "1" ? (
                            <CCSessionsHome
                              courseType={this.props.courseType}
                              permissions={this.props.permissions}
                              keyProp={newKey}
                              changeFlag={this.state.changeFlag}
                              permissions={this.props.permissions}
                              update={this.state.update}
                              isEdit={this.state.isEdit}
                              render={this.state.render}
                              courseTitle={this.state.courseTitle}
                              isUpdate={this.isUpdate}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="test-l-10"
                  className={
                    (this.props.courseType != 2 ||
                      this.state.courseDateType == null) &&
                    this.state.render
                      ? "content hideimp"
                      : "content"
                  }
                >
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render == "1" ? (
                            <CCExamsHome
                              courseType={this.props.courseType}
                              permissions={this.props.permissions}
                              keyProp={newKey}
                              changeFlag={this.state.changeFlag}
                              permissions={this.props.permissions}
                              update={this.state.update}
                              isEdit={this.state.isEdit}
                              render={this.state.render}
                              courseTitle={this.state.courseTitle}
                              isUpdate={this.isUpdate}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="test-l-11"
                  className={
                    (this.props.courseType != 2 ||
                      this.state.courseDateType == null) &&
                    this.state.render
                      ? "content hideimp"
                      : "content"
                  }
                >
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render == "1" ? (
                            <SessionsRecordings
                              courseType={this.props.courseType}
                              permissions={this.props.permissions}
                              keyProp={newKey}
                              changeFlag={this.state.changeFlag}
                              permissions={this.props.permissions}
                              update={this.state.update}
                              isEdit={this.state.isEdit}
                              render={this.state.render}
                              courseTitle={this.state.courseTitle}
                              isUpdate={this.isUpdate}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="test-l-8"
                  className={
                    parseInt(this.props.courseType) != 2
                      ? " content hideimp"
                      : "content"
                  }
                >
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {/* 0= course faq 1= website general faq */}
                          {this.state.render &&
                          parseInt(this.props.courseType) == 2 ? (
                            <FilesHome
                              keyProp={newKey}
                              permissions={this.props.permissions}
                              isEdit={this.state.isEdit}
                              courseTitle={this.state.courseTitle}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="test-l-3" className="content">
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render && this.state.update ? (
                            this.props.courseType == 0 ? (
                              <QPHome
                                keyProp={newKey}
                                isCourse={true}
                                permissions={this.props.permissions}
                                courseType={this.props.courseType}
                                isEdit={this.state.isEdit}
                                courseTitle={this.state.courseTitle}
                                render={this.state.render}
                              />
                            ) : this.props.courseType == 1 ? (
                              <PaperMockHome
                                courseType={this.props.courseType}
                                keyProp={newKey}
                                isEdit={this.state.isEdit}
                                permissions={this.props.permissions}
                                render={this.state.render}
                                courseTitle={this.state.courseTitle}
                                isUpdate={this.isUpdate}
                              />
                            ) : this.props.courseType == 2 ? (
                              <CCHome
                                courseType={this.props.courseType}
                                permissions={this.props.permissions}
                                keyProp={newKey}
                                changeFlag={this.state.changeFlag}
                                permissions={this.props.permissions}
                                update={this.state.update}
                                isEdit={this.state.isEdit}
                                render={this.state.render}
                                courseTitle={this.state.courseTitle}
                                isUpdate={this.isUpdate}
                              />
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        <div id="test-l-8" className="content">
                          <div className="container">
                            <div className="admin-card steper_below card">
                              <div className="card-body">
                                <div className="form-group">
                                  {/* 0= course faq 1= website general faq */}
                                  {this.state.render &&
                                  parseInt(this.props.courseType) == 2 ? (
                                    <FilesHome
                                      keyProp={newKey}
                                      permissions={this.props.permissions}
                                      isEdit={this.state.isEdit}
                                      courseTitle={this.state.courseTitle}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            &nbsp; &nbsp; &nbsp;
                            <button
                              type="button"
                              className="btn admin_btn"
                              onClick={() => this.stepper.next()}
                            >
                                <i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                               Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="test-l-7" className="content">
                  <div className="container">
                    <div className="admin-card steper_below card">
                      <div className="card-body">
                        <div className="form-group">
                          {this.state.render && this.state.update ? (
                            this.props.courseType == 2 ? (
                              <FreeCC
                                courseType={this.props.courseType}
                                permissions={this.props.permissions}
                                keyProp={newKey}
                                isEdit={this.state.isEdit}
                                render={this.state.render}
                                courseTitle={this.state.courseTitle}
                                isUpdate={this.isUpdate}
                                update={this.state.update}
                              />
                            ) : (
                              <FreePool
                                courseType={this.props.courseType}
                                courseTitle={this.state.courseTitle}
                                isFree={true}
                                permissions={this.props.permissions}
                                keyProp={newKey}
                                isEdit={this.state.isEdit}
                                isCourse={true}
                                render={this.state.update}
                              />
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            &nbsp; &nbsp; &nbsp;
                            <button
                              type="button"
                              className="btn admin_btn"
                              onClick={() => this.stepper.next()}
                            >
                              <i className="fa fa-arrow-right" aria-hidden="true"></i>&nbsp;&nbsp;
                               Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="test-l-4" className="content">
                  <div className="container">
                    {this.state.render ? (
                      <Pricing
                        permissions={this.props.permissions}
                        keyProp={newKey}
                        courseTitle={this.state.courseTitle}
                        isEdit={this.state.isEdit}
                        courseType={this.props.courseType}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddCourseHome;
