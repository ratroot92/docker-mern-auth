import React, { Component } from "react";
import { Thumbs } from "react-responsive-carousel";

class Papers extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: ""
  };
  componentDidMount() {
    this.setState({ title: this.props.title });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ title: nextprops.title });
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 lrp-0">
          <div className="row lrm-0 paper-row ">
            <div className="col-md-6">
              <h5 className="bm-0">{this.state.title}</h5>
            </div>
            <div className="col-md-6">
              <span
                className="float-right pointer"
                onClick={() =>
                  this.props.paperDelete({
                    secId: this.props.secId,
                    rowId: this.props.rowId
                  })
                }
              >
                <i className="fa fa-trash clr-darkpurple" aria-hidden="true" />{" "}
                Delete
              </span>
              <span
                className="float-right pointer"
                onClick={() =>
                  this.props.editPaper({
                    secId: this.props.secId,
                    rowId: this.props.rowId
                  })
                }
              >
                <i
                  className="fa fa-pencil clr-darkpurple "
                  aria-hidden="true"
                />{" "}
                Edit &nbsp;|&nbsp;&nbsp;
              </span>
              {this.props.paperClone != undefined ? (
                <span
                  className="float-right pointer"
                  onClick={() =>
                    this.props.paperClone({
                      secId: this.props.secId,
                      rowId: this.props.rowId,
                      title: this.state.title + " clone"
                    })
                  }
                >
                  <i
                    className="fa fa-clone clr-darkpurple"
                    aria-hidden="true"
                  />{" "}
                  Duplicate &nbsp;|&nbsp;&nbsp;
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Papers;
