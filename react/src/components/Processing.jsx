import React, { Component } from "react";
class Processing extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          this.props.showLoader == true
            ? "main-loader showLoader"
            : "main-loader hideLoader"
        }
      >
        <div className="loader">
          <div className="loader__figure" />
          <p className="loader__label">Processing</p>
        </div>
      </div>
    );
  }
}
export default Processing;
