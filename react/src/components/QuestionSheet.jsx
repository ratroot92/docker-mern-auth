import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Line } from "rc-progress";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { db } from "../firebase/firebase";
import Modal from "react-responsive-modal";
import Loader from "./loader";
import { Link, Redirect } from "react-router-dom";

import "../assets/css/questionSheet.css";
var isTimed = false;
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

let timerFunction, countDownDate;
let data = null;
let options = {
  legend: {
    display: false
  }
};
var courseType = null;
var courseId = null;
var questionarray = [];
var selectedOptions = [];
var selectedAnswers = [];
var selectedIds = [];
var totalSeconds = 0;
var paperKey = null;
var sectionKey = null;
class QuestionSheet extends Component {
  state = {
    isSubmitted: false,
    timer: "-- : -- : --",
    title: "-",
    offset: 1,
    isCorrection: false,
    correctAnswer: null,
    timeover: false,
    myAnswer: null,
    total_count: 0,
    total_attempted: 0,
    _progress: 0,
    categories: {},
    min_score: "-",
    correct: 0,
    incorrect: 0,
    max_score: "-",
    scale_start: 0,
    showAnswer: false,
    scale_end: 9,
    max_time: 1,
    is_skip: "show",
    is_submit: "hide",
    ModalOpenChart: false,
    sectionName: "",
    is_next: "hide",
    questions: [],
    current_index: 0,
    radio_checked: -1,
    isSubName: true,
    isFree: false,
    totalScore: 0,
    current_emqs: null,
    current_question: null,
    ansDescription: null,
    attemptedClass: true,
    unattemptedClass: true,
    skippedClass: true,
    currentClass: true,
    incorrectClass: "show-block",
    correctClass: "show-block",
    askipClass: "show-block",

    toggleFilters: [],
    toggleFiltersAns: [],

    qpsubtype: null
  };

