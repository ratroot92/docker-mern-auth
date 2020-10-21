import React, { Component } from "react";
import Navigation from "./Navigation";
import { db } from "../firebase/firebase";

class Profile extends Component {
  state = {
    profile: null,
    course: null
  };
  componentDidMount() {
    const param = this.props.match.params;
    let key = param.id;
    db.ref("userInfo/" + key)
      .once("value")
      .then(snapshot => {
        this.setState({ profile: snapshot.val() });
      });
    db.ref("courses")
      .orderByChild("showInstructor")
      .equalTo(true)
      .once("value")
      .then(snapshot => {
        this.setState({ course: snapshot.val() });
      });
  }
  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.state.profile !== null ? (
          <section>
            <div className="about_slider top-fix">
              <h4 className="about-slider-heading regular_font">Profile</h4>
            </div>
            <div className="container ptb-50 ">
              <div className="col-md-12 lrp-0 ">
                <div className="col-md-12 row ">
                  <div className="col-md-3 p-25">
                    <img
                      className="br-50p"
                      width="200"
                      height="200"
                      src={
                        this.state.profile.image == null ||
                        this.state.profile.image == undefined
                          ? "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/default%20avatar.jpeg?alt=media&token=745e23ae-b374-4475-bb92-434674d62b5a"
                          : this.state.profile.image
                      }
                    />

                    <div className="">
                      <div className=" d-flex justify-content-center ptb-10">
                        <div className="row">
                          <div className="text-small">
                            <i className="fa fa-star " /> &nbsp;&nbsp;
                            <span>4.5</span>
                            <span className="text-lightgrey"> Rating</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h4>{this.state.profile.name}</h4>
                        <p className="mb-0_5">
                          {this.state.profile.qualification}
                        </p>
                        <div className="row col-md-12">
                          <div className="text-small">
                            <i className="fa fa-play-circle" /> &nbsp;&nbsp;
                            <span>4</span>
                            <span className="text-lightgrey"> Courses</span>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div className="text-small">
                            <i className="fa fa-align-right " /> &nbsp;&nbsp;
                            <span>45</span>
                            <span className="text-lightgrey">Reviews</span>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row col-md-12 ptb-50">
                        <div className="d-flex justify-content-center">
                          <div className="col-md-3">
                            <a href={this.state.profile.social.facebook}>
                              <i className="fa fa-facebook border-for-icon" />
                            </a>
                          </div>
                          <div className="col-md-3">
                            <a href={this.state.profile.social.twitter}>
                              <i className="fa fa-twitter border-for-icon" />
                            </a>
                          </div>
                          <div className="col-md-3">
                            <a href={this.state.profile.social.linkedin}>
                              <i className="fa fa-linkedin border-for-icon" />
                            </a>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-9 p-25">
                    <div className="pb-40">
                      <h4>
                        <b>About Me</b>
                      </h4>
                      <p>{this.state.profile.introduction}</p>
                    </div>
                    <section>
                      <h4 className="pb-10">
                        <b>Instructor For</b>
                      </h4>
                      <div className="row">
                        {this.state.course != null
                          ? Object.keys(this.state.course).map(key => (
                              <div className="col-md-4 p-10">
                                <div className="card box_shadow">
                                  <img
                                    className="card-img-top img-fluid"
                                    src={this.state.course[key].media.Image}
                                    alt="Featured Image"
                                  />
                                  <div className="card-body">
                                    <div>
                                      <a href={"/viewdetail/" + key}>
                                        {" "}
                                        <h6 className="text-black">
                                          {this.state.course[key].Title}
                                        </h6>{" "}
                                      </a>
                                    </div>
                                    <p className="card-text clr-grey bm-0 fs-11">
                                      {this.state.course[key].Description
                                        .length > 50
                                        ? this.state.course[
                                            key
                                          ].Description.substr(0, 50)
                                        : this.state.course[key].Description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          : "jkjjkjlkjlj"}
                      </div>
                    </section>
                    <section>
                      <div className="container ptb-50">
                        <div className="col-md-12  lrp-0">
                          <div className="col-md-12 lrp-0">
                            <h4>Rating and Reviews</h4>
                          </div>
                          <div className="col-md-12  lrp-0">
                            <br />
                            <div className="col-md-12 row box_shadow details_box">
                              <table className="table table-borderd table-striped">
                                <tbody>
                                  <tr>
                                    {/* <td>
                                <div className="d-flex justify-content-center">
                                  {this.state.courseId !== null ? (
                                    <Ratings
                                      courseId={this.state.courseId}
                                      userId={this.props.userId}
                                      readonly={true}
                                      textWhite={false}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  &nbsp;&nbsp;&nbsp;{" "}
                                  <span>
                                    Rated{" "}
                                    4.7
                                    out of 5.0
                                  </span>
                                </div>
                              </td> */}
                                  </tr>
                                  {/* {this.state.reviews != null
                              ? Object.keys(this.state.reviews).map(key => (
                                  <tr>
                                    <td>
                                      <div className="col-md-12 row">
                                        <div className="col-md-3 ">
                                          <img
                                            className="profile_image"
                                            src={this.state.reviews[key].image}
                                          />
                                        </div>
                                        <div className="col-md-9 ptb-20">
                                          <Ratings
                                            userId={null}
                                            readonly={true}
                                            textWhite={false}
                                            data={{
                                              Score: this.state.reviews[key]
                                                .score
                                            }}
                                          />
                                          <p className="text_grey">
                                            {this.state.reviews[key].review}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              : ""} */}
                                  <tr>
                                    <td>
                                      <br />

                                      <div className="d-flex justify-content-center">
                                        <button className="btn btn-primary red_out_btn fix_width_btn_lg">
                                          View more
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        <section>
         </section>
        <section className="bg-white">
          <div className="container  ">
            <div className="row d-flex justify-content-center">
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

export default Profile;
