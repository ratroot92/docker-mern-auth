import React, { Component } from "react";

import firebase from "../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
import UploadCard from "./UploadCard";

var totalUploaded = 0;
class MultiFileUpload extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    files: [],
    filesInfo: null,
    uploadStart: false,
    storageRef: null,
    totalFiles: 0
  };
  componentDidMount() {
    this.setState({
      storageRef: this.props.storageRef
    });
  }
  /**
   * Custom onChange event handler
   * Store selected files in the state
   */

  handleProgress = (progress_image, file) => {
    var filesInfo = { ...this.state.filesInfo };
    filesInfo[file.blob_.data_.key]["progress"] = progress_image;
    this.setState({ filesInfo });
    this.setState({ progress_image });
  };
  handleUploadError = error => {
    totalUploaded++;
    this.setState({ isUploading_image: false });
    console.error(error);
  };
  handleUploadSuccess = (filename, file) => {
    var fileKey = file.blob_.data_.key;
    var fileName = this.state.filesInfo[file.blob_.data_.key]["name"];
    firebase
      .storage()
      .ref(this.state.storageRef)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        totalUploaded++;

        this.props.onUpload({
          fileName: fileName,
          url: url,
          type: this.state.filesInfo[fileKey].type,
          total: this.state.totalFiles,
          totalUploaded: totalUploaded
        });
        if (totalUploaded == this.state.totalFiles) {
          this.setState({ totalFiles: 0, files: [] });
          totalUploaded = 0;
        }
        this.setState({
          // image_url: filename,
          image_url: url,
          file: url,
          progress_image: 100,
          isUploading_image: false
        });
      });
  };
  customOnChangeHandler = event => {
    this.setState({ totalFiles: 0, uploadStart: false });
    var filesInfo = {};

    const {
      target: { files }
    } = event;
    const filesToStore = [];
    Object.keys(files).map(file => {
      filesToStore.push(files[file]);
      filesInfo[file] = {
        name: files[file]["name"],
        type: files[file].type,
        progress: 0.5
      };
    });
    this.setState({ filesInfo });

    this.setState({ files: filesToStore });
  };

  /**
   * Start download handler using the file uploader reference
   */
  startUploadManually = () => {
    var filesInfo = { ...this.state.filesInfo };
    totalUploaded = 0;
    const { files } = this.state;
    Object.keys(files).map(file => {
      files[file]["key"] = file;
      // filesInfo[file] = { name: files[file]["name"], progress: 0 };
      this.fileUploader.startUpload(files[file]);
      //   filesInfo[file] = {  };
    });

    // this.setState({ filesInfo });
    this.setState({
      totalFiles: Object.keys(filesInfo).length,
      uploadStart: true
    });
  };
  removeFile = key => {
    var filesInfo = { ...this.state.filesInfo };
    delete filesInfo[key];
    this.setState({ filesInfo, totalFiles: Object.keys(filesInfo).length });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.storageRef != null ? (
          <React.Fragment>
            <label
              // style={{
              //   backgroundColor: "steelblue",
              //   color: "white",
              //   padding: 10,
              //   borderRadius: 4,
              //   pointer: "cursor"
              // }}
              className="btn admin-btn-green fix_width_btn white upload-btn admin-btn float-right"
            >
              Add files{" "}
              <FileUploader
                multiple
                hidden
                storageRef={firebase.storage().ref(this.state.storageRef)}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                onChange={this.customOnChangeHandler} // ⇐ Call your handler
                ref={instance => {
                  this.fileUploader = instance;
                }} // ⇐ reference the component
              />
            </label>

            <br />

            <br />
          </React.Fragment>
        ) : (
          ""
        )}

        {this.state.filesInfo != null &&
        Object.keys(this.state.filesInfo).length != 0 ? (
          <React.Fragment>
            <div style={{ maxHeight: "150px", overflow: "auto" }}>
              {Object.keys(this.state.filesInfo).map(index => (
                <UploadCard
                  fileName={this.state.filesInfo[index].name}
                  fileProgress={this.state.filesInfo[index].progress}
                  removeFile={this.removeFile}
                  uploadStart={this.state.uploadStart}
                  id={index}
                />
              ))}
            </div>
            <div className="col">
              <br />
              <button
                className="btn admin-btn-green fix_width_btn white admin-btn float-right"
                onClick={this.startUploadManually}
              >
                Upload
              </button>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default MultiFileUpload;
