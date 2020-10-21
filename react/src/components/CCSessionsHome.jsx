import React, { Component } from "react";
import DatePicker from "react-datepicker";
import PaperSection from "./PaperSection";
import CCSectionBody from "./CCSectionBody";
import { arrayMove } from "react-sortable-hoc";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../firebase/firebase";
var ActualData = {};

class CCSessionsHome extends Component {
  state = {
    items: [],
    keyProp: null,
    activeComp: 0,
    contentType: null,
    allowSave: false,
    isEdit: false,
    courseType: null,

    startDate:null,
    sessionType:null,
  };
  constructor(props) {
    super(props);
  }
  PoolData = {};

  // sectionTitleUpdate = (id, title) => {
  //   console.log(id, title);
  //   //  S_title[id] = title;
  //   if (this.PoolData[id] != undefined) {
  //     this.PoolData[id] = { Topic: title };
  //   }
  //   this.PoolData[id] = { Topic: title };
  //   console.log(this.PoolData);
  // };
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ courseTitle: nextProps.courseTitle });
  //   if (nextProps.update) {
  //     db.ref("courses/" + this.props.keyProp + "/contentType")
  //       .once("value")
  //       .then(DripFeed => {
  //         if (DripFeed.val() != null) {
  //           this.setState({ contentType: DripFeed.val() });
  //           if (Object.keys(ActualData).length == 0) {
  //             this.initDripFeed(DripFeed.val().totalWeeks);
  //           }
  //         }
  //       });
  //   }
  // }
  // componentDidMount() {
  //   this.setState({ courseTitle: this.props.courseTitle });

  //   this.setState({
  //     keyProp: this.props.keyProp,
  //     isEdit: this.props.isEdit,
  //     courseType: parseInt(this.props.courseType)
  //   });
  //   db.ref("courses/" + this.props.keyProp + "/contentType")
  //     .once("value")
  //     .then(DripFeed => {
  //       if (DripFeed.val() != null) {
  //         this.setState({ contentType: DripFeed.val() });
  //       }
  //     });
  //   db.ref("liveCourseSessions/" + this.props.keyProp)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.PoolData = snapshot.val();
  //         ActualData = snapshot.val();
  //         Object.keys(snapshot.val()).map(key => {
  //           var items = [...this.state.items];
  //           items.push(
  //             <CCSectionBody
  //               remove={this.removeData}
  //               secId={key}
  //               sessionOnly={true}
  //               keyProp={this.props.keyProp}
  //               fetchData={this.fetchData}
  //               permissions={this.props.permissions}
  //               secUpdate={this.sectionTitleUpdate}
  //               courseType={this.state.courseType}
  //               isEdit={this.props.isEdit}
  //               data={snapshot.val()}
  //             />
  //           );
  //           this.setState({ items });
  //         });
  //       } else {
  //         if (this.state.contentType != null && this.state.courseType == "1") {
  //           this.initDripFeed(this.state.contentType.totalWeeks);
  //         }
  //       }
  //     });
  // }
  // initDripFeed = weeks => {
  //   var items = [...this.state.items];

  //   for (var p = 0; p < weeks; p++) {
  //     items.push(
  //       <CCSectionBody
  //         remove={this.removeData}
  //         secId={"section" + items.length}
  //         fetchData={this.fetchData}
  //         permissions={this.props.permissions}
  //         keyProp={this.props.keyProp}
  //         sessionOnly={true}
  //         secUpdate={this.sectionTitleUpdate}
  //         data={this.PoolData}
  //         courseType={this.state.courseType}
  //         title={"Week " + (p + 1)}
  //       />
  //     );
  //   }

  //   this.setState({ items });
  // };
  // fetchData = data => {
  //   this.PoolData = data;
  //   ActualData = data;
  //   for (let [sectionId, section] of Object.entries(this.PoolData)) {
  //     if (section.topics && Object.keys(section.topics).length > 0) {
  //       this.setState({ allowSave: true });
  //       break;
  //     } else {
  //       this.setState({ allowSave: false });
  //     }
  //   }
  // };
  // remapData = (oldIndex, newIndex) => {
  //   let myData = [];
  //   Object.keys(this.PoolData).map(key => {
  //     myData.push(this.PoolData[key]);
  //   });
  //   myData = arrayMove(myData, oldIndex, newIndex);

  //   Object.keys(myData).map(index => {
  //     this.PoolData["section" + index] = myData[index];
  //   });
  // };
  // removeData = (key, id, rowid) => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           if (this.PoolData[key] != undefined) {
  //             delete this.PoolData[key]["subTopic"][id];
  //           }
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // saveForm = () => {
  //   if (this.PoolData.length == 0) {
  //     alert("Empty Data set");
  //     return;
  //   } else {
  //     db.ref("liveCourseSessions/" + this.state.keyProp).set(null);
  //     db.ref("liveCourseSessions/" + this.state.keyProp)
  //       .set(this.PoolData)
  //       .then(e => {
  //         ActualData = this.PoolData;
  //         var courseContent = {};
  //         //  this.props.isUpdate();
  //         db.ref("courses/" + this.props.keyProp + "/courseSessions").set(null);
  //         Object.keys(this.PoolData).map(c => {
  //           courseContent[c] = {};
  //           courseContent[c]["topicName"] = this.PoolData[c]["topicName"];
  //           courseContent[c]["topics"] = {};
  //           if (
  //             this.PoolData[c]["topics"] != undefined ||
  //             this.PoolData[c]["topics"] != null
  //           ) {
  //             Object.keys(this.PoolData[c]["topics"]).map(d => {
  //               courseContent[c]["topics"][d] = {};
  //               courseContent[c]["topics"][d] = this.PoolData[c]["topics"][d][
  //                 "examDetails"
  //               ];
  //             });
  //           }
  //         });
  //         db.ref("courses/" + this.props.keyProp + "/courseSessions").set(
  //           courseContent
  //         );
  //         this.props.isUpdate(true);
  //         alert("Data posted");
  //       });
  //   }
  // };
  // addSection = () => {
  //   var items = [...this.state.items];
  //   items.push(
  //     <CCSectionBody
  //       remove={this.removeData}
  //       secId={"section" + items.length}
  //       data={this.PoolData}
  //       sessionOnly={true}
  //       fetchData={this.fetchData}
  //       permissions={this.props.permissions}
  //       keyProp={this.props.keyProp}
  //       secUpdate={this.sectionTitleUpdate}
  //       courseType={this.state.courseType}
  //     />
  //   );
  //   this.setState({ items });
  // };



  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  render() {
    return (
      <React.Fragment>
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h3 className="card-title bold regular_font">Sessions</h3>
              <div className="col lrp-0">
                <span>
                  {/* <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""} */}
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
              {this.state.contentType != null &&
              this.state.courseType == "1" ? (
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  disabled="true"
                >
                  Create New Section
                </button>
              ) : (
                <button
                  className="btn admin-btn-green btn-whitefix_width_btn white fz_13 bold"
                  onClick={this.addSection}
                >
                  Create New Section
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />
        {
          this.state.sessionType==null? <h3 className="mtb-20 text-center ">No Sessions created yet</h3>:""
        }
        <div className="row">
            <div className="form-group col-md-6">
              <label>
                Title <span className="clr-red">*</span>
              </label>
              <input
                type="text"
                // value={this.state.title}
                placeholder="Enter session title"
                className="form-control admin-form-control"
                // onChange={}
                required
              />
            </div>
            <div className="form-group col-md-6">
               <label>Publish Date</label>
                  <br />
                  <DatePicker
                    showTimeSelect
                    className="form-control cal_width"
                    selected={this.state.startDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeStart}
                  />
            </div>
            <div className="form-group col-md-6">
               <label>Publish Time</label>
                  <br />
                  <DatePicker
                    showTimeSelect
                    className="form-control cal_width"
                    selected={this.state.startDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeStart}
                  />
            </div>

            </div>
            <button className="btn create_btn mtb-20">
              Create
            </button>





      
        {/* <PaperSection
          items={this.state.items}
          courseType={this.state.courseType}
          // keyProp={this.state.keyProp}
          // isEdit={this.state.isEdit}
          remapData={this.remapData}
        /> */}
      </React.Fragment>
    );
  }
}
export default CCSessionsHome;
