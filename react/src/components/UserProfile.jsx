import React, { Component } from "react";
import Loader from "./loader";
import WebNotif from "./WebNotif";
import firebase from "../firebase/firebase";
import { db } from "../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
import { Line } from "rc-progress";
import { auth } from "../firebase";
import { truncate } from "fs";
import Select from "react-select";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
class ManageUsers extends Component {
  state = {
    showLoader: false,
    name: "",
    poe: "",
    qualification: "",
    address1: "",
    city: "",
    stateArea: "",
    zipCode: "",
    country: "",
    nationality: "",
    introduction: "",
    userData: null,
    imageURL: null,
    isUploading_image: false,
    progress_image: 0,
    image_url: "",
    file: null,
    isEdit: true,
    selectedOption: { value: "student", label: "Student" },
    options: []
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
      .ref("userImages/" + this.props.userId)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        // this.setState({ image_url: url });
        this.setState({
          // image_url: filename,
          image_url: url,
          file: url,
          progress_image: 100,
          isUploading_image: false
        });
      });
  };
  componentDidMount() {
    db.ref(`userInfo/` + this.props.userId)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          this.setState({
            userData: snapshot.val(),
            name: snapshot.val().name,
            introduction: snapshot.val().introduction,
            qualification: snapshot.val().qualification,
            poe: snapshot.val().institute,
            file: snapshot.val().image,
            address1: snapshot.val().address1,
            country: snapshot.val().country,
            stateArea: snapshot.val().state,
            zipCode: snapshot.val().zip,
            city: snapshot.val().city,
            image_url: snapshot.val().image,
            isEdit: snapshot.val().image == null ? false : true
          });
        }
      });
    db.ref("userInfo/" + this.props.userId + "/twoStep").set(true);

    db.ref(`roleTemplate`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          var tOptions = [];
          Object.keys(snapshot.val()).map(key => {
            tOptions.push({
              value: snapshot.val()[key].roleName,
              label: snapshot.val()[key].roleName
            });
          });
          this.setState({ options: tOptions });
        }
      });
    var self = this;
    db.ref(`roles/` + this.props.userId)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() != null) {
          // Object.key(snapshot.val()).map(key => {

          this.setState({
            selectedOption: {
              value: snapshot.val().roleName,
              label: snapshot.val().roleName
            }
          });
        }
      });
  }

  addInstrutor = () => {
    var userData = { ...this.state.userData };
    userData.name = this.state.name;
    userData.introduction = this.state.introduction;
    userData.qualification = this.state.qualification;
    userData.institute = this.state.poe;
    userData.image = this.state.image_url;
    userData.country = this.state.country;
    userData.state = this.state.stateArea;
    userData.city = this.state.city;
    userData.zip = this.state.zipCode;
    userData.address1 = this.state.address1;
    userData.nationality = this.state.nationality;
    this.setState({ userData });
    if (this.validateForm(userData)) {
      db.ref(`userInfo/` + this.props.userId)
        .set(userData)
        .then(() => {
          auth.doUpdateProfile(this.state.name, this.state.image_url);
          var obj = new WebNotif();
          obj.createNotification("success", "Profile Updated");
        });
    }
  };
  updateRole = selectedOption => {
    this.setState({ selectedOption });
  };

  validateForm = userData => {
    if (userData.nationality && userData.country && userData.city) {
      return true;
    } else {
      var obj = new WebNotif();
      obj.createNotification("error", "Please Fill the Required Fields!");
      return false;
    }
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <div className="admin-card card">
          <div className="card-body">
            <div className="container">
              <div className=" col-md-12">
                <div className="row">
                  <div className="col-md-7">
                    <h5 className="card-title regular_font">User Details</h5>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn admin-btn-green fix_width_btn white admin-btn"
                      onClick={this.addInstrutor}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <label>Add Profile Image </label>
                    <br />
                    {this.state.file != null && this.state.file != undefined ? (
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
                          Add Profile Image
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
                                  this.state.progress_image < 100
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
                          .ref("userImages/" + this.props.userId)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        // onChange={this.customOnChangeHandler}
                        hidden={true}
                      />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>Full Name </label>

                    <input
                      type="text"
                      className="form-control fs-14"
                      placeholder="Full Name"
                      value={this.state.name}
                      onChange={event =>
                        this.setState(byPropKey("name", event.target.value))
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    {/* {this.state.selectedOption.label} */}
                    <label className="">Account Type </label>

                    <Select
                      className=" "
                      options={this.state.options}
                      value={this.state.selectedOption}
                      // onChange={this.updateRole}
                      isDisabled={true}
                    />
                    {/* <select
                      className="form-control admin-form-control"
                      id="exampleFormControlSelect1"
                      value={this.state.role}
                      disabled={this.props.roleChange == true ? true : false}
                    >
                      <option value="1">Admin</option>>
                      <option value="2">Instructor</option>
                      <option value="3">Student</option>
                    </select> */}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="form-control fs-14"
                      placeholder="Qualification"
                      value={this.state.qualification}
                      onChange={event =>
                        this.setState(
                          byPropKey("qualification", event.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Place of Employment</label>
                    <input
                      type="text"
                      className="form-control fs-14"
                      placeholder="Place of Employment"
                      value={this.state.poe}
                      onChange={event =>
                        this.setState(byPropKey("poe", event.target.value))
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <label>Introduction</label>
                    <textarea
                      className="form-control fs-14"
                      rows="5"
                      value={this.state.introduction}
                      placeholder="About"
                      onChange={event =>
                        this.setState(
                          byPropKey("introduction", event.target.value)
                        )
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <label>Address</label>
                    <textarea
                      className="form-control fs-14"
                      rows="5"
                      placeholder="Address"
                      value={this.state.address1}
                      onChange={event =>
                        this.setState(byPropKey("address1", event.target.value))
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label>
                      City <span className="clr-red">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control fs-14"
                      placeholder="City"
                      value={this.state.city}
                      onChange={event =>
                        this.setState(byPropKey("city", event.target.value))
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control fs-14"
                      placeholder="State"
                      value={this.state.stateArea}
                      onChange={event =>
                        this.setState(
                          byPropKey("stateArea", event.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label>
                      Country <span className="clr-red">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control fs-14"
                      placeholder="Country"
                      value={this.state.country}
                      onChange={event =>
                        this.setState(byPropKey("country", event.target.value))
                      }
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label>
                      Nationality <span className="clr-red">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control fs-14"
                      placeholder="Nationality"
                      value={this.state.nationality}
                      onChange={event =>
                        this.setState(
                          byPropKey("nationality", event.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label>ZipCode</label>
                    <input
                      type="text"
                      className="form-control fs-14"
                      placeholder="Zipcode"
                      value={this.state.zipCode}
                      onChange={event =>
                        this.setState(byPropKey("zipCode", event.target.value))
                      }
                    />
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default ManageUsers;
