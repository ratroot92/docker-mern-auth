import React, { Component } from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";

class Coursefeature extends Component {
  state = {
    t1TabColor: "bb_red",
    t2TabColor: "bb_grey",
    t3TabColor: "bb_grey",
    t1Status: "",
    t2Status: "hide",
    t3Status: "hide"
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({ courseTitle: this.props.courseTitle });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  tabActive = activeOption => {
    if (activeOption == 1) {
      this.setState({
        t1TabColor: "bb_red",
        t2TabColor: "bb_grey",
        t3TabColor: "bb_grey",
        t1Status: "",
        t2Status: "hide",
        t3Status: "hide"
      });
    } else if (activeOption == 2) {
      this.setState({
        t1TabColor: "bb_grey",
        t2TabColor: "bb_red",
        t3TabColor: "bb_grey",
        t1Status: "hide",
        t2Status: "",
        t3Status: "hide"
      });
    } else {
      this.setState({
        t1TabColor: "bb_grey",
        t2TabColor: "bb_grey",
        t3TabColor: "bb_red",
        t1Status: "hide",
        t2Status: "hide",
        t3Status: ""
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-7">
              <h5 className="card-title regular_font">Features</h5>
              <div className="col lrp-0">
                <span>
                  <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-md-5 lrp-0">
            </div>
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-center mtb-10">
          <div
            className="col-md-2 text-center pointer"
            onClick={() => this.tabActive(1)}
          >
            <p className="mb-0_5">Bullet Template </p>
            <div className={this.state.t1TabColor} />
          </div>
          <div
            className="col-md-2 text-center pointer"
            onClick={() => this.tabActive(2)}
          >
            <p className="mb-0_5">Paragraph Template</p>
            <div className={this.state.t2TabColor} />
          </div>
          <div
            className="col-md-2 text-center pointer"
            onClick={() => this.tabActive(3)}
          >
            <p className="mb-0_5">Image Template</p>
            <div className={this.state.t3TabColor} />
          </div>
        </div>
        <br />
        <div className={this.state.t1Status}>
          <Template1 dblink={this.props.keyProp} />
        </div>
        <br />
        <div className={this.state.t2Status}>
          <Template2 dblink={this.props.keyProp} />
        </div>
        <div className={this.state.t3Status}>
          <Template3 dblink={this.props.keyProp} />
        </div>
      </React.Fragment>
    );
  }
}

export default Coursefeature;
