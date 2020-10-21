import React, { Component } from "react";
import QuestionPoolComponent from "./QuestionPoolComponent";
import QuestionsPool from "./QuestionsPool";
import DragCardQuestion from "../DragCardQuestion";
import QuestionList from "../QuestionList";
// import { db } from "../firebase/firebase";
import WebNotif from "../WebNotif";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

var obj = new WebNotif();

class FreePool extends Component {
  state = { addMore: false, items: [], s_ID: [] };
  addSection = () => {
    this.setState({ addMore: true });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  componentDidMount() {
    this.setState({ courseTitle: this.props.courseTitle });

    // if (this.props.isEdit) {
    //   db.ref("courses/" + this.props.keyProp + "/freeResource/")
    //     .once("value")
    //     .then(snapshot => {
    //       if (snapshot.val() != null) {
    //         var data = snapshot.val();
    //         // for (var i = 0; i < data.length; i++)
    //         var items = [...this.state.items];
    //         var s_ID = [...this.state.s_ID];
    //         Object.keys(data).map(key => {
    //           items.push(
    //             <DragCardQuestion
    //               key={data[key]["key"]}
    //               qobj={data[key]}
    //               kp={items.length}
    //               isFree={true}
    //               remove={this.removeQ}
    //             />
    //           );
    //           s_ID.push(data[key]["key"]);
    //         });
    //         this.setState({ s_ID });
    //         this.setState({ items });
    //       }
    //     });
    // }
  }
  PoolAddition = (obj, key) => {
    var items = [...this.state.items];
    items.push(
      <DragCardQuestion
        kp={items.length}
        qobj={obj}
        isFree={true}
        qid={key}
        remove={this.removeQ}
      />
    );
    this.setState({ items });
    var s_ID = [...this.state.s_ID];
    s_ID.push(key);
    this.setState({ s_ID });
  };
  selectSource = key => {
    this.setState({ source: key });
  };
  // saveForm = () => {
  //   var dbObj = [];
  //   for (var i = 0; i < this.state.items.length; i++) {
  //     this.state.items[i].props.qobj["score"] = 1;
  //     dbObj.push(this.state.items[i].props.qobj);
  //   }
  //   db.ref("courses/" + this.props.keyProp + "/freeResource/")
  //     .set(dbObj)
  //     .then(e => {
  //       obj.createNotification("success", "Free questions saved successfully");
  //     });
  // };
  // removeQ = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           var items = [...this.state.items];
  //           items.splice(key, 1);
  //           this.setState({ items });
  //           var s_ID = [...this.state.s_ID];
  //           s_ID.splice(s_ID.indexOf(key), 1);
  //           this.setState({ s_ID });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        {/* <div className="home_slider top-fix" /> */}
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">Free Pool</h5>
              <div className="col lrp-0">
                <span>
                  <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-md-7 lrp-0">
              {/* <button className="btn btn-white fix_width_btn  btn-transparent black admin-btn">
                    Preview
                  </button>{" "} */}
              &nbsp;
              <button
                className="btn btn-white fix_width_btn btn-transparent black bold fz_14"
                onClick={this.saveForm}
              >
                Save
              </button>
              &nbsp;
            </div>
          </div>
        </div>
        <hr />

        <div className="MockBox">
          {this.state.source == 1 ? (
            <QuestionPoolComponent
              permissions={this.props.permissions}
              add_question={this.addQuestion}
              isAdded={this.state.isAdded}
              qId={this.props.qId}
            />
          ) : (
            <QuestionsPool
              add={this.PoolAddition}
              isFree={true}
              permissions={this.props.permissions}
              isCourse={this.props.isCourse}
              items={this.state.s_ID}
              keyProp={this.props.keyProp}
            />
          )}
        </div>
        <hr className="hr-2 " />
        <div className="d-flex justify-content-center">
          <button
            className="btn white    btn-red black admin-btn"
            onClick={() => this.selectSource(1)}
          >
            Add New{" "}
          </button>{" "}
          &nbsp; &nbsp; &nbsp;
          <button
            className="btn white    btn-red black admin-btn"
            onClick={() => this.selectSource(0)}
          >
            Select Form Bank{" "}
          </button>{" "}
        </div>
        <div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center display_questions">
                <QuestionList items={this.state.items} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FreePool;
