import React, { Component } from "react";
import DragableDiv from "./DragableDiv";

class PapersList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="papersList">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <span>Papers</span>
              </div>
              <div className="col-md-6">Add Paper</div>
            </div>
          </div>
          <DragableDiv />
        </div>
      </React.Fragment>
    );
  }
}

export default PapersList;
