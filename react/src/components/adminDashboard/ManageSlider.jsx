import React, { Component } from "react";
import WebNotif from "../WebNotif";
import Loader from "../loader";
// import { db } from "../firebase/firebase";
import CreatableSelect from "react-select/lib/Creatable";
import FileUploader from "react-firebase-file-uploader";
import Select from "react-select";
import Unauthorized from "../Unauthorized";
import firebase from "../../firebase/firebase";
import { Line } from "rc-progress";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();
class ManageSlider extends Component {
  state = {
    image_url: "",
    file: null,
    isUploading_image: false,
    progress_image: 0,
    imageURL: null,
    image_url_ts: "",
    file_ts: null,
    isUploading_image_ts: false,
    progress_image_ts: 0,
    imageURL_ts: null,
    image_url_tl: "",
    file_tl: null,
    isUploading_image_tl: false,
    progress_image_tl: 0,
    imageURL_tl: null,
    title: "",
    tagState: "",
    link: "",
    slider: null,
    // ioptions: null,
    options: null,
    instructor: null,
    // courses: null,
    // selectedOption: null,
    // selectedOptionCourse: null,
    //selectedOptionType: { value: 1, label: "Practice Questions" },
    selectedOptionType: { value: "", label: "Practice Questions" },
    selectedOptionPosition: { value: "", label: "Right to Left" },
    // optionsType: [
    //   { value: 1, label: "Practice Questions" },
    //   { value: 2, label: "Mock Exam" },
    //   { value: 3, label: "Course" }
    // ],
    // optionsPosition: [
    //   { value: "rtl", label: "Right to Left" },
    //   { value: "ltr", label: "Left to Right" }
    // ],
    // selectedOptionPosition: { value: "rtl", label: "Right to Left" },
    isEdit: false,
    newkey: null
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref("webSite/home/slider")
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({ slider: snapshot.val() });
      //     }
      //   });
    }
  }
  // instructorHandleChange = selectedOption => {
  //   this.setState({ selectedOption });
  // };
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
    console.error(error);
  };
  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("images/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        this.setState({
          // image_url: filename,

          image_url: url,
          progress_image: 100,
          isUploading_image: false
        });
      });
  };
  handleUploadStart_ts = event => {
    this.setState({
      file_ts: URL.createObjectURL(event)
    });
    this.setState({
      isUploading_image_ts: true,
      progress_image_ts: 0,
      isEdit: false
    });
  };
  handleProgress_ts = progress_image_ts => {
    this.setState({ progress_image_ts });
  };
  handleUploadError_ts = error => {
    this.setState({ isUploading_image_ts: false });
    console.error(error);
  };
  handleUploadSuccess_ts = filename => {
    firebase
      .storage()
      .ref("images/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        this.setState({
          // image_url: filename,

          image_url_ts: url,
          progress_image_ts: 100,
          isUploading_image_ts: false
        });
      });
  };
  handleUploadStart_tl = event => {
    this.setState({
      file_tl: URL.createObjectURL(event)
    });
    this.setState({
      isUploading_image_tl: true,
      progress_image_tl: 0,
      isEdit: false
    });
  };
  handleProgress_tl = progress_image_tl => {
    this.setState({ progress_image_tl });
  };
  handleUploadError_tl = error => {
    this.setState({ isUploading_image_tl: false });
    console.error(error);
  };
  handleUploadSuccess_tl = filename => {
    firebase
      .storage()
      .ref("images/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        this.setState({
          // image_url: filename,

          image_url_tl: url,
          progress_image_tl: 100,
          isUploading_image_tl: false
        });
      });
  };
  addSlider = () => {
    if (
      this.validateForm([
        { value: this.state.image_url, slug: "Main Background Image" }
      ])
    ) {
      if (
        (this.state.progress_image < 100) & (this.state.progress_image > 0) ||
        (this.state.progress_image_tl < 100) &
          (this.state.progress_image_tl > 0) ||
        (this.state.progress_image_ts < 100) &
          (this.state.progress_image_ts > 0)
      ) {
        obj.createNotification("error", "Image upload in progress ");
      } else {
        // var instruct = {};
        // if (this.state.selectedOption != null) {
        //   Object.keys(this.state.selectedOption).map(key => {
        //     instruct[this.state.selectedOption[key].value] = {
        //       name: this.state.selectedOption[key].label
        //     };
        //   });
        // }

        if (this.state.isEdit == false) {
          var myobject = {
            image: this.state.image_url,
            title: this.state.title,
            // instructors: instruct,
            // type: this.state.selectedOptionPosition.value,
            // key: this.state.selectedOptionCourse.value,
            tag_state: this.state.tagState,
            tag_large: this.state.image_url_tl,
            tag_small: this.state.image_url_ts,
            link: this.state.link
            // courseType: this.state.selectedOptionType.value
          };

          // this.setState(
          //   { newKey: db.ref("webSite/home/slider").push().key }
          //   ,
          //   () => {
          //     db.ref("webSite/home/slider/" + this.state.newKey).set(myobject);
          //     var slider = { ...this.state.slider };
          //     slider[this.state.newKey] = myobject;
          //     this.setState({ slider }, () => {
          //       obj.createNotification("success", "Slider Created ");
          //     });
          //   }
          // );
        } else {
          var myobject = {
            image: this.state.image_url,
            title: this.state.title,
            // instructors: instruct,
            // type: this.state.selectedOptionPosition.value,
            // key: this.state.selectedOptionCourse.value,
            tag_state: this.state.tagState,
            tag_large: this.state.image_url_tl,
            tag_small: this.state.image_url_ts,
            link: this.state.link
            // courseType: this.state.selectedOptionType.value
          };
          var self = this;
          // db.ref("webSite/home/slider/" + this.state.newKey)
          //   .set(myobject)
          //   .then(function() {
          //     self.setState({ isEdit: false });
          //     obj.createNotification("success", "Slider Updated ");
          //   });
        }
        this.setState({
          image_url: "",
          file: null,
          isUploading_image: false,
          progress_image: 0,
          imageURL: null,
          image_url_ts: "",
          file_ts: null,
          isUploading_image_ts: false,
          progress_image_ts: 0,
          imageURL_ts: null,
          image_url_tl: "",
          file_tl: null,
          isUploading_image_tl: false,
          progress_image_tl: 0,
          imageURL_tl: null,
          title: "",
          tagState: "",
          link: "",
          // selectedOption: null,
          // selectedOptionCourse: null,
          // selectedOptionType: { value: 1, label: "Practice Questions" },
          // selectedOptionPosition: { value: "rtl", label: "Right to Left" },
          isEdit: false,
          newkey: null
        });
      }
    }
  };
  deleteSlider = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
         //   db.ref(`webSite/home/slider/` + key).set(null);
            var slider = { ...this.state.slider };
            delete slider[key];
            this.setState({ slider });
            var obj = new WebNotif();
            obj.createNotification("success", "Slider Deleted");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  editSlider = key => {
    this.setState({
      file: this.state.slider[key].image,
      image_url: this.state.slider[key].image,
      image_url_tl: this.state.slider[key].tag_large,
      image_url_ts: this.state.slider[key].tag_small,
      title: this.state.slider[key].title,
      // selectedOption: instruct,
      // selectedOptionPosition: selectedOptionPosition,
      // selectedOptionType: selectedOptionType,
      // selectedOptionCourse: selectedOptionCourse,
      tagState: this.state.slider[key].tag_state,
      file_tl: this.state.slider[key].tag_large,
      file_ts: this.state.slider[key].tag_small,
      isEdit: true,
      link: this.state.slider[key].link,
      progress_image: 100,
      progress_image_tl: 100,
      progress_image_ts: 100,
      newKey: key
    });
  };
  cancelState = () => {
    this.setState({
      image_url: "",
      file: null,
      isUploading_image: false,
      progress_image: 0,
      imageURL: null,
      image_url_ts: "",
      file_ts: null,
      isUploading_image_ts: false,
      progress_image_ts: 0,
      imageURL_ts: null,
      image_url_tl: "",
      file_tl: null,
      isUploading_image_tl: false,
      progress_image_tl: 0,
      imageURL_tl: null,
      title: "",
      tagState: "",
      link: "",
      isEdit: false,
      newkey: null
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <AdminNav />
            <WebNotif />
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
                              <h5 className="card-title regular_font">
                                Slider
                              </h5>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {this.props.permissions["add"] ? (
                          <div>
                            <div className="row mtb-20">
                              <div className="col-md-6">
                                <label>
                                  Main background image{" "}
                                  <span className="clr-red">*</span>
                                </label>
                                <br />
                                {this.state.file !== null ? (
                                  <div
                                    style={{
                                      position: "absolute",
                                      color: "#fc5757",

                                      paddingLeft: "5px",
                                      paddingTop: "2px"
                                    }}
                                  >
                                    <i className="fa fa-times-circle fa-lg" />{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                                <label>
                                  {this.state.file == null ? (
                                    <div
                                      className="text-center"
                                      style={{
                                        // backgroundColor: "steelblue",
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
                                        style={{ color: "#3660C1" }}
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
                                          {/* <i className="fa fa-plus-circle fa-3x" />{" "} */}
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
                                              this.state.image_url < 100
                                                ? "red"
                                                : "#3AEAAE"
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
                                    storageRef={firebase
                                      .storage()
                                      .ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                    // onChange={this.customOnChangeHandler}
                                    hidden={true}
                                  />
                                </label>
                              </div>
                              <div className="col-md-6">
                                <label>
                                  Large image on side{" "}
                                  {/* <span className="clr-red">*</span> */}
                                </label>
                                <br />
                                {this.state.file_ts !== null ? (
                                  <div
                                    style={{
                                      position: "absolute",
                                      color: "#fc5757",

                                      paddingLeft: "5px",
                                      paddingTop: "2px"
                                    }}
                                  >
                                    <i className="fa fa-times-circle fa-lg" />{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                                <label>
                                  {this.state.file_ts == null ? (
                                    <div
                                      className="text-center"
                                      style={{
                                        // backgroundColor: "steelblue",
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
                                        style={{ color: "#3660C1" }}
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
                                          {/* <i className="fa fa-plus-circle fa-3x" />{" "} */}
                                          <br />
                                          {this.state.progress_image_ts < 100 &&
                                          !this.state.isEdit
                                            ? "Uploading..."
                                            : ""}
                                        </div>
                                        {!this.state.isEdit ? (
                                          <Line
                                            percent={
                                              this.state.progress_image_ts
                                            }
                                            strokeWidth="1.5"
                                            trailWidth="1.5"
                                            strokeColor={
                                              this.state.image_url_ts < 100
                                                ? "red"
                                                : "#3AEAAE"
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
                                          src={this.state.file_ts}
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
                                    storageRef={firebase
                                      .storage()
                                      .ref("images")}
                                    onUploadStart={this.handleUploadStart_ts}
                                    onUploadError={this.handleUploadError_ts}
                                    onUploadSuccess={
                                      this.handleUploadSuccess_ts
                                    }
                                    onProgress={this.handleProgress_ts}
                                    // onChange={this.customOnChangeHandler}
                                    hidden={true}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="row mtb-20">
                              <div className="col-md-6">
                                <label>
                                  Small image on side{" "}
                                  {/* <span className="clr-red">*</span> */}
                                </label>
                                <br />
                                {this.state.file_tl !== null ? (
                                  <div
                                    style={{
                                      position: "absolute",
                                      color: "#fc5757",

                                      paddingLeft: "5px",
                                      paddingTop: "2px"
                                    }}
                                  >
                                    <i className="fa fa-times-circle fa-lg" />{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                                <label>
                                  {this.state.file_tl == null ? (
                                    <div
                                      className="text-center"
                                      style={{
                                        // backgroundColor: "steelblue",
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
                                        style={{ color: "#3660C1" }}
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
                                          {/* <i className="fa fa-plus-circle fa-3x" />{" "} */}
                                          <br />
                                          {this.state.progress_image_tl < 100 &&
                                          !this.state.isEdit
                                            ? "Uploading..."
                                            : ""}
                                        </div>
                                        {!this.state.isEdit ? (
                                          <Line
                                            percent={
                                              this.state.progress_image_tl
                                            }
                                            strokeWidth="1.5"
                                            trailWidth="1.5"
                                            strokeColor={
                                              this.state.image_url_tl < 100
                                                ? "red"
                                                : "#3AEAAE"
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
                                          src={this.state.file_tl}
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
                                    storageRef={firebase
                                      .storage()
                                      .ref("images")}
                                    onUploadStart={this.handleUploadStart_tl}
                                    onUploadError={this.handleUploadError_tl}
                                    onUploadSuccess={
                                      this.handleUploadSuccess_tl
                                    }
                                    onProgress={this.handleProgress_tl}
                                    // onChange={this.customOnChangeHandler}
                                    hidden={true}
                                  />
                                </label>
                              </div>
                              <div className="col-md-6">
                                <label>Title</label>
                                <input
                                  type="text"
                                  placeholder="title"
                                  value={this.state.title}
                                  className="form-control"
                                  onChange={event =>
                                    this.setState(
                                      byPropKey("title", event.target.value)
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="row mtb-20">
                              <div className="col-md-6">
                                <label>Badge Text</label>
                                <input
                                  type="badge text"
                                  placeholder="text"
                                  value={this.state.tagState}
                                  className="form-control"
                                  onChange={event =>
                                    this.setState(
                                      byPropKey("tagState", event.target.value)
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-6">
                                <label>Link</label>
                                <input
                                  type="text"
                                  placeholder="Link"
                                  value={this.state.link}
                                  className="form-control"
                                  onChange={event =>
                                    this.setState(
                                      byPropKey("link", event.target.value)
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="row mtb-20">
                            </div>
                            <div className="row mtb-20">
                              <div className="col-md-2">
                                <button
                                  className="btn btn-green fs-12"
                                  // onClick={this.addSlider}
                                >
                                  Save
                                </button>
                              </div>
                              {this.state.isEdit == true ? (
                                <div className="col-md-2">
                                  <button
                                    className="btn btn-red fs-12 white"
                                    // onClick={this.cancelState}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="row">
                          <div className="col-sm-12">
                            {this.state.slider == null
                              ? "Currently there are no sliders"
                              : Object.keys(this.state.slider).map(key => (
                                  <div className="accordion-group" key={key}>
                                    <div className="accordion-heading">
                                      <div className="row">
                                        <div className="col-md-10">
                                          <a
                                            className="accordion-toggle faq"
                                            data-toggle="collapse"
                                            data-parent="toggle"
                                            href={"#" + key}
                                          >
                                            <i className="fa fa-angle-right" />
                                            &nbsp; &nbsp;{" "}
                                            {this.state.slider[key].title}
                                          </a>
                                        </div>
                                        <div className="col-md-2 pt-7">
                                          {this.props.permissions["update"] ? (
                                            <i
                                              className="fa fa-pencil-square-o clr-darkpurple pointer"
                                              // onClick={() =>  this.editSlider(key) }
                                            />
                                          ) : (
                                            <i className="fa fa-pencil-square-o clr-darkpurple pointer disabled" />
                                          )}
                                          &nbsp; &nbsp; &nbsp; &nbsp;
                                          {this.props.permissions["delete"] ? (
                                            <i
                                              className="fa fa-trash clr-darkpurple pointer "
                                              // onClick={() =>  this.deleteSlider(key) }
                                            />
                                          ) : (
                                            <i className="fa fa-trash clr-darkpurple disabled " />
                                          )}
                                          &nbsp; &nbsp;
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ManageSlider;
