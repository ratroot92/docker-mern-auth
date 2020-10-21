import React, { Component } from "react";
import DatePicker from "react-datepicker";

import firebase from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { Line } from "rc-progress";
import CreatableSelect from "react-select/lib/Creatable";
import FileUploader from "react-firebase-file-uploader";
import VideoThumbnail from "react-video-thumbnail"; // use npm published version
import Loader from "../loader";

import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import WebNotif from "../WebNotif";
import Select from "react-select";
var obj = new WebNotif();

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center"
};
var pushKey = null;
class AddCourse extends Component {
  state = {
    username: "",
    image_url: null,
    video_url: null,
    file: null,
    showLoader: false,
    contentType: 0,
    courseViewType: 0,
    isEdit: false,
    v_file: null,
    v_file_url: null,
    isUploading_image: false,
    isUploading_video: false,
    progress_video: 0,
    progress_image: 0,
    avatarURL: "",
    title: null,
    code: null,
    courseType: 0,
    price: null,
    description: null,
    validity: null,
    access_features: null,
    imageURL: null,
    videoURL: null,
    selectedOption: null,
    ioptions: [],
    instructor: null,
    selectedOptionCategory: null,
    category_options: null,
    seeInstructor: false,
    options: [],
    selectedCat: null,
    options1: [
      {
        label: "Group 1",
        options: [
          { label: "Group 1, option 1", value: "value_1" },
          { label: "Group 1, option 2", value: "value_2" }
        ]
      },
      { label: "A root option", value: "value_3" },
      { label: "Another root option", value: "value_4" }
    ],
    totalSession: null,
    sessionDuration: null,
    startDate: null,
    endDate: null,
    weeksTotal: null,


    courseTypeset:"",



  };
componentWillMount(){
  // debugger;
  console.log("this is yes",this.props.courseType);
  if( this.props.courseType=="0"){
    this.setState({courseTypeset:"Pec Courses"})
  }else if( this.props.courseType=="1"){
    this.setState({courseTypeset:"Pec Training"})
  }
  else{
    this.setState({courseTypeset:"Webinar"})
  }


}

  // componentDidMount() {
  //   db.ref("categories")
  //     .once("value")
  //     .then(snapshot => {
  //       this.setState({ category_options: snapshot.val() });
  //       var options = [];
  //       if (this.state.category_options != null) {
  //         Object.keys(this.state.category_options).map(key => {
  //           if (this.state.category_options[key] == true) {
  //             options.push({ value: key, label: key });
  //             this.setState({ selectedCat: { value: key, label: key } });
  //           } else {
  //             var groupOption = [];
  //             Object.keys(this.state.category_options[key]).map(groupkey => {
  //               groupOption.push({ label: groupkey, value: groupkey });
  //               this.setState({
  //                 selectedCat: { value: groupkey, label: groupkey }
  //               });
  //             });
  //             options.push({ label: key, options: groupOption });
  //           }
  //           this.setState({ options });
  //         });
  //         this.setState({ options });
  //       }
  //     });

  //   db.ref("userInfo")
  //     .orderByChild("role")
  //     .equalTo("instructor")
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.setState({ instructor: snapshot.val() });
  //         var ioptions = [];
  //         Object.keys(this.state.instructor).map(key => {
  //           ioptions.push({
  //             value: key,
  //             label: this.state.instructor[key].name
  //           });
  //         });
  //         this.setState({ ioptions });
  //       }
  //     });
  //   this.setState({ courseType: this.props.courseType });
  //   pushKey = this.props.keyProp;
  //   if (this.props.isEdit) {
  //     var cct = null;
  //     db.ref("courses/" + pushKey)
  //       .once("value")
  //       .then(snapshot => {
  //         {
  //           this.props.setCourseType(snapshot.val().courseType);
  //         }
  //         this.setState({ course: snapshot.val() });
  //         snapshot.child("categories").forEach(function(cat) {
  //           cct = cat.key;
  //         });

