import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import FileUploader from "react-firebase-file-uploader";
// import { db } from "../firebase/firebase";
import ToggleButton from "react-toggle-button";
import CreatableSelect from "react-select/lib/Creatable";
import EMQ from "../EMQ";
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Loader from "../loader";
import { Line } from "rc-progress";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class QuestionPoolComponent extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    isUploading1: false,
    progress: 0,
    QMediaURL: "",
    AMediaURL: null,
    progressQMedia: 0,
    fileQMedia: null,
    instructions: "",
    fileAMedia: null,
    year: "",
    QMediaType: null,
    AMediaType: null,
    q_tag: "",
    question: "",
    emq: {},
    answer: "",
    sbaflag: false,
    questions_array: [],
    selectedOption: [],
    options: [
      { index: 0, value: false, text: "" },
      { index: 1, value: false, text: "" }
    ],
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
    optst: false,
    currentIndex: null,
    tag_options: [],
    q_type: "1",
    showLoader: false,
    isEdit: false
  };
  tota = 0;
  myEmq = {};
  onChange = value => {
    // 1 --> sba, 2--> mcq, 3--> emq, 4--> true/false
    this.setState({ q_type: value });
  };
  constructor(props) {
    super(props);
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops.isAdded) {
      this.myEmq = {};
      this.setState({
        question: "",
        answer: "",
        instructions: "",
        emq: {},
        // q_type: "",
        fileAMedia: null,
        fileQMedia: null,
        //  selectedOption: [],
        options: [
          { index: 0, value: false, text: "" },
          { index: 1, value: false, text: "" }
        ]
      });
    }
  }
  componentDidMount() {
    // if (this.props.qId != null) {
    //   var selectedTags = [];
    //   db.ref(`questions/` + this.props.qId)
    //     .once("value")
    //     .then(snapshot => {
    //       this.setState({ isEdit: true });
    //       if (snapshot.val().type != 3) {
    //         this.setState({
    //           question: snapshot.val().Description,
    //           q_type: snapshot.val().type,
    //           answer: snapshot.val().exp,
    //           year: snapshot.val().year
    //         });
    //         if (snapshot.val().mediaType > 1) {
    //           this.setState({
    //             fileAMedia: snapshot.val().aName,
    //             fileQMedia: snapshot.val().qName,
    //             QMediaURL: snapshot.val().media,
    //             AMediaURL: snapshot.val().mediaE,
    //             QMediaType: snapshot.val().mediaType == 1 ? "image/" : "video/",
    //             progressAMedia: -1,
    //             progressQMedia: -1
    //           });
    //         }
    //         var selectedOption = [...this.state.selectedOption];
    //         snapshot.child("tags").forEach(tags => {
    //           if (
    //             (Object.keys(tags.val()).length == 1 &&
    //               tags.val().All != null) ||
    //             tags.val() == true
    //           ) {
    //             var new_option = { value: tags.key, label: tags.key };
    //             selectedOption.push(new_option);
    //           } else {
    //             Object.keys(tags.val()).map(groupkey => {
    //               selectedOption.push({
    //                 label: groupkey,
    //                 value: tags.key + "~" + groupkey
    //               });
    //             });
    //           }
    //         });
    //         this.setState({ selectedOption });

    //         var opt_index = 1;

    //         this.setState({ options: [] });
    //         var options = [...this.state.options];

    //         Object.keys(snapshot.val().options).map(opt => {
    //           var new_option = {
    //             index: opt_index,
    //             value: snapshot.child("answer").hasChild(opt) ? true : false,
    //             text: snapshot.val()["options"][opt]
    //           };
    //           opt_index = opt_index + 1;
    //           options.push(new_option);
    //         });
    //         options.push({ index: options.length, value: false, text: "" });
    //         this.setState({ options });
    //         this.setState({ optst: true });
    //       } else {
    //         this.setState({
    //           instructions: snapshot.val().Description,
    //           q_type: snapshot.val().type,
    //           //   answer: snapshot.val().exp,
    //           year: snapshot.val().year
    //         });
    //         this.myEmq = snapshot.val().emq;
    //         if (snapshot.val().mediaType > 1) {
    //           this.setState({
    //             fileAMedia: snapshot.val().aName,
    //             fileQMedia: snapshot.val().qName,
    //             QMediaURL: snapshot.val().media,
    //             AMediaURL: snapshot.val().mediaE,
    //             QMediaType: snapshot.val().mediaType == 1 ? "image/" : "video/",
    //             progressAMedia: -1,
    //             progressQMedia: -1
    //           });
    //         }
    //         snapshot.child("tags").forEach(tags => {
    //           var new_option = { value: tags.key, label: tags.key };
    //           var selectedOption = [...this.state.selectedOption];
    //           selectedOption.push(new_option);
    //           this.setState({ selectedOption });
    //         });
    //         var opt_index = 0;
    //         this.setState({ options: [] });
    //         var options = [...this.state.options];

    //         Object.keys(snapshot.val().options).map(opt => {
    //           var new_option = {
    //             index: opt,
    //             value: snapshot.child("answer").hasChild(opt) ? true : false,
    //             text: snapshot.val()["options"][opt]
    //           };
    //           opt_index = opt_index + 1;
    //           options.push(new_option);
    //         });
    //         options.push({ index: options.length, value: false, text: "" });

    //         this.setState({ options });
    //         this.setState({ optst: true });

    //         Object.keys(snapshot.val().emq).map((key, index) => {
    //           var emq = { ...this.state.emq };
    //           emq[key] = (
    //             <EMQ
    //               isEdit={true}
    //               index={index + 1}
    //               id={key}
    //               removeEmq={this.removeEmq}
    //               emqData={this.emqData}
    //               options={this.state.options}
    //               emqObj={snapshot.val().emq[key]}
    //             />
    //           );
    //           this.setState({ emq });
    //           this.tota = parseInt(key);
    //           this.tota++;
    //         });
    //       }
    //     });
    // }
    // db.ref(`Tags`)
    //   .once("value")
    //   .then(snapshot => {
    //     var tag_options = [...this.state.tag_options];

    //     snapshot.forEach(tags => {
    //       // Object.keys(this.state.category_options).map(key => {
    //       if (
    //         (Object.keys(tags.val()).length == 1 && tags.val().All != null) ||
    //         tags.val() == true
    //       ) {
    //         var new_option = { value: tags.key, label: tags.key };
    //         tag_options.push(new_option);
    //       } else {
    //         var groupOption = [];

    //         Object.keys(tags.val()).map(groupkey => {
    //           if (groupkey != "All") {
    //             groupOption.push({
    //               label: groupkey,
    //               value: tags.key + "~" + groupkey
    //             });
    //             this.setState({
    //               selectedCat: {
    //                 value: tags.key + "~" + groupkey,
    //                 label: groupkey
    //               }
    //             });
    //           }
    //         });
    //         groupOption.push({
    //           label: "Others " + tags.key,
    //           value: tags.key
    //         });
    //         tag_options.push({ label: tags.key, options: groupOption });
    //       }
    //       // });
    //     });
    //     this.setState({ tag_options });

    //     this.setState({ showLoader: false });
    //   });
  }

  handleUploadStart = event => {
    this.setState({
      isUploading: true,
      progressQMedia: 0,
      fileQMedia: event.name,
      QMediaType: event.type
    });
  };
  handleProgress = progress => {
    if (progress >= this.state.progressQMedia) {
      this.setState({ progressQMedia: progress });
    }
  };
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({
      avatar: filename,
      progressQMedia: 100,
      isUploading: false
    });
    // firebase
    //   .storage()
    //   .ref("Media/Questions")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => {
    //     this.setState({ QMediaURL: url });
    //   });
  };
  // newQuestion = () => {
  //   this.props.add_question(
  //     this.state.year,
  //     this.state.question,
  //     this.state.answer,
  //     this.state.q_type,
  //     this.state.selectedOption,
  //     this.state.options,
  //     this.state.QMediaURL,
  //     this.state.QMediaType,
  //     this.state.fileQMedia,
  //     this.state.AMediaURL,
  //     this.state.AMediaType,
  //     this.state.fileAMedia,
  //     this.state.instructions,
  //     this.myEmq,
  //     this.state.isEdit,
  //     0
  //   );
  // };
  // addnewQuestion = () => {
  //   this.props.add_question(
  //     this.state.year,
  //     this.state.question,
  //     this.state.answer,
  //     this.state.q_type,
  //     this.state.selectedOption,
  //     this.state.options,
  //     this.state.QMediaURL,
  //     this.state.QMediaType,
  //     this.state.fileQMedia,
  //     this.state.AMediaURL,
  //     this.state.AMediaType,
  //     this.state.fileAMedia,
  //     this.state.instructions,
  //     this.myEmq,
  //     this.state.isEdit,

  //     1
  //   );
  // };

  handleUploadStart1 = event => {
    this.setState({
      isUploading1: true,
      progressAMedia: 0,
      fileAMedia: event.name,
      AMediaType: event.type
    });
  };
  handleProgress1 = progress => {
    if (progress >= this.state.progressAMedia) {
      this.setState({ progressAMedia: progress });
    }
  };
  handleUploadError1 = error => {
    this.setState({ isUploading1: false });
    console.error(error);
  };

  handleUploadSuccess1 = filename => {
    this.setState({
      avatar: filename,
      progressAMedia: 100,
      isUploading1: false
    });
    // firebase
    //   .storage()
    //   .ref("Media/Questions")
    //   .child(filename)
    //   .getDownloadURL()
    //   .then(url => {
    //     this.setState({ AMediaURL: url });
    //   });
  };

  toggleSwitch = index => {
    const options = [...this.state.options];
    if (this.state.q_type == "1") {
      Object.keys(options).map(key => {
        options[key].value = false;
      });
    }
    options[index].value = !options[index].value;
    this.setState({ options });
  };

  addOption = (index, data) => {
    var options = [...this.state.options];
    var len = options.length;
    if (len == index + 1) {
      options.push({ index: len, value: false, text: "" });
      this.setState({ options });
    }
  };
  emqData = data => {
    if (this.myEmq[data.id] == undefined) {
      this.myEmq[data.id] = {};
    }
    if (data.question != undefined) {
      if (this.myEmq[data.id]["question"] == undefined) {
        this.myEmq[data.id]["question"] = {};
      }
      this.myEmq[data.id]["question"] = data.question;
    }
    if (data.answer != undefined) {
      if (this.myEmq[data.id]["answer"] == undefined) {
        this.myEmq[data.id]["answer"] = {};
      }
      this.myEmq[data.id]["answer"] = "option" + data.answer;
    }
    if (data.explanation != undefined) {
      if (this.myEmq[data.id]["explanation"] == undefined) {
        this.myEmq[data.id]["explanation"] = {};
      }
      this.myEmq[data.id]["explanation"] = data.explanation;
    }
  };
  addemq = () => {
    var emq = { ...this.state.emq };
    var index = Object.keys(emq).length + 1;
    emq[this.tota] = (
      <EMQ
        id={"emq" + this.tota}
        index={index}
        isEdit={false}
        removeEmq={this.removeEmq}
        emqData={this.emqData}
        options={this.state.options}
      />
    );
    this.setState({ emq });
    this.tota++;
  };
  resetEmqCount = () => {
    var prev_emq = { ...this.state.emq };
    var emq = {};
    Object.keys(prev_emq).map((id, index) => {
      emq[id] = (
        <EMQ
          data={this.myEmq["emq" + id]}
          id={"emq" + id}
          index={parseInt(index) + 1}
          isEdit={false}
          removeEmq={this.removeEmq}
          emqData={this.emqData}
          options={this.state.options}
        />
      );
    });

    this.setState({ emq });
  };
  removeEmq = id => {
    confirmAlert({
      title: "Confirm to remove",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let idDel = id.split("emq")[1];
            var emq = { ...this.state.emq };
            delete emq[idDel];

            if (this.myEmq[id] != undefined) {
              delete this.myEmq[id];
            }
            this.setState({ emq }, () => {
              this.resetEmqCount();
            });
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  addOptionText = (index, data) => {
    var options = [...this.state.options];
    var len = options.length;
    if (len == index + 1) {
      options.push({ index: len, value: false, text: "" });
      this.setState({ options });
    }
    options[index].text = data;
    this.setState({ options });
  };
  deleteItem = item => {
    if (item == 1) {
      this.setState({ QMediaURL: null, fileQMedia: null, QMediaType: "" });
    } else {
      this.setState({ AMediaURL: null, fileAMedia: null });
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
        {/* <hr style={{ marginTop: "-11px" }} /> */}
        <div className="d-flex justify-content-center">
          <section className=" ptb-30 lrp-0">
            {/* <div className="container col-md-7"> */}
            <div className="form-group">
              <RadioGroup
                onChange={this.onChange}
                horizontal
                value={this.state.q_type}
              >
                <RadioButton value="1">SBA</RadioButton>
                <RadioButton value="2">MCQ</RadioButton>
                <RadioButton value="3">EMQ</RadioButton>
                <RadioButton value="4">True/False</RadioButton>
              </RadioGroup>
            </div>
            <div className="form-group">
              <label>Tags</label>
              {this.state.tag_options.length > 0 ? (
                <CreatableSelect
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.tag_options}
                  isMulti
                />
              ) : (
                ""
              )}
            </div>

            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                min="1880"
                className="form-control admin-form-control admin-input-field admin-input-field"
                placeholder="Appearance year"
                value={this.state.year}
                // onClick={event =>
                //   this.addOption(idx, event.target.result)
                // }
                onChange={event =>
                  this.setState(byPropKey("year", event.target.value))
                }
              />
            </div>
            {this.state.q_type == 3 ? (
              <React.Fragment>
                <div className="form-group">
                  <label>
                    Instructions <span className="clr-red">*</span>
                  </label>
                  <textarea
                    required
                    className="form-control admin-form-control"
                    rows="6"
                    value={this.state.instructions}
                    placeholder="Enter Instructions here"
                    onChange={event =>
                      this.setState(
                        byPropKey("instructions", event.target.value)
                      )
                    }
                  />
                </div>
                <div>
                  {this.state.options.map((val, idx) => {
                    return (
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-lightgreen">
                            <span>
                              {"(" +
                                String.fromCharCode(
                                  "a".charCodeAt() + parseInt(idx)
                                ) +
                                ")"}{" "}
                              &nbsp;&nbsp;
                            </span>
                            <ToggleButton
                              disabled={true}
                              // value={this.state.options[idx].value}
                              // onToggle={value => {
                              //   this.setState({
                              //     value: !value
                              //   });
                              // }}
                              // onToggle={() => this.toggleSwitch(idx)}
                            />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control admin-form-control admin-input-field admin-input-field"
                          placeholder="Option"
                          value={this.state.options[idx].text}
                          // onClick={event =>
                          //   this.addOption(idx, event.target.result)
                          // }
                          onChange={event =>
                            this.addOptionText(idx, event.target.value)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Questions</h5>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={this.addemq}
                        className="btn admin-btn-green fix_width_btn_lg white admin-btn"
                      >
                        Add question to emq{" "}
                      </button>{" "}
                    </div>
                  </div>
                  <br />
                  {this.state.emq != {}
                    ? Object.keys(this.state.emq).map(qp => this.state.emq[qp])
                    : ""}
                </div>

                <br />
                <div>
                  <button
                    onClick={this.newQuestion}
                    className="btn admin-btn-green fix_width_btn_lg white admin-btn"
                  >
                    Save{" "}
                  </button>{" "}
                  <button
                    className="btn btn-red fix_width_btn_lg white admin-btn"
                    onClick={this.addnewQuestion}
                  >
                    Add Another Question
                  </button>{" "}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="form-group">
                  <label>Type new question here</label>
                  <div className="input-group" style={{ height: "140px" }}>
                    <div
                      className="col lrp-0"
                      style={{
                        border: "1px solid #ced4da",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        padding: "2px"
                      }}
                    >
                      <textarea
                        className="form-control admin-form-control"
                        rows="5"
                        placeholder="Question here"
                        value={this.state.question}
                        style={{ border: "0px" }}
                        onChange={event =>
                          this.setState(
                            byPropKey("question", event.target.value)
                          )
                        }
                      />
                      {this.state.fileQMedia !== null ? (
                        <div className="uploadStripe">
                          <span
                            className=""
                            title={
                              this.state.fileQMedia !== null
                                ? this.state.fileQMedia
                                : ""
                            }
                          >
                            &nbsp;&nbsp;
                            {this.state.fileQMedia !== null
                              ? this.state.fileQMedia.slice(0, 10) + "...."
                              : ""}{" "}
                            &nbsp;&nbsp;
                            {this.state.progressQMedia > -1 ? (
                              <Line
                                percent={this.state.progressQMedia}
                                strokeWidth="1.5"
                                trailWidth="1.5"
                                strokeColor={
                                  this.state.progressQMedia < 100
                                    ? "red"
                                    : "#3AEAAE"
                                }
                                style={{
                                  height: "6px",
                                  width: "80px",
                                  position: "absolute",
                                  bottom: "7.5px"
                                }}
                              />
                            ) : (
                              ""
                            )}{" "}
                          </span>
                          <span
                            className="float-right pointer"
                            onClick={() => this.deleteItem(1)}
                          >
                            <i
                              className="fa fa-trash"
                              style={{ color: "#3660C1" }}
                            />
                            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="input-group-prepend lrp-0">
                      <div
                        className="input-group-text lrp-0"
                        style={{
                          width: "70px",
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px"
                        }}
                      >
                        <div
                          className="col-md-12 lrp-0"
                          style={{ height: "140px" }}
                        >
                          <div
                            className="col-md-12 lrp-0"
                            style={{
                              paddingTop: "24px",
                              paddingBottom: "10px"
                            }}
                          >
                            {" "}
                            <label className="text-center pointer" style={{}}>
                              <i
                                className="fa fa-image fa-1_5"
                                style={{ color: "#3660C1" }}
                              />
                              <FileUploader
                                // accept="image/*"
                                // name="avatar"
                                // randomizeFilename
                                // storageRef={firebase
                                //   .storage()
                                //   .ref("Media/Questions")}
                                // onUploadStart={this.handleUploadStart}
                                // onUploadError={this.handleUploadError}
                                // onUploadSuccess={this.handleUploadSuccess}
                                // onProgress={this.handleProgress}
                                // hidden={true}
                                // onClick={event => {
                                //   event.target.value = null;
                                // }}
                              />
                            </label>
                          </div>
                          <hr className="bm-0 tm-0" />
                          <div
                            className="col-md-12 lrp-0"
                            style={{ paddingTop: "20px" }}
                          >
                            <label className="text-center pointer" style={{}}>
                              <i
                                className="fa fa-film fa-1_5"
                                style={{ color: "#3660C1" }}
                              />
                              <FileUploader
                                // accept="video/*"
                                // name="avatar"
                                // randomizeFilename
                                // storageRef={firebase
                                //   .storage()
                                //   .ref("Media/Questions")}
                                // onUploadStart={this.handleUploadStart}
                                // onUploadError={this.handleUploadError}
                                // onUploadSuccess={this.handleUploadSuccess}
                                // onProgress={this.handleProgress}
                                // onClick={event => {
                                //   event.target.value = null;
                                // }}
                                // hidden={true}
                              />
                            </label>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {this.state.options.map((val, idx) => {
                    //console.log("idx");
                    //console.log(idx);
                    return (
                      <div className="input-group mb-3" key={idx}>
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-lightgreen">
                            <span>
                              {"(" +
                                String.fromCharCode(
                                  "a".charCodeAt() + parseInt(idx)
                                ) +
                                ")"}{" "}
                              &nbsp;&nbsp;
                            </span>
                            <ToggleButton
                              value={this.state.options[idx].value}
                              // onToggle={value => {
                              //   this.setState({
                              //     value: !value
                              //   });
                              // }}
                              onToggle={() => this.toggleSwitch(idx)}
                            />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control admin-form-control admin-input-field admin-input-field"
                          placeholder="Option"
                          value={this.state.options[idx].text}
                          // onClick={event =>
                          //   this.addOption(idx, event.target.result)
                          // }
                          onChange={event =>
                            this.addOptionText(idx, event.target.value)
                          }
                        />
                      </div>
                    );
                  })}
                  {/* <div className="form-group">
                <label>Answer Explanation</label>
                <div className="input-group">
                  <textarea
                    className="form-control admin-form-control"
                    rows="5"
                    placeholder="Answer Explanation here"
                    value={this.state.answer}
                    onChange={event =>
                      this.setState(byPropKey("answer", event.target.value))
                    }
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <div className="col-md-12">
                        <div className="col-md-12">
                          {" "}
                          <label className="text-center" style={{}}>
                            <i
                              className="fa fa-image fa-1_5"
                              style={{ color: "#3660C1" }}
                            />
                            <FileUploader
                              accept="image/*"
                              name="avatar"
                              randomizeFilename
                              storageRef={firebase.storage().ref("Media/Questions")}
                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                              onProgress={this.handleProgress}
                              hidden={true}
                            />
                          </label>
                        </div>
                        <hr className="bm-0 tm-0" />
                        <div className="col-md-12">
                          <label className="text-center" style={{}}>
                            <i
                              className="fa fa-film fa-1_5"
                              style={{ color: "#3660C1" }}
                            />
                            <FileUploader
                              accept="video/*"
                              name="avatar"
                              randomizeFilename
                              storageRef={firebase.storage().ref("Media/Questions")}
                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleUploadSuccess}
                              onProgress={this.handleProgress}
                              hidden={true}
                            />
                          </label>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                  <div className="form-group">
                    <label>Type answer explanation here</label>
                    <div className="input-group" style={{ height: "140px" }}>
                      <div
                        className="col lrp-0"
                        style={{
                          border: "1px solid #ced4da",
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                          padding: "2px"
                        }}
                      >
                        <textarea
                          className="form-control admin-form-control"
                          rows="5"
                          placeholder="Answer explanation here"
                          value={this.state.answer}
                          style={{ border: "0px" }}
                          onChange={event =>
                            this.setState(
                              byPropKey("answer", event.target.value)
                            )
                          }
                        />
                        {this.state.fileAMedia !== null ? (
                          <div className="uploadStripe">
                            <span
                              className=""
                              title={
                                this.state.fileAMedia !== null
                                  ? this.state.fileAMedia
                                  : ""
                              }
                            >
                              &nbsp;&nbsp;
                              {this.state.fileAMedia !== null
                                ? this.state.fileAMedia.slice(0, 10) + "...."
                                : ""}{" "}
                              &nbsp;&nbsp;
                              {this.state.progressAMedia > -1 ? (
                                <Line
                                  percent={this.state.progressAMedia}
                                  strokeWidth="1.5"
                                  trailWidth="1.5"
                                  strokeColor={
                                    this.state.progressAMedia < 100
                                      ? "red"
                                      : "#3AEAAE"
                                  }
                                  style={{
                                    height: "6px",
                                    width: "80px",
                                    position: "absolute",
                                    bottom: "7.5px"
                                  }}
                                />
                              ) : (
                                ""
                              )}{" "}
                            </span>
                            <span
                              className="float-right pointer"
                              onClick={() => this.deleteItem(2)}
                            >
                              <i
                                className="fa fa-trash"
                                style={{ color: "#3660C1" }}
                              />
                              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="input-group-prepend lrp-0">
                        <div
                          className="input-group-text lrp-0"
                          style={{
                            width: "70px",
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px"
                          }}
                        >
                          <div
                            className="col-md-12 lrp-0"
                            style={{ height: "140px" }}
                          >
                            <div
                              className="col-md-12 lrp-0"
                              style={{
                                paddingTop: "24px",
                                paddingBottom: "10px"
                              }}
                            >
                              {" "}
                              <label className="text-center pointer" style={{}}>
                                <i
                                  className="fa fa-image fa-1_5"
                                  style={{ color: "#3660C1" }}
                                />
                                <FileUploader
                                  // accept="image/*"
                                  // name="avatar"
                                  // randomizeFilename
                                  // storageRef={firebase
                                  //   .storage()
                                  //   .ref("Media/Questions")}
                                  // onUploadStart={this.handleUploadStart1}
                                  // onUploadError={this.handleUploadError1}
                                  // onUploadSuccess={this.handleUploadSuccess1}
                                  // onProgress={this.handleProgress1}
                                  // hidden={true}
                                  // onClick={event => {
                                  //   event.target.value = null;
                                  // }}
                                />
                              </label>
                            </div>
                            <hr className="bm-0 tm-0" />
                            <div
                              className="col-md-12 lrp-0"
                              style={{ paddingTop: "20px" }}
                            >
                              <label className="text-center pointer" style={{}}>
                                <i
                                  className="fa fa-film fa-1_5"
                                  style={{ color: "#3660C1" }}
                                />
                                <FileUploader
                                  // accept="video/*"
                                  // name="avatar"
                                  // randomizeFilename
                                  // storageRef={firebase
                                  //   .storage()
                                  //   .ref("Media/Questions")}
                                  // onUploadStart={this.handleUploadStart1}
                                  // onUploadError={this.handleUploadError1}
                                  // onUploadSuccess={this.handleUploadSuccess1}
                                  // onProgress={this.handleProgress1}
                                  // onClick={event => {
                                  //   event.target.value = null;
                                  // }}
                                  // hidden={true}
                                />
                              </label>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={this.newQuestion}
                    className="btn admin-btn-green fix_width_btn_lg white admin-btn"
                  >
                    Save
                  </button>{" "}
                  {this.props.feedbackStatus == null ? (
                    <button
                      className="btn btn-red fix_width_btn_lg white admin-btn"
                      onClick={this.addnewQuestion}
                    >
                      Add Another Question
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            )}
            {/* </div> */}
          </section>
        </div>

        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}
export default QuestionPoolComponent;
