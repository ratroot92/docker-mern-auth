import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import '../assets/css/navigation.css';
import { auth } from "../firebase";
import { firebase } from "../firebase";
import { db } from "../firebase/firebase";
import * as routes from "../constants/routes";
import UserAuth from "./UserAuth";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import WebNotif from "./WebNotif";

var obj = new WebNotif();
class Navigation extends Component {
  state = {
    ModalOpen: false,
    showLogin: "show-block",
    showSignUP: "hide-block",
    showForgetPassword: "hide-block",
    authUser: null,
    userRole: null,
    profilePic: null,
    totalItems: 0,
    showProfile: false,
    redirectionLogOut: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.state.loginRequest) {
      this.setState({ ModalOpen: true, showLogin: "show-block" });
    }
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser && authUser.emailVerified) {
        this.setState({ authUser, ModalOpen: false });
        db.ref("userInfo/" + authUser.uid)
          .once("value")
          .then(snapshot => {
            if (snapshot.val()) {
              this.setState({
                profilePic: snapshot.val().image,
                displayName: snapshot.val().name,
                userRole: snapshot.val().role
              });
            }
          });
      } else {
        this.setState({ authUser: null });
      }
    });

    if (cookie.load("mycart") !== undefined) {
      var myCart = cookie.load("mycart");
      this.setState({ totalItems: Object.keys(myCart).length });
    }
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.loginRequest) {
      this.setState({ ModalOpen: true, showLogin: "show-block" });
    }
    if (nextprops.cartAdd) {
      this.setState({ totalItems: parseInt(this.state.totalItems) + 1 });
    } else if (nextprops.cartRemove) {
      if (parseInt(this.state.totalItems) >= 0)
        this.setState({ totalItems: parseInt(this.state.totalItems) - 1 });
    }
  }
  signOut = () => {
    auth.doSignOut().then(event => {
      this.setState({ authUser: null, ModalOpen: false });

      this.setState({ redirectionLogOut: true }, () => {
        obj.createNotification("success", "Logout successfull.");
      });
    });
  };
  onOpenModal = () => {
    this.setState({ ModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
  };
  showLoginForm = () => {
    this.setState({ showLogin: "show-block" });
    this.setState({ showSignUP: "hide-block" });
    this.setState({ showForgetPassword: "hide-block" });
  };
  showSignUpForm = () => {
    this.setState({ showLogin: "hide-block" });
    this.setState({ showSignUP: "show-block" });
    this.setState({ showForgetPassword: "hide-block" });
  };
  showForgetForm = () => {
    this.setState({ showLogin: "hide-block" });
    this.setState({ showSignUP: "hide-block" });
    this.setState({ showForgetPassword: "show-block" });
  };
  userProfile = () => {
    this.setState({ showProfile: true });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirectionLogOut ? (
          <Redirect
            push
            to={{
              pathname: "/home"
            }}
          />
        ) : (
          ""
        )}
        <UserAuth
          hideLogin={this.onCloseModal}
          open={this.state.ModalOpen}
          showLogin={this.state.showLogin}
          showSignUp={this.state.showSignUP}
          showForget={this.state.showForgetPassword}
          ViewLogin={this.showLoginForm}
          ViewSignUp={this.showSignUpForm}
          ViewForget={this.showForgetForm}
          status={this.state.authUser}
        />
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container nav-container">
            <NavLink
              to={routes.HOME}
              activeClassName="active-nav"
              className="navbar-brand"
            >
              <img src={require("../assets/image/logo/logo.png")} height="55" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {this.state.userRole == "student" ? (
                  <li className="nav-item">
                   
                  </li>
                ) : this.state.userRole != null &&
                  this.state.userRole != undefined ? (
                  <li className="nav-item">
                    <NavLink
                      to={routes.PQA}
                      activeClassName="active-nav"
                      className="nav-link light-grey-clr"
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                ) : null}
                <li className="nav-item ">
                  <NavLink
                    to={routes.HOME}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={routes.COURSE}
                    // state={{ type: 2 }}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={routes.PQ}
                    // state={{ type: 0 }}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    Practice Questions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={routes.ME}
                    // state={{ type: 1 }}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    Mock Exam
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={routes.ABOUT}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    About
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <a
                    className="nav-link light-grey-clr"
                    href="http://35.226.166.78"
                  >
                    Blog
                  </a>
                </li> */}
                <li className="nav-item">
                  <NavLink
                    to={routes.FAQ}
                    activeClassName="active-nav"
                    className="nav-link light-grey-clr"
                  >
                    FAQ
                  </NavLink>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li className="nav-item ">
                  <NavLink
                    to={routes.Cart}
                    activeClassName="active-nav"
                    className="nav-link circlar-icon"
                  >
                    {" "}
                    <i
                      // data-count={this.state.totalItems}
                      className="fa fa-shopping-cart badge"
                      aria-hidden="true"
                    />
                    {this.state.totalItems > 0 ? (
                      <i className="badge-dot" />
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
                <li
                  className={
                    this.state.authUser == null
                      ? "show-block d-flex justify-content-center"
                      : "hide-block "
                  }
                >
                  <button
                    type="button"
                    className="btn btn-login custom-btn-login sigintop-fix"
                    onClick={this.onOpenModal}
                  >
                    <i className="fa fa-sign-in" aria-hidden="true" />
                    &nbsp;&nbsp;Login/Sign Up
                  </button>
                </li>
                <li
                  className={
                    this.state.authUser == null
                      ? "hide-block"
                      : "show-block d-flex justify-content-center"
                  }
                >
                  <div className=" dropdown">
                    <a
                      className="nav-link dropdown-toggle pt-0 hidden-caret"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          this.state.profilePic == null
                            ? "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
                            : this.state.profilePic
                        }
                        width="35"
                        height="35"
                        className="rounded-circle"
                      />
                      &nbsp; &nbsp; &nbsp;
                    </a>
                    <div className="dropdown-menu">
                      <div className="triangle" />

                      <div
                        style={{
                          padding: "0.25rem 1.5rem",
                          paddingBottom: "15px",
                          paddingTop: "5px",
                          whiteSpace: "nowrap"
                        }}
                        className="text-darkgrey d-inline-block pointer"
                        disabled
                      >
                        <span onClick={this.userProfile}>
                          <i className="fa fa-user" />
                          &nbsp;
                          <b>
                            {this.state.displayName == null
                              ? ""
                              : this.state.displayName}{" "}
                          </b>
                        </span>
                      </div>
                      <hr className="bm-0" style={{ marginTop: "0px" }} />
                      {this.state.userRole == "student  " ? null : (
                        <NavLink
                          to={routes.PQA}
                          activeClassName="active-nav"
                          className="dropdown-item"
                        >
                          {" "}
                          Admin Dashboard
                        </NavLink>
                      )}
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={this.signOut}
                      >
                        Log out
                      </a>
                    </div>
                  </div>
                 </li>
              </ul>
            </div>
          </div>
        </nav>

        <WebNotif />
      </React.Fragment>
    );
  }
}
export default Navigation;
