import React, { Component } from "react";
import Navigation from "./Navigation";
import { db } from "../firebase/firebase";
import "../assets/css/faq.css";
class Faq extends Component {
  state = {
    faqs: []
  };
  componentDidMount() {
    db.ref(`faq`)
      .once("value")
      .then(snapshot => {
        this.setState({ faqs: snapshot.val() });
        this.setState({ showLoader: false });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />

        <div className="course_slider top-fix">
          {/* <h4 className="faq-slider-heading regular_font">
            Frequently Asked Questions
          </h4> */}
          <div className="container">
            <h2 className=" course-title-banner">Frequently Asked Questions</h2>{" "}
          </div>{" "}
        </div>
        <section>
          <div className="container faq-section">
            <div className="row">
              <div className="col-sm-12">
                {this.state.faqs == null
                  ? "Currently there are no FAQs"
                  : Object.keys(this.state.faqs).map(key => (
                      <div className="accordion-group" key={key}>
                        <div className="accordion-heading">
                          <a
                            className="accordion-toggle faq fs-16"
                            data-toggle="collapse"
                            data-parent="toggle"
                            href={"#" + key}
                          >
                            <i className="fa fa-angle-right " />
                            &nbsp; &nbsp; {this.state.faqs[key].question}
                          </a>
                        </div>
                        <div
                          id={key}
                          className="accordion-body faq-body collapse in"
                        >
                          <div className="lrp-40">
                            <div className="accordion-inner">
                              {this.state.faqs[key].answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="faq_subscribe">
            <div className="container">
              <div className="row ptb-50">
                <br />
                <div className="col-md-6">
                  <h1 className="text-white fs-2_25">
                    Subscribe to our newsletter
                  </h1>
                </div>
                <div className="col-md-4">
                  <div className="form-group col-md-12">
                    <input
                      type="email"
                      className="form-control custom-input-trans"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary sub_btn">Subscribe</button>
                </div>
              </div>
              <br />
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className=" container">
            <div className="row d-flex justify-content-center contact-us-heading">
              <div className=" col-md-8 homepage_contact_row  text-center">
                <div className="">
                  <h1 className="clr-black">
                    <b>Contact Us</b>
                  </h1>
                </div>
                <br />
             
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Faq;
