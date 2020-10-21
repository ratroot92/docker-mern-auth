import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { auth } from "../../firebase";
import { firebase } from "../../firebase";
class AdmiNav extends Component {
  state = {
    authUser: null
  };
  componentDidMount() {
    if (this.state.loginRequest) {
      this.setState({ ModalOpen: true, showLogin: "show-block" });
    }
    firebase.auth.onAuthStateChanged(authUser => {
      authUser && authUser.emailVerified
        ? this.setState({ authUser, ModalOpen: false })
        : this.setState({ authUser: null });
    });
  }
  render() {
    return (
      <React.Fragment>
        <nav className="admin-navbar navbar navbar-fixed-top navbar-expand-lg navbar-light bg-white">
          <Link className="navbar-brand" to="/">
            <img src={require("../../assets/image/cpd/Favicon CPD.png")} height="55" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <div className="inset d-inline-block">
                  {/* <img
                    src={
                      this.state.authUser
                        ? this.state.authUser.photoURL
                        : "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
                    }
                    width="48"
                    height="48"
                    className="rounded-circle"
                  /> */}
                </div>
                &nbsp; &nbsp; &nbsp;
                <div className="text-darkgrey d-inline-block">
                  {" "}
                  {this.state.authUser == null
                    ? ""
                    :"" //this.state.authUser.displayName
                  }
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default AdmiNav;
