import React, { Component } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import SignIn from "./SignIn";
import SignUp from "./signUp";
import ForgerPassword from "./ForgetPassword";

class UserAuth extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  // render() {
  //     return (

  //      );
  // }
  render() {
    // const { open } = this.state;
    return (
      <React.Fragment>
        <div>
          {/* <button onClick={this.onOpenModal}>Open modal</button> */}
          <Modal open={this.props.open} onClose={this.props.hideLogin} center>
            <div className="custom-modal-width modal-content border-3">
              <div className="modal-body zero_padding">
                <div className="row lrm-0">
                  <div className="col-md-6 lrp-0">
                    <div className="loginCarouselThis">
                      <Carousel autoPlay infiniteLoop showArrows={false}>
                        <div className="login-slide text-left ">
                          <img className="chfix" />
                          <h1 className="white fs-3_5 fs-75">
                            Study Efficiently
                          </h1>
                          <br />
                          <p className="white" style={{ width: "350px" }}>
                            Our courses are designed to help you make most of
                            your time. Login to begin the preparation to
                            success.
                          </p>
                        </div>

                        <div className="signup-slide text-left ">
                          {/* <img src={require("../assets/image/signup.png")} /> */}
                          <h1 className="white fs-3_5 fs-75">
                            Believe <br /> in Success
                          </h1>
                          <br />
                          <p className="white" style={{ width: "350px" }}>
                            Our courses are designed to help you make most of
                            your time. Login/Sign up to begin the preparation to
                            success.
                          </p>
                        </div>
                      </Carousel>
                    </div>
                  </div>
                  <div className="col-md-6 lrp-0">
                    <div
                      className="col-md-12 "
                      style={{
                        paddingTop: "20%",
                        paddingLeft: "10%",
                        paddingRight: "10%"
                      }}
                    >
                      <div className="login-form">
                        <div className={this.props.showLogin}>
                          <div className="d-flex justify-content-center">
                            <h4 className="light-grey-clr">
                              <b>Login</b>
                            </h4>
                          </div>
                          <br />
                          <br />
                          <SignIn toLogin={this.props.ViewLogin} />
                          <div className="d-flex justify-content-center">
                            <div className="form-group col-md-6 text-center">
                              <a href="#" onClick={this.props.ViewForget}>
                                Forgot your password ?
                              </a>
                            </div>
                          </div>
                          <br />

                          <div className="d-flex justify-content-center">
                            <div className="form-group col-md-8 text-center">
                              Don't have an account ?{" "}
                              <a href="#" onClick={this.props.ViewSignUp}>
                                Sign Up
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="signup_form">
                        <div className={this.props.showSignUp}>
                          <div className="d-flex justify-content-center">
                            <h4 className="light-grey-clr">
                              <b>Signup</b>
                            </h4>
                          </div>
                          <br />
                          <br />

                          <SignUp toLogin={this.props.ViewLogin} />

                          <br />
                          <div className="d-flex justify-content-center">
                            <div className="form-group col-md-8 text-center">
                              Already have an account ?{" "}
                              <a href="#" onClick={this.props.ViewLogin}>
                                Log In
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forget_form">
                        <div className={this.props.showForget}>
                          <div className="d-flex justify-content-center">
                            <h4 className="light-grey-clr">
                              <b>Forgot Passward ?</b>
                            </h4>
                          </div>
                          <br />
                          <br />
                          <ForgerPassword toLogin={this.props.ViewLogin} />
                          <br />
                          <div className="d-flex justify-content-center">
                            <div className="form-group col-md-8 text-center">
                              Already have an account ?{" "}
                              <a href="#" onClick={this.props.ViewLogin}>
                                Log In
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default UserAuth;
