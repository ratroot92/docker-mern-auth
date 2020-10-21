import React, { Component } from "react";
class CourseCode extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="feature-card-home  ">
          {" "}
          <div className="card ">
            {" "}
            <img
              className="card-img-top-course img-fluid"
              src={this.props.slider.media.Image}
              alt="Course"
            />{" "}
            <div className="card-body card-body-course">
              {" "}
              <div className="row container">
                {" "}
                <div>
                  {" "}
                  <span className="fa fa-star rating-star" id="star1" />{" "}
                  <span className="fa fa-star rating-star" id="star2" />{" "}
                  <span className="fa fa-star rating-star" id="star3" />{" "}
                  <span className="fa fa-star rating-star" id="star4" />{" "}
                  <span className="fa fa-star rating-star" id="star5" />{" "}
                </div>
                <div>
                  {" "}
                  <p className="text-small ratingVal">
                    {this.props.slider.CourseRating.Score}&nbsp;&nbsp; (
                    {this.props.slider.CourseRating.Total})
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <h6 className="fs-13">
                  {" "}
                  <a href="/coursedetail/1" className="text-black">
                    {" "}
                    {this.props.slider.Title}{" "}
                  </a>{" "}
                </h6>{" "}
              </div>
              <p className="card-text clr-grey bm-0 fs-11">
                {" "}
                {this.props.slider.Description.length > 50
                  ? this.props.slider.Description.substr(0, 50) + "..."
                  : this.props.slider.Description}{" "}
              </p>
              <div className="course-price">
                {" "}
                <p className="card-price">
                  {" "}
                  <span
                    className={
                      parseInt(this.props.slider.pricing.basePlan.discount) == 0
                        ? "clr-grey fs-11 original-price hide"
                        : "clr-grey fs-11 original-price show"
                    }
                  >
                    {" "}
                    {this.props.slider.pricing.basePlan.currency} &nbsp;
                    {this.props.slider.pricing.basePlan.price}
                  </span>{" "}
                  &nbsp; &nbsp;{" "}
                  <b className="fs-13">
                    {this.props.slider.pricing.basePlan.currency} &nbsp;
                    {this.props.slider.pricing.basePlan.price}
                  </b>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CourseCode;
