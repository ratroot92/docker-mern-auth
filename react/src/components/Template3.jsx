import React, { Component } from "react";
import { db } from "../firebase/firebase";
import firebase from "../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
import WebNotif from "./WebNotif";
import { Line } from "rc-progress";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();

class Template3 extends Component {
  state = {
    heading: "",
    section: "",
    explanation: "",
    newKey: "",
    file: null,
    imageURL: null,
    isUploading_image: false,
    progress_image: 0,
    image_url: "",
    imgAlign: 1,
    editing: false
  };
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   db.ref(this.props.dblink)
  //     .orderByChild("type")
  //     .equalTo(3)
  //     .once("value")
  //     .then(snapshot => {
  //       this.setState({ section: snapshot.val() });
  //       this.setState({ showLoader: false });
  //     });
  // }
  // handleUploadSuccess = filename => {
  //   firebase
  //     .storage()
  //     .ref("images/")
  //     .child(filename)
  //     .getDownloadURL()
  //     .then(url => {
  //       // this.setState({ image_url: url });
  //       this.setState({
  //         // image_url: filename,
  //         image_url: url,
  //         progress_image: 100,
  //         isUploading_image: false
  //       });
  //     });
  // };
  // handleUploadStart = event => {
  //   this.setState({
  //     file: URL.createObjectURL(event)
  //   });
  //   this.setState({
  //     isUploading_image: true,
  //     progress_image: 0,
  //     isEdit: false
  //   });
  // };
  // handleProgress = progress_image => {
  //   this.setState({ progress_image });
  // };
  // handleUploadError = error => {
  //   this.setState({ isUploading_image: false });
  //   console.error(error);
  // };
  // validateForm = data => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].value == null || data[i].value == "") {
  //       obj.createNotification("error", data[i].slug + " is required");
  //       return false;
  //       break;
  //     }
  //   }
  //   return true;
  // };
  // removeImage = () => {
  //   this.setState({ file: null, image_url: null });
  // };
  // addSection = () => {
  //   this.setState({ editing: false });
  //   if (
  //     this.validateForm([
  //       { value: this.state.heading, slug: "Heading" },
  //       { value: this.state.explanation, slug: "Explanation" },

  //       { value: this.state.image_url, slug: "Image" }
  //     ])
  //   ) {
  //     if (this.state.newKey.length == 0) {
  //       var tempKey = db.ref(this.props.dblink).push().key;
  //       this.setState({ newKey: tempKey }, () => {
  //         db.ref(this.props.dblink + this.state.newKey)
  //           .set({
  //             title: this.state.heading,
  //             data: {
  //               detail: this.state.explanation,
  //               image: this.state.image_url
  //             },
  //             imgAlign: this.state.imgAlign,
  //             type: 3
  //           })
  //           .then(e => {
  //             var section = { ...this.state.section };
  //             section[this.state.newKey] = {
  //               title: this.state.heading,
  //               data: {
  //                 detail: this.state.explanation,
  //                 image: this.state.image_url
  //               },
  //               imgAlign: this.state.imgAlign,
  //               type: 3
  //             };
  //             this.setState({
  //               section: section,
  //               heading: "",
  //               explanation: "",
  //               newKey: "",
  //               image_url: "",
  //               file: null
  //             });
  //             var obj = new WebNotif();
  //             obj.createNotification("success", "Section Added");
  //           });
  //       });
  //     } else {
  //       db.ref(this.props.dblink + this.state.newKey)
  //         .set({
  //           title: this.state.heading,
  //           data: {
  //             detail: this.state.explanation,
  //             image: this.state.image_url
  //           },
  //           imgAlign: this.state.imgAlign,
  //           type: 3
  //         })
  //         .then(e => {
  //           var section = { ...this.state.section };
  //           section[this.state.newKey] = {
  //             title: this.state.heading,
  //             data: {
  //               detail: this.state.explanation,
  //               image: this.state.image_url
  //             },
  //             imgAlign: this.state.imgAlign,
  //             type: 3
  //           };
  //           this.setState({
  //             section: section,
  //             heading: "",
  //             explanation: "",
  //             newKey: "",
  //             image_url: "",
  //             file: null,
  //             isEdit: false
  //           });
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Section Updated");
  //         });
  //     }
  //   }
  // };
  // deleteSection = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref(this.props.dblink + key).set(null);
  //           var section = { ...this.state.section };
  //           delete section[key];
  //           this.setState({ section });
  //           var obj = new WebNotif();
  //           obj.createNotification("success", "Section Deleted");
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // editSection = key => {
  //   this.setState({ editing: true });

