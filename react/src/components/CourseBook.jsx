import React, { Component } from "react";
import ViewComp from "./ViewComp";
import CourseContent from "./courseContent";

class CourseBook extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  componentDidMount() {
    this.setState({ view: <ViewComp {...this.props} />, render: true });

    if (this.state.cc == null) {
      this.setState({
        cc: this.props.cc,
        fullScreen: this.props.fullScreen
      });
    }
  }
  componentWillReceiveProps(nextProp) {
    this.setState({ render: false, fullScreen: nextProp.fullScreen });

    this.setState({ view: <ViewComp {...nextProp} />, render: true });
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.state.fullScreen
              ? "col coursebook-parent"
              : "col  coursebook-parent"
          }
          style={{ height: "80vh" }}
        >
          {this.state.render ? this.state.view : null}
        </div>
      </React.Fragment>
    );
  }
}

export default CourseBook;
