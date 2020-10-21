import React, { Component } from "react";
import { auth } from "../firebase";
import { db } from "../firebase/firebase";
import WebNotif from "./WebNotif";
import { Redirect } from "react-router";
var obj = new WebNotif();
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  state = {
    redirection: true
  };
  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ error: null });
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        if (authUser.user.emailVerified) {
          this.setState({ ...INITIAL_STATE });
          db.ref(`userInfo`)
            .orderByChild("email")
            .equalTo(email)
            .once("value")
            .then(snapshot => {
              if (snapshot.val() != null) {
                if (snapshot.val() != null) {
                  Object.keys(snapshot.val()).map(key => {
                    if (snapshot.val()[key].twoStep == false) {
                      this.setState({ redirection: true });
                    }
                  });
                }
              }
            });
        } else {
          this.setState({
            error: {
              message:
                "Email not verified. Kindly verify your email to continue"
            }
          });
        }

        if (authUser.user.emailVerified) {
          obj.createNotification("success", "Login successfull.");
          this.props.toLogin();
        }
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };
  state = {};
  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <React.Fragment>
   =     <form onSubmit={this.onSubmit}>
          <div className="d-flex justify-content-center">
            <div className="form-group col">
              <input
                className="form-control auth-input"
                value={email}
                onChange={event =>
                  this.setState(byPropKey("email", event.target.value))
                }
                type="text"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-group col">
              <input
                className="form-control auth-input"
                value={password}
                onChange={event =>
                  this.setState(byPropKey("password", event.target.value))
                }
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            {error && <p className="red-text">{error.message}</p>}
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-group col-md-6 text-center">
              <button
                className="btn btn-primary custom-btn"
                disabled={isInvalid}
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
          <br />
        </form>
        <WebNotif />
      </React.Fragment>
    );
  }
}

export default SignIn;
