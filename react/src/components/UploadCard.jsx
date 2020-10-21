import React, { Component } from "react";
import { Line } from "rc-progress";

class UploadCard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    fileName: null,
    fileProgress: null,
    uploadStart: false
  };
  componentDidMount() {
    this.setState({
      fileName: this.props.fileName,
      fileProgress: this.props.fileProgress,
      uploadStart: this.props.uploadStart
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fileName: nextProps.fileName,
      fileProgress: nextProps.fileProgress,
      uploadStart: nextProps.uploadStart
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.fileName != null ? (
          <div className="uploadCard box_shadow1">
            <div className="row lrm-0">
              <div className="col-md-5">
                <span className="" title={this.state.fileName}>
                  {this.state.fileName !== null &&
                  this.state.fileName.length > 29
                    ? this.state.fileName.slice(0, 30) + "...."
                    : this.state.fileName}{" "}
                  &nbsp;&nbsp;
                </span>
              </div>
              <div className="col-md-5">
                {this.state.uploadStart && this.state.fileProgress > -1 ? (
                  <Line
                    percent={this.state.fileProgress}
                    strokeWidth="2.5"
                    trailWidth="2.5"
                    strokeColor={
                      this.state.fileProgress < 100 ? "red" : "#3AEAAE"
                    }
                    style={{
                      height: "10px",
                      width: "150px",
                      borderRadius: "5px"
                      // position: "absolute",
                      // bottom: "7.5px"
                    }}
                  />
                ) : (
                  ""
                )}{" "}
              </div>
              <div className="col-md-2">
                {!this.state.uploadStart ? (
                  <span
                    className="float-right pointer"
                    onClick={() => this.props.removeFile(this.props.id)}
                  >
                    <i className="fa fa-trash" style={{ color: "#3660C1" }} />
                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default UploadCard;