  //   Object.keys(this.state.section[key].data).map(key1 => {
  //     if (key1 != "image") {
  //       this.setState({ explanation: this.state.section[key].data[key1] });
  //     }
  //   });
  //   this.setState(
  //     {
  //       newKey: key,
  //       heading: this.state.section[key].title,
  //       image_url: this.state.section[key].data.image,
  //       file: this.state.section[key].data.image,
  //       imgAlign: this.state.section[key].imgAlign,
  //       isEdit: true
  //     },
  //     () => {}
  //   );
  // };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <section>
          <div className="row">
            <div className="col-sm-12">
              {this.state.section == null
                ? ""
                : Object.keys(this.state.section).map(key => (
                    <div className="accordion-group">
                      <div className="accordion-heading admin_faq">
                        <div className="row">
                          <div className="col-md-10">
                            <a
                              className="accordion-toggle faq no_border"
                              data-toggle="collapse"
                              data-parent="toggle"
                              href={"#" + key}
                            >
                              <i className="fa fa-align-justify" />
                              &nbsp; &nbsp; {this.state.section[key].title}
                            </a>
                          </div>
                          <div className="col-md-2 pt-7">
                            <i
                              className="fa fa-pencil-square-o clr-darkpurple pointer"
                              onClick={() => this.editSection(key)}
                            />
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <i
                              className="fa fa-trash clr-darkpurple pointer "
                              onClick={() => this.deleteSection(key)}
                            />
                            &nbsp; &nbsp;
                          </div>
                        </div>
                      </div>
                      {/* <div
                        id={key}
                        className="accordion-body faq-body collapse in"
                      >
                        <div className="accordion-inner">
                          {this.state.section[key].data == null
                            ? ""
                            : Object.keys(this.state.section[key].data).map(
                                key1 => (
                                  <ul>
                                    <li>
                                      {this.state.section[key].data[key1]}
                                    </li>
                                  </ul>
                                )
                              )}
                        </div>
                      </div> */}
                    </div>
                  ))}
            </div>
          </div>
        </section>
        <section>
          <div className="row mtb-20">
            <div className="col-sm-6 pt-10">
              <label>
                Heading <span className="clr-red">*</span>
              </label>
              <input
                type="text"
                className="form-control fs-14"
                placeholder="Heading"
                value={this.state.heading}
                onChange={event =>
                  this.setState(byPropKey("heading", event.target.value))
                }
              />
            </div>
            <div className="col-sm-6 pt-10">
              <label>
                Explanation <span className="clr-red">*</span>
              </label>
              <textarea
                className="form-control fs-14"
                placeholder="Explanation"
                value={this.state.explanation}
                onChange={event =>
                  this.setState(byPropKey("explanation", event.target.value))
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label>
                Image Position <span className="clr-red">*</span>
              </label>
              <select
                className="form-control admin-form-control"
                id="exampleFormControlSelect1"
                value={
                  this.state.imgAlign != undefined ? this.state.imgAlign : ""
                }
                onChange={event =>
                  this.setState(byPropKey("imgAlign", event.target.value))
                }
              >
                <option value="1">top</option>
                <option value="2">Right</option>
                <option value="3">Left</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>
                Add Preview <span className="clr-red">*</span>{" "}
              </label>
              <br />
              {this.state.file !== null ? (
                <div
                  onClick={this.removeImage}
                  className="pointer"
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
                        {/* <i class="fa fa-plus-circle fa-3x" />{" "} */}
                        <br />
                        {this.state.progress_image < 100 && !this.state.isEdit
                          ? "Uploading..."
                          : ""}
                      </div>
                      {!this.state.isEdit ? (
                        <Line
                          percent={this.state.progress_image}
                          strokeWidth="1.5"
                          trailWidth="1.5"
                          strokeColor={
                            this.state.progress_image < 100 ? "red" : "#3AEAAE"
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
                  storageRef={firebase.storage().ref("images")}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                  // onChange={this.customOnChangeHandler}
                  hidden={true}
                />
              </label>
            </div>
          </div>
        </section>
        <br />
        <div className="row">
          <button
            className="btn btn-green white fs-14 width-100p"
            onClick={this.addSection}
          >
            {this.state.editing ? "Save " : "Add Section"}{" "}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Template3;