  //         var tempIns = [];
  //         if (
  //           snapshot.hasChild("instructor") &&
  //           snapshot.val() != null &&
  //           snapshot.val().instructor != null &&
  //           snapshot.val().instructor != undefined
  //         ) {
  //           Object.keys(snapshot.val().instructor).map(key => {
  //             if (this.state.instructor[key] != undefined) {
  //               tempIns.push({
  //                 value: key,
  //                 label: this.state.instructor[key].name
  //               });
  //             }
  //           });
  //           this.setState({ selectedOption: tempIns });
  //         } else {
  //           this.setState({ seeInstructor: false });
  //         }
  //         if (
  //           snapshot.hasChild("categories") &&
  //           snapshot.val() != null &&
  //           snapshot.val().categories != null &&
  //           snapshot.val().categories != undefined
  //         ) {
  //           var catSelected = [];
  //           Object.keys(snapshot.val().categories).map(cpd => {
  //             this.setState({ selectedCat: { value: cpd, label: cpd } });
  //           });
  //         }
  //         var startDate = null;
  //         if (snapshot.hasChild("startTime")) {
  //           startDate = new Date(snapshot.val().startTime);
  //         }
  //         var endDate = null;
  //         if (snapshot.hasChild("endTime")) {
  //           endDate = new Date(snapshot.val().endTime);
  //         }

