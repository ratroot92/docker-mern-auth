import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "../assets/css/font-awesome.css";
// import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
// import "font-awesome/css/font-awesome.min.css";
// import "../assets/fonts/Merriweather/Merriweather-Regular.ttf";
import "../assets/css/App.css";
// import "../assets/css/main.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.min.js";


import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import Home from "./Home";

import Footer from "../components/footer";
import StaticHome from "../Home/homeT";
import Introduction from "../Home/Introduction";
import Login from "../Home/Login";
import Register from "../Home/Register";
import Service from "../Home/Service";
import ForgotPassword from "../Home/ForgotPassword";
import OnlineCourse from "../Home/AssesmentCourse";
import CpdShortCourse from "../Home/CpdShort";
import CpdProfile from "../Home/CpdProfile";
import LiveWebinar from "../Home/LiveWebinar";
import MessageChairman from "../Home/MessageChairman";
import ByeLaws from "../Home/Cpdbyelaws";
import GuideLineMaual from "../Home/GuideLineManual";
import EPE from "../Home/EPE";
import PEB from "../Home/PEB";
import FORMDOCUMENT from "../Home/FormDocumen";
import ScheduleCpdActivityYY from "../Home/ScheduleCpdActivity";
import CPDRecognition from "../Home/CPDrecognition";
import ProfessionalEngnrBodie from "../Home/ProfessionalEngnrBodies";
import ShortCoursesPPTA from "../Home/ShortCoursesPPT";
import Principal from "../Home/Registeration_PEB/Principal";
import Crieteria from "../Home/Registeration_PEB/Crieteria";
import Procedure from "../Home/Registeration_PEB/Procedure";
import GuidelinesCPDBodieswithPEC from "../Home/Registeration_PEB/GuidelinesCPDBodieswithPEC";
import FeeStructureforRegistration from "../Home/Registeration_PEB/FeeStructureforRegistration";
import WebinarSearch from "../Home/WebinarSearch";
import DescriptionWebinar from "../Home/Description_Webinar";
import UserView from "../Home/UserView";
import UserLogss from "../Home/UserLogss";
import Webinartest from "../Home/Webinartest";
import EpdcIntroduction from "../Home/Epdc_introduction";
import ContactUS from "../Home/Contactus";
import Gallery from "../Home/Gallery";
import Organogram from "../Home/Organogram";
import EPDCCompostion from "../Home/EPDC_Compostion";
import EPECustom from "../Home/EPECustom";
import CalculatorofCPD from "../Home/Calculator_cpd";
import EPEForms from "../Home/EPEForms";
import CPDForms from "../Home/CPDForms";
import Documents from "../Home/Documents";
import SubGallery from "../Home/SubGalery";
import CPD_Resource_person from "../Home/CPDResourcePerson";
import Api_testing from "../Home/Api_testing";
import PEBs_calendar_2020 from "../Home/Peb_calender20";









import NoMatch from "../Home/NoMatch";


import About from "./About";
import Faq from "./Faq";
import CourseDetail from "./CourseDetail";
import Course from "./Courses";
import MyCourse from "./MyCourse";
import AssignmentsAdminHome from "./adminDashboard/AssignmentsAdminHome";

import AdminDashboard from "./adminDashboard/AdminDashboard";
import AdminMockCourse from "./adminDashboard/AdminMockCourse";
import QuestionSheet from "./QuestionSheet";
import QuestionForm from "./adminDashboard/QuestionFrom";
import AdminHome from "./adminDashboard/AdminHome";
import Adminfaq from "./adminDashboard/Adminfaq";
import Cart from "./Cart";
import ManageUsers from "./adminDashboard/ManageUsers";
import ManageUsersCourse from "./adminDashboard/ManageUsersCourse";
import QPAdmin from "./adminDashboard/QPAdmin";
import FeedbackHome from "./adminDashboard/FeedbackHome";
import Coupons from "./adminDashboard/Coupons";
import ManageCT from "./adminDashboard/ManageCT";
import Profile from "./Profile";
import UserPermissions from "./adminDashboard/UserPermissions";
import ManageSlider from "./adminDashboard/ManageSlider";
import PermissionsTable from "./adminDashboard/PermissionsTable";
import Unauthorized from "./Unauthorized";
import Logs from "./adminDashboard/Logs";
import { AdminRoute, CourseRoute } from "./PrivateRoutes";
import Page404 from "./404";
import * as routes from "../constants/routes";
import { firebase } from "../firebase";
import { db } from "../firebase/firebase";

