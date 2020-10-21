import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as routes from "../constants/routes";

class UserDashNav extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container nav-container">
            <a className="navbar-brand" href="#">
              <NavLink
                to={"/home"}
                activeClassName="active-nav"
                className="nav-link"
              >
                <img src={require("../assets/image/logo/logo.png")} height="55" />
              </NavLink>
            </a>
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
                <li className="show-block d-flex justify-content-center">
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
                        src="https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
                        width="35"
                        height="35"
                        className="rounded-circle"
                      />
                    </a>
                    <div className="dropdown-menu">
                      <NavLink
                        to={"/admin/practicequestion"}
                        activeClassName="active-nav"
                        className="dropdown-item"
                      >
                        {" "}
                        Admin Dashboard
                      </NavLink>

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
      </React.Fragment>
    );
  }
}

export default UserDashNav;
