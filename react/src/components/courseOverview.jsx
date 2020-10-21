import React, { Component } from "react";
import "../assets/css/course_overview.css";
class CourseOverview extends Component {
  state = {
    t1: [],
    t2: [],
    t3: [],
    courseTypeName: ""
  };
  componentDidMount() {
    if (this.props.courseFeature != null) {
      var t1 = [];
      var t2 = [];
      var t3 = [];
      Object.keys(this.props.courseFeature).map(key => {
        if (this.props.courseFeature[key] != null) {
          if (this.props.courseFeature[key].type == 1) {
            t1.push(this.props.courseFeature[key]);
          } else if (this.props.courseFeature[key].type == 2) {
            t2.push(this.props.courseFeature[key]);
          } else {
            t3.push(this.props.courseFeature[key]);
          }
        }
      });
      this.setState({ t1, t2, t3 });
    }

    // To Check for Type of course for dynamic About text.
    if (this.props.courseType !== null && this.props.courseType !== undefined) {
      switch (this.props.courseType) {
        case 0:
          this.setState({ courseTypeName: "Practice Questions" });
          break;
        case 1:
          this.setState({ courseTypeName: "Mock Exams" });
          break;
        case 2:
          this.setState({ courseTypeName: "Course" });
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <br />
          <br />
          <div className="col-md-12 lrp-0">
            <p>
              <b>About the {this.state.courseTypeName} </b>
            </p>
            <div className="row lrm-0 text-black">
              <p>{this.props.description}</p>
            </div>
          </div>
          <hr />
          {this.state.t1.length > 0
            ? Object.keys(this.state.t1).map(key => (
                <div className="container ptb-20">
                  <div className="col-md-12 lrp-0">
                    <h4 className="notoFont-normal bm-0">
                      {this.state.t1[key].title}
                    </h4>
                    <br />
                    <div className="row">
                      {Object.keys(this.state.t1[key].data).map(key1 => (
                        <div className="col-md-6">
                          <ul className="tickbullet lrp-0">
                            <li className="box_li " key={key1}>
                              &nbsp; &nbsp;
                              {this.state.t1[key].data[key1]}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : ""}
          {this.state.t2.length > 0
            ? Object.keys(this.state.t2).map(key => (
                <div className="container ptb-20">
                  <div className="col-md-12 lrp-0">
                    <h4 className="notoFont-normal bm-0">
                      {this.state.t2[key].title}
                    </h4>
                    <br />
                    <div className="row">
                      {Object.keys(this.state.t2[key].data).map(key1 => (
                        <p className="plr-20">
                          {this.state.t2[key].data[key1]}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : ""}
          {this.state.t3.length > 0
            ? Object.keys(this.state.t3).map(key =>
                this.state.t3[key].imgAlign == 1 ? (
                  <div className="container ptb-20">
                    <div className="row">
                      <img
                        src={this.state.t3[key].data.image}
                        alt="banner image"
                        width="650"
                        height="300"
                      />
                    </div>
                    <div>
                      <br />
                      <br />
                      <h4 className="notoFont-normal bm-0">
                        {this.state.t3[key].title}
                      </h4>
                      <br />
                      <p>{this.state.t3[key].data.detail}</p>
                    </div>
                  </div>
                ) : this.state.t3[key].imgAlign == 2 ? (
                  <div className="container ptb-20">
                    <div className="row">
                      <div className="col-md-8">
                        <h4 className="notoFont-normal bm-0">
                          {this.state.t3[key].title}
                        </h4>
                        <br />
                        <p>{this.state.t3[key].data.detail}</p>
                      </div>
                      <div className="col-md-4">
                        <img
                          src={this.state.t3[key].data.image}
                          alt="banner image"
                          width="200"
                          height="250"
                        />
                      </div>
                    </div>
                  </div>
                ) : this.state.t3[key].imgAlign == 3 ? (
                  <div className="container ptb-20">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={this.state.t3[key].data.image}
                          alt="banner image"
                          width="200"
                          height="250"
                        />
                      </div>
                      <div className="col-md-8">
                        <h4 className="notoFont-normal bm-0">
                          {this.state.t3[key].title}
                        </h4>
                        <br />
                        <p>{this.state.t3[key].data.detail}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )
            : ""}

          {this.props.instructor != null &&
          Object.keys(this.props.instructor).length > 0 ? (
            <React.Fragment>
              <h5 className="notoFont-normal">About the instructor</h5>
              <br />
              <div className="row">
                <div className="col-md-2">
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src={this.props.instructor.profile}
                        className="rounded-circle"
                        width="120"
                        height="120"
                      />
                      <br />
                      <br />
                      <div className="text-small text-center">
                        <i className="fa fa-star" /> &nbsp;&nbsp;
                        {this.props.instructor.rating}
                        <span className="text_grey"> Rating</span>
                      </div>
                      <div className="text-small text-center">
                        <i className="fa fa-play-circle" /> &nbsp;&nbsp;
                        {this.props.instructor.videos}{" "}
                        <span className="text_grey">Video</span>
                      </div>
                      <div className="text-small text-center">
                        <i className="fa fa-align-right" /> &nbsp;&nbsp;
                        {this.props.instructor.reviewsCount}{" "}
                        <span className="text_grey">Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="offset-md-1 col-md-9">
                  <h5>{this.props.instructor.name}</h5>
                  <p>
                    <b>{this.props.instructor.rank}</b>
                  </p>
                  {this.props.instructor.about}
                </div>
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default CourseOverview;