import { auth } from "../firebase";
import Calculator_cpd from "../Home/Calculator_cpd";

class App extends Component {
  state = {
    UserId: null,
    auth: true,
    permissions:true,
    userPermissions:{
      "MC" : {
        "-LrOSse6LQCEnmO1Uzqa" : true,
        "-LsGp-kP-gQ7C0895f3z" : true
      },
      "coupon" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "course" : {
        "add" : true,
        "content" : {
          "add" : true,
          "delete" : true,
          "read" : true,
          "update" : true
        },
        "delete" : true,
        "details" : {
          "edit" : true,
          "read" : true
        },
        "pricing" : {
          "add" : true,
          "delete" : true,
          "read" : true,
          "update" : true
        },
        "questionBank" : {
          "delete" : true,
          "read" : true,
          "update" : true,
          "write" : true
        },
        "read" : true,
        "update" : true
      },
      "faq" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "feedback" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "manageCT" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "manageUser" : {
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "manageUserCourse" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "permissionTable" : {
        "read" : true
      },
      "questionBank" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "slider" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "userPermissions" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "course" : {
        "add" : true,
        "delete" : true,
        "read" : true,
        "update" : true
      },
      "webFaq" : {
        "read" : true
      }
    }
    ,
    isVerified: false,
  //   userAuth:{
  //     apiKey: "AIzaSyAVRTE335Q9hO1DJFLmqqaqN3D8zMuMmw0",
  //     appName: "[DEFAULT]",
  //     authDomain: "medexpert-d7560.firebaseapp.com",
  //     createdAt: "1571304443239",
  //     displayName: "usama",
  //     email: "usama.sama@gmail.com",
  //     emailVerified: true,
  //     isAnonymous: false,
  //     lastLoginAt: "1573731287957",
  //     phoneNumber: null,
  //     photoURL: "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/userImages%2Fnull%2Fd0568b5d-dcbb-40ca-be80-9c6ea5ac7ca9.jpg?alt=media&token=5259eb43-0ec1-4fcf-a1ea-62c3daadde49",
  //  providerData:[
  //       {
  //       displayName: "usama",
  //       email: "usama.sama@gmail.com",
  //       phoneNumber: null,
  //       photoURL: "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/userImages%2Fnull%2Fd0568b5d-dcbb-40ca-be80-9c6ea5ac7ca9.jpg?alt=media&token=5259eb43-0ec1-4fcf-a1ea-62c3daadde49",
  //       providerId: "password",
  //       uid: "usama.sama@gmail.com",
  //       redirectEventId: null,
  //     }
  //   ],
  //     redirectEventId: null,
  //     stsTokenManager:{
  //       accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MDgxMWNkYzYwOWQ5MGY5ODE1MTE5MWIyYmM5YmQwY2ViOWMwMDQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXNhbWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9tZWRleHBlcnQtZDc1NjAuYXBwc3BvdC5jb20vby91c2VySW1hZ2VzJTJGbnVsbCUyRmQwNTY4YjVkLWRjYmItNDBjYS1iZTgwLTljNmVhNWFjN2NhOS5qcGc_YWx0PW1lZGlhJnRva2VuPTUyNTllYjQzLTBlYzEtNGZjZi1hMWVhLTYyYzNkYWFkZGU0OSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tZWRleHBlcnQtZDc1NjAiLCJhdWQiOiJtZWRleHBlcnQtZDc1NjAiLCJhdXRoX3RpbWUiOjE1NzM3MzEyODcsInVzZXJfaWQiOiI1Y2VLT29wRVBIWlVkNkNtazR0Y0hRNENvaVgyIiwic3ViIjoiNWNlS09vcEVQSFpVZDZDbWs0dGNIUTRDb2lYMiIsImlhdCI6MTU3MzczMTI4NywiZXhwIjoxNTczNzM0ODg3LCJlbWFpbCI6InVzYW1hLnNhbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNhbWEuc2FtYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kMqMiVIAquIAjBX_glVXDRVMKaUNcmIYUWNwVSwVagp92WznuBm2jIRwbuQMldrxL-ztB_IFTyQEkM1gfRTM-wvJ7J762O7v4N8xBtmUteXOUca-STJ4QVpBoU9YPKJOKqiZBEMFx9xP4x5kyir6JpF0PTIbAQxLT_dNPyQuKiSvNFP_tcuO87l02_quh6YBxkI50LaZBoSCRTUvsQcNWGkeo_l0TQuRklWcYyKWp1SCM6fznKsVO3sM5ASLhwf4tDb5C51jC1jNG1ARkpkoooUcoJ3av0A8mQqlEBHgIlybuoUVJ7J-WW8caXxdAPoxAjNSF6HcS2CgB8tgISad_g",
  //       apiKey: "AIzaSyAVRTE335Q9hO1DJFLmqqaqN3D8zMuMmw0",
  //       expirationTime: 1573734882175,
  //       refreshToken: "AEu4IL1x5fxyritr2rlmgCgPVIKLBCJbzDfXLFLyh-IYafySA7ozZoKKFMUqoppaouZXki168wmxxOLX6-1j01cS0qVAlQhbYRllDNMaZDukJ1Qy7rdaQHEBhiFZyMBLyGKy-_vCISzS_-fgxyab-kCWUwCJ3-cSpzsckTT8-l1tEywB3X544TPWTvZg4EVULM_GzDWbesW09lsjFZ68yghrBN2KzXCazW4P9xYvff7TL4MPE90a25k",
  //     },
  //     uid: "5ceKOopEPHZUd6Cmk4tcHQ4CoiX2",
  // },
    RestrictedRoutes: [routes.Cart],
    checkout: false,
    myCourses: [],
    data: {
      totalPrice: "",
      ccName: "",
      add1: "",
      add2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: ""
    },
    roleName:"admin"
  };
  constructor(props) {
    super(props);
    var _self = this;
    // firebase.auth.onAuthStateChanged(authUser => {
    //   if (authUser != null) {
    //     db.ref("roles/" + authUser.uid)
    //       .once("value")
    //       .then(function(UP) {
    //         if (UP.val() && UP.val().role != null) {
    //           _self.setState({
    //             userPermissions: UP.val().role,
    //             permissions: true,
    //             roleName: UP.val().roleName,
    //             myCourses: UP.val().role.MC
    //           });
    //           console.log("userPermissions", UP.val().role);
    //         } else {
    //           _self.setState({
    //             permissions: true
    //           });
    //         }
    //         console.log(
    //           "App.js --> this.user role is",
    //           _self.state.userPermissions
    //         );
    //         console.log("App.js --> this.user id", authUser);
    //       });
    //   } else {
    //     this.setState({
    //       permissions: true
    //     });
    //   }
    //   authUser !== null
    //     ? authUser.emailVerified
    //       ? this.setState({
    //           UserId: authUser.uid,
    //           auth: true,
    //           userAuth: authUser,
    //           isVerified: true
    //         })
    //       : this.setState({ isVerified: false, auth: true })
    //     : this.setState({ UserId: null, auth: true });
    // });
  }
  componentDidMount() {}
  checkout = data => {
    this.setState({ isclick: true, data: data });
  };
  render() {
    var isNav = true;
    var isFooter = true;
    var tp = routes.Question.split("?");
    var questionURL = tp[0];
    if (
      window.location.href.indexOf(questionURL) !== -1 ||
      window.location.href.indexOf("/admin/") !== -1
    ) {
      isNav = false;
      isFooter = false;
    }

    return (
      <React.Fragment>
        {this.state.auth && this.state.permissions ? (
          <Router>
            <div className="bg-grey ">
              <Switch>
                <Route
                  exact
                  key="course"
                  path={routes.COURSE}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={2} />
                  )}
                />

                <Route
                  exact
                  key="mockexam"
                  path={routes.ME}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={1} />
                  )}
                />

                <Route
                  exact
                  key="practicequestion"
                  path={routes.PQ}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={0} />
                  )}
                />

                <Route
                  exact
                  path={routes.HOME}
                  render={props => (
                    // <Home {...props} userId={this.state.UserId} />
                    <StaticHome {...props}  />
                  )}
                />
           
              <Route exact path={"/"}render={props => (  <StaticHome {...props}  /> )}/>
              <Route exact path={routes.StaticLogin} render={props => ( <Login {...props}/>)} />
               <Route exact path={routes.Introduction} render={props => ( <Introduction {...props}/>)} />
               <Route exact path={routes.Service} render={props => ( <Service {...props}/>)} />
               <Route exact path={routes.Register} render={props => ( <Register {...props}/>)} />
               <Route exact path={routes.ForgotPassword} render={props => ( <ForgotPassword {...props}/>)} />
               <Route exact path={routes.Messageforchirman} render={props => ( <MessageChairman {...props}/>)} />
               <Route exact path={routes.CpdProfile} render={props => ( <CpdProfile  {...props}/>)}/>
               <Route exact path={routes.CpdShortCourse} render={props => ( <CpdShortCourse {...props}/>)} />
               {/* <Route exact path={routes.LiveWebinar} render={props => ( <UserView {...props}/>)} /> */}
               <Route exact path={routes.LiveWebinar} render={props => ( <DescriptionWebinar {...props}/>)} />

               <Route exact path={routes.AssesmentCourse} render={props => ( <OnlineCourse {...props}/>)} />
               <Route exact path={routes.ByeLaws} render={props => ( <ByeLaws {...props}/>)} />
               <Route exact path={routes.GuideLineMauals} render={props => ( <GuideLineMaual {...props}/>)} />
               <Route exact path={routes.EPE} render={props => ( <EPE {...props}/>)} />
               <Route exact path={routes.FormDocument} render={props => ( <FORMDOCUMENT {...props}/>)} />
               <Route exact path={routes.ScheduleCPDActivities} render={props => ( <ScheduleCpdActivityYY {...props}/>)} />
               <Route exact path={routes.CPDrecognition} render={props => ( <CPDRecognition {...props}/>)} />
               <Route exact path={routes.ProfessionalEngnrBodies} render={props => ( <ProfessionalEngnrBodie {...props}/>)} />
               <Route exact path={routes.ShortCoursesPPT} render={props => ( <ShortCoursesPPTA {...props}/>)} />
               <Route exact path={routes.peb} render={props => ( <PEB {...props}/>)} />
               <Route exact path={routes.Principal} render={props => ( <Principal {...props}/>)} />
               <Route exact path={routes.Crieteria} render={props => ( <Crieteria {...props}/>)} />
               <Route exact path={routes.Procedure} render={props => ( <Procedure {...props}/>)} />
               <Route exact path={routes.GuidelinesCPDBodieswithPEC} render={props => ( <GuidelinesCPDBodieswithPEC {...props}/>)} />
               <Route exact path={routes.FeeStructureforRegistration} render={props => ( <FeeStructureforRegistration {...props}/>)} />
               <Route exact path={routes.WebinarSearch} render={props => ( <WebinarSearch {...props}/>)} />
               <Route exact path={routes.DescriptionWebinar} render={props => ( <DescriptionWebinar {...props}/>)} />


               <Route exact path={routes.Instructorview} render={props => ( <LiveWebinar {...props}/>)} />
               <Route exact path={routes.epdcIntro} render={props => ( <EpdcIntroduction {...props}/>)} />
               <Route exact path={routes.ContactUS} render={props => ( <ContactUS {...props}/>)} />
               <Route exact path={routes.Gallery} render={props => ( <Gallery {...props}/>)} />
               <Route exact path={routes.Organogram} render={props => ( <Organogram {...props}/>)} />
               <Route exact path={routes.EPDCCompostion} render={props => ( <EPDCCompostion {...props}/>)} />
               <Route exact path={routes.EPECustom} render={props => ( <EPECustom {...props}/>)} />
               <Route exact path={routes.CalculatorofCPD} render={props => ( <CalculatorofCPD {...props}/>)} />
               <Route exact path={routes.CPDForms} render={props => ( <CPDForms {...props}/>)} />
               <Route exact path={routes.EPEForms} render={props => ( <EPEForms {...props}/>)} />
               <Route exact path={routes.CPD_Resource_person} render={props => ( <CPD_Resource_person {...props}/>)} />
               <Route exact path={routes.Documents} render={props => ( <Documents {...props}/>)} />
               <Route exact path={routes.sub_Gallery} render={props => ( <SubGallery {...props}/>)} />
               <Route exact path={routes.api_testing} render={props => ( <Api_testing {...props}/>)} />
               <Route exact path={routes.admin_dashboard} render={props => ( <AdminHome {...props}/>)} />
               <Route exact path={routes.userlogs} render={props => ( <UserLogss {...props}/>)} />
               <Route exact path={routes.webinartest} render={props => ( <Webinartest {...props}/>)} />
               <Route exact path={routes.PEBs_calendar_2020} render={props => ( <PEBs_calendar_2020 {...props}/>)} />
         
         
         
         
            <Route exact path={"/home111"}render={props => (
                    <Home {...props} userId={this.state.UserId} />
                    // <StaticHome {...props}  />
                  )}
                />
                <Route
                  exact
                  path={routes.ABOUT}
                  render={props => (
                    <About {...props} userId={this.state.UserId} />
                  )}
                />
                <Route
                  exact
                  path={routes.Profile}
                  render={props => (
                    <Profile {...props} userId={this.state.UserId} />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.Assignments}
                  roleName={this.state.roleName}
                  render={props => (
                    <AssignmentsAdminHome
                      {...props}
                      userId={this.state.UserId}
                    />
                  )}
                />
                <Route exact path={routes.FAQ} component={Faq} />

                <AdminRoute
                  exact
                  path={routes.QFeedback}
                  roleName={this.state.roleName}
                  render={props => (
                    <FeedbackHome
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["feedback"]}
                    />
                  )}
                />
                {this.state.permissions ? (
                  <Route exact path={"/error"} component={Unauthorized} />
                ) : null}

                <Route
                  exact
                  path={routes.COURSEDETAIL}
                  render={props => (
                    <CourseDetail {...props} userId={this.state.UserId} />
                  )}
                />

                {/* //logged in route */}
                <CourseRoute
                  exact
                  path={routes.MyCourse}
                  myCourses={this.state.myCourses}
                  render={props => (
                    <MyCourse {...props} userId={this.state.UserId} />
                  )}
                />
                <Route
                  exact
                  path={routes.Question}
                  roleName={this.state.roleName}
                  render={props => (
                    <QuestionSheet
                      {...props}
                      userId={this.state.UserId}
                      userAuth={
                        this.state.userAuth != null
                          ? this.state.userAuth.displayName
                          : null
                      }
                    />
                  )}
                />

                <AdminRoute
                  exact
                  path={routes.AdminMockCourse}
                  roleName={this.state.roleName}
                  render={props => (
                    <AdminMockCourse {...props} userId={this.state.UserId} />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.ManageSlider}
                  roleName={this.state.roleName}
                  render={props => (
                    <ManageSlider
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["slider"]}
                    />
                  )}
                />

                <AdminRoute
                  exact
                  path={routes.QuestionForm}
                  roleName={this.state.roleName}
                  render={props => (
                    <QuestionForm {...props} userId={this.state.UserId} />
                  )}
                />
                <AdminRoute
                  exact
                  key="admin-practicequestion"
                  path={routes.PQA}
                  roleName={this.state.roleName}
                  render={props => (
                    <AdminHome
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["course"]}
                      courseType={0}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  key="admin-mockexam"
                  path={routes.MEA}
                  roleName={this.state.roleName}
                  render={props => (
                    <AdminHome
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["course"]}
                      courseType={1}
                    />
                  )}
                />

                <AdminRoute
                  exact
                  key="admin-course"
                  path={routes.COA}
                  roleName={this.state.roleName}
                  render={props => (
                    <AdminHome
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["course"]}
                      courseType={2}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  key="course-edit"
                  path={routes.CourseEdit}
                  roleName={this.state.roleName}
                  render={props => (
                    <AdminHome {...props} userId={this.state.UserId} />
                  )}
                />
                <Route
                  exact
                  path={routes.Cart}
                  roleName={this.state.roleName}
                  render={props => (
                    <Cart
                      {...props}
                      userId={this.state.UserId}
                      userAuth={this.state.userAuth}
                      // checkout={this.checkout}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.ManageUsers}
                  roleName={this.state.roleName}
                  render={props => (
                    <ManageUsers
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["manageUser"]}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.ManageUsersCourse}
                  roleName={this.state.roleName}
                  render={props => (
                    <ManageUsersCourse
                      {...props}
                      userId={this.state.UserId}
                      permissions={
                        this.state.userPermissions["manageUserCourse"]
                      }
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.Coupons}
                  roleName={this.state.roleName}
                  render={props => (
                    <Coupons
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["coupon"]}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.Addfaq}
                  roleName={this.state.roleName}
                  render={props => (
                    <Adminfaq
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["faq"]}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.QuestionBank}
                  roleName={this.state.roleName}
                  render={props => (
                    <QPAdmin
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["questionBank"]}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.ManageCT}
                  roleName={this.state.roleName}
                  render={props => (
                    <ManageCT
                      {...props}
                      userId={this.state.UserId}
                      permissions={this.state.userPermissions["manageCT"]}
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.PermissionsTable}
                  roleName={this.state.roleName}
                  render={props => (
                    <PermissionsTable
                      {...props}
                      userId={this.state.UserId}
                      permissions={
                        this.state.userPermissions["permissionTable"]
                      }
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.UserPermissions}
                  roleName={this.state.roleName}
                  render={props => (
                    <UserPermissions
                      {...props}
                      userId={this.state.UserId}
                      permissions={
                        this.state.userPermissions["userPermissions"]
                      }
                    />
                  )}
                />
                <AdminRoute
                  exact
                  path={routes.Logs}
                  roleName={this.state.roleName}
                  render={props => (
                    <Logs {...props} userId={this.state.UserId} />
                  )}
                />
                <Route render={props => <Page404 {...props} />} />
              </Switch>
              {isFooter ? <Footer /> : null}

              <NotificationContainer />
            </div>
          </Router>
        ) : (
          <Router>
            <div className="bg-grey ">
              <Switch>
                <Route
                  exact
                  key="course"
                  path={routes.COURSE}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={2} />
                  )}
                />

                <Route
                  exact
                  key="mockexam"
                  path={routes.ME}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={1} />
                  )}
                />

                <Route
                  exact
                  key="practicequestion"
                  path={routes.PQ}
                  render={props => (
                    <Course {...props} userId={this.state.UserId} type={0} />
                  )}
                />

                {/* <Route
                  exact
                  path={routes.HOME}
                  render={props => (
                    <Home {...props} userId={this.state.UserId} />
                  )}
                /> */}
                <Route
                  exact
                  path={"/"}
                  render={props => (
                    <Home {...props} userId={this.state.UserId} />
                  )}
                />
                <Route
                  exact
                  path={routes.ABOUT}
                  render={props => (
                    <About {...props} userId={this.state.UserId} />
                  )}
                />
                <Route
                  exact
                  path={routes.Profile}
                  render={props => (
                    <Profile {...props} userId={this.state.UserId} />
                  )}
                />

                <Route exact path={"/error"} component={Unauthorized} />

                <Route
                  exact
                  path={routes.COURSEDETAIL}
                  render={props => (
                    <CourseDetail {...props} userId={this.state.UserId} />
                  )}
                />

                <Route
                  exact
                  path={routes.Cart}
                  roleName={this.state.roleName}
                  render={props => (
                    <Cart
                      {...props}
                      userId={this.state.UserId}
                      userAuth={this.state.userAuth}
                      // checkout={this.checkout}
                    />
                  )}
                />

                <Route render={props => ( <NoMatch {...props}/>)} />
                <Route render={props => <Page404 {...props} />} />
                
              </Switch>
              {isFooter ? <Footer /> : null}

              <NotificationContainer />
            </div>
          </Router>
        )}
      </React.Fragment>
    );
  }
}

export default App;
