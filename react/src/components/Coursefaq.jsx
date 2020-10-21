import React, { Component } from "react";
class Coursefaq extends Component {
  state = {};
  render() {
    return (
      <div className="col-md-12 ">
        <br />

        <div className="col-md-12 lrp-0">
          <span className="fs-24 notoFont-normal"> FAQ's</span>
          <span className=" float-right" style={{ marginTop: "7px" }}>
            <i class="fa fa-clock-o fa-lg" /> Duration &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;
          </span>
        </div>
        <br />
        <div className="row mbt-20">
          <div className="col-sm-12">
            {this.props.faq == null
              ? "Currently there are no FAQs available."
              : Object.keys(this.props.faq).map(key => (
                  <div className="accordion-group" key={key}>
                    <div className="accordion-heading ">
                      <div className="row">
                        <div className="col-md-12">
                          <a
                            className="accordion-toggle  no_border"
                            data-toggle="collapse"
                            data-parent="toggle"
                            href={"#" + key}
                          >
                            <i className="fa fa-align-justify" />
                            &nbsp; &nbsp; {this.props.faq[key].question}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id={key} className="collapse">
                      <div className="accordion-inner accordion-body faq-body in">
                        <div className="lrp-40">
                          {this.props.faq[key].answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Coursefaq;
