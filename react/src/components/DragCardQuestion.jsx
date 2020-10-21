import React, { Component } from "react";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class DragCardQuestion extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col lrp-0">
          <div className="accordion-group box_shadow1">
            <div className="accordion-heading">
              <div className="row lrm-0 ptb-5">
                <div className="col-md-9 lrp-0">
                  <a
                    className="accordion-toggle d-Qcard"
                    data-toggle="collapse"
                    data-parent="toggle"
                    href={"#" + this.props.kp + "lop"}
                  >
                    <div className="bold lrp-15">
                      {parseInt(this.props.kp) + 1 + ". "}{" "}
                      {this.props.qobj.Description} &nbsp; &nbsp; (
                      {this.props.qobj.type == 1
                        ? "SBA"
                        : this.props.qobj.type == 2
                        ? "MCQs"
                        : this.props.qobj.type == 3
                        ? "EMQ"
                        : "T/F"}
                      )
                    </div>
                  </a>
                </div>

                <div className="col">
                  <div className="row lrm-0">
                    <div class="form-group bm-0 ">
                      <input
                        type="number"
                        disabled={this.props.isFree}
                        value={
                          this.props.qobj.score != undefined
                            ? this.props.qobj.score
                            : null
                        }
                        class="form-control fs-12"
                        placeholder="Score"
                        onChange={event => {
                          this.setState(byPropKey("score", event.target.value));
                          this.props.addScore(
                            event.target.value,
                            this.props.kp
                          );
                        }}
                      />
                    </div>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <i
                      class="fa fa-pencil-square-o clr-darkpurple pointer"
                      aria-hidden="true"
                      style={{ marginTop: "13px" }}
                    />
                    &nbsp; &nbsp;
                    <i
                      class="fa fa-trash clr-darkpurple pointer"
                      aria-hidden="true"
                      style={{ marginTop: "12px" }}
                      onClick={() => this.props.remove(this.props.kp)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              id={this.props.kp + "lop"}
              className="accordion-body faq-body collapse in "
            >
              <div className="accordion-inner lrp-15">
                <div className="options">
                  <div>
                    {this.props.qobj.options == null
                      ? ""
                      : Object.keys(this.props.qobj.options).map((key, idx) => (
                          <div key={key}>
                            {"(" +
                              String.fromCharCode(
                                "a".charCodeAt() + parseInt(idx)
                              ) +
                              ")."}
                            &nbsp; &nbsp; &nbsp;
                            {this.props.qobj.options[key]} &nbsp;{" "}
                            {this.props.qobj.answer != undefined &&
                            this.props.qobj.answer[key] !== undefined ? (
                              <i
                                class="fa fa-check fa-lg clr-green1"
                                aria-hidden="true"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                    {/* use object .keys */}
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DragCardQuestion;