  //         this.setState({
  //           isEdit: true,
  //           title: snapshot.val().Title,
  //           description: snapshot.val().Description,
  //           file: snapshot.val().media.Image,
  //           image_url: snapshot.val().media.Image,
  //           seeInstructor: snapshot.val().showInstructor,
  //           courseViewType: snapshot.val().courseType,
  //           totalSession: snapshot.val().totalSession,
  //           sessionDuration: snapshot.val().sessionDuration,
  //           startDate: startDate,
  //           endDate: endDate,
  //           contentType:
  //             snapshot.val().contentType != undefined
  //               ? snapshot.val().contentType.type
  //               : null,
  //           weeksTotal:
  //             snapshot.val().contentType != undefined
  //               ? snapshot.val().contentType.totalWeeks
  //               : null,
  //           video_url:
  //             snapshot.val().media.video != undefined
  //               ? snapshot.val().media.video
  //               : null
  //         });
  //         this.setState({ showLoader: false });
  //         var obj = new WebNotif();
  //         this.setState({ showLoader: false });
  //       });
  //   } else {
  //     this.setState({ showLoader: false });
  //   }
  // }

  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  handleChangeEnd = endDate => {
    this.setState({ endDate: endDate });
  };
  handleChange = selectedOption => {
    this.setState({ selectedCat: selectedOption });
  };
  instructorHandleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  handleUploadStart = event => {
    this.setState({
      file: URL.createObjectURL(event)
    });
    this.setState({
      isUploading_image: true,
      progress_image: 0,
      isEdit: false
    });
  };
  handleProgress = progress_image => {
    this.setState({ progress_image });
  };
  handleUploadError = error => {
    this.setState({ isUploading_image: false });
  };
  handleUploadSuccess = filename => {
    // firebase
    //   .storage()
    //   .ref("images/")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => {
    //     this.setState({
    //       image_url: url,
    //       progress_image: 100,
    //       isUploading_image: false
    //     });
    //   });
  };
  handleToggle = () => {
    this.setState({ seeInstructor: !this.state.seeInstructor }, () => {});
  };
  validateForm = data => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == null || data[i].value == "") {
        obj.createNotification("error", data[i].slug + " is required");
        return false;
        break;
      }
    }
    return true;
  };
  removeImage = () => {
    this.setState({ file: null, image_url: null });
  };
  // saveForm = () => {
  //   if (this.props.isEdit) {
  //     if (!this.state.isUploading_image && !this.state.isUploading_video) {
  //       var opt = this.state.selectedOption;
  //       var selectedInstructors = {};
  //       if (opt != null) {
  //         for (var i = 0; i < opt.length; i++) {
  //           var ikey = opt[i].value;
  //           selectedInstructors[ikey] = this.state.instructor[ikey];
  //         }
  //       }

  //       var myCourseType = this.props.courseType;
  //       var _self = this;
  //       db.ref("courses/" + pushKey)
  //         .once("value")
  //         .then(function(CF) {
  //           if (
  //             _self.validateForm([
  //               { value: _self.state.title, slug: "Title" },
  //               { value: _self.state.selectedCat.value, slug: "Categories" },

  //               { value: _self.state.description, slug: "Description" },
  //               { value: _self.state.image_url, slug: "Image" }
  //             ])
  //           ) {
  //             var courseFeature = null;
  //             var courseContent = null;
  //             var freeResource = null;
  //             if (CF.val() != null) {
  //               var courseFeature = CF.val().courseFeatures;
  //               var courseContent = CF.val().courseContent;
  //               var freeResource = CF.val().freeResource;
  //               var faq = CF.val().faq;

  //               if (faq == null || faq == undefined) {
  //                 faq = {};
  //               }
  //               if (courseFeature == null || courseFeature == undefined) {
  //                 courseFeature = {};
  //               }
  //               if (courseContent == null || courseContent == undefined) {
  //                 courseContent = {};
  //               }
  //               if (freeResource == null || freeResource == undefined) {
  //                 freeResource = {};
  //               }
  //             }
  //             var data = {
  //               Title: _self.state.title,
  //               Description: _self.state.description,
  //               dateCreated: _self.state.course.dateCreated,
  //               dateUpdated: new Date().toISOString(),
  //               lastUpdated: new Date().toISOString(),

  //               pricing: _self.state.course.pricing,
  //               courseContent: courseContent,
  //               faq: faq,
  //               courseFeatures: courseFeature,
  //               freeResource: freeResource,
  //               CourseRating: { Score: 0.0, Total: 0.0 },
  //               media: {
  //                 Image: _self.state.image_url,
  //                 video: _self.state.video_url
  //               },
  //               categories: { [_self.state.selectedCat.value]: true },
  //               instructor: selectedInstructors,
  //               showInstructor: _self.state.seeInstructor,
  //               isFeatured: _self.state.course.isFeatured,
  //               isHidden: _self.state.course.isHidden,
  //               isActive: _self.state.course.isActive,
  //               isShown: _self.state.course.isShown,
  //               courseType:
  //                 _self.state.courseViewType != undefined
  //                   ? _self.state.courseViewType
  //                   : null,
  //               totalSession:
  //                 _self.state.totalSession != undefined
  //                   ? _self.state.totalSession
  //                   : null,
  //               sessionDuration:
  //                 _self.state.sessionDuration != undefined
  //                   ? _self.state.sessionDuration
  //                   : null,
  //               startTime:
  //                 _self.state.startDate != undefined
  //                   ? new Date(_self.state.startDate).toISOString()
  //                   : null,
  //               endTime:
  //                 _self.state.endDate != undefined
  //                   ? new Date(_self.state.endDate).toISOString()
  //                   : null,
  //               contentType: {
  //                 type:
  //                   _self.state.contentType != undefined
  //                     ? _self.state.contentType
  //                     : null,
  //                 totalWeeks:
  //                   _self.state.weeksTotal != undefined
  //                     ? _self.state.weeksTotal
  //                     : null
  //               },
  //               type: myCourseType //Practice Question
  //             };
  //             db.ref("courses/" + pushKey).set(data);
  //             obj.createNotification("success", "Data Saved");
  //             _self.props.setTitle(_self.state.title);
  //             _self.props.isChanged(true);
  //           }
  //         });
  //     } else {
  //       obj.createNotification("warning", "Upload in Progress");
  //     }
  //   } else {
  //     if (!this.state.isUploading_image && !this.state.isUploading_video) {
  //       var opt = this.state.selectedOption;
  //       var selectedInstructors = {};
  //       if (opt != null) {
  //         for (var i = 0; i < opt.length; i++) {
  //           var ikey = opt[i].value;
  //           selectedInstructors[ikey] = this.state.instructor[ikey];
  //         }
  //       }

  //       if (
  //         this.validateForm([
  //           { value: this.state.title, slug: "Title" },
  //           { value: this.state.selectedCat.value, slug: "Categories" },

  //           { value: this.state.description, slug: "Description" },
  //           { value: this.state.image_url, slug: "Image" }
  //         ])
  //       ) {
  //         var data = {
  //           Title: this.state.title,
  //           Description: this.state.description,
  //           dateCreated: new Date().toISOString(),
  //           dateUpdated: new Date().toISOString(),
  //           lastUpdated: new Date().toISOString(),

  //           pricing: {
  //             basePlan: {
  //               currency: "$",
  //               discount: 0,
  //               price: 0,
  //               unit: "$",
  //               type: 1
  //             }
  //           },
  //           CourseRating: { Score: 0.0, Total: 0.0 },
  //           media: {
  //             Image: this.state.image_url,
  //             video: this.state.video_url
  //           },
  //           courseType:
  //             this.state.courseViewType != undefined
  //               ? this.state.courseViewType
  //               : null,
  //           totalSession:
  //             this.state.totalSession != undefined
  //               ? this.state.totalSession
  //               : null,
  //           sessionDuration:
  //             this.state.sessionDuration != undefined
  //               ? this.state.sessionDuration
  //               : null,
  //           startTime:
  //             this.state.startDate != undefined
  //               ? new Date(this.state.startDate).toISOString()
  //               : null,
  //           endTime:
  //             this.state.endDate != undefined
  //               ? new Date(this.state.endDate).toISOString()
  //               : null,
  //           contentType: {
  //             type:
  //               this.state.contentType != undefined
  //                 ? this.state.contentType
  //                 : null,
  //             totalWeeks:
  //               this.state.weeksTotal != undefined
  //                 ? this.state.weeksTotal
  //                 : null
  //           },
  //           categories: { [this.state.selectedCat.value]: true },
  //           instructor: selectedInstructors,
  //           showInstructor: this.state.seeInstructor,
  //           isFeatured: false,
  //           isHidden: false,
  //           isActive: true,
  //           isShown: false,
  //           type: parseInt(this.props.courseType) //Practice Question
  //         };
  //         db.ref("courses/" + pushKey).set(data);
  //         obj.createNotification("success", "Data Saved");
  //         this.props.setTitle(this.state.title);
  //         this.props.isChanged(true);
  //       }
  //     } else {
  //       obj.createNotification("warning", "Upload in Progress");
  //     }
  //   }
  // };
  //video

  removeVideo = () => {
    this.setState({ video_url: null, v_file: null, v_file_url: null });
  };
  handleUploadStart1 = event => {
    this.setState({
      v_file_url: null,
      v_file: null
    });

    this.setState({
      v_file_url: URL.createObjectURL(event)
    });
    this.setState({ isUploading_video: true, progress_video: 0 });
  };
  handleProgress1 = progress_video => {
    if (progress_video >= this.state.progress_video) {
      this.setState({ progress_video });
    }
  };
  handleUploadError1 = error => {
    this.setState({ isUploading_video: false });
    console.error(error);
  };
  handleUploadSuccess1 = filename => {
    // firebase
    //   .storage()
    //   .ref("video")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url =>
    //     this.setState({
    //       video_url: url,

    //       progress_video: 100,
    //       isUploading_video: false
    //     })
    //   );
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-7">
              <h5 className="card-title regular_font">
                {this.props.courseType == 0
                  ? "PEC Courses "
                  : this.props.courseType == 1
                  ? "PEC Training "
                  : "Webinars "}
              Details
              </h5>
            </div>
            <div className="col-md-5 ">
              <button
                className="btn admin_btn fix_width_btn white fz_16 bold float-right"
                onClick={this.saveForm}
              >
                Save
              </button>{" "}
              &nbsp; &nbsp;
            </div>
          </div>
        </div>
        <hr />
        {/* <form> */}
        <div className="col-md-12">
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                Title <span className="clr-red">*</span>
              </label>
              <input
                type="text"
                value={this.state.title}
                // placeholder={`enter+${this.state.courseType}+title`}
                placeholder={`Enter ${this.state.courseTypeset} Title`}
                className="form-control admin-form-control"
                onChange={event =>
                  this.setState(byPropKey("title", event.target.value))
                }
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>
                Category <span className="clr-red">*</span>
              </label>
              {/* value={this.state.discipline} onChange={this.statechange}  */}
                <select  name="discipline" className="form-control co_black fz_13">
                <option>Select Category</option>
                <option>CVIL</option>
                <option >ELECTRICAL</option>
               </select>
              {/* {this.state.options.length == 0 ? (
                ""
              ) : (
                <Select
                  options={this.state.options}
                  value={this.state.selectedCat}
                  onChange={this.handleChange}
                  required
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Description <span className="clr-red">*</span>
                </label>
                <textarea
                  required
                  className="form-control admin-form-control"
                  rows="6"
                  value={this.state.description}
                  placeholder={`Enter ${this.state.courseTypeset} Description`}
                  onChange={event =>
                    this.setState(byPropKey("description", event.target.value))
                  }
                />
              </div>
              <div className="col-md-3">
                <div className="form-group" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <label>
                      Preview Image<span className="clr-red">*</span>
                    </label>
                    <br />
                    {this.state.file !== null ? (
                      <div
                        onClick={this.removeImage}
                        className="pointer"
                        style={{
                          position: "absolute",
                          color: "#20A84C",

                          paddingLeft: "5px",
                          paddingTop: "2px"
                        }}
                      >
                        <i className="fa fa-times-circle fa-lg"  style={{ color: "#20A84C" }} />
                      </div>
                    ) : (
                      ""
                    )}
                    <label>
                      {this.state.file == null ? (
                        <div
                          className="text-center"
                          style={{
                            color: "black",
                            border: "0.5px solid #F3F3F3",
                            padding: 10,
                            borderRadius: 4,
                            cursor: "pointer",
                            height: "120px",
                            width: "165px",
                            padding: "25px"
                          }}
                        >
                          {" "}
                          <i
                            className="fa fa-image fa-3x pb-10"
                            style={{ color: "#20A84C" }}
                          />
                          <br />
                          Add Image
                        </div>
                      ) : (
                        <React.Fragment>
                          <div
                            className="d-flex justify-content-center"
                            style={{
                              height: "120px",
                              width: "165px",
                              border: "0.5px solid #F3F3F3",
                              borderRadius: 4,
                              cursor: "pointer"
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "65px",
                                color: "#ffffff8f"
                              }}
                              className="text-center"
                            >
                              <br />
                              {this.state.progress_image < 100 &&
                              !this.state.isEdit
                                ? "Uploading..."
                                : ""}
                            </div>
                            {!this.state.isEdit ? (
                              <Line
                                percent={this.state.progress_image}
                                strokeWidth="1.5"
                                trailWidth="1.5"
                                strokeColor={
                                  this.state.image_url < 100 ? "red" : "#20A84C"
                                }
                                style={{
                                  height: "6px",
                                  width: "165px",
                                  position: "absolute",
                                  bottom: "0px"
                                }}
                              />
                            ) : (
                              ""
                            )}{" "}
                            <img
                              src={this.state.file}
                              style={{
                                maxWidth: "165px",
                                objectFit: "cover"
                              }}
                            />
                          </div>
                        </React.Fragment>
                      )}

                      <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        // storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        hidden={true}
                      />
                    </label>
                  </div>
                  {this.state.video_url == null ||
                  this.state.video_url == undefined ? (
                    <div className="col-md-6">
                      <label>Add Video</label>
                      <br />

                      <label>
                        <div className="hide">
                          {this.state.v_file_url !== null ? (
                            <VideoThumbnail
                              videoUrl={this.state.v_file_url}
                              thumbnailHandler={thumbnail => {
                                this.setState(byPropKey("v_file", thumbnail));
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        {this.state.v_file == null ? (
                          <div
                            className="text-center"
                            style={{
                              color: "black",
                              border: "0.5px solid #F3F3F3",
                              padding: 10,
                              borderRadius: 4,
                              cursor: "pointer",
                              height: "120px",
                              width: "165px",
                              padding: "25px"
                            }}
                          >
                            <i
                              className="fa fa-film fa-3x pb-10"
                              style={{ color: "#20A84C" }}
                            />
                            <br />
                            Add Video
                          </div>
                        ) : (
                          <React.Fragment>
                            <div
                              className="d-flex justify-content-center"
                              style={{
                                height: "120px",
                                width: "165px",
                                border: "0.5px solid #F3F3F3",
                                borderRadius: 4,
                                cursor: "pointer"
                              }}
                            >
                              <Line
                                percent={this.state.progress_video}
                                strokeWidth="1.5"
                                trailWidth="1.5"
                                strokeColor={
                                  this.state.progress_video < 100
                                    ? "red"
                                    : "#20A84C"
                                }
                                style={{
                                  height: "6px",
                                  width: "165px",
                                  position: "absolute",
                                  bottom: "0px"
                                }}
                              />{" "}
                              <div
                                className="d-flex justify-content-center"
                                style={{
                                  height: "120px",
                                  width: "165px",
                                  border: "0.5px solid #F3F3F3",
                                  borderRadius: 4,
                                  cursor: "pointer"
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "65px",
                                    color: "#ffffff8f"
                                  }}
                                  className="text-center"
                                >
                                  <br />
                                  {this.state.progress_video < 100
                                    ? "Uploading..."
                                    : ""}
                                </div>

                                <img
                                  src={this.state.v_file}
                                  style={{
                                    height: "inherit",
                                    width: "inherit",
                                    objectFit: "cover",
                                    objectPosition: "center"
                                  }}
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        )}{" "}
                        <FileUploader
                          accept="video/*"
                          name="avatar"
                          randomizeFilename
                          // storageRef={firebase.storage().ref("video")}
                          onUploadStart={this.handleUploadStart1}
                          onUploadError={this.handleUploadError1}
                          onUploadSuccess={this.handleUploadSuccess1}
                          onProgress={this.handleProgress1}
                          hidden={true}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <label>
                        Preview Video <span className="clr-red">*</span>
                      </label>
                      <div
                        className="pointer"
                        style={{
                          position: "absolute",
                          color: "#fc5757",
                          paddingLeft: "5px",
                          paddingTop: "2px",
                          right: "20px",
                          zIndex: "1000"
                        }}
                        onClick={this.removeVideo}
                      >
                        <i className="fa fa-times-circle fa-lg" />{" "}
                      </div>
                      <Player playsInline src={this.state.video_url} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.courseType == 2 ? (
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Webinar Type</label>

                  <select
                    className="form-control admin-form-control"
                    // value={this.state.courseViewType}
                    // onChange={event => {
                    //   this.setState(
                    //     byPropKey("courseViewType", event.target.value)
                    //   );
                    //   this.props.setCourseType(event.target.value);
                    // }}
                  >
                     <option value="0">Choose Type </option> 
                    <option value="1">
                      Live Webinar
                    </option> 
                    <option value="2">Recorded Webinar</option>
                  </select>
                </div>
              </div>
              {this.state.courseType != undefined &&
              this.state.courseType == 1 ? (
                <React.Fragment>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Sessions</label>

                      <input
                        className="form-control admin-form-control"
                        placeholder="Sessions"
                        type="number"
                        value={this.state.totalSession}
                        onChange={event =>
                          this.setState(
                            byPropKey("totalSession", event.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Session Duration (min)</label>

                      <input
                        className="form-control admin-form-control"
                        placeholder="Session Duration"
                        type="number"
                        value={this.state.sessionDuration}
                        onChange={event =>
                          this.setState(
                            byPropKey("sessionDuration", event.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
              <div className="col-md-6">
                {/* <div className="form-group">
                  <label>Content Type</label>

                  <select
                    className="form-control admin-form-control"
                    value={this.state.contentType}
                    onChange={event =>
                      this.setState(
                        byPropKey("contentType", event.target.value)
                      )
                    }
                  >
                    <option value="0">Free Access</option>
                    <option value="1">Drip-Feed</option>
                  </select>
                </div> */}
                 <div className="form-group">
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
             </div>
              {this.state.contentType != undefined &&
              this.state.contentType == 1 ? (
                <React.Fragment>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Weeks</label>

                      <input
                        value={this.state.weeksTotal}
                        className="form-control admin-form-control"
                        placeholder="Weeks"
                        type="number"
                        onChange={event =>
                          this.setState(
                            byPropKey("weeksTotal", event.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
              {/* <div className="col-md-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <br />
                  <DatePicker
                    showTimeSelect
                    className="form-control"
                    selected={this.state.startDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeStart}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>End Date</label>
                  <br />
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeEnd}
                    showTimeSelect
                  />
                </div>
              </div>
            */}
             </div>

             {/* <div className="row">
              <div className="col-md-6">
              <h1>sdsdsvdgsjhdghsgd jhsgdhgsh gdhgjg</h1>
              </div>
              <div className="col-md-6"></div>
            </div> */}
            <div className="row col_margin mt_2v"> 
                  <div className="col-md-6 file_upload_admin ptb_4v flex_center flex_colum">
                  <img  src={require("../../assets/image/designer_icon/Upload-files-here.png")} 
                  className="height_7v mtb-10" alt="Download" />
                   <h6 className="mb_unset">Upload your file here</h6>
                   <p className="fz_13">Drag and drop file here to start upload </p>

                   <input type="file" name="uploadfile" id="myfile" style={{visibility:"hidden"}}/>
                    <label for="myfile" className="btn admin_btn btn_upload_admin">Choose File</label>
                   {/* <input type="file" /> */}
                   {/* <button className="btn admin_btn btn_upload_admin">Choose Files</button> */}
                  </div>
                  <div className="col-md-6"></div>
                </div>

          </div>
       ) : (
          ""
        )}
        {this.state.instructor != null ? (
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group bm-0">
                  <label
                    className=" form-check-label bm-0 p-5 opt-label"
                    for="ins"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="ins"
                      onChange={this.handleToggle}
                      checked={this.state.seeInstructor}
                    />
                    <span className="checkbox-fix-admin"> Instructor</span>
                    <br></br>
                  </label>{" "}
                </div>

                <CreatableSelect
                  value={this.state.selectedOption}
                  onChange={this.instructorHandleChange}
                  options={this.state.ioptions}
                  className={this.state.seeInstructor ? "" : "hide"}
                  isMulti
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}{" "}
        <br />
        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default AddCourse;
