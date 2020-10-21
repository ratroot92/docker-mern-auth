import React, { Component } from "react";
import QuestionPoolComponent from "./adminDashboard/QuestionPoolComponent";
import QuestionList from "./QuestionList";
import AdminNav from "./adminDashboard/AdminNav";
import shuffle from "shuffle-array";
import Select from "react-select";
import DragCardQuestion from "./DragCardQuestion";
import QuestionsPool from "./adminDashboard/QuestionsPool";
import arraySort from "array-sort";
import WebNotif from "./WebNotif";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../firebase/firebase";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();

class AddPaper extends Component {
  state = {
    items: [],
    newKey: "",
    isAdded: false,
    source: -1,
    paperName: "",
    duration: "",
    selectedOption: null,
    s_ID: [],
    marks: 1,
    maxScore: 0,
    accordView: {},
    isShuffle: false,
    info: "",
    options: [
      { label: "by Name", value: "1" },
      { label: "by Tag", value: "2" },
      { label: "by Type", value: "3" },
      { label: "random", value: "4" }
    ],

    instructions: ""
  };
  componentDidMount() {
    if (this.props.qId !== null && this.props.qId !== "") {
      this.setState({ newKey: this.props.qId });
    } else {
      this.setState({ newKey: db.ref(`questions`).push().key });
    }
    if (this.props.isEdit) {
      var data = this.props.data;
      this.setState({
        paperName: data.examDetails.title,
        info: data.examDetails.info,
        instructions: data.examDetails.instructions,
        minScore:
          data.examDetails.min_score != undefined
            ? parseInt(data.examDetails.min_score)
            : 0,
        duration: data.examDetails.max_time,
        isShuffle: data.examDetails.isShuffle
      });
      var items = [...this.state.items];

      var s_ID = [...this.state.s_ID];
      for (var i = 0; i < data.exam.length; i++) {
        items.push(
          <DragCardQuestion
            kp={data.exam[i].key}
            qobj={data.exam[i]}
            remove={this.removeQ}
            addScore={this.addScore}
          />
        );
        s_ID.push(data.exam[i].key);
      }
      this.setState({ s_ID });

      this.setState({ items });
    }
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    if (selectedOption.value == "1") {
      var items = [...this.state.items];
      items = arraySort(items, "props.qobj.Description");

      this.setState({ items });
    } else if (selectedOption.value == "2") {
      var items = [...this.state.items];
      items = arraySort(items, "props.qobj.tags");

      this.setState({ items });
    } else if (selectedOption.value == "3") {
      var items = [...this.state.items];
      items = arraySort(items, "props.qobj.type");

      this.setState({ items });
    } else if (selectedOption.value == "4") {
      var items = [...this.state.items];
      items = shuffle(items);
      this.setState({ items });
    }
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
  removeQ = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var items = [...this.state.items];
            items.splice(key, 1);
            this.setState({ items }, () => {
              this.updateMaxScore();
            });
            var s_ID = [...this.state.s_ID];
            s_ID.splice(s_ID.indexOf(key), 1);
            this.setState({ s_ID });
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  postData = () => {
    if (
      this.validateForm([
        { value: this.state.paperName, slug: "Paper name" },
        { value: this.state.instructions, slug: "Paper instructions" },
        { value: this.state.minScore, slug: "Passing marks" }
      ])
    ) {
      if (this.state.items.length == 0) {
        obj.createNotification("error", "Paper has no question ");

        return;
      }
      this.props.addPaper({
        items: this.state.items,
        title: this.state.paperName,
        duration: this.state.duration,
        edit: this.props.isEdit,
        ins: this.state.instructions,
        info: this.state.info,
        minScore: parseInt(this.state.minScore),
        isShuffle: this.state.isShuffle,
        secId: this.props.secId,
        rowId: this.props.rowId
      });
    }
  };

  addQuestion = (
    year,
    question,
    answer,
    q_type,
    selectedOption,
    options,
    questionMedia,
    questionMediaType,
    qfile,
    answerMedia,
    answerMediaType,
    afile,
    type
  ) => {
    var questionType = 1;
    if (questionMediaType !== null) {
      if (questionMediaType.indexOf("image") > -1) {
        questionType = 2;
      } else if (questionMediaType.indexOf("video") > -1) {
        questionType = 3;
      }
    } else {
      questionMedia = "";
      qfile = "";
      afile = "";
      answerMedia = "";
    }
    var my_json = {};
    var my_option = {};
    var correct_ans = {};
    for (var i = 0; i < selectedOption.length; i++) {
      var keys = selectedOption[i].value;
      my_json[keys] = true;
    }
    for (var i = 0; i < options.length - 1; i++) {
      var opt_val = options[i].text;
      var opt_answer = options[i].value;
      if (opt_answer == true) {
        correct_ans["option" + (i + 1)] = opt_val;
      }
      my_option["option" + (i + 1)] = opt_val;
    }

    var items = [...this.state.items];
    items.push(
      <DragCardQuestion
        kp={items.length}
        remove={this.removeQ}
        addScore={this.addScore}
        qobj={{
          Description: question,
          exp: answer,
          answer: correct_ans,
          tags: my_json,
          options: my_option,
          type: q_type,
          mediaType: questionType,
          media: questionMedia,
          qName: qfile,
          aName: afile,
          mediaE: answerMedia,
          year: year
        }}
      />
    );
    this.setState({ items });
    if (type == 0) {
    } else {
      this.setState({ isAdded: true });
    }
  };

  PoolAddition = (obj, key) => {
    var items = [...this.state.items];
    if (obj["score"] == undefined || obj["score"] == null) {
      obj["score"] = this.state.marks;
    }
    items.push(
      <DragCardQuestion
        qobj={obj}
        qid={key}
        addScore={this.addScore}
        kp={items.length}
        remove={this.removeQ}
      />
    );
    this.setState({ items }, () => {
      this.updateMaxScore();
    });

    var s_ID = [...this.state.s_ID];
    s_ID.push(key);
    this.setState({ s_ID });
  };
  selectSource = key => {
    if (key == 0) {
      this.toggleAccordView("qp", 0);
    }
    this.setState({ source: key });
  };
  addScore = (score, key) => {
    var items = [...this.state.items];

    for (var i = 0; i < items.length; i++) {
      if (items[i]["props"]["kp"] == key) {
        items[i]["props"]["qobj"]["score"] =
          score == "" || score == null ? this.state.marks : score;
        break;
      }
    }
    this.setState({ items }, () => {
      this.updateMaxScore();
    });
  };
  toggleAccordView = (key, type) => {
    var accordView = { ...this.state.accordView };
    if (accordView[key] == undefined || accordView[key].indexOf("up") > -1) {
      accordView[key] = "fa fa-angle-down fa-lg";
    } else {
      accordView[key] = "fa fa-angle-up fa-lg";
    }
    this.setState({ accordView });
    this.setState({ source: -1 });
  };
  handleToggle = () => {
    this.setState({ isShuffle: !this.state.isShuffle });
  };
  updateMaxScore = (type, value) => {
    var total = 0;
    var items = [...this.state.items];

    for (var i = 0; i < items.length; i++) {
      total = total + parseInt(items[i]["props"]["qobj"]["score"]);
    }
    this.setState({ maxScore: total });
  };
  render() {
    return (
      <React.Fragment>
        <WebNotif />

        <section>
          <div className=" col-md-12">
            <div className="row">
              <div className="col-md-7">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.paperName}
                    placeholder="Enter Name Here*"
                    onChange={event =>
                      this.setState(byPropKey("paperName", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-5">
                <button
                  className="btn btn-white fix_width_btn  btn-transparent black admin-btn"
                  onClick={this.postData}
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
          <section>
            <form className="form-row lrp-0">
              <div className="col-md-6">
                <div className="form-group">
                  <label>
                    <b>Detail</b>
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.info}
                    placeholder="Enter info*"
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
                    <span className="clr-red">*</span>
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    value={this.state.instructions}
                    placeholder="Enter instructions*"
                    onChange={event =>
                      this.setState(
                        byPropKey("instructions", event.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="form-group">
                  <label>
                    <b>Default Marks</b>
                    <span className="clr-red">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="marks per question"
                    value={this.state.marks}
                    onChange={event =>
                      this.setState(byPropKey("marks", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-2 ">
                <div className="form-group">
                  <label>
                    <b>Duration</b>(min)
                    <span className="clr-red">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Duration (min)"
                    value={this.state.duration}
                    onChange={event =>
                      this.setState(byPropKey("duration", event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="form-group">
                  <label>
                    <b>Minimunm score</b>
                    <span className="clr-red">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="minimum score"
                    value={this.state.minScore}
                    onChange={event =>
                      this.setState(byPropKey("minScore", event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="form-group">
                  <label>
                    <b>Maximum score</b>
                    <span className="clr-red">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Maximum score"
                    value={this.state.maxScore}
                    onChange={event =>
                      this.setState(byPropKey("maxScore", event.target.value))
                    }
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>
                    <b>Sorting Method</b>
                  </label>
                  <Select
                    options={this.state.options}
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div
                className="col-md-2 "
                style={{ paddingTop: "30px", paddingLeft: "30px" }}
              >
                <div className="form-group">
                  <label
                    className=" form-check-label bm-0 p-5 opt-label"
                    for="shuffle"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="shuffle"
                      name="isShuffle"
                      value="shuffle"
                      onChange={this.handleToggle}
                      checked={this.state.isShuffle}
                    />
                    <b>is Shuffle</b>
                  </label>{" "}
                </div>
              </div>
            </form>
          </section>

          <div className="lrp-20">
            <hr />
            <div className="MockBox">
              {this.state.source == 1 ? (
                <QuestionPoolComponent
                  add_question={this.addQuestion}
                  isAdded={this.state.isAdded}
                  qId={this.props.qId}
                />
              ) : (
                <div className=" col-md-12 lrp-0">
                  <div className="row lrm-0">
                    <div className="col-sm-12 lrp-0">
                      <div className="accordion-group">
                        <div className="accordion-heading">
                          <a
                            className={
                              this.state.source == 0
                                ? "accordion-toggle"
                                : "accordion-toggle collapsed"
                            }
                            data-toggle="collapse"
                            data-parent="toggle"
                            href={"#" + "qp"}
                            onClick={() => this.toggleAccordView("qp", 0)}
                            aria-expanded={
                              this.state.source == 0 ? true : false
                            }
                          >
                            <i
                              className={
                                this.state.accordView != null
                                  ? this.state.accordView["qp"] != null
                                    ? this.state.accordView["qp"]
                                    : "fa fa-angle-up fa-lg"
                                  : "fa fa-angle-up fa-lg"
                              }
                            />
                            &nbsp;{" "}
                            <span className="regular_font fs-18">
                              Question Pool
                            </span>
                          </a>
                        </div>
                        <div
                          id="qp"
                          className={
                            this.state.source == 0
                              ? "accordion-body in w-100 collapse show"
                              : "accordion-body collapse  in w-100"
                          }
                        >
                          <QuestionsPool
                            add={this.PoolAddition}
                            courseType="1"
                            items={this.state.s_ID}
                            permissions={this.props.permissions}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <hr className="hr-2 " />
            <div className="d-flex justify-content-center">
              <button
                className="btn white    btn-red black admin-btn"
                onClick={() => this.selectSource(1)}
              >
                Add New{" "}
              </button>{" "}
              &nbsp; &nbsp; &nbsp;
              <button
                className="btn white    btn-red black admin-btn"
                onClick={() => this.selectSource(0)}
              >
                Select Form Bank{" "}
              </button>{" "}
            </div>

            <hr className="hr-2" />
          </div>

          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-center display_questions">
                  <QuestionList items={this.state.items} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default AddPaper;
