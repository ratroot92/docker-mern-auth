import React, { Component } from "react";
import { auth } from "../firebase";
import { db } from "../firebase/firebase";
import WebNotif from "./WebNotif";

var obj = new WebNotif();

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        var objRole = {
          coupon: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          course: {
            add: false,
            content: {
              add: false,
              delete: false,
              read: false,
              update: false
            },
            delete: false,
            details: {
              edit: false,
              read: false
            },
            pricing: {
              add: false,
              delete: false,
              read: false,
              update: false
            },
            questionBank: {
              delete: false,
              read: false,
              update: false,
              write: false
            },
            read: false,
            update: false
          },
          faq: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          feedback: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          manageCT: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          manageUser: {
            delete: false,
            read: false,
            update: false
          },
          manageUserCourse: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          permissionTable: {
            read: false
          },
          questionBank: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          slider: {
            add: false,
            delete: false,
            read: false,
            update: false
          },
          userPermissions: {
            read: false
          }
        };
        db.ref("roles/" + authUser.user.uid).set({
          roleName: "Student",
          role: objRole
        });
        auth.doUpdateProfile(
          this.state.username,
          "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
        );
        db.ref(`userInfo/` + authUser.user.uid).set({
          name: username,
          email: email,
          role: "Student",
          twoStep: false,
          image:
            "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
        });
        auth.doSendEmailVerification().then(() => {
          obj.createNotification("success", "Kindly verify your email.");
          this.props.toLogin();
        });

        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    {
    }

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="d-flex justify-content-center">
            <div className="form-group col">
              <input
                className="form-control auth-input"
                value={username}
                onChange={event =>
                  this.setState(byPropKey("username", event.target.value))
                }
                type="text"
                placeholder="Full Name"
              />
            </div>
          </div>
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
                value={passwordOne}
                onChange={event =>
                  this.setState(byPropKey("passwordOne", event.target.value))
                }
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-group col">
              <input
                className="form-control auth-input"
                value={passwordTwo}
                onChange={event =>
                  this.setState(byPropKey("passwordTwo", event.target.value))
                }
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            {error && <p className="red-text">{error.message}</p>}
          </div>
          <div className="d-flex justify-content-center">
            <div className="form-group col-md-6 text-center">
              <button className="btn btn-primary custom-btn" type="submit">
                Signup
              </button>
            </div>
          </div>
        </form>
        <WebNotif />
      </React.Fragment>
    );
  }
}

export default SignUp;
