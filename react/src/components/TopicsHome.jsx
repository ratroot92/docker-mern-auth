import React, { Component } from "react";

import TopicSection from "./TopicSection";
import TopicSectionBody from "./TopicSectionBody";
import { db } from "../firebase/firebase";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
var PoolData = {};
var topics = [];
var S_title = [];

class TopicsHome extends Component {
  state = {
    items: [],
    keyProp: null,
    isEdit: false,
    courseType: null
  };
  constructor(props) {
    super(props);
  }
  sectionTitleUpdate = (id, title) => {
    //  S_title[id] = title;
    if (PoolData[id] != undefined) {
      PoolData[id] = { Topic: title };
    }
    PoolData[id] = { Topic: title };
  };
  componentDidMount() {
    this.setState({
      keyProp: this.props.keyProp,
      isEdit: this.props.isEdit,
      courseType: parseInt(this.props.courseType)
    });
    db.ref("courses/" + this.props.keyProp + "/CourseContent")
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          PoolData = snapshot.val();
          Object.keys(snapshot.val()).map(key => {
            var items = [...this.state.items];
            items.push(
              <TopicSectionBody
                remove={this.removeData}
                secId={"section" + items.length}
                fetchData={this.fetchData}
                secUpdate={this.sectionTitleUpdate}
                courseType={this.state.courseType}
                isEdit={this.props.isEdit}
                data={snapshot.val()[key]}
              />
            );
            this.setState({ items });
          });
        }
      });
  }
  fetchData = (data, key) => {
    PoolData[key]["subTopic"] = data;
    //  this.setState({ q_pool: snapshot.val() });
  };
  removeData = (key, id, rowid) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            delete PoolData[key]["subTopic"][id];
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  saveForm = () => {
    if (PoolData.length == 0) {
      alert("Empty Data set");
      return;
    } else {
      db.ref("courses/" + this.props.keyProp + "/CourseContent").set(PoolData);
    }
  };
  addSection = () => {
    var items = [...this.state.items];
    items.push(
      <TopicSectionBody
        remove={this.removeData}
        secId={"section" + items.length}
        fetchData={this.fetchData}
        secUpdate={this.sectionTitleUpdate}
        courseType={this.state.courseType}
      />
    );
    this.setState({ items });
  };
  render() {
    return (
      <React.Fragment>
        {/* <div className="home_slider top-fix" /> */}
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">
                {" "}
                {this.state.courseType == 0
                  ? "Section"
                  : this.state.courseType == 1
                  ? "Course"
                  : ""}{" "}
              </h5>
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
              <button
                className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                onClick={this.addSection}
              >
                Create New Topic
              </button>
            </div>
          </div>
        </div>
        <hr />
        <TopicSection
          items={this.state.items}
          courseType={this.state.courseType}

          // keyProp={this.state.keyProp}
          // isEdit={this.state.isEdit}
        />
      </React.Fragment>
    );
  }
}
export default TopicsHome;
