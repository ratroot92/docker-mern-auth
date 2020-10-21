import React, { Component } from "react";
import { Link } from "react-router-dom";

class LTR extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: "url(" + this.props.slider.image + ")"
          }}
          className="home_slider "
        >
          <div className="row lrm-0">
            <div className=" text-center home-slider1-txt">
              <h1 className="white fs-72">{this.props.slider.title}</h1>
              <div className="white online-course ">
                {" "}
                {this.props.slider.tag_state.toUpperCase()}
              </div>
              <br />
              <div className="white">INSTRUCTORS:</div>
              {Object.keys(this.props.slider.instructors).map(ins => (
                <p className="white fs-12 bm-0">
                  {this.props.slider.instructors[ins].name}{" "}
                </p>
              ))}

              <br />
              <br />

              <Link
                to={"/coursedetail/" + this.props.slider.key}
                className="white"
              >
                <button className="btn btn-primary btn-hollow">
                  Register Now
                </button>
              </Link>

              <br />
              <br />
              <br />

              <div className="white">
                <img
                  src={this.props.slider.tag_small}
                  alt="limited seats"
                  height="75"
                />
              </div>
              <br />
              <br />
              <br />
              <img src={this.props.slider.tag_large} alt="limited seats" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LTR;
