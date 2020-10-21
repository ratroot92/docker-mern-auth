import React, { Component } from "react";
import QFeedback from "./QFeedback";
import QuestionFrom from "./QuestionFrom";
import Loader from "../loader";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
class FeedbackHome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    rq: true;
  }

  setComp = comp => {
    if (comp == 0) {
      this.setState({
        currentComp: (
          <QFeedback
            editQP={this.editQP}
            isCourse={this.props.isCourse}
            keyProp={this.props.keyProp}
            setComp={this.setComp}
            permissions={this.props.permissions}
          />
        ),
        active: 0
      });
    } else {
      this.setState({ currentComp: comp, active: 1 });
    }
  };
  editQP = (key, keyGroup) => {
    this.setState({
      currentComp: (
        <QuestionFrom
          reportQuestion={this.state.rq}
          setComp={this.setComp}
          qId={key}
          keyProp={this.props.keyProp}
          keyGroup={keyGroup}
          isCourse={this.props.isCourse}
        />
      ),

      active: 1
    });
  };

  state = {
    currentComp: (
      <QFeedback
        editQP={this.editQP}
        isCourse={this.props.isCourse}
        keyProp={this.props.keyProp}
        setComp={this.setComp}
        permissions={this.props.permissions}
      />
    ),
    active: 0
  };

  render() {
    return (
      <React.Fragment>
        <AdminNav />
        <div className="col-md-12">
          <div className="row">
            <AdminSidebar />
            <br />
            <br />
            <div className="col lrp-50 ptb-30 ">
              <div className="admin-card card">
                <div className="card-body">
                  <div className="container">
                    <div className=" col-md-12">
                      <div className="row">
                        <div className="col-md-7">
                          {this.state.active == 0 ? (
                            <h4 className="regular_font">Feedback</h4>
                          ) : (
                            <h4 className="regular_font">Edit Question</h4>
                          )}
                        </div>
                        <div className="col-md-5">
                          {this.state.active == 0 ? (
                            <React.Fragment />
                          ) : (
                            <React.Fragment>
                              <button
                                className="btn  fs-13 white admin-btn-green"
                                onClick={() => this.setComp(0)}
                              >
                                &nbsp;&nbsp; Back &nbsp;&nbsp;
                              </button>
                            </React.Fragment>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                    <hr className="hr-2" />
                    {this.state.currentComp !== null
                      ? this.state.currentComp
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FeedbackHome;
