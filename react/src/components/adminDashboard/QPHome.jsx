import React, { Component } from "react";
import QuestionsPool from "./QuestionsPool";
import QuestionFrom from "./QuestionFrom";
import Modal from "react-responsive-modal";
import firebase, { db } from "../../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";

class QPHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // ModalOpen: false,
      // isUploading: false,
      // progress: 0,
      // active: 0,
      // currentComp: (
      //   <QuestionsPool
      //     editQP={this.editQP}
      //     isCourse={this.props.isCourse}
      //     courseType={this.props.courseType}
      //     keyProp={this.props.keyProp}
      //     permissions={this.props.permissions}
      //   />
      // )
    };
  }
  componentDidMount() {
    this.setState({ courseTitle: this.props.courseTitle });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ courseTitle: nextProps.courseTitle });
  }
  editQP = (key, keyGroup) => {
    this.setState({
      currentComp: (
        <QuestionFrom
          setComp={this.setComp}
          qId={key}
          keyProp={this.props.keyProp}
          keyGroup={keyGroup}
          isCourse={this.props.isCourse}
          permissions={this.props.permissions}
        />
      ),

      active: 1
    });
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    // firebase
    //   .storage()
    //   .ref("bulkUpload")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url =>
    //     db.ref("taskQueue/bulk").push({ fileName: filename, url: url })
    //   );
    // alert("file upload complete");
  };
  onOpenModal = () => {
    this.setState({ ModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
    this.setState({ viewPreviousAttempts: "hide" });
    this.setState({ viewCourseModel: "show-block" });
    this.setState({
      at_mode: " show-block ",
      filterBox: " hide "
    });
  };
  state = {};

  setComp = comp => {
    if (comp == 0) {
      this.setState({
        currentComp: (
          <QuestionsPool
            editQP={this.editQP}
            isCourse={this.props.isCourse}
            courseType={this.props.courseType}
            keyProp={this.props.keyProp}
            permissions={this.props.permissions}
          />
        ),
        active: 0
      });
    } else {
      this.setState({ currentComp: comp, active: 1 });
    }
  };

  render() {
    return (
      <React.Fragment>
        {" "}
        <div className=" col-md-12">
          <div className="row">
            <div className="col-md-7">
              {this.state.active == 0 ? (
                <h4 className="regular_font">Question Pool</h4>
              ) : (
                <h4 className="regular_font">Add Question</h4>
              )}
              <div className="col lrp-0">
                <span>
                  <b>Course title:</b>
                  {this.state.courseTitle != undefined
                    ? " (" + this.state.courseTitle + ")"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-md-5">
              {this.state.active == 0 ? (
                <React.Fragment>
                  <button
                    className={
                      "btn  fs-13 white admin-btn-green"
                      //   this.props.permissions["add"]
                      //     ? "btn  fs-13 white admin-btn-green"
                      //     : "hide"n
                      //
                    }
                    onClick={() =>
                      this.setComp(
                        <QuestionFrom
                          setComp={this.setComp}
                          qId={null}
                          permissions={this.props.permissions}
                        />
                      )
                    }
                  >
                    &nbsp;&nbsp; Add Questions &nbsp;&nbsp;
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    className="btn  fs-13 white admin-btn-green"
                    onClick={() => this.setComp(0)}
                  >
                    &nbsp;&nbsp; Question Pool &nbsp;&nbsp;
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {!this.props.isCourse ? (
                    <button
                      className="btn  fs-13 white btn-red"
                      onClick={this.onOpenModal}
                    >
                      &nbsp;&nbsp; Bulk Upload &nbsp;&nbsp;
                    </button>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              )}{" "}
            </div>
          </div>
        </div>
        <hr className="hr-2" />
        {this.state.currentComp !== null ? this.state.currentComp : ""}
        <Modal open={this.state.ModalOpen} onClose={this.onCloseModal} center>
          <div className=" modal-content custom-modalcourse-width">
            <div className="modal-body zero_padding">
              {" "}
              <div className="modal-course-name text-center bg-white">
                <div className="col-md-12">
                  <div className="lrp-15 d-flex justify-content-center">
                    <h6 className="lrp-30 bg-white fs-34 bm-0">Bulk Upload </h6>
                  </div>
                </div>
              </div>
              <div className="container p-coursemodal">
                <form>
                  <label>File Upload (csv):</label>

                  {this.state.isUploading && (
                    <p>Progress: {this.state.progress}</p>
                  )}
                  {this.state.avatarURL && <img src={this.state.avatarURL} />}
                  <FileUploader
                    accept=".csv"
                    // name="avatar"
                    // randomizeFilename
                    // storageRef={firebase.storage().ref("bulkUpload")}
                    // onUploadStart={this.handleUploadStart}
                    // onUploadError={this.handleUploadError}
                    // onUploadSuccess={this.handleUploadSuccess}
                    // onProgress={this.handleProgress}
                  />
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default QPHome;