  attempted = [];
  answered = [];
  skipped = [];
  passed = [];
  push_Key = null;
  userInsight = null;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
    if (!(this.props.data || this.props.location.state)) {
     console.log("Cannot access questions directly");
      return;
    }
    if (this.props.isBook) {
      var attempt_key = this.props.data.AttemptKey;
      var type = this.props.data.type; //0 is new 1 is previous
      courseType = this.props.data.courseType;
      paperKey = this.props.data.paperKey;
      sectionKey = this.props.data.sectionKey;
      courseId = this.props.data.courseId;
      db.ref("userInsights/" + this.props.userId + "/" + courseId)
        .once("value")
        .then(snapshot => {
          this.userInsight = snapshot.val();
        });
      this.setState({ courseId: courseId });
      var isFree = this.props.data.isFree;
      this.setState({ isFree });
      this.push_Key = attempt_key;
      {
        isTimed = true;

        var paperData = this.props.data.data; //0 is new 1 is previous

        var total = paperData.exam.length;
        
        this.setState({
          min_score: paperData.examDetails.min_score
        });
        this.setState({
          max_score: paperData.examDetails.max_score
        });
        this.setState({ title: paperData.examDetails.title });
        this.setState({ total_count: total });
        this.setState({
          max_time: paperData.examDetails.max_time
        });
        this.setState({ questions: paperData.exam });
        this.appAttemptinit(paperData.exam);
        this.setState({ current_question: paperData.exam[0] });
        if (total < 9) {
          this.setState({ scale_end: total });
          this.setState({ offset: 10 / total });
        }
        countDownDate =
          new Date().getTime() + this.state.max_time * 60 * 60 * 1000;
        timerFunction = setInterval(this.timer, 1000);
        db.ref("taskQueue/timer/" + attempt_key).set({
          courseId: courseId,
          userId: this.props.data.userId,
          duration: this.state.max_time
        });

      
      }
      {
        var index = 0;
        this.setState({ current_question: this.state.questions[index] });
        this.setState({ current_index: index });
        let index_attempt = this.passed.indexOf(index);
        if (
          this.attempted[index] != undefined &&
          this.attempted[index].status != "unanswered"
        ) {
       
          let ans_index = this.attempted[index_attempt].radio_index;
         
          this.checkedOptions(ans_index);
          this.setState({ is_skip: "hide" });
          this.setState({ is_next: "show" });
        } else {
          this.setState({ radio_checked: -1 });
          this.setState({ is_skip: "show" });
          this.setState({ is_next: "hide" });
        }
      }
    } else {
      var attempt_key = this.props.location.state.AttemptKey;
      var type = this.props.location.state.type; //0 is new 1 is previous
      courseType = this.props.location.state.courseType;
      paperKey = this.props.location.state.paperKey;
      sectionKey = this.props.location.state.sectionKey;
      courseId = this.props.location.state.courseId;
      db.ref("userInsights/" + this.props.userId + "/" + courseId)
        .once("value")
        .then(snapshot => {
          this.userInsight = snapshot.val();
        });
      this.setState({ courseId: courseId });
      var isFree = this.props.location.state.isFree;
      this.setState({ isFree });
      this.push_Key = attempt_key;
      if (isFree) {
        //  isTimed = true;

        courseType = this.props.location.state.courseType;

        var questionarray = this.props.location.state.data;
        var total = questionarray.length;
        this.setState({ title: "Exam Trial" });

        this.setState({ total_count: questionarray.length });
        // if (courseType == 1)
        {
          this.setState({ max_time: 0.15 });
          countDownDate = new Date().getTime() + 0.025 * total * 60 * 60 * 1000;
          timerFunction = setInterval(this.timer, 1000);
        
        }
        this.setState({ questions: questionarray });
        this.appAttemptinit(questionarray);

        this.setState({ current_question: questionarray[0] });

        if (total < this.state.scale_end) {
          this.setState({ scale_end: total });
          this.setState({ offset: 10 / total });
        }
       
        // store intervalId in the state so it can be accessed later:
        this.ProgressBarUpdate();
      } else if (courseType == 0) {
        var subType = this.props.location.state.subType;
        this.setState({ qpsubtype: subType });

        if (subType == 2) {
          isTimed = true;
        }
        var qMark = parseInt(this.props.location.state.qMark);
        db.ref("courses/" + courseId + "/Title")
          .once("value")
          .then(snapshot => {
            this.setState({
              title: snapshot.val(),
              attemptName: snapshot.val()
            });
          });
        var questionarray = this.props.location.state.data;

        db.ref(
          "myAttempts/" +
            this.props.userId +
            "/" +
            courseId +
            "/" +
            this.push_Key
        )
          .once("value")
          .then(snapshot => {
            if (snapshot.val() !== null) {
              if (subType == 2) {
                if (
                  snapshot.val().startTime != null &&
                  snapshot.val().startTime != undefined
                ) {
                  var serverTime = new Date(snapshot.val().startTime);
                  var currentTime = new Date();
              
                  var diff = Math.abs(
                    (currentTime.getTime() - serverTime.getTime()) / 1000
                  );
               
                  var timer =
                    (parseFloat(snapshot.val().totalTime) * 60 - diff) / 60;

                  this.syncTimer(timer, attempt_key, false);
                } else {
                  var timer = parseInt(this.props.location.state.timer);
                  this.syncTimer(timer, attempt_key, true);
                }
              } else {
              
              }
              this.setState({
                correct: snapshot.val().correct,
                incorrect: snapshot.val().incorrect
              });
              this.attempted = snapshot.val().attempted;
              if (snapshot.hasChild("skipped")) {
                this.skipped = snapshot.val().skipped;
              }
              questionarray = snapshot.val().data;
              //  this.passed = snapshot.val().passed;
              this.setState({ total_attempted: 0 });
              this.setState({ _progress: 0 });
              if (snapshot.hasChild("title")) {
                this.setState({
                  title: snapshot.val().title,

                  attemptName: snapshot.val().title
                });
              }
              if (qMark != undefined || qMark != null || qMark != "")
                for (var t = 0; t < questionarray.length; t++) {
                  questionarray[t]["score"] = parseInt(qMark);
                }

              var total = questionarray.length;

              // //  on reload eskipped mapping

              this.setState({ total_count: questionarray.length });
              // this.setState({ max_time: exam_details.max_time });
              this.setState({ questions: questionarray });
              //   this.appAttemptinit(questionarray);
              this.setState({ current_question: questionarray[0] });

              this.ProgressBarUpdate();
              if (type == 1) {
                this.skipped = [];
                Object.keys(this.attempted).map(id => {
                  if (this.attempted[id].status == "skipped") {
                    this.skipped.push(id);
                  }
                });
                this.setState({
                  isSubmitted: true,
                  totalScore: snapshot.val().score
                });
                data = {
                  labels: ["Correct", "Incorrect"],
                  datasets: [
                    {
                      data: [
                        parseInt(snapshot.val().correct),
                        parseInt(snapshot.val().incorrect)
                      ],
                      backgroundColor: ["#1CD316", "#FC5252"]
                    }
                  ]
                };
              }
            } else {
              questionarray = this.props.location.state.data;
              this.appAttemptinit(questionarray);
              if (qMark != undefined || qMark != null || qMark != "")
                for (var t = 0; t < questionarray.length; t++) {
                  questionarray[t]["score"] = parseInt(qMark);
                }

              var total = questionarray.length;

              this.setState({ total_count: questionarray.length });
              // this.setState({ max_time: exam_details.max_time });
              this.setState({ questions: questionarray });
              //  this.appAttemptinit(questionarray);
              this.setState({ current_question: questionarray[0] });
              var index = 0;
              this.setState({ current_question: this.state.questions[index] });
              this.setState({ current_index: index });
              let index_attempt = this.passed.indexOf(index);
              if (
                this.attempted[index] != undefined &&
                this.attempted[index].status != "unanswered"
              ) {
                let ans_index = null;
            
                if (this.attempted[type] != 3 && index_attempt > -1) {
                  let ans_index = this.attempted[index_attempt].radio_index;
                }
              
                this.checkedOptions(ans_index);
                this.setState({ is_skip: "hide" });
                this.setState({ is_next: "show" });
              } else {
                this.setState({ radio_checked: -1 });
                this.setState({ is_skip: "show" });
                this.setState({ is_next: "hide" });
              }
              if (subType == 2) {
                isTimed = true;

                var timer = parseInt(this.props.location.state.timer);
                {
                  this.syncTimer(timer, attempt_key, true);
                
                }
              } else {
              }
            }

            
            if (total < this.state.scale_end) {
              this.setState({ scale_end: total });
              this.setState({ offset: 10 / total });
            }
            
            this.ProgressBarUpdate();
          });
      } else if (courseType == 1) {
        var paperData = this.props.location.state.data; //0 is new 1 is previous
        this.setState({ sectionName: this.props.location.state.sectionName });
        this.setState({ categories: this.props.location.state.categories });
        this.setState({ title: paperData.examDetails.title ,title: paperData.examDetails.max_score});
        isTimed = true; //flag to enable disable timer
        db.ref(
          "myAttempts/" +
            this.props.userId +
            "/" +
            courseId +
            "/" +
            this.push_Key
        )
          .once("value")
          .then(snapshot => {
            if (snapshot.val() != null) {
              this.setState({
                correct: snapshot.val().correct,
                incorrect: snapshot.val().incorrect
              });
              this.attempted = snapshot.val().attempted;
              paperData = snapshot.val().data;
              if (snapshot.val().title != null) {
                this.setState({ title: snapshot.val().title });
                this.setState({ attemptName: snapshot.val().title });
              }
              this.setState({ total_attempted: 0 });
              this.setState({ current_index: 0 });
              this.setState({ current_question: this.state.questions[0] });
              this.setState({ _progress: 0 });
              this.ProgressBarUpdate();
              // var paperData = this.props.location.state.data; //0 is new 1 is previous
              var total = paperData.length;
              this.setState({
                min_score: snapshot.val().min_score
              });
              this.setState({
                max_score: snapshot.val().max_score
              });
              this.setState({ title: snapshot.val().title });
              this.setState({ total_count: total });
              this.setState({
                max_time: snapshot.val().totalTime
              });
              this.setState({ questions: paperData });
              //this.appAttemptinit(questionarray);
              this.setState({ current_question: paperData[0] });
              if (total < 9) {
                this.setState({ scale_end: total });
                this.setState({ offset: 10 / total });
              }
              paperKey = snapshot.val().paperKey;
              sectionKey = snapshot.val().sectionKey;

              if (
                snapshot.val().timeFlag == null ||
                snapshot.val().timeFlag == undefined
              ) {
                if (
                  snapshot.val().startTime != null &&
                  snapshot.val().startTime != undefined
                ) {
                  var serverTime = new Date(snapshot.val().startTime);
                  var currentTime = new Date();
                
                  var diff = Math.abs(
                    (currentTime.getTime() - serverTime.getTime()) / 1000
                  );
                  var timer =
                    (parseFloat(snapshot.val().totalTime) * 60 - diff) / 60;

                  this.syncTimer(timer, attempt_key, false);
                } else {
                  var timer = parseInt(snapshot.val().totalTime);
                  this.syncTimer(timer, attempt_key, true);
                }
              }
            } else {
              this.appAttemptinit(paperData.exam);

              var total = paperData.exam.length;
              this.setState({
                min_score: paperData.examDetails.min_score
              });
              this.setState({
                max_score: paperData.examDetails.max_score
              });
              this.setState({ title: paperData.examDetails.title });
              this.setState({ total_count: total });
              this.setState({
                max_time: paperData.examDetails.max_time
              });
              this.setState({ questions: paperData.exam });

              this.setState({ current_question: paperData.exam[0] });
              if (total < 9) {
                this.setState({ scale_end: total });
                this.setState({ offset: 10 / total });
              }
              var timer = parseInt(paperData.examDetails.max_time);
              this.syncTimer(timer, attempt_key, true);
            
            }
          });
      }
      if (type == 1) {
        var index = 0;
        this.setState({ current_question: this.state.questions[index] });
        this.setState({ current_index: index });
        let index_attempt = this.passed.indexOf(index);
        if (
          this.attempted[index] != undefined &&
          this.attempted[index].status != "unanswered"
        ) {
          
          let ans_index = this.attempted[index_attempt].radio_index;
       
          this.checkedOptions(ans_index);
          this.setState({ is_skip: "hide" });
          this.setState({ is_next: "show" });
        } else {
          this.setState({ radio_checked: -1 });
          this.setState({ is_skip: "show" });
          this.setState({ is_next: "hide" });
        }
      }
    }
    var _self = this;
    if (isTimed) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          attempt_key +
          "/timeFlag/isOver"
      ).once("value", function(isOver) {
        _self.setState({ timeover: isOver.val() });
      });
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          attempt_key +
          "/timeFlag"
      ).on("child_added", function(isOver) {
        _self.setState({ timeover: true });
        if (!_self.state.isSubmitted) {
          _self.confirmMode();
          // _self.computeModalData();
          // _self.viewAnswer();
        }
      });
    }
  }

  syncTimer = (timer, attempt_key, flag) => {
    if (flag) {
      db.ref("taskQueue/timer/" + attempt_key).set({
        courseId: courseId,
        userId: this.props.userId,
        duration: timer
      });
      this.setState({ max_time: timer });
    }
    countDownDate = new Date().getTime() + timer * 60 * 1000;
    timerFunction = setInterval(this.timer, 1000);
  };
  appAttemptinit = data => {
    this.attempted = [];
    Object.keys(data).map(key => {
      if (data[key].type != 3) {
        this.attempted[key] = {
          ansId: "unanswered",
          answer: "unanswered",
          radio_index: "unanswered",
          id: parseInt(key),
          status: "unanswered",
          type: parseInt(data[key].type)
        };
      } else {
        this.attempted[key] = {};
        this.attempted[key]["emq"] = {};
        this.attempted[key]["status"] = {};
        this.attempted[key]["type"] = {};
        Object.keys(data[key].emq).map(emq => {
          this.attempted[key]["emq"][emq] = {
            ansId: "unanswered",
            answer: "unanswered",
            radio_index: "unanswered",
            id: emq,
            status: "unanswered"
          };
          this.attempted[key]["status"] = "unanswered";
          this.attempted[key]["type"] = parseInt(data[key].type);
        });
      }
    });
   

    var date = new Date().toDateString();
  
    if (this.props.location != undefined && !this.props.location.state.isFree) {
      db.ref(
        "myAttempts/" + this.props.userId + "/" + courseId + "/" + this.push_Key
      ).set({
        DateCreated: new Date().toISOString(),
        title: this.state.title,
        courseId: courseId,
        incorrect: 0,
        attempted: this.attempted,
        data: data,
        correct: 0,
        qpType:
          this.state.qpsubtype != undefined || this.state.qpsubtype != undefined
            ? this.state.qpsubtype
            : null,
        totalTime: this.state.max_time != undefined ? this.state.max_time : 0,

        score: 0,
        paperKey: courseType == 1 ? parseInt(paperKey) : null,
        sectionKey: courseType == 1 ? sectionKey : null
      });
      if (this.passed == undefined) {
        this.passed = [];
      }
      if (this.skipped == undefined) {
        this.skipped = [];
      }
   
    }
  };
  ProgressBarUpdate = () => {
  
    if (
      this.state._progress > 8 &&
      !(this.state.scale_end == this.state.total_count)
    ) {
      let offset = this.state.total_count - this.state.scale_end;
      if (offset > 9) {
        offset = 9;
      }
      this.setState({ scale_start: this.state.scale_start + offset });
      this.setState({ scale_end: this.state.scale_end + offset });
      this.setState({ _progress: this.state._progress + 1 - offset });
    }
   
    if (this.state._progress == this.state.total_count - 1) {
      this.setState({ is_next: "hide", is_submit: "show", is_skip: "hide" });
    }
    if (this.passed.length == this.totalcount - 1) {
      this.setState({ is_submit: "show" });
    }
  };
  handleToggle = (key, answer, id) => {
    if (selectedOptions.indexOf(key) == -1) {
      selectedOptions.push(key);
      selectedAnswers.push(key);
      selectedIds.push(id);
    } else {
      selectedOptions.splice(selectedOptions.indexOf(key), 1);
      selectedIds.splice(selectedIds.indexOf(id), 1);
      selectedAnswers.splice(selectedAnswers.indexOf(id), 1);
    }

    
    this.setState({ is_skip: "hide" });
    this.setState({ is_next: "show" });
    if (this.passed.indexOf(this.state.current_index) == -1) {
      this.passed.push(this.state.current_index);
      this.setState({ _progress: this.state._progress + 1 });
      this.setState({ total_attempted: this.state.total_attempted + 1 });
      this.ProgressBarUpdate();
      var status = "attempted";
      var sOption = selectedOptions;
      var sAnswer = selectedAnswers;
      var sId = selectedIds;
      if (selectedOptions.length == 0) {
        sOption = "skipped";
      }
      if (selectedAnswers.length == 0) {
        sAnswer = "skipped";
      }
      if (selectedIds.length == 0) {
        sId = "skipped";
        status = "skipped";
      }

      this.attempted[this.state.current_index] = {
        id: this.state.current_index,
        answer: sAnswer,
        radio_index: sOption,
        ansId: sId,
        status: status,
        type: parseInt(this.state.current_question.type)
      };
    } else {
      var status = "attempted";
      var sOption = selectedOptions;
      var sAnswer = selectedAnswers;
      var sId = selectedIds;
      if (selectedOptions.length == 0) {
        sOption = "skipped";
      }
      if (selectedAnswers.length == 0) {
        sAnswer = "skipped";
      }
      if (selectedIds.length == 0) {
        sId = "skipped";
        status = "skipped";
      }

      var attemp_index = this.passed.indexOf(this.state.current_index);
      this.attempted[this.state.current_index] = {
        id: this.state.current_index,
        answer: sAnswer,
        radio_index: sOption,
        ansId: sId,
        status: status,
        type: parseInt(this.state.current_question.type)
      };
    }
    this.checkedOptions(selectedOptions);

    if (!this.state.isFree) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          `/attempted`
      ).set(this.attempted);
    }
  };
  nextQuestion = () => {
    this.setState({ showAnswer: false });

    var index = this.state.current_index + 1;

    if (index < this.state.total_count) {
      this.setState({ current_question: this.state.questions[index] });
      this.setState({ current_index: index });

      if (index >= 0) {
        this.setState({ current_question: this.state.questions[index] });
        this.setState({ current_index: index });
        let index_attempt = index;

        if (
          this.attempted[index] != undefined &&
          this.attempted[index].status != "unanswered"
        ) {
       
          let ans_index = this.attempted[index_attempt].radio_index;
       

          this.checkedOptions(ans_index);
          this.setState({ is_skip: "hide" });
          this.setState({ is_next: "show" });
        } else {
          this.setState({ radio_checked: -1 });
          this.setState({ is_skip: "show" });
          this.setState({ is_next: "hide" });
        }
        if (
          this.state.total_attempted + this.skipped.length ==
          this.state.total_count
        ) {
          this.setState({
            is_next: "hide",
            is_submit: "show",
            is_skip: "hide"
          });
        } else {
          this.setState({ is_submit: "hide" });
        }
      }
    }
  };
  checkedOptions = value => {
    if (value != undefined) {
      if (value.length == undefined) {
        this.setState({ radio_checked: parseInt(value) });
      } else {
        this.setState({ radio_checked: value });
      }
    }
  };
  submit_and_next = () => {
    this.setState({ showAnswer: false });

    if (this.skipped.indexOf(this.state.current_index) > -1) {
      var sp_index = this.skipped.indexOf(this.state.current_index);
      this.skipped.splice(sp_index, 1);
    }

    var index = this.state.current_index + 1;
    if (index < this.state.total_count && index != this.state.total_count) {
      this.setState({ current_question: this.state.questions[index] });
      this.setState({ current_index: index });

      if (index >= 0) {
        this.setState({ current_question: this.state.questions[index] });
        this.setState({ current_index: index });
        let index_attempt = this.passed.indexOf(index);

        if (
          this.attempted[index] != undefined &&
          this.attempted[index].status != "unanswered"
        ) {
         
          this.setState({ is_skip: "hide" });
          this.setState({ is_next: "show" });
        } else {
          this.setState({ radio_checked: -1 });
          this.setState({ is_skip: "show" });
          this.setState({ is_next: "hide" });
        }
      }
    
    }

   
    selectedOptions = [];
    selectedIds = [];
    if (
      this.state.total_attempted + this.skipped.length ==
      this.state.total_count
    ) {
      // this.setState({ is_next: "hide" });
      this.setState({ is_next: "hide", is_submit: "show", is_skip: "hide" });
    } else {
      this.setState({ is_submit: "hide" });
    }
  };

  skip_question = () => {
    this.setState({ showAnswer: false });
    if (parseInt(this.state.questions[this.state.current_index].type) == 3) {
      this.attempted[this.state.current_index]["id"] = this.state.current_index;
      this.attempted[this.state.current_index]["type"] = parseInt(
        this.state.current_question.type
      );
      this.attempted[this.state.current_index]["status"] = "skipped";
    } else {
      this.setState({ total_attempted: this.state.total_attempted + 1 });
      this.attempted[this.state.current_index] = {
        id: this.state.current_index,
        answer: "skipped",
        type: parseInt(this.state.current_question.type),
        radio_index: "skipped",
        ansId: "skipped",
        status: "skipped"
      };
    }

    if (this.skipped.indexOf(this.state.current_index) == -1) {
      this.skipped.push(this.state.current_index);
      this.setState({ _progress: this.state._progress + 1 });
      this.ProgressBarUpdate();
    }
    var index = this.state.current_index + 1;
    if (index < this.state.total_count) {
      this.setState({ current_question: this.state.questions[index] });
      this.setState({ current_index: index });
    }
    this.setState({ radio_checked: -1 });

    this.setState({ is_skip: "show" });
    this.setState({ is_next: "hide" });
    if (
      this.state.total_attempted + this.skipped.length ==
      this.state.total_count
    ) {
      // this.setState({ is_next: "hide" });
      this.setState({ is_next: "hide", is_submit: "show", is_skip: "hide" });
    } else {
      this.setState({ is_submit: "hide" });
    }
    db.ref(
      "myAttempts/" +
        this.props.userId +
        "/" +
        courseId +
        "/" +
        this.push_Key +
        `/attempted`
    ).set(this.attempted);
  };

  timerInc = () => {
    if (this.state.isSubmitted) {
      clearInterval(timerFunction);
      return;
    }
    ++totalSeconds;
    var timer =
      String(parseInt(parseInt(totalSeconds / 60) / 60)).padStart(2, 0) +
      " : " +
      String(parseInt(totalSeconds / 60)).padStart(2, 0) +
      " : " +
      String(totalSeconds % 60).padStart(2, 0);
    this.setState({ timer: timer });
  };
  retakeExam = () => {
    this.answered = [];
    this.skipped = [];
    this.passed = [];
    this.attempted = [];
    this.setState({ timeover: false, isSubName: true });
    if (isTimed) {
      countDownDate = new Date().getTime() + this.state.max_time * 60 * 1000;
      timerFunction = setInterval(this.timer, 1000);
    }
    this.appAttemptinit(this.state.questions);
    this.setState({
      _progress: 0,
      total_attempted: 0,
      total_score: 0,
      isSubmitted: false,
      ModalOpen: false,
      is_submit: "hide",
      ModalOpenChart: false,

      current_index: 0,
      radio_checked: -1,
      current_question: this.state.questions[0]
    });
    this.ProgressBarUpdate();
    this.setState({
      is_submit: "hide",
      is_next: "hide",
      is_skip: "show-block"
    });
  };

  prevQuestion = () => {
    this.setState({ showAnswer: false });

    var index = this.state.current_index - 1;

    if (index >= 0) {
      this.setState({ current_question: this.state.questions[index] });
      this.setState({ current_index: index });
      let index_attempt = index;

      if (
        this.attempted[index] != undefined &&
        this.attempted[index].status != "unanswered"
      ) {

        let ans_index = this.attempted[index_attempt].radio_index;


        this.checkedOptions(ans_index);
        this.setState({ is_skip: "hide" });
        this.setState({ is_next: "show" });
      } else {
        this.setState({ radio_checked: -1 });
        this.setState({ is_skip: "show" });
        this.setState({ is_next: "hide" });
      }
      if (
        this.state.total_attempted + this.skipped.length ==
        this.state.total_count
      ) {
        this.setState({ is_next: "hide", is_submit: "show", is_skip: "hide" });
      } else {
        this.setState({ is_submit: "hide" });
      }
    }
  };

  set_answer = (value, index, id) => {

    // let answer = event.target.value;
    let answer = value;
    this.setState({ is_skip: "hide" });
    this.setState({ is_next: "show" });
    if (this.passed.indexOf(this.state.current_index) == -1) {
      this.setState({ radio_checked: index });
      this.passed.push(this.state.current_index);
      this.setState({ _progress: this.state._progress + 1 });
      this.setState({ total_attempted: this.state.total_attempted + 1 });
      this.ProgressBarUpdate();
      this.attempted[this.state.current_index] = {
        id: this.state.current_index,
        answer: answer,
        radio_index: index,
        type: parseInt(this.state.current_question.type),
        ansId: id,
        status: "attempted"
      };

    } else {
      this.setState({ radio_checked: index });
      // var attemp_index = this.passed.indexOf(this.state.current_index);
      this.attempted[this.state.current_index] = {
        id: this.state.current_index,
        answer: answer,
        radio_index: index,
        type: parseInt(this.state.current_question.type),

        ansId: id,
        status: "attempted"
      };
    }
    if (!this.state.isFree) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          `/attempted`
      ).set(this.attempted);
    }
  };

  timer = () => {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    var timer =
      String(hours).padStart(2, 0) +
      " : " +
      String(minutes).padStart(2, 0) +
      " : " +
      String(seconds).padStart(2, 0);
    this.setState({ timer: timer });

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(timerFunction);

      this.setState({ timer: "-- : -- : --" });
    }
    if (this.state.isSubmitted) {
      clearInterval(timerFunction);
    }
  };

  getQuestion = index => {
    var current_questions = this.state.questions[index];
    this.setState({ current_question: current_questions });
    this.setState({ current_index: index });
    let index_attempt = this.passed.indexOf(index);
 
    if (
      this.attempted[index] != undefined &&
      this.attempted[index].status != "unanswered"
    ) {

      let ans_index =
        this.attempted[index_attempt] != undefined
          ? this.attempted[index_attempt].radio_index
          : null;

      if (current_questions.type != 3) {
        this.checkedOptions(ans_index);
      }
      this.setState({ is_skip: "hide" });
      this.setState({ is_next: "show" });
    } else {
      this.setState({ radio_checked: -1 });
      this.setState({ is_skip: "show" });
      this.setState({ is_next: "hide" });
    }
 
    if (
      this.state.total_attempted + this.skipped.length ==
      this.state.total_count
    ) {
      // this.setState({ is_next: "hide" });
      this.setState({ is_next: "hide", is_submit: "show", is_skip: "hide" });
    } else {
      this.setState({ is_submit: "hide" });
    }
  };
  onOpenModal = () => {
    this.setState({ ModalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ ModalOpen: false });
  };
  onOpenModalChart = () => {
    this.setState({ ModalOpenChart: true });
  };

  onCloseModalChart = () => {
    this.setState({ ModalOpenChart: false });
  };
  createTable = () => {
    let table = [];

    let children = [];
    //Inner loop to create children
    for (let j = this.state.scale_start; j <= this.state.scale_end; j++) {
      if (j == this.state.scale_end) {
        children.push(
          <td className="last-stand">{`${String(j).padStart(2, 0)}`}</td>
        );
      } else {
        children.push(<td>{`${String(j).padStart(2, 0)}`}</td>);
      }
    }
    //Create the parent and add the children
    table.push(<tr>{children}</tr>);

    return table;
  };

  goBack = () => {};
  viewAnswer = () => {
    this.setState({
      ModalOpenChart: false,
      isSubmitted: true,
      isSubName: true,
      isCorrection: false
    });
 
  };
  AnalyzeEmqResult = (userData, dataKey, userDataKey) => {
    var isTrue = false;
    var score = 0;
    Object.keys(userData).map(index => {
      if (userData[index].ansId == dataKey[index].answer) {
        isTrue = true;
        if (dataKey[index].score != undefined) {
          score = score + parseFloat(dataKey[index].score);
        }
      } else {
        isTrue = false;
      }
    });
    var data = { isTrue: isTrue, score: score };
    this.attempted[userDataKey]["isCorrect"] = isTrue;
    return data;
  };
  computeModalData = () => {
    this.setState({ isSubName: false });
    var statData = {};
    var dataAttempted = {};
    var dataIncorrect = {};
    if (courseType == 0) {
      if (this.userInsight == null) {
        for (var t = 0; t < this.state.questions.length; t++) {
          var topic = this.state.questions[t]["topic"];
          var subTopic = this.state.questions[t]["subTopic"];

          if (statData[topic] == undefined) {
            statData[topic] = {};
          }
          if (statData[topic][subTopic] == undefined) {
            statData[topic][subTopic] = {};
          }
          statData[topic][subTopic] = {
            attempted: { t1: 0, t2: 0, t3: 0, t4: 0 },
            incorrect: { t1: 0, t2: 0, t3: 0, t4: 0 }
          };
        }
      } else {
        statData = this.userInsight.stat;
        dataAttempted =
          this.userInsight.data.attempted != null
            ? this.userInsight.data.attempted
            : {};
        dataIncorrect =
          this.userInsight.data.incorrect != null
            ? this.userInsight.data.incorrect
            : {};
      }
    }

    var userInsight = {};
    this.setState({ isCorrection: false });

    let correct_answer = 0;
  
    let con1 = 0;
    for (var t = 0; t < this.attempted.length; t++) {
      if (this.attempted[t].status != "unanswered") {
        con1++;
      }
    }
    let con2 = parseInt(this.state.total_count);
  
    var topic = null;
    var subTopic = null;
    if (con1 == con2) {
      let total_score = 0;

      for (var i = 0; i < this.attempted.length; i++) {
        // let attempted_id = this.attempted[i]["id"];
        let attempted_id = i;
        var current_question = this.state.questions[attempted_id];

    
        let question_answer = null;
        let attempted_answer = null;
        if (courseType == 0) {
          topic = current_question["topic"];
          subTopic = current_question["subTopic"];

          if (statData[topic] == undefined) {
            statData[topic] = {};
          }
          if (statData[topic][subTopic] == undefined) {
            statData[topic][subTopic] = {};
          }
          if (statData[topic][subTopic]["attempted"] == undefined) {
            statData[topic][subTopic]["attempted"] = {};
          }

          if (statData[topic][subTopic]["incorrect"] == undefined) {
            statData[topic][subTopic]["incorrect"] = {};
          }
        }
        let type = current_question["type"];
        if (
          (type == 1 || type == 4) &&
          this.attempted[attempted_id].status == "attempted"
        ) {
          question_answer = Object.keys(current_question["answer"]);
          attempted_answer = this.attempted[i]["ansId"];
          if (question_answer == attempted_answer) {
            correct_answer++;
          }
          let score = current_question["score"];
          total_score = total_score + score;
        }
        if (type == 2 && this.attempted[attempted_id].status == "attempted") {
          question_answer = Object.keys(current_question["answer"]);
          attempted_answer = this.attempted[i]["ansId"];
          let total_truce = question_answer.length;
          let truce = 0;
      
          var p = 0;
          for (p; p < attempted_answer.length; p++) {
            if (question_answer.indexOf(attempted_answer[p]) != -1) {
              truce++;
            }
          }
        
          if (total_truce == truce && attempted_answer.length == total_truce) {
            if (courseType == 0) {
              if (dataIncorrect[current_question["key"]] !== undefined) {
                delete dataIncorrect[current_question["key"]];
                if (statData[topic][subTopic]["incorrect"]["t" + type] > 0) {
                  statData[topic][subTopic]["incorrect"]["t" + type] =
                    statData[topic][subTopic]["incorrect"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["incorrect"]["t" + type] = 0;
                }
              }
              dataAttempted[current_question["key"]] = parseInt(type);
              statData[topic][subTopic]["attempted"]["t" + type] =
                statData[topic][subTopic]["attempted"]["t" + type] + 1;
            }
            correct_answer = correct_answer + 1;
            let score = current_question["score"];
            total_score = total_score + score;
          } else {
            if (courseType == 0) {
              if (dataAttempted[current_question["key"]] !== undefined) {
                delete dataAttempted[current_question["key"]];

                if (statData[topic][subTopic]["attempted"]["t" + type] > 0) {
                  statData[topic][subTopic]["attempted"]["t" + type] =
                    statData[topic][subTopic]["attempted"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["attempted"]["t" + type] = 0;
                }
              }
              dataIncorrect[current_question["key"]] = parseInt(type);
              statData[topic][subTopic]["incorrect"]["t" + type] =
                statData[topic][subTopic]["incorrect"]["t" + type] + 1;
            }
          }
        }
        if (type == 3 && this.attempted[attempted_id].status == "attempted") {
          var emq = this.attempted[attempted_id]["emq"];
          var results = this.AnalyzeEmqResult(emq, current_question.emq, i);
          total_score = total_score + results.score;
          if (results.isTrue) {
            correct_answer = correct_answer + 1;
            if (courseType == 0) {
              if (dataIncorrect[current_question["key"]] !== undefined) {
                delete dataIncorrect[current_question["key"]];
                if (statData[topic][subTopic]["incorrect"]["t" + type] > 0) {
                  statData[topic][subTopic]["incorrect"]["t" + type] =
                    statData[topic][subTopic]["incorrect"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["incorrect"]["t" + type] = 0;
                }
              }

              dataAttempted[current_question["key"]] = parseInt(type);
              statData[topic][subTopic]["attempted"]["t" + type] =
                statData[topic][subTopic]["attempted"]["t" + type] + 1;
            }
          } else {
            if (courseType == 0) {
              if (dataAttempted[current_question["key"]] !== undefined) {
                delete dataAttempted[current_question["key"]];
                if (statData[topic][subTopic]["attempted"]["t" + type] > 0) {
                  statData[topic][subTopic]["attempted"]["t" + type] =
                    statData[topic][subTopic]["attempted"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["attempted"]["t" + type] = 0;
                }
              }
              dataIncorrect[current_question["key"]] = parseInt(type);
              statData[topic][subTopic]["incorrect"]["t" + type] =
                statData[topic][subTopic]["incorrect"]["t" + type] + 1;
            }
          }
        } else {
        
          if (courseType == 0) {
            if (
              question_answer !== null &&
              question_answer.indexOf(attempted_answer) > -1
            ) {
              if (dataIncorrect[current_question["key"]] !== undefined) {
                delete dataIncorrect[current_question["key"]];
                if (statData[topic][subTopic]["incorrect"]["t" + type] > 0) {
                  statData[topic][subTopic]["incorrect"]["t" + type] =
                    statData[topic][subTopic]["incorrect"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["incorrect"]["t" + type] = 0;
                }
              }
              dataAttempted[current_question["key"]] = parseInt(type);

              statData[topic][subTopic]["attempted"]["t" + type] =
                statData[topic][subTopic]["attempted"]["t" + type] + 1;
            } else {
              if (dataAttempted[current_question["key"]] !== undefined) {
                delete dataAttempted[current_question["key"]];
                if (statData[topic][subTopic]["attempted"]["t" + type] > 0) {
                  statData[topic][subTopic]["attempted"]["t" + type] =
                    statData[topic][subTopic]["attempted"]["t" + type] - 1;
                } else {
                  statData[topic][subTopic]["attempted"]["t" + type] = 0;
                }
              }
              dataIncorrect[current_question["key"]] = parseInt(type);
              statData[topic][subTopic]["incorrect"]["t" + type] =
                statData[topic][subTopic]["incorrect"]["t" + type] + 1;
            }
          }
        }
      }
      this.setState({
        correct: correct_answer,
        incorrect: this.state.total_count - correct_answer
      });
      data = {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [
              parseInt(correct_answer),
              parseInt(this.state.total_count - correct_answer)
            ],
            backgroundColor: ["#1CD316", "#FC5252"]
          }
        ]
      };
      this.setState({ ModalOpenChart: false, isSubName: false });

      var userStatData = {
        stat: statData,
        data: {
          attempted: dataAttempted,
          incorrect: dataIncorrect
        }
      };

     
      this.setState({ totalScore: total_score });
      this.setState({ ModalOpenChart: true });

     
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/skipped"
      ).set(this.skipped);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/timeFlag/isOver"
      ).set(true);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/incorrect"
      ).set(this.state.total_count - (this.skipped.length + correct_answer));
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/correct"
      ).set(correct_answer);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/score"
      ).set(total_score > 0 ? total_score : 0);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/passed"
      ).set(this.passed);
      if (!this.state.isFree && courseType == 0) {
       
      }
    } else {
      this.setState({
        correct: 0,
        incorrect: 0
      });
      data = {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#1CD316", "#FC5252"]
          }
        ]
      };
      this.setState({ totalScore: 0 });
      this.setState({ ModalOpenChart: true });
    }
  };
  stateFilter = type => {
    if (type == 0) {
      if (this.state.toggleFilters.indexOf(0) == -1) {
        var toggleFilters = [...this.state.toggleFilters];
        toggleFilters = [];
        toggleFilters.push(type);
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: false,
          unattemptedClass: true,
          skippedClass: false,
          currentClass: false
        });
      } else {
        var toggleFilters = [...this.state.toggleFilters];

        toggleFilters = [];
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: true,
          unattemptedClass: true,
          skippedClass: true,
          currentClass: true
        });
      }
    } else if (type == 1) {
      if (this.state.toggleFilters.indexOf(1) == -1) {
        var toggleFilters = [...this.state.toggleFilters];
        toggleFilters = [];
        toggleFilters.push(type);
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: true,
          unattemptedClass: false,
          skippedClass: false,
          currentClass: false
        });
      } else {
        var toggleFilters = [...this.state.toggleFilters];

        toggleFilters = [];
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: true,
          unattemptedClass: true,
          skippedClass: true,
          currentClass: true
        });
      }
    } else if (type == 2) {
      if (this.state.toggleFilters.indexOf(2) == -1) {
        var toggleFilters = [...this.state.toggleFilters];
        toggleFilters = [];
        toggleFilters.push(type);
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: false,
          unattemptedClass: false,
          skippedClass: true,
          currentClass: false
        });
      } else {
        var toggleFilters = [...this.state.toggleFilters];

        toggleFilters = [];
        this.setState({ toggleFilters });
        this.setState({
          attemptedClass: true,
          unattemptedClass: true,
          skippedClass: true,
          currentClass: true
        });
      }
    }
  };
  stateFilterAns = type => {
    if (type == 0) {
      if (this.state.toggleFiltersAns.indexOf(0) == -1) {
        var toggleFiltersAns = [...this.state.toggleFiltersAns];
        toggleFiltersAns = [];
        toggleFiltersAns.push(type);
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "hide",
          correctClass: "show-block",
          askipClass: "hide"
        });
      } else {
        var toggleFiltersAns = [...this.state.toggleFiltersAns];

        toggleFiltersAns = [];
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "show-block",
          correctClass: "show-block",
          askipClass: "show-block"
        });
      }
    } else if (type == 1) {
      if (this.state.toggleFiltersAns.indexOf(1) == -1) {
        var toggleFiltersAns = [...this.state.toggleFiltersAns];
        toggleFiltersAns = [];
        toggleFiltersAns.push(type);
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "show-block",
          correctClass: "hide",
          askipClass: "hide"
        });
      } else {
        var toggleFiltersAns = [...this.state.toggleFiltersAns];

        toggleFiltersAns = [];
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "show-block",
          correctClass: "show-block",
          askipClass: "show-block"
        });
      }
    } else if (type == 2) {
      if (this.state.toggleFiltersAns.indexOf(2) == -1) {
        var toggleFilters = [...this.state.toggleFiltersAns];
        toggleFiltersAns = [];
        toggleFiltersAns.push(type);
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "hide",
          correctClass: "hide",
          askipClass: "show-block"
        });
      } else {
        var toggleFiltersAns = [...this.state.toggleFiltersAns];

        toggleFiltersAns = [];
        this.setState({ toggleFiltersAns });
        this.setState({
          incorrectClass: "show-block",
          correctClass: "show-block",
          askipClass: "show-block"
        });
      }
    }
  };
  setAnswer = (event, emq, qid) => {
    //
    var emqs = {};
    if (emqs[qid] == undefined) {
      emqs[qid] = {};
    }
   
    if (
      this.attempted[this.state.current_index]["emq"][emq].status ==
      "unanswered"
    ) {
      this.passed.push(this.state.current_index);

      var radio_index = event.target.value.split("option")[1];
      emqs[qid][emq] = event.target.value;
      this.setState({ current_emqs: emqs });
     
      this.attempted[this.state.current_index]["emq"][emq] = {
        ansId: event.target.value,
        answer: event.target.value,
        radio_index: parseInt(radio_index),
        type: parseInt(this.state.current_question.type),
        id: emq,
        status: "attempted"
      };

    } else {
      var attemp_index = this.passed.indexOf(this.state.current_index);
      var radio_index = event.target.value.split("option")[1];

      emqs[qid][emq] = event.target.value;
      this.setState({ current_emqs: emqs });

     
      this.attempted[this.state.current_index]["emq"][emq] = {
        ansId: event.target.value,
        answer: event.target.value,
        radio_index: parseInt(radio_index),
        type: parseInt(this.state.current_question.type),
        id: emq,
        status: "attempted"
      };

    }
    if (this.attempted[this.state.current_index].status != "attempted") {
      emqs = this.attempted[this.state.current_index]["emq"];
      var ct = 0;
      Object.keys(emqs).map(p => {
        if (
          this.attempted[this.state.current_index]["emq"][p].status ==
          "attempted"
        ) {
          ct++;
        }
      });

      if (ct == Object.keys(emqs).length) {
        this.attempted[this.state.current_index]["status"] = "attempted";

        this.setState({ _progress: this.state._progress + 1 });
        this.setState({ total_attempted: this.state.total_attempted + 1 });
        this.ProgressBarUpdate();
        this.setState({ is_skip: "hide" });
        this.setState({ is_next: "show" });
      }
    }
    if (!this.state.isFree) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          `/attempted`
      ).set(this.attempted);
    }
  };
  viewSubmitCorrection = () => {
    this.setState({ ModalOpenChart: true, isCorrection: true });
  };
  submit_correction = () => {
   
    var obj = {};
    if (
      this.state.questions[this.state.current_index].key != undefined ||
      this.state.questions[this.state.current_index].key != null
    ) {
      obj = {
        query: this.state.correction_query,
        qid: this.state.questions[this.state.current_index].key,
        by: this.props.userId,
        timeStamp: new Date().toISOString(),
        question: this.state.questions[this.state.current_index],
        name: this.props.userAuth,
        status: "Pending"
      };
    } else {
      obj = {
        query: this.state.correction_query,
        qid: "NA",
        by: this.props.userId,
        timeStamp: new Date().toISOString(),
        name: this.props.userAuth,
        status: "Pending"
      };

    }
    db.ref("correctionRequest").push(obj);
    this.setState({ ModalOpenChart: false, correction_query: "" });
  };
  showAns = () => {
    this.setState({ showAnswer: true });
  };
  showSummary = () => {
    this.setState({ isSubName: false });
    if (!this.state.isFree) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/title"
      ).set(this.state.attemptName);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/data"
      ).set(this.state.questions);

      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          courseId +
          "/" +
          this.push_Key +
          "/max_score"
      ).set(this.state.max_score);
    }
    this.computeModalData();
  };
  closeModel = () => {
    this.setState({
      ModalOpenChart: false
    });
  };
  confirmMode = () => {
    this.setState({
      ModalOpenChart: true,
      isCorrection: false
      // isSubName: true
    });
  };
  dummyFunc = () => {};
  // start of render methode
  render() {
    return this.props.data || this.props.location.state ? (
      <React.Fragment>
        <div className="questionAttempt">
          <div>
            {/* \ */}
            <Modal
              open={this.state.ModalOpenChart}
              onClose={
                this.state.isCorrection
                  ? this.onCloseModalChart
                  : this.dummyFunc
              }
              // classNames={""}
              center
            >
              {this.state.isCorrection && !this.state.isFree ? (
                <div className=" modal-content submit-correction-modal ">
                  <div className="modal-body zero_padding">
                    {/* start-course-model */}
                    <div>
                      <div className="modal-course-name text-center btn-purple">
                        <h4 className="white">Submit Correction</h4>
                      </div>
                      <div className="container p-coursemodal">
                        <textarea
                          className="form-control col"
                          rows="10"
                          onChange={event =>
                            this.setState(
                              byPropKey("correction_query", event.target.value)
                            )
                          }
                          value={this.state.correction_query}
                        />
                        <hr />
                        {/* {!this.state.isSubmitted ? ( */}
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-red btn-width-250 white"
                            onClick={this.submit_correction}
                          >
                            {" "}
                            Submit{" "}
                          </button>
                        </div>
                        {/* ) : (
                          ""
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : this.state.isSubName ? (
                <div className=" modal-content submit-correction-modal ">
                  <div className="modal-body zero_padding">
                    {/* start-course-model */}
                    <div>
                      <div className="modal-course-name text-center bg-gardient">
                        <h4 className="white">Session Info</h4>
                      </div>
                      <div className="container p-coursemodal">
                        <input
                          className="form-control col"
                          placeholder="Enter session name "
                          onChange={event =>
                            this.setState(
                              byPropKey("attemptName", event.target.value)
                            )
                          }
                          value={this.state.attemptName}
                        />
                        <hr />

                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-red btn-width-250 white"
                            onClick={this.closeModel}
                          >
                            {" "}
                            Cancel{" "}
                          </button>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <button
                            className="btn btn-red btn-width-250 white"
                            onClick={this.showSummary}
                          >
                            {" "}
                            Save and Continue to Results{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" modal-content custom-modalcourse-width ">
                  <div className="modal-body zero_padding">
                    {/* start-course-model */}
                    <div>
                      <div className="modal-course-name text-center bg-gardient">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="white col-md-2">
                              <div className="row">
                                {/* <span
                                  className="text_cyan pointer"
                                  style={{
                                    marginLeft: "30px",
                                    marginTop: " 10px"
                                  }}
                                  // onClick={() => this.goBack(1)}
                                >
                                  {" "}
                                  <i class="fa  fa-angle-left fa-lg " /> &nbsp;
                                  Go back
                                </span> */}
                              </div>
                            </div>
                            <div className="col-md-8">
                              <h4 className="white">Exam Summary</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container p-coursemodal">
                        <div className="col-md-12">
                          <div className="text-center">
                            <h4>Congratulations</h4>

                            <p>You have finished your exam</p>
                          </div>
                        </div>
                        {/* <div className="col-md-12">
                      <div className="d-flex justify-content-center">
                        <div className="chart-height"> */}
                        <div className="row">
                          <div className="col-md-7">
                            <Pie data={data} options={options} />
                          </div>
                          <div className="col-md-5 pt-50 ml_-45">
                            <table>
                              <tr className="mtb-1">
                                <td className="col-md-6">
                                  <i
                                    class="fa fa-circle clr-purple"
                                    aria-hidden="true"
                                  />
                                  &nbsp; &nbsp; Total{" "}
                                </td>
                                <td className="col-md-6 vertical-line ">
                                  <b>
                                    {data != null ? this.state.total_count : 0}
                                  </b>
                                </td>
                              </tr>

                              <tr className="mtb-1">
                                <td className="col-md-6">
                                  <i
                                    class="fa fa-circle clr-orange"
                                    aria-hidden="true"
                                  />
                                  &nbsp; &nbsp; Unanwsered{" "}
                                </td>
                                <td className="col-md-6 vertical-line ">
                                  <b>
                                    {this.skipped != null
                                      ? this.skipped.length
                                      : 0}
                                  </b>
                                </td>
                              </tr>
                              <tr className="mtb-1">
                                <td className="col-md-6">
                                  <i
                                    class="fa fa-circle clr-turquoise"
                                    aria-hidden="true"
                                  />
                                  &nbsp; &nbsp; Correct{" "}
                                </td>
                                <td className="col-md-6 vertical-line ">
                                  <b>
                                    {data != null
                                      ? data.datasets[0].data[0]
                                      : 0}
                                  </b>
                                </td>
                              </tr>
                              <tr className="mtb-1">
                                <td className="col-md-6">
                                  <i
                                    class="fa fa-circle clr-pink"
                                    aria-hidden="true"
                                  />
                                  &nbsp; &nbsp; Incorrect{" "}
                                </td>
                                <td className="col-md-6 vertical-line ">
                                  <b>
                                    {data != null
                                      ? data.datasets[0].data[1]
                                      : 0}
                                  </b>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        {/* </div>
                      </div>
                    </div> */}
                        <hr />
                        <div className="text-center">
                          <h4>Score: {this.state.totalScore}</h4>
                        </div>
                        <div className="text-center">
                          {isNaN(
                            (this.state.totalScore / this.state.max_score) * 100
                          ) ? null : (
                            <p>
                              {" "}
                              Percentage:
                              {(this.state.totalScore / this.state.max_score) *
                                100 +
                                " %"}
                            </p>
                          )}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center no_underline ptb-5">
                          <button
                            className="btn sub_btn float-right lrm-5"
                            onClick={this.retakeExam}
                          >
                            {" "}
                            Retake Exam{" "}
                          </button>
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-green btn-width-250"
                            onClick={this.viewAnswer}
                          >
                            See Answers
                          </button>{" "}
                          &nbsp;&nbsp;
                          <Link
                            to={{
                              pathname: "/mycourse/" + this.state.courseId,
                              state: {
                                AttemptKey: this.state.attempt_Key,
                                type: 1
                              }
                            }}
                          >
                            {" "}
                            &nbsp;&nbsp;
                            {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                            <button
                              className="btn sub_btn float-right fs-13"
                              onClick={this.goToDashBoard}
                            >
                              {" "}
                              Go to Dashboard
                            </button>
                            &nbsp;&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Modal>
          </div>
          {!this.props.isBook ? (
            <React.Fragment>
              <div
                className={
                  this.props.data != undefined &&
                  this.props.data.courseType == 2
                    ? "header-1 lrp-2p"
                    : "header lrp-2p"
                }
              >
                <div className="col-md-12 lrp-0">
                  <div className="col-md-12 course-title-header lrp-0">
                    <div className="row lrm-0">
                      <div className="col-md-8 lrp-0">
                        <div className="row lrm-0">
                          {" "}
                          {this.state.qpsubtype == 1 ? (
                            <div className="ptb-12">
                              <span class="badge badge-warning white_clr p-badge notoFont-normal">
                                Revision Mode{" "}
                              </span>
                            </div>
                          ) : this.state.qpsubtype == 2 ? (
                            <div className="ptb-12">
                              <span class="badge badge-warning white_clr p-badge notoFont-normal">
                                Exam Mode{" "}
                              </span>
                            </div>
                          ) : courseType == 1 ? (
                            <React.Fragment>
                              {Object.keys(this.state.categories).map(cat => (
                                <React.Fragment>
                                  <div className="ptb-12">
                                    <span class="badge badge-info white_clr p-badge notoFont-normal">
                                      {cat}{" "}
                                    </span>
                                  </div>
                                  &nbsp;
                                </React.Fragment>
                              ))}

                              <div className="ptb-12">
                                <span class="badge badge-dark white_clr p-badge notoFont-normal">
                                  {this.state.sectionName}{" "}
                                </span>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                          <div className="lrp-10 ptb-14">
                            <h3 className="text-grey mt-1m white_clr fs-20 bm-0">
                              {this.state.title}
                            </h3>
                          </div>
                          <div className="lrp-10 ptb-12">
                            <span class="badge badge-success white_clr p-badge notoFont-normal">
                              Passing Marks : <b>{this.state.min_score} </b>
                            </span>
                          </div>
                        </div>
                      </div>
                      {!this.state.isSubmitted ? (
                        <div className="col-md-4 ptb-5 lrp-0">
                          <button
                            className="btn sub_btn float-right"
                            onClick={this.confirmMode}
                          >
                            {" "}
                            Submit Answers
                          </button>
                        </div>
                      ) : !this.state.isFree ? (
                        <div className="col-md-4 no_underline ptb-5 ">
                          &nbsp;&nbsp;
                          <Link
                            to={{
                              pathname: "/mycourse/" + this.state.courseId,
                              state: {
                                AttemptKey: this.state.attempt_Key,
                                type: 1
                              }
                            }}
                          >
                            {" "}
                            &nbsp;&nbsp;
                            {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                            <button
                              className="btn sub_btn float-right fs-13"
                              onClick={this.goToDashBoard}
                            >
                              {" "}
                              Go to Dashboard
                            </button>
                            &nbsp;&nbsp;
                          </Link>
                          {/* <Link
                          to={{
                            pathname: "/mycourse/" + this.state.courseId,
                            state: {
                              AttemptKey: this.state.attempt_Key,
                              type: 1
                            }
                          }}
                        > */}
                          {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                          &nbsp;&nbsp;{" "}
                          <button
                            className="btn sub_btn float-right fs-13"
                            onClick={this.retakeExam}
                            style={{ marginRight: "5px" }}
                          >
                            {" "}
                            Retake Exam{" "}
                          </button>
                          {/* </Link> */}
                          &nbsp;&nbsp; &nbsp;&nbsp;
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
            </React.Fragment>
          ) : null}
          <br />
          <div
            className={
              this.props.data != undefined && this.props.data.courseType == 2
                ? ""
                : "p15per lrp-2p pb-0"
            }
          >
            <div className="">
              <div className="col-md-12 lrp-0">
                <div className="row d-flex justify-content-center">
                  <div className="col sidebar lp-0">
                    <div className="col-md-12 sidebar-body lrp-0">
                      <div className="top-header lrp-0">
                        <div className="row lrm-0">
                          <div className="col-md-6 text-left  ptb-30 lrp-15">
                            <h5 className="text-grey  fs-14">Question Bank</h5>
                          </div>
                          <div className="col-md-6 text-left  ptb-30 lrp-15  vertical-line">
                            <h5 className="text-grey  fs-14 notoFont-normal">
                              {" "}
                              {this.state.total_count} Questions
                            </h5>
                          </div>
                        </div>
                      </div>
                      <hr className="mtb-0" />

                      {/* /////////// */}
                      <div className="questions lrp-0">
                        {/* start of test question tab  */}
                        {this.state.questions == null
                          ? ""
                          : this.state.questions.map((item, i) => (
                              <div
                                className={
                                  "pointer " + this.state.isSubmitted
                                    ? this.state.questions.length > 0
                                      ? // &&
                                        // this.passed != undefined &&
                                        this.attempted[i].status != "skipped" &&
                                        parseInt(
                                          this.state.questions[i].type
                                        ) != 3
                                        ? Object.keys(
                                            this.state.questions[i].answer
                                          ).map(key =>
                                            parseInt(key.split("option")[1]) -
                                              1 ==
                                            parseInt(
                                              this.attempted[i].radio_index
                                            )
                                              ? "question-tab lrp0 " +
                                                this.state.correctClass
                                              : "question-tab lrp0 " +
                                                this.state.incorrectClass
                                          )
                                        : ""
                                      : // : Object.keys(
                                        //     this.state.questions[i].answer
                                        //   ).map(key =>
                                        //     parseInt(key.split("option")[1]) -
                                        //       1 ==
                                        //     parseInt(
                                        //       this.attempted[i].radio_index
                                        //     )
                                        //       ? "question-tab lrp0 " +
                                        //         this.state.correctClass
                                        //       : "question-tab lrp0 " +
                                        //         this.state.incorrectClass
                                        //   )
                                        "question-tab lrp0 " +
                                        this.state.askipClass
                                    : i == this.state.current_index
                                    ? "question-tab lrp0 " +
                                      (this.attempted[i].status == "skipped"
                                        ? "question-tab lrp0 " +
                                          (this.state.skippedClass
                                            ? " show-block"
                                            : " hide")
                                        : this.attempted[i].status ==
                                          "attempted"
                                        ? "question-tab lrp0 " +
                                          (this.state.attemptedClass
                                            ? " show-block"
                                            : " hide")
                                        : "question-tab lrp0 " +
                                          (this.state.unattemptedClass
                                            ? " show-block"
                                            : " hide"))
                                    : this.attempted[i].status == "skipped"
                                    ? "question-tab lrp0  " +
                                      (this.state.skippedClass
                                        ? " show-block"
                                        : " hide")
                                    : // : this.passed.indexOf(i) > -1
                                    this.attempted[i].status == "attempted"
                                    ? "question-tab lrp0 " +
                                      (this.state.attemptedClass
                                        ? " show-block"
                                        : " hide")
                                    : "question-tab lrp0 " +
                                      (this.state.unattemptedClass
                                        ? " show-block"
                                        : " hide")
                                }
                                onClick={() => this.getQuestion(i)}
                              >
                                <div className="col-md-12 question-tab-body">
                                  {this.state.isSubmitted ? (
                                    this.state.questions.length > 0 &&
                                    // this.attempted[i].status != undefined &&
                                    this.attempted[i].status != "skipped" ? (
                                      parseInt(this.state.questions[i].type) !=
                                      3 ? (
                                        Object.keys(
                                          this.state.questions[i].answer
                                        ).map(key =>
                                          parseInt(key.split("option")[1]) -
                                            1 ==
                                          parseInt(
                                            this.attempted[parseInt(i)]
                                              .radio_index
                                          ) ? (
                                            <div className={"correct "} />
                                          ) : (
                                            <div className={"incorrect "} />
                                          )
                                        )
                                      ) : this.attempted[i].isCorrect !=
                                          undefined &&
                                        this.attempted[i].isCorrect == true ? (
                                        <div className={"correct "} />
                                      ) : (
                                        <div className={"incorrect "} />
                                      )
                                    ) : (
                                      <div className={"skippedq "} />
                                    )
                                  ) : (
                                    " "
                                  )}
                                  {/* */}
                                  <div className="row">
                                    <h6 className="bm-0 fs-13">
                                      <span>
                                        {/* {i==this.state.current_index?"fa fa-circle fs-11 current ":"fa fa-circle fs-11 unattempted "} */}
                                        <i
                                          className={
                                            !this.state.isSubmitted
                                              ? i == this.state.current_index
                                                ? "fa fa-circle fs-10 current "
                                                : this.attempted[i].status ==
                                                  "skipped"
                                                ? //    this.skipped.indexOf(i) > -1
                                                  "fa fa-circle fs-10 skipped "
                                                : this.attempted[i].status ==
                                                  "attempted"
                                                ? // this.passed.indexOf(i) > -1
                                                  "fa fa-circle fs-10 attempted "
                                                : "fa fa-circle fs-10 unattempted"
                                              : ""
                                          }
                                        />
                                      </span>{" "}
                                      &nbsp;&nbsp;
                                      {"Question " + (parseInt(i) + 1)}
                                    </h6>
                                    &nbsp;&nbsp; &nbsp;&nbsp;
                                    <span className="text-lightgrey fs-12 ">
                                      {item.score == undefined
                                        ? ""
                                        : "( " + item.score + " Score )"}
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="text-lightgrey fs-12 ">
                                      {parseInt(item.type) == 1
                                        ? "SBA"
                                        : parseInt(item.type) == 2
                                        ? "MCQ"
                                        : parseInt(item.type) == 3
                                        ? "EMQ"
                                        : "T/F"}
                                    </span>
                                  </div>
                                </div>
                                <hr className="mtb-0" />
                              </div>
                            ))}
                      </div>
                      {this.state.isSubmitted ? (
                        <React.Fragment>
                          <div className="col-md-12 legend-box">
                            <div className="row">
                              <div
                                className="col-md-4  text-center pointer "
                                onClick={() => this.stateFilterAns(1)}
                              >
                                <span className="fs-10">
                                  <i class="fa fa-circle fs-10 unattempted " />
                                  <br />
                                  {this.state.toggleFiltersAns.indexOf(1) ==
                                  -1 ? (
                                    "Incorrect"
                                  ) : (
                                    <b>Incorrect</b>
                                  )}
                                </span>
                              </div>
                              <div
                                className="col-md-4  text-center pointer"
                                onClick={() => this.stateFilterAns(0)}
                              >
                                <span className="fs-10">
                                  <i class="fa fa-circle fs-10 attempted " />
                                  <br />
                                  {this.state.toggleFiltersAns.indexOf(0) ==
                                  -1 ? (
                                    "Correct"
                                  ) : (
                                    <b>Correct</b>
                                  )}
                                </span>
                                {/* <span className="fs-11">
                                  <i
                                    class={
                                      this.state.toggleFilters.indexOf(1) == -1
                                        ? "fa fa-circle fs-11 attempted"
                                        : "fa fa-circle fs-12 attempted"
                                    }
                                  />
                                  <br />
                                  Correct
                                </span>{" "} */}
                              </div>
                              <div
                                className="col-md-4  text-center pointer"
                                onClick={() => this.stateFilterAns(2)}
                              >
                                <span className="fs-10">
                                  <i class="fa fa-circle fs-10 skipped " />
                                  <br />
                                  {this.state.toggleFiltersAns.indexOf(2) ==
                                  -1 ? (
                                    "Skipped"
                                  ) : (
                                    <b>Skipped</b>
                                  )}
                                </span>
                                {/* <span className="fs-11">
                                  <i class="fa fa-circle fs-11 skipped" />
                                  <br />
                                  Skipped
                                </span>{" "} */}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div className="col-md-12 legend-box">
                            <div className="row">
                              <div
                                className="col-md-3  text-center pointer lrp-5"
                                onClick={() => this.stateFilter(0)}
                              >
                                <span className="fs-10">
                                  <i
                                    class={
                                      this.state.toggleFilters.indexOf(0) == -1
                                        ? "fa fa-circle fs-10 unattempted"
                                        : "fa fa-circle fs-12 unattempted"
                                    }
                                  />
                                  <br />
                                  {this.state.toggleFilters.indexOf(0) == -1 ? (
                                    "Unattempted"
                                  ) : (
                                    <b>Unattempted</b>
                                  )}
                                </span>
                              </div>
                              <div
                                className="col-md-3  text-center pointer lrp-5"
                                onClick={() => this.stateFilter(1)}
                              >
                                <span className="fs-10">
                                  <i
                                    class={
                                      this.state.toggleFilters.indexOf(1) == -1
                                        ? "fa fa-circle fs-10 attempted"
                                        : "fa fa-circle fs-12 attempted"
                                    }
                                  />
                                  <br />
                                  {this.state.toggleFilters.indexOf(1) == -1 ? (
                                    "Attempted"
                                  ) : (
                                    <b>Attempted</b>
                                  )}
                                </span>{" "}
                              </div>
                              <div
                                className="col-md-3  text-center pointer lrp-5"
                                onClick={() => this.stateFilter(2)}
                              >
                                <span className="fs-10">
                                  <i
                                    class={
                                      this.state.toggleFilters.indexOf(2) == -1
                                        ? "fa fa-circle fs-10 skipped"
                                        : "fa fa-circle fs-12 skipped"
                                    }
                                  />
                                  <br />
                                  {this.state.toggleFilters.indexOf(2) == -1 ? (
                                    "Skipped"
                                  ) : (
                                    <b>Skipped</b>
                                  )}
                                </span>{" "}
                              </div>
                              <div className="col-md-3  text-center lrp-5">
                                <span className="fs-10">
                                  <i class="fa fa-circle fs-10 current" />
                                  <br />
                                  Current
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <div className=" col lrp-0">
                    <div className="col-md-12 progress-box lrp-0">
                      <div className="col-md-12 progress-body">
                        <div className="row lrm-0 ">
                          {!this.state.isSubmitted ? (
                            <React.Fragment>
                              <div className="col-md-7  ">
                                <div className="row">
                                  <div className="col-md-12 float-left">
                                    <h6 className="text-small bm-0">
                                      Overall Progress
                                    </h6>
                                  </div>
                                </div>
                                <Line
                                  percent={
                                    this.state.total_count < 9
                                      ? this.state._progress *
                                        10 *
                                        this.state.offset
                                      : this.state._progress * 10.925
                                  }
                                  strokeWidth="1"
                                  trailWidth="1"
                                  strokeColor="#78B8E9"
                                  className="progress-bar-question"
                                />
                                <table className="w-100 fs-11 text-lightgrey ">
                                  {this.createTable()}
                                </table>
                              </div>

                              <div className="col-md-3  text-box-small-top-adjust lrp-5 ">
                                <div className="col-md-12 text-box-small row bg-dark-grey border-6 lrp-0 lrm-0">
                                  <div className="col-md-6 lrp-0">
                                    {" "}
                                    <h6 className="text-small text-center bm-0">
                                      Answered{" "}
                                    </h6>
                                    <p className="text-lightgrey text-center fs-22 bm-0">
                                      {this.state.total_attempted}/
                                      {this.state.total_count}
                                    </p>
                                  </div>
                                  <div className="col-md-6 vertical-line lrp-0">
                                    {" "}
                                    <h6 className="text-small text-center bm-0">
                                      Max Score{" "}
                                    </h6>
                                    <p className="text-lightgrey text-center fs-22 bm-0">
                                      {this.state.max_score}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2 lrp-0">
                                <h6 className="text-small text-center bm-0 ">
                                  {this.state.qpsubtype == 1
                                    ? "Time Elapsed"
                                    : "Time Remaining"}
                                </h6>
                                <p
                                  className={
                                    this.state.qpsubtype == 1
                                      ? "text-center fs-22 clr-green"
                                      : "text-center fs-22 clr-red"
                                  }
                                >
                                  {this.state.timer}
                                </p>
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="col-md-12 lrp-0">
                                <div className="row lrm-0">
                                  <div className="col-md-3  text-box-small-top-adjust lrp-5 ">
                                    <div className="col-md-12 text-box-small row bg-dark-grey border-6 lrp-0 lrm-0">
                                      <div className="col-md-12 lrp-0">
                                        {" "}
                                        <h6 className="text-small text-center bm-0">
                                          Correct{" "}
                                        </h6>
                                        <p className="text-lightgrey text-center fs-22 bm-0">
                                          {data != null
                                            ? data.datasets[0].data[0]
                                            : 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3  text-box-small-top-adjust lrp-5 ">
                                    <div className="col-md-12 text-box-small row bg-dark-grey border-6 lrp-0 lrm-0">
                                      <div className="col-md-12 lrp-0">
                                        {" "}
                                        <h6 className="text-small text-center bm-0">
                                          Incorrect{" "}
                                        </h6>
                                        <p className="text-lightgrey text-center fs-22 bm-0">
                                          {data != null
                                            ? data.datasets[0].data[1]
                                            : 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3  text-box-small-top-adjust lrp-5 ">
                                    <div className="col-md-12 text-box-small row bg-dark-grey border-6 lrp-0 lrm-0">
                                      <div className="col-md-12 lrp-0">
                                        {" "}
                                        <h6 className="text-small text-center bm-0">
                                          Unanswered{" "}
                                        </h6>
                                        <p className="text-lightgrey text-center fs-22 bm-0">
                                          {this.skipped.length != null
                                            ? this.skipped.length
                                            : 0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3  text-box-small-top-adjust lrp-5 ">
                                    <div className="col-md-12 text-box-small row bg-dark-grey border-6 lrp-0 lrm-0">
                                      {this.state.qpsubtype == 2 ? (
                                        <React.Fragment>
                                          <div className="col-md-12 lrp-0">
                                            {" "}
                                            <h6 className="text-small text-center bm-0">
                                              Total time{" "}
                                            </h6>
                                            <p className="text-lightgrey text-center fs-22 bm-0">
                                              {this.state.timer}
                                            </p>
                                          </div>
                                        </React.Fragment>
                                      ) : (
                                        <React.Fragment>
                                          <div className="col-md-12 lrp-0">
                                            {" "}
                                            <h6 className="text-small text-center bm-0">
                                              Score{" "}
                                            </h6>
                                            <p className="text-lightgrey text-center fs-22 bm-0">
                                              {this.state.totalScore >= 0
                                                ? this.state.totalScore
                                                : "-"}
                                            </p>
                                          </div>
                                        </React.Fragment>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 questionPanel">
                      <div className="questionsView" />
                      <div className="col-md-12 control-button">
                        <div className="row  lrp-30 lrm-0">
                          <div className="col-md-6">
                            <div
                              className="row float-left next-color"
                              onClick={this.prevQuestion}
                            >
                              <span title="Previous" className="next-color">
                                <i class="fa fa-angle-left fa-2x next-color" />
                              </span>
                              <span className="fs-11 tm-5">
                                &nbsp; Move to Previous Question
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6" onClick={this.nextQuestion}>
                            <div className="row float-right">
                              <span className="next-color fs-11 tm-5">
                                Move to Next Question &nbsp;
                              </span>{" "}
                              <span title="Next">
                                <i class="fa fa-angle-right fa-2x next-color " />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lrp-30">
                        <hr className="mtb-0 " />
                      </div>
                      <div className="question-content-box">
                        <div className="col-md-12">
                          <div className="questionTitle">
                            <p className="text-black fs-13">
                              <b>Instructions : &nbsp;&nbsp; </b>
                              {this.state.current_question == null
                                ? ""
                                : this.state.current_question.Description}
                            </p>
                          </div>
                          {this.state.current_question == null ? (
                            ""
                          ) : this.state.current_question.mediaType == 2 ? (
                            <div className="media-content">
                              <div className="media-content-body">
                                <img
                                  src={this.state.current_question.media}
                                  style={{ height: "29.5vh" }}
                                />
                              </div>
                            </div>
                          ) : this.state.current_question.mediaType == 3 ? (
                            <div className="media-content">
                              <div className="media-content-body question-video">
                                <Player
                                  playsInline
                                  poster="/assets/poster.png"
                                  src={this.state.current_question.media}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* <div className="col-md-12">
                          <div className="lrp-30 ptb-10">
                            <input
                          type="text"
                          className="form-control custom-input bg-white"
                          placeholder="Type answer here"
                        />
                          </div>
                        </div> */}
                        {this.state.current_question != null &&
                        this.state.current_question.type == 3 ? (
                          <React.Fragment>
                            <div className="col-md-12">
                              <p className="lrp-30 text-black fs-13">
                                <b>Options &nbsp;&nbsp; </b>
                                <hr className="mtb-0 " />{" "}
                              </p>
                              <div className="row lrp-30 ptb-10">
                                <div className="row lrm-0">
                                  {this.state.current_question == null ||
                                  this.state.current_question == undefined
                                    ? ""
                                    : Object.keys(
                                        this.state.current_question.options
                                      ).map((key, i) => (
                                        <div className="col-md-6">
                                          {"(" +
                                            String.fromCharCode(
                                              "A".charCodeAt() +
                                                parseInt(
                                                  key.split("option")[1]
                                                ) -
                                                1
                                            ) +
                                            ") " +
                                            this.state.current_question.options[
                                              key
                                            ]}
                                        </div>
                                      ))}
                                </div>
                              </div>
                              <div className="col-md-12 lrp-0">
                                <p className="lrp-30 text-black fs-13">
                                  <b>Questions &nbsp;&nbsp; </b>
                                  <hr className="mtb-0 " />{" "}
                                </p>
                                <div className="row lrp-30 ptb-10">
                                  <div className="col-md-12 lrp-0">
                                    {this.state.current_question == null &&
                                    this.state.current_question != undefined
                                      ? ""
                                      : Object.keys(
                                          this.state.current_question.emq
                                        ).map((key, i) => (
                                          <div className="col-md-12">
                                            <div className="col-md-12 lrp-0 fs-13">
                                              <span class="badge badge-info white_clr fs-12 p-5 notoFont-normal">
                                                {"Question " + (i + 1)}
                                              </span>
                                              &nbsp; &nbsp;
                                              {
                                                this.state.current_question.emq[
                                                  key
                                                ].question
                                              }
                                            </div>

                                            <br />

                                            <div className="form-group fs-13">
                                              <select
                                                className={
                                                  this.state.isSubmitted
                                                    ? this.state
                                                        .current_question.emq[
                                                        key
                                                      ].answer ==
                                                      this.attempted[
                                                        this.state.current_index
                                                      ]["emq"][key].ansId
                                                      ? " form-control admin-form-control correctOpt  "
                                                      : " form-control admin-form-control selectedOpt  "
                                                    : "form-control admin-form-control"
                                                }
                                                id={
                                                  this.state.current_question
                                                    .key + i
                                                }
                                                value={
                                                  this.attempted[
                                                    this.state.current_index
                                                  ] != undefined &&
                                                  this.attempted[
                                                    this.state.current_index
                                                  ].emq != undefined &&
                                                  this.attempted[
                                                    this.state.current_index
                                                  ]["emq"][key].status ==
                                                    "attempted"
                                                    ? this.attempted[
                                                        this.state.current_index
                                                      ]["emq"][key].ansId
                                                    : ""
                                                }
                                                onChange={event =>
                                                  this.setAnswer(
                                                    event,
                                                    key,
                                                    this.state.current_question
                                                      .key
                                                  )
                                                }
                                                disabled={
                                                  this.state.isSubmitted ||
                                                  this.state.timeover
                                                }
                                              >
                                                <option value="" selected>
                                                  Select Answer
                                                </option>
                                                {this.state.current_question
                                                  .options != null
                                                  ? Object.keys(
                                                      this.state
                                                        .current_question
                                                        .options
                                                    ).map(key2 => (
                                                      <option value={key2}>
                                                        {String.fromCharCode(
                                                          "A".charCodeAt() +
                                                            parseInt(
                                                              key2.split(
                                                                "option"
                                                              )[1]
                                                            ) -
                                                            1
                                                        ) +
                                                          ". " +
                                                          this.state
                                                            .current_question
                                                            .options[key2]}
                                                      </option>
                                                    ))
                                                  : ""}
                                              </select>
                                            </div>
                                            {this.state.isSubmitted &&
                                            this.state.current_question.emq[key]
                                              .answer !=
                                              this.attempted[
                                                this.state.current_index
                                              ]["emq"][key].ansId ? (
                                              <div className="form-group">
                                                <select
                                                  className="form-control admin-form-control correctOpt  "
                                                  id={
                                                    "asnwer" +
                                                    this.state.current_question
                                                      .key +
                                                    i
                                                  }
                                                  disabled={
                                                    this.state.isSubmitted ||
                                                    this.state.timeover
                                                  }
                                                >
                                                  <option value="" selected>
                                                    {
                                                      this.state
                                                        .current_question
                                                        .options[
                                                        this.state
                                                          .current_question.emq[
                                                          key
                                                        ].answer
                                                      ]
                                                    }{" "}
                                                  </option>
                                                </select>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            {this.state.isSubmitted ||
                                            this.state.showAnswer ? (
                                              <React.Fragment>
                                                {" "}
                                                <p className=" bm-0 text-black">
                                                  <b>
                                                    Explaination EMQ
                                                    &nbsp;&nbsp;{" "}
                                                  </b>
                                                  <hr className="mtb-0 " />{" "}
                                                </p>
                                                <div className="col-md-12 lrp-0">
                                                  <div className="description-box p-15 ">
                                                    {this.state.questions
                                                      .length !== 0
                                                      ? this.state
                                                          .current_question.emq[
                                                          key
                                                        ].explanation
                                                      : ""}{" "}
                                                  </div>
                                                </div>
                                                <br></br>
                                              </React.Fragment>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        ))}
                                  </div>
                                </div>
                              </div>
                              {this.state.isSubmitted ||
                              this.state.showAnswer ? (
                                // ||this.state.qpsubtype == 1
                                this.state.questions[
                                  parseInt(this.state.current_index)
                                ].type != 3 ? (
                                  <div>
                                    <p className="lrp-30 bm-0 text-black">
                                      <b>Explaination &nbsp;&nbsp; </b>
                                      <hr className="mtb-0 " />{" "}
                                    </p>

                                    <div className="col-md-12 lrp-30">
                                      <div className="description-box p-15 ">
                                        {this.state.questions.length !== 0
                                          ? this.state.questions[
                                              parseInt(this.state.current_index)
                                            ].exp
                                          : ""}{" "}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </div>
                          </React.Fragment>
                        ) : (
                          <div className="col-md-12">
                            <p className="lrp-30 text-black fs-13">
                              <b>Answers &nbsp;&nbsp; </b>
                              <hr className="mtb-0 " />{" "}
                            </p>
                            <div className="row lrp-30 ptb-10">
                              {this.state.current_question == null
                                ? ""
                                : Object.keys(
                                    this.state.current_question.options
                                  ).map((key, i) =>
                                    parseInt(
                                      this.state.current_question.type
                                    ) !== 2 ? (
                                      <div className="col-md-12 bm-0">
                                        <div className="radio">
                                          <label
                                            className={
                                              this.state.isSubmitted ||
                                              this.state.showAnswer
                                                ? // ||this.state.qpsubtype == 1
                                                  this.state.questions.length >
                                                  0
                                                  ? Object.keys(
                                                      this.state.questions[
                                                        this.state.current_index
                                                      ].answer
                                                    ).map(key =>
                                                      parseInt(
                                                        key.split("option")[1]
                                                      ) -
                                                        1 ==
                                                      i
                                                        ? "bm-0 p-5 correctOpt opt-label"
                                                        : this.state
                                                            .radio_checked == i
                                                        ? "bm-0 p-5 selectedOpt opt-label"
                                                        : "bm-0 p-5 opt-label"
                                                    )
                                                  : "bm-0 p-5 opt-label"
                                                : "bm-0 p-5 opt-label"
                                            }
                                          >
                                            <input
                                              type="radio"
                                              name="optradio"
                                              checked={
                                                this.attempted[
                                                  this.state.current_index
                                                ].radio_index != "unanswered" &&
                                                this.attempted[
                                                  this.state.current_index
                                                ].radio_index != "skipped"
                                                  ? i ==
                                                    this.attempted[
                                                      this.state.current_index
                                                    ].radio_index
                                                    ? true
                                                    : false
                                                  : false
                                              }
                                              onChange={() =>
                                                this.set_answer(
                                                  this.state.current_question
                                                    .options[key],
                                                  i,
                                                  key
                                                )
                                              }
                                              value={
                                                this.state.current_question
                                                  .options[key]
                                              }
                                              disabled={
                                                this.state.isSubmitted ||
                                                this.state.timeover
                                              }
                                            />
                                            &nbsp;{" "}
                                            {"(" +
                                              String.fromCharCode(
                                                "A".charCodeAt() + parseInt(i)
                                              ) +
                                              ")"}
                                            &nbsp;&nbsp;
                                            {
                                              this.state.current_question
                                                .options[key]
                                            }
                                          </label>
                                          {/* {this.state.isSubmitted
                                                           ? this.state.questions.length > 0
                                                             ? Object.keys(
                                                                 this.state.questions[
                                                                   this.state.current_index
                                                                 ].answer
                                                               ).map(key =>
                                                                 parseInt(key.split("option")[1]) -
                                                                   1 ==
                                                                 i ? (
                                                                   <i className="fa fa-check correct-fg fa-lg" />
                                                                 ) : this.state.radio_checked ==
                                                                   i ? (
                                                                   <i className="fa fa-times incorrect-fg fa-lg" />
                                                                 ) : (
                                                                   ""
                                                                 )
                                                               )
                                                             : ""
                                                           : ""} */}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col-md-12">
                                        <div class="form-check">
                                          <label
                                            className={
                                              this.state.isSubmitted ||
                                              this.state.showAnswer
                                                ? // this.state.qpsubtype == 1
                                                  this.state.questions.length >
                                                  0
                                                  ? Object.keys(
                                                      this.state.questions[
                                                        this.state.current_index
                                                      ].answer
                                                    ).indexOf(
                                                      "option" + (i + 1)
                                                    ) > -1
                                                    ? "form-check-label bm-0 p-5 correctOpt opt-label"
                                                    : this.attempted[
                                                        this.state.current_index
                                                      ].status != "unanswered"
                                                    ? this.attempted[
                                                        parseInt(
                                                          this.state
                                                            .current_index
                                                        )
                                                      ].radio_index.length !=
                                                        undefined &&
                                                      this.attempted[
                                                        parseInt(
                                                          this.state
                                                            .current_index
                                                        )
                                                      ].radio_index != undefined
                                                      ? this.attempted[
                                                          parseInt(
                                                            this.state
                                                              .current_index
                                                          )
                                                        ].radio_index.indexOf(
                                                          i
                                                        ) > -1
                                                        ? " form-check-label bm-0 p-5 selectedOpt opt-label"
                                                        : " form-check-label bm-0 p-5 opt-label"
                                                      : " form-check-label bm-0 p-5 opt-label"
                                                    : " form-check-label bm-0 p-5 opt-label"
                                                  : " form-check-label bm-0 p-5 opt-label"
                                                : " form-check-label bm-0 p-5 opt-label"
                                            }
                                            for={key}
                                          >
                                            <input
                                              type="checkbox"
                                              class="form-check-input"
                                              id={key}
                                              name={"option" + i}
                                              value={key}
                                              onClick={() =>
                                                this.handleToggle(
                                                  i,
                                                  this.state.current_question
                                                    .options[key],
                                                  key
                                                )
                                              }
                                              checked={
                                                this.attempted[
                                                  this.state.current_index
                                                ].radio_index != "skipped" &&
                                                this.attempted[
                                                  this.state.current_index
                                                ].radio_index != "unanswered"
                                                  ? this.attempted[
                                                      this.state.current_index
                                                    ].radio_index.length !=
                                                    undefined
                                                    ? this.attempted[
                                                        this.state.current_index
                                                      ].radio_index.indexOf(
                                                        i
                                                      ) != -1
                                                    : false
                                                  : false
                                              }
                                              disabled={
                                                this.state.isSubmitted ||
                                                this.state.timeover
                                              }
                                            />
                                            &nbsp;
                                            {"(" +
                                              String.fromCharCode(
                                                "A".charCodeAt() + parseInt(i)
                                              ) +
                                              ")"}
                                            &nbsp;&nbsp;
                                            {
                                              this.state.current_question
                                                .options[key]
                                            }{" "}
                                          </label>{" "}
                                          &nbsp;&nbsp;
                                          {/* {this.state.isSubmitted ? (
                                                           this.state.questions.length > 0 ? (
                                                             Object.keys(
                                                               this.state.questions[
                                                                 this.state.current_index
                                                               ].answer
                                                             ).indexOf("option" + (i + 1)) > -1 ? (
                                                               <i className="fa fa-check correct-fg fa-lg" />
                                                             ) : this.passed.indexOf(
                                                                 this.state.current_index
                                                               ) > -1 ? (
                                                               this.attempted[
                                                                 parseInt(
                                                                   this.passed.indexOf(
                                                                     this.state.current_index
                                                                   )
                                                                 )
                                                               ].radio_index.length !=
                                                               undefined ? (
                                                                 this.attempted[
                                                                   parseInt(
                                                                     this.passed.indexOf(
                                                                       this.state.current_index
                                                                     )
                                                                   )
                                                                 ].radio_index.indexOf(i) > -1 ? (
                                                                   <i className="fa fa-times incorrect-fg fa-lg" />
                                                                 ) : (
                                                                   ""
                                                                 )
                                                               ) : (
                                                                 ""
                                                               )
                                                             ) : (
                                                               ""
                                                             )
                                                           ) : (
                                                             ""
                                                           )
                                                         ) : (
                                                           ""
                                                         )} */}
                                        </div>
                                      </div>
                                    )
                                  )}
                            </div>
                            {this.state.isSubmitted || this.state.showAnswer ? (
                              // ||this.state.qpsubtype == 1
                              <div>
                                {/* <div className="row lrp-30 ptb-10">
                                                 <div className="col-md-4 ">
                                                   <span className="fs-14">
                                                     <b>Your Answer : </b>
                                                   </span>
                                                   <span>
                                                     {this.attempted.length !== 0 &&
                                                     this.passed.indexOf(
                                                       this.state.current_index
                                                     ) > -1
                                                       ? this.attempted[
                                                           parseInt(
                                                             this.passed.indexOf(
                                                               this.state.current_index
                                                             )
                                                           )
                                                         ].radio_index.length != undefined
                                                         ? this.attempted[
                                                             parseInt(
                                                               this.passed.indexOf(
                                                                 this.state.current_index
                                                               )
                                                             )
                                                           ].radio_index.map(
                                                             key =>
                                                               "(" +
                                                               String.fromCharCode(
                                                                 "A".charCodeAt() + parseInt(key)
                                                               ) +
                                                               ") "
                                                           )
                                                         : "(" +
                                                           String.fromCharCode(
                                                             "A".charCodeAt() +
                                                               parseInt(
                                                                 this.attempted[
                                                                   parseInt(
                                                                     this.passed.indexOf(
                                                                       this.state.current_index
                                                                     )
                                                                   )
                                                                 ].radio_index
                                                               )
                                                           ) +
                                                           ") "
                                                       : "Not Answered"}{" "}
                                                   </span>
                                                 </div>
                                                 <div className="col-md-4">
                                                   <span className="fs-14">
                                                     <b>Correct Answer : </b>
                                                   </span>
                                                   <span>
                                                     {this.state.questions.length > 0
                                                       ? Object.keys(
                                                           this.state.questions[
                                                             this.state.current_index
                                                           ].answer
                                                         ).map(
                                                           key =>
                                                             // this.state.questions[
                                                             //   this.state.current_index
                                                             // ].answer[key]
                   
                                                             "(" +
                                                             String.fromCharCode(
                                                               "A".charCodeAt() +
                                                                 parseInt(key.split("option")[1]) -
                                                                 1
                                                             ) +
                                                             ") "
                                                         )
                                                       : ""}
                                                   </span>
                                                 </div>
                                                 <div className="col-md-4 ">
                                                   <span className="fs-14">
                                                     <b>Paper : </b>
                                                   </span>
                                                   <span>
                                                     {this.state.questions.length > 0
                                                       ? this.state.questions[
                                                           this.state.current_index
                                                         ].topic
                                                       : ""}
                                                   </span>
                                                 </div>
                                               </div> */}
                                <p className="lrp-30 bm-0 text-black">
                                  <b>Explaination &nbsp;&nbsp; </b>
                                  <hr className="mtb-0 " />{" "}
                                </p>
                                <div className="col-md-12 lrp-30">
                                  <div className="description-box p-15 ">
                                    {this.state.questions.length !== 0
                                      ? this.state.questions[
                                          parseInt(this.state.current_index)
                                        ].exp
                                      : ""}{" "}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                      <div className="col-md-12 qat-row">
                        <div
                          className={
                            this.state.isSubmitted || this.state.qpsubtype == 1
                              ? "show  d-flex justify-content-left float-left lrp-30 ptb-10"
                              : "hide"
                          }
                        >
                          {!this.state.isFree ? (
                            <div
                              className="lrp-15"
                              style={{ marginTop: "6px" }}
                            >
                              <span
                                className="fs-15 grad-text-purple pointer"
                                onClick={this.viewSubmitCorrection}
                              >
                                <i class="fa fa-exclamation-circle  grad-text-purple fs-18" />
                                &nbsp; Submit Correction
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {this.state.qpsubtype == 1 &&
                          !this.state.isSubmitted ? (
                            <button
                              className={
                                " btn btn-radius btn-red-hollow btn-medium "
                              }
                              onClick={this.showAns}
                            >
                              {" "}
                              Show
                            </button>
                          ) : (
                            ""
                          )}
                        </div>

                        <div
                          className={
                            this.state.isSubmitted
                              ? "hide"
                              : "show  d-flex justify-content-right float-right lrp-30 ptb-10"
                          }
                        >
                          <div className="lrp-15">
                            {!this.state.timeover ? (
                              <React.Fragment>
                                <button
                                  className="btn btn-radius btn-grey btn-medium"
                                  onClick={this.prevQuestion}
                                >
                                  {" "}
                                  Previous
                                </button>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="lrp-10">
                            {" "}
                            {!this.state.timeover ? (
                              <React.Fragment>
                                {" "}
                                <button
                                  className={
                                    this.state.is_next +
                                    " btn btn-radius btn-green btn-medium"
                                  }
                                  onClick={this.submit_and_next}
                                >
                                  {" "}
                                  Next
                                </button>
                                <button
                                  className={
                                    this.state.is_skip +
                                    " btn btn-radius btn-orange btn-medium "
                                  }
                                  onClick={this.skip_question}
                                >
                                  {" "}
                                  Skip
                                </button>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                            <button
                              className={
                                this.state.is_submit +
                                " btn btn-radius btn-green btn-medium"
                              }
                              onClick={this.confirmMode}
                            >
                              {" "}
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </React.Fragment>
    ) : (
      <Redirect
        to={{
          pathname: "/404",
          errorMessage: `Url ${this.props.match.url} cannot be accessed directly.`
        }}
      />
    );
  }
}

export default QuestionSheet;
