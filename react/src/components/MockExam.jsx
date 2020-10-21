import React, { Component } from "react";
import "../assets/css/course.css";
import UserDashNav from "./UserDashNav";

import { db } from "../firebase/firebase";
import Loader from "./loader";
class MockExam extends Component {
  state = {
    showLoader: true,
    product: []
  };
  componentDidMount() {
    db.ref(`userProducts/${this.props.userId}`)
      .orderByChild("type")
      .equalTo(1)
      .once("value")
      .then(snapshot => {
        this.setState({ product: snapshot.val() });
        this.setState({ showLoader: false });
      });
  }
  render() {
    return (
      <React.Fragment>
        <section className="bg-grey ptb-30 lrp-0">
          <div className="container lrp-0">
            <div className="col-md-12 lrp-0">
              <h4 className="bp-30 clr-grey">Mock Exams</h4>
              <div className="row w-100 mx-auto d-flex ">
                {this.state.product == null
                  ? "No Items"
                  : Object.keys(this.state.product).map((key, index) => (
                      <div className="col-md-3 lrp-5 bm-20" key={key}>
                        <div className="card">
                          <img
                            className="card-img-top img-fluid"
                            src={this.state.product[key].media.Image}
                            alt="Featured Image"
                          />
                          <div className="card-body">
                            <div>
                              <h6>{this.state.product[key].Title}</h6>
                            </div>
                            <p className="card-text clr-grey bm-0 fs-11">
                              {this.state.product[key].Description.length >
                              100 ? (
                                <React.Fragment>
                                  {this.state.product[key].Description.substr(
                                    0,
                                    100
                                  )}
                                  {"..."}
                                </React.Fragment>
                              ) : (
                                this.state.product[key].Description
                              )}
                            </p>
                            <div className="col-md-12 p-10">
                              <a
                                href={
                                  "/mycourse/" +
                                  this.state.product[key].courseId
                                }
                                className="text-white"
                              >
                                {" "}
                                <button className=" btn red_btn fs-13">
                                  {" "}
                                  Explore
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </section>
        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default MockExam;
