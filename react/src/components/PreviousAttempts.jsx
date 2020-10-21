import React, { Component } from "react";
import { db } from "../firebase/firebase";
class PreviousAttempts extends Component {
  state = {
    examAtempts: null,
    attempt_Key: null
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    db.ref("myAttempts/" + this.props.userId + "/" + this.props.courseId)
      .once("value")
      .then(userAtt => {
        this.setState({ examAtempts: userAtt.val() });
      });
  }
  setKeyEqual = key => {
    console.log("selecting in PA file ");
    this.setState({ attempt_Key: key });
    this.props.selectedAttempt(key);
  };
  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div className="col-md-10 ">
            <div className="row p-20">
              <div className="col-md-9 ">
                <div className="">Previous Attempts </div>
              </div>
              <div className="col-md-3 vertical-line">Date</div>
            </div>
            <div className="bg-grey p-10">
              {this.state.examAtempts == null
                ? ""
                : Object.keys(this.state.examAtempts).map(key => (
                    <div
                      key={"prev" + key}
                      className={
                        this.state.attempt_Key == key
                          ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                          : "row  lrm-0 previous-attempts-div pointer"
                      }
                      onClick={() => this.setKeyEqual(key)}
                    >
                      <div className="col-md-9 ">
                        <div className="">
                          {this.state.examAtempts[key].title}
                          &nbsp; &nbsp;
                        </div>
                      </div>
                      <div className="col-md-3 vertical-line">
                        {this.state.examAtempts[key].DateCreated != undefined
                          ? this.state.examAtempts[key].DateCreated.replace(
                              "T",
                              " "
                            ).replace("Z", "")
                          : null}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-red white"
            onClick={this.props.previousAttempt}
            disabled={this.state.attempt_Key != null ? false : true}
          >
            Load Selected Attempt
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default PreviousAttempts;
