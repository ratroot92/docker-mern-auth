import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";
import PaperSection from "./PaperSection";
import PaperSectionBody from "./PaperSectionBody";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../firebase/firebase";
var PoolData = {};
class PaperMockHome extends Component {
  state = {
    items: [],
    keyProp: null,
    activeComp: 0,
    allowSave: false,
    isEdit: false,
    courseType: null
  };
  constructor(props) {
    super(props);
    PoolData = {};
  }
  sectionTitleUpdate = (id, title) => {
    //  S_title[id] = title;
    if (PoolData[id] != undefined) {
      PoolData[id]["topicName"] = title;
    } else {
      PoolData[id] = {};
      PoolData[id]["topicName"] = title;
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  componentDidMount() {
    this.setState({ courseTitle: this.props.courseTitle });

    this.setState({
      keyProp: this.props.keyProp,
      isEdit: this.props.isEdit,
      courseType: parseInt(this.props.courseType)
    });
    db.ref("courseExams/" + this.props.keyProp)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          PoolData = snapshot.val();
          Object.keys(snapshot.val()).map(key => {
            var items = [...this.state.items];
            items.push(
              <PaperSectionBody
                remove={this.removeData}
                secId={key}
                fetchData={this.fetchData}
                permissions={this.props.permissions}
                secUpdate={this.sectionTitleUpdate}
                courseType={this.state.courseType}
                isEdit={this.props.isEdit}
                data={snapshot.val()}
              />
            );
            this.setState({ items });
          });
        }
      });
  }
  fetchData = (data, secId) => {
    PoolData = data;
    for (let section of Object.values(PoolData)) {
      if (Object.keys(section.topics).length > 0) {
        this.setState({ allowSave: true });
        break;
      } else {
        this.setState({ allowSave: false });
      }
    }
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
            if (PoolData[key] != undefined) {
              delete PoolData[key]["subTopic"][id];

              if (
                Object.values(PoolData).every(section => {
                  return Object.keys(section.topics).length === 0;
                })
              ) {
                this.setState({ allowSave: false });
              }
            }
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
      db.ref("courseExams/" + this.state.keyProp).set(null);
      db.ref("courseExams/" + this.state.keyProp)
        .set(PoolData)
        .then(e => {
          var courseContent = {};
          this.props.isUpdate();
          db.ref("courses/" + this.props.keyProp + "/courseContent").set(null);
          Object.keys(PoolData).map(c => {
            courseContent[c] = {};
            courseContent[c]["topicName"] = PoolData[c]["topicName"];
            courseContent[c]["topics"] = {};

            Object.keys(PoolData[c]["topics"]).map(d => {
              courseContent[c]["topics"][d] = {};
              courseContent[c]["topics"][d] =
                PoolData[c]["topics"][d]["examDetails"];
            });
          });
          db.ref("courses/" + this.props.keyProp + "/courseContent").set(
            courseContent
          );
          alert("Data posted");
        });
    }
  };
  addSection = () => {
    var items = [...this.state.items];
    items.push(
      <PaperSectionBody
        remove={this.removeData}
        secId={"section" + items.length}
        fetchData={this.fetchData}
        permissions={this.props.permissions}
        secUpdate={this.sectionTitleUpdate}
        courseType={this.state.courseType}
        // isEdit={this.props.isEdit}
        // data={PoolData}
      />
    );
    this.setState({ items });
  };
  remapData = (oldIndex, newIndex) => {
    let myData = [];
    Object.keys(PoolData).map(key => {
      myData.push(PoolData[key]);
    });
    myData = arrayMove(myData, oldIndex, newIndex);

    Object.keys(myData).map(index => {
      PoolData["section" + index] = myData[index];
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">Papers</h5>
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
                {...(this.state.allowSave
                  ? { disabled: false }
                  : { disabled: true })}
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
        <PaperSection
          items={this.state.items}
          courseType={this.state.courseType}
          keyProp={this.state.keyProp}
          remapData={this.remapData}
          isEdit={this.state.isEdit}
        />
      </React.Fragment>
    );
  }
}
export default PaperMockHome;
