import React, { Component } from "react";
import ViewComp from "./ViewComp";
import QuestionSheet from "./QuestionSheet";

class QuizBook extends Component {
  constructor(props) {
    super(props);
  }
  state = { cc: null };
  componentDidMount() {
    this.setState({
      view: <QuestionSheet {...this.props} isBook={true} />
    });
    if (this.state.cc == null) {
      this.setState({
        fullScreen: this.props.fullScreen,
        cc: this.props.cc
      });
    }
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      fullScreen: nextProp.fullScreen,
      view: <QuestionSheet {...nextProp} isBook={true} />
      //   cc: nextProp.cc
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="col course-book coursebook-parent">
          <div className="row lrm-0">
            <div className="col " style={{ height: "80vh" }}>
              {this.state.view}
              {/* {this.state.fullScreen ? (
                <div
                  className="fullscreen pointer"
                  onClick={this.props.goFullScreen}
                >
                  <i class="fa fa-compress fa-lg"></i>
                </div>
              ) : (
                <div
                  className="fullscreen pointer"
                  onClick={this.props.goFullScreen}
                >
                  <i class="fa fa-expand fa-lg"></i>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QuizBook;
