import React, { Component } from "react";

import WebNotif from "./WebNotif";
import firebase, { db } from "../firebase/firebase";
import Select from "react-select";

import FileUploader from "react-firebase-file-uploader";
import { Line } from "rc-progress";
import DatePicker from "react-datepicker";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class AssignmentContentHome extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    title: null,
    info: null,
    startDate: null,
    endDate: null,
    instructions: null,
    options: [
      // { value: 0, label: "URL" },
      // { value: 1, label: "PPT" },
      { value: 1, label: "From Repository" },
      { value: 2, label: "From PC" }
    ],
    URL: null,
    progress_file: null,
    dbRef: null,
    isUploading_file: null
  };
  componentDidMount() {
    if (this.props.isEdit && this.props.data != undefined) {
      var data = this.props.data.examDetails;
      this.setState({
        title: data.title,
        info: data.info,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        instructions: data.instructions,
        URL: data.URL,
        isAssignment: data.isAssignment
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
      URL: selectedOptionFile.url,
      ext: selectedOptionFile.ext,
      fileName: selectedOptionFile.label
    });
  };

  handleChangeStart = startDate => {
    this.setState({ startDate: startDate });
  };
  handleChangeEnd = endDate => {
    this.setState({ endDate: endDate });
  };
  saveAssignment = () => {
    if (this.props.isEdit) {
      this.props.addContentData(
        {
          Title: this.state.title,
          info: this.state.info,
          startDate: new Date(this.state.startDate).toISOString(),
          endDate: new Date(this.state.endDate).toISOString(),
          instructions: this.state.instructions,
          URL: this.state.URL,
          ext: this.props.data.examDetails.ext,
          isAssignment: this.props.data.examDetails.isAssignment,

          type: 1
        },
        {
          edit: true,
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    } else {
      var ext = this.state.ext.split("/")[1];
      if (ext == "jpeg") {
        ext = "jpg";
      }
      this.props.addContentData(
        {
          title: this.state.title,
          info: this.state.info,
          startDate: new Date(this.state.startDate).toISOString(),
          endDate: new Date(this.state.endDate).toISOString(),
          instructions: this.state.instructions,
          ext: ext.toLowerCase(),
          isAssignment: true,
          URL: this.state.URL,

          type: 1
        },
        {
          secId: this.props.secId,
          rowId: this.props.rowId,
          items: this.state.items
        }
      );
    }
  };
  handleUploadStart = event => {
    this.setState({
      file: URL.createObjectURL(event),
      ext: event.type,
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
      .ref("courses/" + this.props.keyProp + "/assignments/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        var ext = this.state.ext.split("/")[1];
        if (ext == "jpeg") {
          ext = "jpg";
        }
        db.ref(
          "assignments/" +
            this.props.keyProp +
            "/" +
            this.props.secId +
            "/" +
            this.props.rowId
        ).set({
          secId: this.props.secId,
          rowId: this.props.rowId,
          url: url,
          filename: filename,
          ext: ext
        });
        this.setState({
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
                    placeholder="Enter Title Here*"
                    onChange={event =>
                      this.setState(byPropKey("title", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-5">
                <button
                  className="btn btn-white fix_width_btn  btn-transparent black admin-btn"
                  onClick={this.saveAssignment}
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
              <div className="col-md-12">
                <div className="form-group">
                  <label>
                    <b>Detail</b>
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
                <div className="form-group col-md-12">
                  <b>Start Date</b>
                  <span className="clr-red">*</span> <br />
                  <DatePicker
                    showTimeSelect
                    className="form-control "
                    selected={this.state.startDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeStart}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group  col-md-12">
                  <b>End Date</b>
                  <span className="clr-red">*</span> <br />
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    dateFormat="Pp"
                    onChange={this.handleChangeEnd}
                    showTimeSelect
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <b>Instructions</b>
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
                      accept="application/pdf,application/msword,
    application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      name="avatar"
                      randomizeFilename
                      storageRef={firebase
                        .storage()
                        .ref("courses/" + this.props.keyProp + "/assignments")}
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
              )}
            </form>{" "}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AssignmentContentHome;
