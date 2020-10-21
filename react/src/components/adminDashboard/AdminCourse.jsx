import React, { Component } from "react";
import WebNotif from "../WebNotif";
import CourseSection from "../CourseSection";
import CourseSectionBody from "../CourseSectionBody";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../../firebase/firebase";
var obj = new WebNotif();

var PoolData = {};
var courseContent = {};
var topics = [];
var S_title = [];

var total_SBA = 0;
var total_MCQ = 0;
var total_EMQ = 0;
var total_TF = 0;
var ExamStats = {};
class AdminCourse extends Component {
  state = {
    items: [],
    keyProp: null,
    isEdit: false,
    courseType: null,
    tag_options: [],
    allowSave: false
  };
  constructor(props) {
    super(props);
  }
  sectionTitleUpdate = (id, title) => {
    //  S_title[id] = title;
    if (PoolData[id] != undefined) {
      PoolData[id].topicName = title;
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  componentDidMount() {
    this.setState({ courseTitle: this.props.courseTitle });

    // db.ref(`Tags`)
    //   .once("value")
    //   .then(snapshot => {
    //     var tag_options = [...this.state.tag_options];

    //     snapshot.forEach(tags => {
    //       if (
    //         (Object.keys(tags.val()).length == 1 && tags.val().All != null) ||
    //         tags.val() == true
    //       ) {
    //         var new_option = {
    //           value: tags.key,
    //           label: tags.key + " (" + tags.val().All + ")"
    //         };
    //         tag_options.push(new_option);
    //       } else {
    //         var groupOption = [];

    //         Object.keys(tags.val()).map(groupkey => {
    //           if (groupkey != "All") {
    //             groupOption.push({
    //               label: groupkey + " (" + tags.val()[groupkey] + ")",
    //               value: tags.key + "~" + groupkey
    //             });
    //             this.setState({
    //               selectedCat: {
    //                 value: tags.key + "~" + groupkey,
    //                 label: groupkey + " (" + tags.val()[groupkey] + ")"
    //               }
    //             });
    //           }
    //         });
    //         groupOption.push({
    //           label: "All " + tags.key + " (" + tags.val().All + ")",
    //           value: tags.key
    //         });
    //         tag_options.push({ label: tags.key, options: groupOption });
    //       }
    //       // });
    //     });
    //     this.setState({ tag_options, showLoader: false });
    //   });

    // if (this.props.isEdit) {
    //   db.ref("courseExams/" + this.props.keyProp + "/")
    //     .once("value")
    //     .then(snapshot => {
    //       if (snapshot.val() != null) {
    //         PoolData = snapshot.val();
    //         var items = [...this.state.items];

    //         Object.keys(PoolData).map(key => {
    //           items.push(
    //             <CourseSectionBody
    //               secId={key}
    //               topics={this.state.tag_options}
    //               isEdit={this.props.isEdit}
    //               data={PoolData[key]}
    //               fetchData={this.fetchData}
    //               remove={this.removeData}
    //               secUpdate={this.sectionTitleUpdate}
    //               courseType={this.state.courseType}
    //             />
    //           );
    //         });
    //         this.setState({ items });
    //       }
    //     });
    // }

    this.setState({
      keyProp: this.props.keyProp,
      isEdit: this.props.isEdit,
      courseType: parseInt(this.props.courseType)
    });
  }
  removeData = (key, id, rowid) => {
    if (
      PoolData[key] != undefined &&
      PoolData[key]["topics"][id] != undefined
    ) {
      delete PoolData[key]["topics"][id];

      if (
        Object.values(PoolData).every(section => {
          return Object.keys(section.topics).length === 0;
        })
      ) {
        this.setState({ allowSave: false });
      } else {
        this.setState({ allowSave: true });
      }
    }
  };
  // fetchData = (pkey, key, id, rowid, PaperTitle) => {
  //   if (pkey != null) {
  //     key = pkey + "/" + key;
  //   }
  //   db.ref(`questions`)
  //     .orderByChild("tags/" + key)
  //     .equalTo(true)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() !== null) {
  //         var exams = snapshot.val();
  //         snapshot.forEach(function(question) {
  //           exams[question.key]["topic"] = id;
  //           exams[question.key]["subTopic"] = rowid;
  //           exams[question.key]["selectedTag"] = key;
  //         });
  //         var pt = {
  //           exam: exams,
  //           examDetails: { title: key }
  //         };

  //         let sba = 0;
  //         let mcq = 0;
  //         let emq = 0;
  //         let tf = 0;
  //         // var tp = {};
  //         if (ExamStats[id] == undefined) {
  //           ExamStats[id] = {};
  //         }
  //         snapshot.forEach(function(question) {
  //           if (parseInt(question.val().type) == 1) {
  //             sba++;
  //             total_SBA = total_SBA + sba;
  //           } else if (parseInt(question.val().type) == 2) {
  //             mcq++;
  //             total_MCQ = total_MCQ + mcq;
  //           } else if (parseInt(question.val().type) == 3) {
  //             emq++;
  //             total_EMQ = total_EMQ + emq;
  //           } else if (parseInt(question.val().type) == 4) {
  //             tf++;
  //             total_TF = total_TF + tf;
  //           }
  //         });
  //         ExamStats[id][rowid] = { t1: sba, t2: mcq, t3: emq, t4: tf };

  //         var topics_index = topics.indexOf(id);
  //         if (PoolData[id] == undefined) {
  //           topics.push(id);
  //           var ttp = {};
  //           ttp[rowid] = pt;

  //           PoolData[id] = { topicName: PaperTitle, topics: ttp };
  //         } else {
  //           var temp = PoolData[id].topics;

  //           if (temp.length < rowid) {
  //             temp.push(pt);
  //             PoolData[id].topics = temp;
  //           } else {
  //             temp[rowid] = pt;
  //             PoolData[id].topics = temp;
  //           }
  //         }
  //         for (let [sectionId, section] of Object.entries(PoolData)) {
  //           if (Object.keys(section.topics).length > 0) {
  //             this.setState({ allowSave: true });
  //             break;
  //           }
  //         }
  //       }
  //     });
  // };
  // saveForm = () => {
  //   if (PoolData.length == 0) {
  //     alert("Empty Data set");
  //     return;
  //   } else {
  //     db.ref("courseExams/" + this.props.keyProp + "/").set(null);
  //     db.ref("courseExams/" + this.props.keyProp + "/")
  //       .set(PoolData)
  //       .then(e => {
  //         var courseContent = {};
  //         this.props.isUpdate();
  //         db.ref("courses/" + this.props.keyProp + "/courseContent").set(null);
  //         Object.keys(PoolData).map(c => {
  //           courseContent[c] = {};
  //           courseContent[c]["topicName"] = PoolData[c]["topicName"];
  //           courseContent[c]["topics"] = {};

  //           Object.keys(PoolData[c]["topics"]).map(d => {
  //             courseContent[c]["topics"][d] = {};
  //             courseContent[c]["topics"][d] =
  //               PoolData[c]["topics"][d]["examDetails"];
  //           });
  //         });
  //         db.ref("courses/" + this.props.keyProp + "/courseContent").set(
  //           courseContent
  //         );
  //         obj.createNotification("success", "Data saved sucessfully");
  //       });
  //     db.ref("courses/" + this.props.keyProp + "/cards").set(null);
  //     db.ref("courses/" + this.props.keyProp + "/cards")
  //       .set({
  //         k1: { title: "MCQ's", value: total_MCQ },
  //         k2: { title: "SBA's", value: total_SBA },
  //         k3: { title: "EMQ's", value: total_EMQ },
  //         k4: { title: "T/F", value: total_TF }
  //       })
  //       .then(e => {});
  //     db.ref("courseExamStats/" + this.props.keyProp + "/").set(null);
  //     db.ref("courseExamStats/" + this.props.keyProp + "/")
  //       .set(ExamStats)
  //       .then(e => {});
  //   }
  // };
  addSection = () => {
    // var items = [...this.state.items];
    // items.push(
    //   <CourseSectionBody
    //     topics={this.state.tag_options}
    //     secId={"practice" + this.state.items.length}
    //     fetchData={this.fetchData}
    //     secUpdate={this.sectionTitleUpdate}
    //     remove={this.removeData}
    //     courseType={this.state.courseType}
    //   />
    // );
    // this.setState({ items });
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h5 className="card-title regular_font">
                {" "}
                {this.state.courseType == 0
                  ? "Topics"
                  : this.state.courseType == 1
                  ? "Course"
                  : ""}{" "}
              </h5>
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
                Create New Section{" "}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <CourseSection
          items={this.state.items}
          courseType={this.state.courseType}
          // keyProp={this.state.keyProp}
          // isEdit={this.state.isEdit}
        />
      </React.Fragment>
    );
  }
}
export default AdminCourse;
