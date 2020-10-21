import React, { Component } from "react";
var currentYear = new Date();
currentYear = currentYear.getFullYear();
class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <footer className="bg-white">
          <hr className="tm-0 bm-0" />
          <div className="container">
            <br />
            <div className="row lrm-0">
              <div className="col-md-6 lrp-0">
                <br />

                <br />
                <h5 className="notoFont-normal text-black bm-0">Site Map</h5>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <div className="bm-10 no_underline">
                      <a href="/" className="text_grey fs-14">
                        Home
                      </a>
                    </div>
                    <div className="bm-10 no_underline">
                      <a href="/course" className="text_grey">
                        Courses
                      </a>
                    </div>

                    <div className="bm-10 no_underline">
                      <a href="practicequestion" className="text_grey">
                        Practice Question
                      </a>
                    </div>

                    <div className="bm-10 no_underline">
                      <a href="/mockexam" className="text_grey">
                        Mock Exam
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bm-10 no_underline ">
                      <a href="/about" className="text_grey">
                        About Us
                      </a>
                    </div>

                    <div className="bm-10 no_underline">
                      <a
                        href="http://blog.med-examexpert.com"
                        className="text_grey"
                      >
                        Blog
                      </a>
                    </div>

                    <div className="bm-10 no_underline">
                      <a href="/faq" className="text_grey">
                        FAQ's
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 lrp-0">
                <div className="row">
                  <div className="col-md-7">
                    <br />
                    <br />
                    <div className="bm-10">
                      {" "}
                      <h4>Learn anytime, anywhere</h4>
                    </div>

                    <p>
                      Take courses on any of your devices Go at your own pace
                      with lifetime access. <b>COMING SOON</b>{" "}
                    </p>
                    <div className="row">
                      <div className="col-md-5  footer-img-pad">
                        <img
                          src={require("../assets/image/apple_btn@2x.png")}
                          className="footer-img float-right"
                          alt="app store"
                        />
                      </div>
                      <div className="col-md-5  footer-img-pad">
                        <img
                          src={require("../assets/image/google_btn@2x.png")}
                          className="footer-img"
                          alt="google play"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 lrp-0">
                    <img
                      src={require("../assets/image/Group 304@2x.png")}
                      className="w-100"
                      alt="mobile app"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="container ptb-30 ">
            <div className="row footer-text-copyright">
              <div className=" col-md-6">
                <p className="text-small">
                  Copyright &copy; {currentYear} Med Exam Expert.
                </p>
              </div>
              <div className="  col-md-6">
                <div className="row text-right footer-bottom float-right">
                  <a href="#" className="black_text text-small">
                    Terms
                  </a>{" "}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="#" className="black_text text-small">
                    Privacy Policy and Cookie Policy
                  </a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="#" className="black_text">
                    Intellectual Property
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      */}
      </React.Fragment>
    );
  }
}

export default Footer;
