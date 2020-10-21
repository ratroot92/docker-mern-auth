import React, { Component } from "react";
import Select from "react-select";

import WebNotif from "./WebNotif";
import firebase from "../firebase/firebase";

import FileUploader from "react-firebase-file-uploader";
import { Line } from "rc-progress";
import { db } from "../firebase/firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class MediaContentHome extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    options: [
      // { value: 0, label: "URL" },
      // { value: 1, label: "PPT" },
      { value: 1, label: "From Repository" },
      { value: 2, label: "From PC" }
    ],
    MediaContentHomes: [],
    MediaContentHome: null,
    myFiles: null,
    title: null,
    contentType: "img",
    info: null,
    instructions: null,
    URL: null
  };
  componentDidMount() {
    if (this.props.isEdit) {
      var data = this.props.data.examDetails;
      this.setState({
        title: data.title,
        info: data.info,
        ext: data.ext,

        file: true,
        fileName: data.fileName,
        instructions: data.instructions,
        URL: data.URL,
        selectedOption: data.contentType,

        progress_file: -1
      });
      Object.keys(this.state.options).map(key => {
        if (this.state.options[key].value == data.contentType) {
          this.setState({ selectedOption: this.state.options[key] });
        }
      });
    }
    db.ref("courseFileListing/" + this.props.keyProp)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          this.setState({ myFiles: snapshot.val() });
          var files = [];
          Object.keys(snapshot.val()).map(key => {
            var ext = snapshot.val()[key].name.split(".")[1];
            if (ext == "jpeg") {
              ext = "jpg";
            }
            files.push({
              value: key,
              ext: ext,
              label: snapshot.val()[key].name,
              url: snapshot.val()[key].url
            });
            if (snapshot.val()[key].name == this.state.fileName) {
              this.setState({
                selectedOptionFile: {
                  value: key,
                  ext: ext,
                  label: snapshot.val()[key].name,
                  url: snapshot.val()[key].url
                }
              });
            }
          });
          this.setState({ files });
        }
      });
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  handleChangeFile = selectedOptionFile => {
    this.setState({
      selectedOptionFile,
      contentType: selectedOptionFile.type,
      URL: selectedOptionFile.url,
      ext: selectedOptionFile.ext,
      fileName: selectedOptionFile.label
    });
  };

  saveContent = () => {
    // var data = {
    //   title: this.state.title,
    //   info: this.state.info,
    //   instructions: this.state.instructions,
    //   contentType: this.state.selectedOption.value,
    //   URL: this.state.URL,
    //   ext: ext
    // };

    if (this.props.isEdit) {
      this.props.addContentData(
        {
          title: this.state.title,
          info: this.state.info,
          fileName: this.state.fileName,
          instructions: this.state.instructions,
          contentType: this.state.contentType,
          URL: this.state.URL,
          ext: this.state.ext.toLowerCase(),
          //uploadSource: this.state.selectedOptionFile,

          type: 2 //docs
        },
        {
          edit: true,
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    } else {
      // var ext = this.state.ext.split("/")[1];
      if (this.state.ext == "jpeg") {
        this.setState({ ext: "jpg" });
      }
      this.props.addContentData(
        {
          title: this.state.title,
          info: this.state.info,
          instructions: this.state.instructions,
          contentType: this.state.contentType,
          URL: this.state.URL,
          fileName: this.state.fileName,
          // uploadSource: this.state.selectedOptionFile,

          ext: this.state.ext.toLowerCase(),

          type: 2 //docs
        },
        {
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    }
  };
  removeImage = () => {
    this.setState({ file: null, URL: null });
  };
  handleUploadStart = event => {
    this.setState({
      file: URL.createObjectURL(event),
      ext: event.type.split("/")[1],
      contentType: event.type.split("/")[0],
      fileName: event.name
    });
    this.setState({
      isUploading_file: true,
      progress_file: 0,
      isEdit: false
    });
  };
  handleProgress = progress_file => {
    this.setState({ progress_file });
  };
  handleUploadError = error => {
    this.setState({ isUploading_file: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("courses/" + this.props.keyProp + "/Documents/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        this.setState({
          // image_url: filename,

          URL: url,
          progress_file: 100,
          isUploading_file: false
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <WebNotif />

        <div className="col-md-12">
          <div className=" col-md-12">
            <div className="row">
              <div className="col-md-7">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.title}
                    placeholder="Enter title Here*"
                    onChange={event =>
                      this.setState(byPropKey("title", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-5">
                {/* <button className="btn btn-white fix_width_btn  btn-transparent black admin-btn">
                  Bulk Upload
                </button>{" "} */}
                <button
                  className="btn btn-white fix_width_btn  btn-transparent black admin-btn"
                  onClick={this.saveContent}
                >
                  Save
                </button>{" "}
                &nbsp; &nbsp;
                <button
                  className="btn white  fix_width_btn  btn-red black admin-btn"
                  onClick={this.props.cancel}
                >
                  Cancel{" "}
                </button>{" "}
              </div>
            </div>
          </div>
          <hr className="hr-2" />
          <div className="col-md-12">
            <form className="form-row lrp-0">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <b>Detail</b>
                    {/* <span className="clr-red">*</span> */}
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.info}
                    placeholder="Enter info"
                    onChange={event =>
                      this.setState(byPropKey("info", event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <b>Instructions</b>
                    {/* <span className="clr-red">*</span> */}
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.instructions}
                    placeholder="Enter instructions"
                    onChange={event =>
                      this.setState(
                        byPropKey("instructions", event.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>
                    <b>Upload Type</b>
                  </label>
                  <Select
                    options={this.state.options}
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {this.state.selectedOption != undefined &&
              this.state.selectedOption.value == 2 ? (
                <div className="col-md-3">
                  <label>
                    Upload File <span className="clr-red">*</span>
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
                          className="fa fa-file fa-3x pb-10"
                          style={{ color: "#3660C1" }}
                        />
                        <br />
                        Add File
                      </div>
                    ) : (
                      <React.Fragment>
                        <div
                          className="d-flex justify-content-center"
                          style={{
                            height: "50px",
                            width: "165px",
                            border: "0.5px solid #F3F3F3",
                            borderRadius: 4,
                            cursor: "pointer"
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "55px",
                              color: "#ffffff8f"
                            }}
                            className="text-center"
                          >
                            {/* <i className="fa fa-plus-circle fa-3x" />{" "} */}
                            <br />
                            {this.state.progress_file < 100 &&
                            !this.state.isEdit
                              ? "Uploading..."
                              : ""}
                          </div>
                          {this.state.progress_file > -1 ? (
                            <Line
                              percent={this.state.progress_file}
                              strokeWidth="1.5"
                              trailWidth="1.5"
                              strokeColor={
                                this.state.URL < 100 ? "red" : "#3AEAAE"
                              }
                              style={{
                                height: "6px",
                                width: "165px",
                                position: "absolute",
                                bottom: "20px"
                              }}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {/* <img
                          src={this.state.file}
                          style={{
                            maxWidth: "165px",
                            objectFit: "cover"
                          }}
                        /> */}
                          <div className=" text-center">
                            <span>
                              <i
                                className="fa  fa-2x fa-file"
                                style={{ color: "#3660C1" }}
                              />
                            </span>
                            <br />
                            <span>{this.state.fileName}</span>{" "}
                          </div>
                        </div>
                      </React.Fragment>
                    )}

                    <FileUploader
                      accept="image/*,video/mp4"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase
                        .storage()
                        .ref("courses/" + this.props.keyProp + "/Documents")}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                      // onChange={this.customOnChangeHandler}
                      hidden={true}
                    />
                  </label>
                </div>
              ) : (
                // this.state.selectedOption != undefined &&
                //   this.state.selectedOption.value == 1 ?
                <div className="col-md-3">
                  <div className="form-group">
                    <label>
                      <b>Select From Repo</b>
                      <span className="clr-red">*</span>
                    </label>
                    <Select
                      options={this.state.files}
                      value={this.state.selectedOptionFile}
                      onChange={this.handleChangeFile}
                    />
                  </div>
                </div>
              )
              // : (
              //   ""
              //   // <React.Fragment>
              //   //   <div className="col-md-3">
              //   //     <div className="form-group">
              //   //       <label>
              //   //         <b>Add URL</b>
              //   //         <span className="clr-red">*</span>
              //   //       </label>
              //   //       <input
              //   //         type="text"
              //   //         className="form-control"
              //   //         placeholder="Enter URL"
              //   //         onChange={event =>
              //   //           this.setState(byPropKey("URL", event.target.value))
              //   //         }
              //   //       />
              //   //     </div>
              //   //   </div>
              //   //   <div className="col-md-3">
              //   //     <div className="form-group">
              //   //       <label>
              //   //         <b>Add Extension</b>
              //   //         <span className="clr-red">*</span>
              //   //       </label>
              //   //       <input
              //   //         type="text"
              //   //         className="form-control"
              //   //         placeholder="Enter Extension .png, .mp4"
              //   //         onChange={event =>
              //   //           this.setState(byPropKey("ext", event.target.value))
              //   //         }
              //   //       />
              //   //     </div>
              //   //   </div>
              //   // </React.Fragment>
              // )
              }
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MediaContentHome;
