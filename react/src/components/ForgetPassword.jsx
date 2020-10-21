import React, { Component } from "react";

import { auth } from "../firebase";
import WebNotif from "./WebNotif";

var obj = new WebNotif();
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        obj.createNotification(
          "success",
          "Password rest link sent to registered email."
        );
        this.props.toLogin();
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="d-flex justify-content-center">
            <div className="form-group col">
              <input
                className="form-control auth-input"
                value={this.state.email}
                onChange={event =>
                  this.setState(byPropKey("email", event.target.value))
                }
                type="text"
                placeholder="Email Address"
              />
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            {error && <p className="red-text">{error.message}</p>}
          </div>{" "}
          <div className="d-flex justify-content-center">
            <div className="form-group col-md-6 text-center">
              <button
                className="btn btn-primary custom-btn"
                disabled={isInvalid}
                type="submit"
              >
                Confrim
              </button>
            </div>
          </div>
        </form>
        <WebNotif />
      </React.Fragment>
    );
  }
}

export default ForgetPassword;
