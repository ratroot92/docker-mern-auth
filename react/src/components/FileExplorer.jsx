import React, { Component } from "react";

import firebase from "../firebase/firebase";
import { db } from "../firebase/firebase";

import "../assets/css/courseCreation.css";

class FileExplorer extends Component {
  constructor(props) {
    super(props);
    this.timePlaceholder = new Date().toDateString();
    this.state = { files: null };
  }

  // componentDidMount() {
  //   this.fetchListing();
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isUpdate) {
  //     this.fetchListing();
  //     this.props.updateProcessed();
  //   }
  // }
  // componentWillMount() {}
  // removeFile = key => {
  //   db.ref("courseFileListing/" + this.props.keyProp + "/" + key)
  //     .set(null)
  //     .then(() => {
  //       this.fetchListing();
  //     });
  // };
  // fetchListing = () => {
  //   db.ref("courseFileListing/" + this.props.keyProp)
  //     .once("value")
  //     .then(snapshot => {
  //       if (snapshot.val() != null) {
  //         this.setState({ files: snapshot.val() });
  //       } else {
  //         this.setState({ files: null });
  //       }
  //     });
  // };
  render() {
    return (
      <React.Fragment>
        {/* <h3>Course Files</h3>
        <div style={{ maxHeight: "450px", overflow: "auto" }}>
          <table className="admin-course-file-table col-md-12">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Icon</th>
                <th>Updated Last</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files != null
                ? Object.keys(this.state.files).map((file, index) => (
                    <tr key={file}>
                      <td>{index}</td>
                      <td>
                        <span>{this.state.files[file].name}</span>
                      </td>
                      <td>
                        <span>
                          <i
                            className={
                              this.state.files[file].type.indexOf("image") > -1
                                ? "fa  fa-2x fa-file-image-o "
                                : this.state.files[file].type.indexOf("video") >
                                  -1
                                ? " fa  fa-2x fa-file-video-0 "
                                : this.state.files[file].type.indexOf(
                                    "wordprocessing"
                                  ) > -1
                                ? "fa  fa-2x fa-file-word-o"
                                : this.state.files[file].type.indexOf("pdf") >
                                  -1
                                ? "fa  fa-2x fa-file-pdf-o"
                                : " fa  fa-2x fa-file"
                            }
                            style={{ color: "#3660C1" }}
                          />
                        </span>
                      </td>

                      <td>{`${this.timePlaceholder}`}</td>
                      <td>
                        <div className="fileRemove">
                          <span
                            onClick={() => this.removeFile(file)}
                            className="pointer white"
                          >
                            Remove
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                : "No files found."}
            </tbody>
          </table>
        </div>
       */}
      </React.Fragment>
    );
  }
}

export default FileExplorer;
