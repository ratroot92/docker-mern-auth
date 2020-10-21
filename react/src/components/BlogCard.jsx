import React, { Component } from "react";
class BlogCard extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  componentDidMount() {
    console.log("blogcardprops", this.props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-md-3">
          <div className="card cardblog">
            <img
              className="card-img-top img-fluid"
              src={
                this.props.slider.better_featured_image != null ||
                this.props.slider.better_featured_image != undefined
                  ? this.props.slider.better_featured_image.media_details.sizes
                      .medium_large.source_url
                  : "https://firebasestorage.googleapis.com/v0/b/medexpert-d7560.appspot.com/o/861d399c-f33a-461b-88e6-f03b20553dee-400ae8a57fe2.small.png?alt=media&token=2eeee345-9255-4c38-af15-6878dab59707"
              }
              alt="Card image cap"
            />
            <div className="card-body-home">
              <div className="row">
                <div className="col-md-8">
                  <a href={this.props.slider.link} className=" blog-link">
                    <p className="card-title text-left bold">
                      {this.props.slider.title.rendered}
                    </p>
                  </a>
                </div>
                <div className="col-md-4 lp-0 ho rizontal-border">
                  <div className="row">
                    <div className="col-md-4 lrp-0 text-right">
                      <i
                        className="fa fa-clock-o fs-30 text-red"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="col" style={{ paddingLeft: "0px" }}>
                      <h6 className="card-title text-right">
                        &nbsp;
                        <span className="fs-11">
                          {this.props.slider.date.split("T")[1]}
                        </span>
                        <br />
                        <span className="fs-11">
                          {this.props.slider.date.split("T")[0]}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="dashed" />
              <p className="card-text text-left">
                {this.props.slider.content.rendered.length > 20
                  ? this.props.slider.content.rendered
                      .replace(/<\/?[^>]+>/gi, " ")
                      .substr(0, 100) + "..."
                  : this.props.slider.content.rendered}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogCard;
