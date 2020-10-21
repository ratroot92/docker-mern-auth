import { db } from "../firebase/firebase";
import React, { Component } from "react";
import Tabs from "react-responsive-tabs";
import CourseOverview from "./courseOverview";
import CourseContent from "./courseContent";
import CourseContentData from "./courseContentData";
import SessionContent from "./SessionContent";
import ExamContent from "./ExamContent";
import MockPaper from "./MockPaper";
import { Line } from "rc-progress";
import { Link } from "react-router-dom";
import Loader from "./loader";
import Navigation from "./Navigation";
import { Redirect } from "react-router";
import UserDashNav from "./UserDashNav";
import CreatableSelect from "react-select/lib/Creatable";
import arraySort from "array-sort";
import CourseBook from "./CourseBook";

import Coursefaq from "./Coursefaq";
import "react-responsive-tabs/styles.css";
import "../assets/css/mycourse.css";
import Modal from "react-responsive-modal";
//var tp = {};
import PreviousAttempts from "./PreviousAttempts";
import Ratings from "./Ratings";
import WebNotif from "./WebNotif";
import QuizBook from "./QuizBook";
import SidebarCourse from "./SidebarCourse";
import SessionsRecordingContent from "./SessionRecordingContent";
let presidents = [];
let yea = [];
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
let otherFilters = {};

let isOFilter = false;
let isTFilter = false;
class MyCourse extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    courseExamStats: null,
    ModalOpen: false,
    examAtempts: null,
    arrowProp: "fa fa-angle-up",
    overview: null,
    faq: null,
    attemptload1: false,
    attemptload2: false,
    attemptload3: false,

    content: null,
    viewPreviousAttempts: "hide",
    viewCourseModel: "show-block",
    test: false,
    paperKey: null,
    sectionName: null,
    session_recordings: null,
    categories: null,
    sectionKey: null,
    testTime: 30,
    isLearning: false,
    isQuiz: false,
    dataCount: null,
    examData: [],
    qMark: 1,
    transform: true,
    selectedPapers: [],
    courseFeature: null,
    filter: { qt: [0, 1, 2, 3, 4], others: [0, 1, 2, 3] },
    showInkBar: true,
    showLoader: true,
    attempt_Key: null,
    at_mode: " show-block ",
    filterBox: " hide ",
    selectedOption: [],
    selectedYear: [],
    maxScore: 0,
    years: [],
    courseData: null,
    courseId: null,
    total_question: 0,
    fullScreen: false,
    papers: null,
    userInsights: null,
    userInsightsStat: null,
    revisionPapers: {},
    QPMode: null,
    CourseType: 0 //0 practice qustion, 1 mock exam, 2 exam
  };
  componentDidMount() {
    const param = this.props.match.params;
    let courseId = param.id;
    let userId = this.props.userId;
    this.setState({ courseId: courseId });

    db.ref("userInsights/" + this.props.userId + "/" + courseId)
      .once("value")
      .then(userInsights => {
        if (userInsights.val() != null) {
          this.setState({ userInsights: userInsights.val().data });
          this.setState({ userInsightsStat: userInsights.val().stat });
          // otherFilters[1] = this.state.userInsights["attempted"];
          otherFilters[2] = this.state.userInsights["incorrect"];

          otherFilters[3] = {};
          Object.assign(otherFilters[3], this.state.userInsights["incorrect"]);
          Object.assign(otherFilters[3], this.state.userInsights["attempted"]);
          otherFilters[1] = otherFilters[3];
        }
      });

    var obj = db.ref("myAttempts/" + userId + "/" + courseId + "/").push();
    this.setState({ attempt_Key: obj.key });
    db.ref(`courses/${courseId}`)
      .once("value")
      .then(snapshot => {
        this.setState({ overview: snapshot.val() });
        this.setState({ categories: snapshot.val().categories });
        this.setState({ content: snapshot.val().CourseContent });
        this.setState({ faq: snapshot.val().faq });
        this.setState({ courseFeature: snapshot.val().courseFeatures });
        this.setState({ showLoader: false });
        this.setState({ CourseType: parseInt(snapshot.val().type) });

        if (parseInt(snapshot.val().type) > 0) {
          if (
            parseInt(snapshot.val().type) == 2 &&
            snapshot.val().courseType == 0
          ) {
            presidents = [
              {
                name: "Overview",
                component: (
                  <CourseOverview
                    description={this.state.overview.Description}
                    feature={this.state.overview.Features}
                    courseFeature={this.state.courseFeature}
                    instructor={
                      this.state.overview.Instructors != undefined
                        ? this.state.overview.Instructors.ins
                        : {}
                    }
                  />
                )
              },
              {
                name: "Course Content",
                component: (
                  <CourseContent
                    content={this.state.content}
                    courseType={parseInt(snapshot.val().type)}
                    selectSection={this.selectSection}
                    selectContentPaper={this.select_Paper_content}
                    id={courseId}
                    userId={this.props.userId}
                  />
                )
              },
              {
                name: "Live Sessions",
                component: (
                  <SessionContent
                    content={this.state.content}
                    courseType={parseInt(snapshot.val().type)}
                    selectSection={this.selectSection}
                    selectContentPaper={this.select_Paper_content}
                    id={courseId}
                    userId={this.props.userId}
                  />
                )
              },

              {
                name: "Exams",
                component: (
                  <ExamContent
                    content={this.state.content}
                    courseType={parseInt(snapshot.val().type)}
                    selectSection={this.selectSection}
                    selectContentPaper={this.select_Paper_content_live}
                    id={courseId}
                    userId={this.props.userId}
                  />
                )
              },
              {
                name: "Sessions Recordings",
                component: (
                  <SessionsRecordingContent
                    content={this.state.content}
                    courseType={parseInt(snapshot.val().type)}
                    selectSection={this.selectSection_recordings}
                    selectContentPaper={this.selectSection_recordings}
                    id={courseId}
                    userId={this.props.userId}
                  />
                )
              },
              {
                name: "FAQ's",
                component: (
                  <Coursefaq userId={this.props.userId} faq={this.state.faq} />
                )
              },

              {
                name: "Previous Attempts",
                component: (
                  <PreviousAttempts
                    userId={this.props.userId}
                    courseId={this.state.courseId}
                    selectedAttempt={this.selectedAttemptG}
                    previousAttempt={this.previousAttempt}
                  />
                )
              }
            ];
            db.ref(`liveCourseExam/${courseId}`)
              .once("value")
              .then(cpsc => {
                this.setState({ papers_live: cpsc.val() });
              });
            db.ref(`liveSessionsRecordings/${courseId}`)
              .once("value")
              .then(cpsc => {
                this.setState({ session_recordings: cpsc.val() });
              });
          } else {
            presidents = [
              {
                name: "Overview",
                component: (
                  <CourseOverview
                    description={this.state.overview.Description}
                    feature={this.state.overview.Features}
                    courseFeature={this.state.courseFeature}
                    instructor={
                      this.state.overview.Instructors != undefined
                        ? this.state.overview.Instructors.ins
                        : {}
                    }
                  />
                )
              },
              {
                name:
                  parseInt(snapshot.val().type) == 1
                    ? "Papers"
                    : "Course Content",
                component:
                  parseInt(snapshot.val().type) == 1 ? (
                    <MockPaper
                      content={this.state.content}
                      courseType={parseInt(snapshot.val().type)}
                      selectPaper={this.select_Paper}
                      id={courseId}
                    />
                  ) : (
                    <CourseContent
                      content={this.state.content}
                      courseType={parseInt(snapshot.val().type)}
                      selectSection={this.selectSection}
                      selectContentPaper={this.select_Paper_content}
                      id={courseId}
                      userId={this.props.userId}
                    />
                  )
              },
              {
                name: "Faq's",
                component: (
                  <Coursefaq userId={this.props.userId} faq={this.state.faq} />
                )
              },
              {
                name: "Previous Attempts",
                component: (
                  <PreviousAttempts
                    userId={this.props.userId}
                    courseId={this.state.courseId}
                    selectedAttempt={this.selectedAttemptG}
                    previousAttempt={this.previousAttempt}
                  />
                )
              }
            ];
          }
        } else {
          presidents = [
            {
              name: "Overview",
              component: (
                <CourseOverview
                  courseType={this.state.CourseType}
                  description={this.state.overview.Description}
                  feature={this.state.overview.Features}
                  courseFeature={this.state.courseFeature}
                  instructor={
                    this.state.overview.Instructors != undefined
                      ? this.state.overview.Instructors.ins
                      : {}
                  }
                />
              )
            },
            {
              name: "Practice Now",
              onOpenModal: this.onOpenModal
            },
            {
              name: "FAQ's",
              component: (
                <Coursefaq userId={this.props.userId} faq={this.state.faq} />
              )
            },
            {
              name: "Previous Attempts",
              component: (
                <PreviousAttempts
                  userId={this.props.userId}
                  courseId={this.state.courseId}
                  selectedAttempt={this.selectedAttemptG}
                  previousAttempt={this.previousAttempt}
                />
              )
            }
          ];
        }

        if (parseInt(this.state.CourseType) == 0) {
          db.ref("courseExams/" + courseId)
            .once("value")
            .then(snapshot => {
              var userInsightsStat = { ...this.state.userInsightsStat };
              this.setState({ courseData: snapshot.val() });
              this.setState({ DataCopy: snapshot.val() });
              var years = [...this.state.years];
              snapshot.forEach(function(practice) {
                practice.child("topics").forEach(function(subTopis) {
                  subTopis.child("exam").forEach(function(question) {
                    if (yea.indexOf(question.val().year) == -1) {
                      var new_option = {
                        value: question.val().year,
                        label: question.val().year
                      };

                      yea.push(question.val().year);
                      years.push(new_option);
                    }
                    if (userInsightsStat[practice.key] == undefined) {
                      userInsightsStat[practice.key] = {};
                    }

                    if (
                      userInsightsStat[practice.key][subTopis.key] == undefined
                    ) {
                      userInsightsStat[practice.key][subTopis.key] = {
                        attempted: { t1: 0, t2: 0, t3: 0, t4: 0 },
                        incorrect: { t1: 0, t2: 0, t3: 0, t4: 0 }
                      };
                    }
                  });
                });
              });
              years = arraySort(years, "value");

              this.setState({ years, userInsightsStat });
            });
          db.ref("courseExamStats/" + courseId)
            .once("value")
            .then(courseStat => {
              this.setState({ courseExamStats: courseStat.val() });
            });
        } else if (this.state.CourseType >= 1) {
          db.ref(`courseExams/${courseId}`)
            .once("value")
            .then(cpsc => {
              this.setState({ papers: cpsc.val() });
            });
        }
        this.setState({ test: true });
      });

    // else
    {
      db.ref("myAttempts/" + userId + "/" + courseId)
        .once("value")
        .then(userAtt => {
          this.setState({ examAtempts: userAtt.val() });
        });
    }
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    var selectedYear = [];

    if (selectedOption.length == 0) {
      selectedYear = [];
    } else {
      for (var i = 0; i < selectedOption.length; i++) {
        selectedYear.push(selectedOption[i].value);
      }
    }
    this.setState({ selectedYear }, () => {
      this.filterData();
    });
  };
  select_Paper = (sectionKey, paperKey) => {
    this.setState({
      paperKey: paperKey,
      sectionKey: sectionKey,
      sectionName: this.state.papers[sectionKey]["topicName"],
      ModalOpen: true,
      selectedTabKey: 1,
      examData: this.state.papers[sectionKey]["topics"][paperKey]
    });
  };
  select_Paper_content_live = (sectionKey, paperKey) => {
    this.setState({ cc: null });
    this.setState({
      // paperKey_live: paperKey,
      // sectionKey_live: sectionKey,
      selectedTabKey: 3,
      isLearning: false,
      contentOrigion: 1,
      renderBook: false,
      isQuiz: true,

      // cc: (
      //   <CourseContent
      //     keyOffset={"ccexam"}
      //     content={this.state.papers_live}
      //     courseType={this.state.CourseType}
      //     selectSection={this.selectSection}
      //     selectContentPaper={this.select_Paper_content_live}
      //     id={this.state.courseId}
      //     userId={this.props.userId}
      //   />
      // ),
      examData: this.state.papers_live[sectionKey]["topics"][paperKey]
    });
    this.setState({ renderBook: true });
  };
  select_Paper_content = (sectionKey, paperKey) => {
    this.setState({
      paperKey: paperKey,
      sectionName: this.state.papers[sectionKey]["topicName"],

      sectionKey: sectionKey,
      selectedTabKey: 1,
      sectionKey: sectionKey,
      contentOrigion: 0,
      isLearning: false,
      renderBook: false,
      isQuiz: true,

      cc: (
        <CourseContent
          keyOffset={"cc"}
          content={this.state.content}
          courseType={this.state.CourseType}
          selectSection={this.selectSection}
          selectContentPaper={this.select_Paper_content}
          id={this.state.courseId}
          userId={this.props.userId}
        />
      ),
      examData: this.state.papers[sectionKey]["topics"][paperKey]
    });
    this.setState({ renderBook: true });
  };

  selectSection_recordings = (sectionKey, topicKey) => {
    this.setState({ isLearning: true, renderBook: false }, () => {
      this.setState({
        isQuiz: false,
        examData: this.state.session_recordings[sectionKey]["topics"][topicKey]
          .examDetails,
        cc: (
          <CourseContentData
            keyOffset={"cc"}
            content={this.state.session_recordings[sectionKey]["topics"]}
            content={this.state.content}
            courseType={this.state.CourseType}
            selectSection={this.selectSection}
            selectContentPaper={this.select_Paper_content}
            id={this.state.courseId}
            userId={this.props.userId}
          />
        ),
        sideBarContent: this.state.session_recordings,
        sectionName: this.state.session_recordings[sectionKey].topicName,
        topicKey: topicKey,
        contentOrigion: 1,
        sectionKey: sectionKey,
        selectedTabKey: 4
      });
      this.setState({ renderBook: true });
    });
  };
  selectSection = (sectionKey, topicKey) => {
    console.log("section key", sectionKey);
    console.log("topic key", topicKey);
    console.log("this.state.CourseType", this.state.CourseType);
    this.setState({ isLearning: true, renderBook: false }, () => {
      this.setState({
        isQuiz: false,
        examData: this.state.papers[sectionKey]["topics"][topicKey].examDetails,
        cc: (
          <CourseContent
            keyOffset={"cc"}
            content={this.state.content}
            courseType={this.state.CourseType}
            selectSection={this.selectSection}
            selectContentPaper={this.select_Paper_content}
            id={this.state.courseId}
            userId={this.props.userId}
          />
        ),
        sideBarContent: this.state.papers,
        sectionName: this.state.papers[sectionKey].topicName,
        topicKey: topicKey,
        sectionKey: sectionKey,
        contentOrigion: 0,
        selectedTabKey: 1
      });
      this.setState({ renderBook: true });
    });
  };
  previousAttempt = () => {
    if (
      this.state.attemptData.length > 0 &&
      this.state.attemptData != undefined
    ) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          this.state.courseId +
          "/" +
          this.state.attempt_Key +
          "/timeFlag"
      ).set(null);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          this.state.courseId +
          "/" +
          this.state.attempt_Key +
          "/startTime"
      ).set(null);
      this.setState({ redirectG: true });
    } else {
      var obj = new WebNotif();
      obj.createNotification("error", "You need to select the attempt");
    }
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
  loadAttempt1 = () => {
    if (
      this.state.attemptData.length > 0 &&
      this.state.attemptData != undefined
    ) {
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          this.state.courseId +
          "/" +
          this.state.attempt_Key +
          "/timeFlag"
      ).set(null);
      db.ref(
        "myAttempts/" +
          this.props.userId +
          "/" +
          this.state.courseId +
          "/" +
          this.state.attempt_Key +
          "/startTime"
      ).set(null);
      this.setState({ loadAttempt1: true });
    } else {
      var obj = new WebNotif();
      obj.createNotification("error", "You need to select the attempt");
    }
  };

  loadAttempt2 = () => {
    if (this.state.examData.length > 0) {
      this.setState({ loadAttempt2: true });
    } else {
      alert("No data ");
    }
  };

  loadAttempt3 = () => {
    if (this.state.examData.length > 0) {
      this.setState({ loadAttempt3: true });
    } else {
      alert("No data ");
    }
  };
  handleClick = e => {
    e.preventDefault();
    if (this.state.examData.length > 0) {
      this.setState({
        redirect: true
      });
    } else {
      alert("No data ");
    }
  };
  getTabs = () => {
    return presidents.map(president => {
      if (president.name === "Practice Now") {
        // Dedicated Tab to Open Model -- Clients Request.
        return {
          title: president.name,
          tabClassName: "tab", // Optional
          panelClassName: "panel", // Optional
         
          getContent: () => president.onOpenModal() // does not render component but calls the Modal function.
       
        };
      } else
       {
        // Regular Tabbed Components that works as in the documentation for the package.
        return {
          tabClassName: "tab", // Optional
          panelClassName: "panel", // Optional
          showInkBar: true,
          title: president.name,
          getContent: () => president.component
        };
      }
    });
  };
  getTabss = () => {
    return presidents.map(president => ({
      // key: index, // Optional. Equals to tab index if this property is omitted
      tabClassName: "tab", // Optional
      panelClassName: "panel", // Optional
      showInkBar: true,
      title: president.name,
      getContent: () => president.component
    }));
  };
  previousAttempts = () => {
    this.setState({ viewPreviousAttempts: "show-block" });
    this.setState({ viewCourseModel: "hide" });
  };
  goBack = val => {
    if (val == 0) {
      this.setState({ viewPreviousAttempts: "hide" });
      this.setState({ viewCourseModel: "show-block" });
    }
    if (val == 1) {
      this.setState({ at_mode: " show-block ", filterBox: " hide " });
      // this.setState({ viewCourseModel: "show-block" });
    }
  };
  selectedAttempt = key => {
    console.log("Selecting attempt");
    this.setState({
      attempt_Key: key,
      attemptData: this.state.examAtempts[key].data,
      attemptTime: this.state.examAtempts[key].totalTime
    });
  };

  selectedAttemptG = key => {
    console.log("select attempt G");
    this.setState(
      {
        attempt_Key: key,
        attemptData: this.state.examAtempts[key].data,
        attemptTime: this.state.examAtempts[key].totalTime,
        QPMode:
          this.state.examAtempts[key].qpType != undefined &&
          this.state.examAtempts[key].qpType != null
            ? this.state.examAtempts[key].qpType
            : null,
        selectedTabKey: 3
      },
      () => {}
    );
  };

  practiseModel = () => {};
  filterData = () => {
    this.setState({ dataCount: null });

    var dataset = { ...this.state.revisionPapers };

    var xPath = [];
    var data = [];
    var filters = this.state.filter["qt"];
    var others_filters = this.state.filter["others"];

    var finalObj = {};
    // Object.keys(otherFilters).map(cc => {
    //   Object.keys(otherFilters[cc]).map(cd => {
    //     finalObj[cd] = otherFilters[cc][cd];
    //   });
    //   // finalObj = finalObj.concat(otherFilters[cc]);
    // });
    if (
      this.state.userInsights == null ||
      this.state.filter["others"].length == 0
    ) {
      isOFilter = false;
    }
    if (this.state.filter["qt"].length == 0) {
      isTFilter = true;
    }

    if (isTFilter || isOFilter) {
      // ----------------------methode 2-----------------
      Object.keys(dataset).map(key3 => {
        Object.keys(dataset[key3]).map(key1 => {
          Object.keys(dataset[key3][key1]).map(key => {
            // if (otherFilters[3] == undefined) {
            //   if (otherFilters[key] != undefined) {
            //     if (filters.indexOf(parseInt(dataset[key1][key].type)) > -1) {
            //       data.push(dataset[key1][key]);
            //     }
            //   }
            // } else
            {
              if (
                ((otherFilters[1] != undefined &&
                  otherFilters[1][key] != undefined) ||
                  (otherFilters[2] != undefined &&
                    otherFilters[2][key] != undefined) ||
                  (otherFilters[3] != undefined &&
                    otherFilters[3][key] == undefined)) &&
                (isOFilter && isTFilter)
              ) {
                if (
                  filters.indexOf(parseInt(dataset[key3][key1][key].type)) > -1
                ) {
                  data.push(dataset[key3][key1][key]);
                }
              } else if (isTFilter && !isOFilter) {
                if (
                  filters.indexOf(parseInt(dataset[key3][key1][key].type)) > -1
                ) {
                  data.push(dataset[key3][key1][key]);
                }
              } else if (
                ((otherFilters[1] != undefined &&
                  otherFilters[1][key] != undefined) ||
                  (otherFilters[2] != undefined &&
                    otherFilters[2][key] != undefined) ||
                  (otherFilters[3] != undefined &&
                    otherFilters[3][key] == undefined)) &&
                (isOFilter && !isTFilter)
              ) {
                data.push(dataset[key3][key1][key]);
              }
            }
          });
        });
      });
      if (this.state.selectedYear.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var t_index = this.state.selectedYear.indexOf(data[i].year);
          if (t_index == -1) {
            data.splice(t_index, 1);
          }
        }
      }
      this.countData(data);

      if (data.length > 0) {
        this.setState({
          examData: data,
          testTime: data.length * 1.5
        });
      } else {
      }
      this.setState({
        total_question: data.length
      });
    } else {
      Object.keys(dataset).map(key3 => {
        Object.keys(dataset[key3]).map(key1 => {
          Object.keys(dataset[key3][key1]).map(key => {
            // if (filters.indexOf(parseInt(dataset[key1][key].type)) > -1)
            {
              data.push(dataset[key3][key1][key]);
            }
          });
        });
      });

      if (this.state.selectedYear.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var t_index = this.state.selectedYear.indexOf(data[i].year);
          if (t_index == -1) {
            data.splice(t_index, 1);
          }
        }
      }
      this.countData(data);

      if (data.length > 0) {
        this.setState({
          examData: data,
          testTime: data.length * 1.5
          // redirect: true
        });
      } else {
      }
      this.setState({
        total_question: data.length
      });
    }
  };
  countData = data => {
    var dataset = { ...this.state.courseData };
    var dataCount = {};

    if (data.length == 0) {
      this.setState({ dataCount: null });
      var filters = this.state.filter["qt"];
      var others_filters = this.state.filter["others"];
      if (
        this.state.userInsights == null ||
        this.state.filter["others"].length == 0
      ) {
        isOFilter = false;
      }
      if (this.state.filter["qt"].length == 0) {
        isTFilter = true;
      }

      if (isTFilter || isOFilter) {
        Object.keys(dataset).map(key3 => {
          Object.keys(dataset[key3]["topics"]).map(key1 => {
            Object.keys(dataset[key3]["topics"][key1]["exam"]).map(key => {
              var que = dataset[key3]["topics"][key1]["exam"][key];

              {
                if (
                  ((otherFilters[1] != undefined &&
                    otherFilters[1][key] != undefined) ||
                    (otherFilters[2] != undefined &&
                      otherFilters[2][key] != undefined) ||
                    (otherFilters[3] != undefined &&
                      otherFilters[3][key] == undefined)) &&
                  (isOFilter && isTFilter)
                ) {
                  if (filters.indexOf(parseInt(que.type)) > -1) {
                    if (dataCount[key3] == undefined) {
                      dataCount[key3] = {};
                    }
                    if (dataCount[key3][key1] == undefined) {
                      dataCount[key3][key1] = 0;
                    }
                    // if (dataCount[key3][key1][key] == undefined) {
                    //   dataCount[key3][key1][key] == 0;
                    // }
                    dataCount[key3][key1] = parseInt(dataCount[key3][key1]) + 1;
                  }
                } else if (isTFilter && !isOFilter) {
                  if (filters.indexOf(parseInt(que.type)) > -1) {
                    {
                      if (dataCount[key3] == undefined) {
                        dataCount[key3] = {};
                      }
                      if (dataCount[key3][key1] == undefined) {
                        dataCount[key3][key1] = 0;
                      }
                      // if (dataCount[key3][key1][key] == undefined) {
                      //   dataCount[key3][key1][key] == 0;
                      // }
                      dataCount[key3][key1] =
                        parseInt(dataCount[key3][key1]) + 1;
                    }
                  }
                } else if (
                  ((otherFilters[1] != undefined &&
                    otherFilters[1][key] != undefined) ||
                    (otherFilters[2] != undefined &&
                      otherFilters[2][key] != undefined) ||
                    (otherFilters[3] != undefined &&
                      otherFilters[3][key] == undefined)) &&
                  (isOFilter && !isTFilter)
                ) {
                  {
                    if (dataCount[key3] == undefined) {
                      dataCount[key3] = {};
                    }
                    if (dataCount[key3][key1] == undefined) {
                      dataCount[key3][key1] = 0;
                    }
                    // if (dataCount[key3][key1][key] == undefined) {
                    //   dataCount[key3][key1][key] == 0;
                    // }
                    dataCount[key3][key1] = parseInt(dataCount[key3][key1]) + 1;
                  }
                }
              }
            });
          });
        });
      }
      this.setState({ dataCount });
    } else {
      var dataCount = {};
      var maxScore = 0;
      Object.keys(data).map(id => {
        if (dataCount[data[id]["topic"]] == undefined) {
          dataCount[data[id]["topic"]] = {};
        }
        if (dataCount[data[id]["topic"]][data[id]["subTopic"]] == undefined) {
          dataCount[data[id]["topic"]][data[id]["subTopic"]] = 0;
        }
        // if (dataCount[key3][key1][key] == undefined) {
        //   dataCount[key3][key1][key] == 0;
        // }
        dataCount[data[id]["topic"]][data[id]["subTopic"]] =
          parseInt(dataCount[data[id]["topic"]][data[id]["subTopic"]]) + 1;
        //maxScore = maxScore + data[id]["score"];
      });
      this.setState({ dataCount });
    }
  };
  toggleCheck = (subTopic, topic, type) => {
    if (type == 0) {
      if (subTopic == 0) {
        var revisionPapers = { ...this.state.revisionPapers };

        if (
          this.state.revisionPapers[topic] != undefined &&
          Object.keys(this.state.revisionPapers[topic]).length ==
            Object.keys(this.state.courseData[topic]["topics"]).length
        ) {
          delete revisionPapers[topic];
        } else {
          // revisionPapers.push(data[topic]["topics"]["exams"]);
          // revisionPapers.push(data[topic]["topics"][subTopic]["exam"]);
          Object.keys(this.state.courseData[topic]["topics"]).map(subTopic => {
            if (revisionPapers[topic] == undefined) {
              revisionPapers[topic] = {};
            }

            var ttp = revisionPapers[topic][subTopic];
            if (ttp == undefined) {
              revisionPapers[topic][subTopic] = this.state.courseData[topic][
                "topics"
              ][subTopic]["exam"];
            }
            // else {
            //   delete revisionPapers[topic][subTopic];
            // }
          });
        }
        this.setState({ revisionPapers }, () => {
          this.filterData();
        });
      } else {
        // var data = { ...this.state.courseData };

        // revisionPapers.push(data[topic]["topics"]["exams"]);
        var revisionPapers = { ...this.state.revisionPapers };
        // revisionPapers.push(data[topic]["topics"][subTopic]["exam"]);
        if (revisionPapers[topic] == undefined) {
          revisionPapers[topic] = {};
        }
        var ttp = revisionPapers[topic][subTopic];
        if (ttp == undefined) {
          revisionPapers[topic][subTopic] = this.state.courseData[topic][
            "topics"
          ][subTopic]["exam"];
        } else {
          delete revisionPapers[topic][subTopic];
        }
        this.setState({ revisionPapers }, () => {
          this.filterData();
        });
      }

      var selectedPapers = [...this.state.selectedPapers];

      var check_index = selectedPapers.indexOf(topic);
      if (check_index == -1) {
        selectedPapers.push(topic);
      } else {
        selectedPapers.splice(check_index, 1);
      }
      this.setState({ selectedPapers });
    } else if (type == 1) {
      //filters

      if (subTopic == 0) {
        var filter = { ...this.state.filter };
        var ttp = filter[topic];
        if (ttp == undefined) {
          filter[topic] = [0];
        } else {
          var index = ttp.indexOf(subTopic);
          if (index == -1) {
            ttp.push(subTopic);
            if (topic == "others") {
              filter[topic] = [0, 1, 2, 3];
              if (this.state.userInsights != null) {
                otherFilters[3] = {};
                Object.assign(
                  otherFilters[3],
                  this.state.userInsights["incorrect"]
                );
                Object.assign(
                  otherFilters[3],
                  this.state.userInsights["attempted"]
                );
                otherFilters[2] = this.state.userInsights["incorrect"];
                // otherFilters[1] = this.state.userInsights["attempted"];
                otherFilters[1] = otherFilters[3];

                isOFilter = false;
              }
            } else {
              filter[topic] = [0, 1, 2, 3, 4];
              isTFilter = false;
            }
          } else {
            filter[topic] = [];
            if (topic == "others") {
              otherFilters = {};
            }
          }
        }

        this.setState({ filter }, () => {
          this.filterData();
        });
      } else {
        if (topic == "others") {
          var indexName = null;
          var ofData = null;
          if (
            otherFilters[subTopic] == undefined &&
            this.state.userInsights != null
          ) {
            if (subTopic == 1 || subTopic == 3) {
              isOFilter = true;
              indexName = "incorrect";
              otherFilters[subTopic] = {};
              Object.assign(
                otherFilters[subTopic],
                this.state.userInsights["incorrect"]
              );
              Object.assign(
                otherFilters[subTopic],
                this.state.userInsights["attempted"]
              );
            } else if (subTopic == 2) {
              isOFilter = true;

              indexName = "incorrect";
              otherFilters[subTopic] = this.state.userInsights[indexName];
            }
          } else {
            delete otherFilters[subTopic];
          }
        }
        var filter = { ...this.state.filter };
        var ttp = filter[topic];
        if (ttp != undefined) {
          var indexall = ttp.indexOf(0);
          if (indexall > -1) {
            ttp.splice(0, 1);
            if (topic == "qt") {
              isTFilter = true;
            } else {
              isOFilter = true;
            }
            filter[topic] = ttp;
          }
        }

        if (ttp == undefined) {
          filter[topic] = [subTopic];
          if (topic == "qt") {
            isTFilter = true;
          } else {
            isOFilter = true;
          }
        } else {
          var index = ttp.indexOf(subTopic);
          if (index == -1) {
            ttp.push(subTopic);
            if (topic == "qt") {
              isTFilter = true;
            } else {
              isOFilter = true;
            }
            filter[topic] = ttp;
          } else {
            ttp.splice(index, 1);
            filter[topic] = ttp;
            if (topic == "qt") {
              isTFilter = true;
            } else {
              isOFilter = true;
            }
          }
        }
        this.setState({ filter }, () => {
          this.filterData();
        });
      }
    }
  };
  showQPFilters = val => {
    var filter = { ...this.state.filter };
    filter["qt"] = [0, 1, 2, 3, 4];
    this.setState({ filter });
    var revisionPapers = { ...this.state.revisionPapers };
    revisionPapers = {};
    this.setState({ revisionPapers });

    if (val == 1) {
      // qp revision mode
      this.setState({
        at_mode: " hide ",
        filterBox: " show-block ",
        QPMode: val
      });
    } else if (val == 2) {
      //qp mockexam mode
      this.setState({
        at_mode: " hide ",
        filterBox: " show-block ",
        QPMode: val
      });
    }
  };
  toggleArrow = () => {
    if (this.state.arrowProp.indexOf("down") > -1) {
      this.setState({ arrowProp: "fa fa-angle-up" });
    } else {
      this.setState({ arrowProp: "fa fa-angle-down" });
    }
  };

  // course only functions

  startCourse = () => {
    // this.setState({ isLearning: true, renderBook: true });
    this.setState({ selectedTabKey: 1 });
  };

  goFullScreen = () => {
    this.state.fullScreen
      ? this.setState({ fullScreen: false })
      : this.setState({ fullScreen: true });
  };
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/questions",
            state: {
              AttemptKey: this.state.attempt_Key,
              type: 0,
              filters: this.state.filter,
              data: this.state.examData,
              courseId: this.state.courseId,
              subType: this.state.QPMode,
              timer: this.state.testTime,
              qMark: this.state.qMark,
              courseType: 0,
              userId: this.props.userId
            }
          }}
        />
      );
    }
    if (this.state.redirectG) {
      return (
        <Redirect
          push
          to={{
            pathname: "/questions",
            state: {
              AttemptKey: this.state.attempt_Key,
              data: this.state.attemptData,
              type: 1,
              subType: this.state.QPMode,
              timer: this.state.attemptTime,
              qMark: this.state.qMark,

              courseId: this.state.courseId,
              courseType: this.state.CourseType,
              userId: this.props.userId
            }
          }}
        />
      );
    }
    if (this.state.attemptload1) {
      return (
        <Redirect
          push
          to={{
            pathname: "/questions",
            state: {
              AttemptKey: this.state.attempt_Key,
              data: this.state.attemptData,
              type: 1,
              subType: this.state.QPMode,
              timer: this.state.attemptTime,
              qMark: this.state.qMark,

              courseId: this.state.courseId,
              courseType: this.state.CourseType,
              userId: this.props.userId
            }
          }}
        />
      );
    }

    return (
      <div className={this.state.ModalOpen ? "blured" : ""}>
        <WebNotif />
        <Navigation />
        <div>
          {/* <button onClick={this.onOpenModal}>Open modal</button> */}
          {/* {this.state.courseData !== null ?( */}
          <Modal
            open={this.state.ModalOpen}
            onClose={this.onCloseModal}
            classNames={"width-1000p"}
            center
          >
            {/* <div
              className={
                this.state.CourseType == 1
                  ? "show modal-content custom-modalcourse-width"
                  : "hide"
              }
            >
              <div className="modal-body zero_padding">
                <div
                  className={this.state.viewCourseModel + " start-course-model"}
                >
                  <div className="modal-course-name text-center">
                    <h4 className="white">Mock Exam Mode</h4>
                  </div>
                  <div className="container p-coursemodal">
                    <div className="text-center">
                      Select the number of question to
                      <br />
                      <b>Mock Exams</b>
                    </div>
                    <br />
                    <div className="row tm-10">
                      <div className="col-md-4">
                        <b>PAPER 1</b>
                        <div className="bg-grey course-instruction ">
                          <p className="bm-0">
                            <form>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  All
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  Anatomy (2)
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  Anatomy (2)
                                </label>
                              </div>
                            </form>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <b>PAPER 2</b>
                        <div className="bg-grey course-instruction ">
                          <p className="bm-0">
                            <form>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  All
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  Anatomy (2)
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  Anatomy (2)
                                </label>
                              </div>
                            </form>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <b>Question Type</b>
                        <div className=" course-instruction ">
                          <p className="bm-0">
                            <form>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  MCQ
                                </label>
                              </div>
                              <div className="form-check">
                                <label className="form-check-label" for="check1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check1"
                                    name="option1"
                                    value="something"
                                    checked
                                  />
                                  SBA
                                </label>
                              </div>
                            </form>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-4">
                        <b>With Questions</b>
                        <form>
                          <div className="form-check">
                            <label className="form-check-label" for="check1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="check1"
                                name="option1"
                                value="something"
                                checked
                              />
                              Not seen before
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label" for="check1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="check1"
                                name="option1"
                                value="something"
                                checked
                              />
                              Gotten wrong before
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label" for="check1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="check1"
                                name="option1"
                                value="something"
                                checked
                              />
                              All questions
                            </label>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-4">
                        <b>Number of Questions</b>
                        <br />
                        <form>
                          <div className="form-group">
                            <select
                              className="form-control"
                              id="sel1"
                              name="sellist1"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-4">
                        <b>Length of test</b>
                        <form>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="30"
                            />
                          </div>
                          <b>Minutes</b>
                        </form>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-red btn-width-250 white">
                        {" "}
                        Start
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="btn secondary_btn btn-width-250"
                        onClick={this.previousAttempts}
                      >
                        View previous attempts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className={
                this.state.CourseType == 0
                  ? "show modal-content custom-modalcourse-width"
                  : "hide"
              }
            >
              <div className={"modal-body zero_padding" + this.state.at_mode}>
                {/* start-course-model */}
                <div
                  className={this.state.viewCourseModel + " start-course-model"}
                >
                  <div className="modal-course-name text-center bg-white">
                    <div className="lrp-65">
                      <div className="lrp-15 d-flex justify-content-center">
                        <h3 className="lrp-30 bg-white fs-32 bm-0">
                          Select Mode
                        </h3>
                      </div>

                      <div className="text-line" style={{}} />
                    </div>
                  </div>
                  <div className="container p-coursemodal bp-0">
                    <div className="d-flex justify-content-center">
                      <br />
                      <p className="fs-22 ">
                        Choose how you want to start practice your knowledge.
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="p-15">
                        <div
                          className="mode-card box_shadow text-center pointer"
                          onClick={() => this.showQPFilters(1)}
                        >
                          {/* <img
                            className="p-30 h-225p"
                            src={require("../assets/image/Group-4276.png")}
                          /> */}
                          <h3>Revision Mode</h3>
                          <p>
                            This mode helps you to go through all the questions
                            in a revision centered manner
                          </p>
                        </div>
                      </div>
                      <div className="p-15">
                        <div
                          className="mode-card box_shadow text-center pointer"
                          onClick={() => this.showQPFilters(2)}
                        >
                          {/* <img
                            className="p-30 h-225p"
                            src={require("../assets/image/Group-4281.png")}
                          /> */}
                          <h3>Mock Exam Mode</h3>
                          <p>
                            Mock Exam Mode allows for an actual exam like
                            experience so you can prepare for what's to come
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div className={"modal-body zero_padding" + this.state.filterBox}>
                {/* start-course-model */}
                <div
                  className={this.state.viewCourseModel + " start-course-model"}
                >
                  <div className="modal-course-name text-center bg-white">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="row ">
                            {/* <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp; */}
                            <span
                              className="text_cyan pointer"
                              style={{ marginLeft: "30px", marginTop: " 10px" }}
                              onClick={() => this.goBack(1)}
                            >
                              {" "}
                              <i class="fa  fa-angle-left fa-lg " /> &nbsp; Go
                              back
                            </span>
                            {/* <span
                              className="tm-4 clr_cyan pointer"
                            >
                              <i
                                className="fa fa-angle-left  fa-2x"
                                aria-hidden="true"
                              />{" "}
                            </span> */}
                          </div>
                        </div>
                        <div className="col-md-8 lrp-0">
                          <div className="">
                            <div className="lrp-15 d-flex justify-content-center">
                              <h3 className="lrp-30 bg-white fs-32 bm-0">
                                {" "}
                                {this.state.QPMode == 1
                                  ? "Revision "
                                  : this.state.QPMode == 2
                                  ? "Mock Exam"
                                  : ""}{" "}
                                Mode
                              </h3>
                            </div>

                            <div className="text-line" style={{}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container p-coursemodal pt-0">
                    {/* <div className="text-center">
                      Select the number of question to
                      <br />
                      <b>STRAT REVISION</b>
                    </div>
                    <br /> */}
                    <div className="col-sm-12">
                      {/* {this.state.QPMode == 1 ? (
                      
                      ) : (
                        ""
                      )}{" "} */}
                      <div className="text-center">
                        <h3 className="lrp-50 bg-white fs-50 clr-blue bm-0">
                          {this.state.total_question}
                        </h3>
                        <span className="fs-14">Total Questions</span>
                      </div>
                      <br />
                      <div className="accordion-group bb-0">
                        <div className="accordion-heading bb-0">
                          <a
                            className="accordion-toggle bb-0 noTextDecor"
                            data-toggle="collapse"
                            data-parent="toggle"
                            href="#filters"
                            onClick={this.toggleArrow}
                          >
                            <span className="fs-14 bold">
                              {" "}
                              <i className="fa fa-filter fa-lg" />
                              &nbsp; Filters
                              <i
                                style={{ marginTop: "5px" }}
                                className={
                                  this.state.arrowProp + " fa-lg float-right"
                                }
                              />
                            </span>{" "}
                            |{" "}
                            <span className="fs-12 text_grey">
                              Apply filters to coustomize your session.{" "}
                            </span>
                          </a>
                        </div>
                        <div id="filters" className="collapse w-100 show">
                          <div className="accordion-body bg-grey faq-body in ">
                            <div className="accordion-inner">
                              <div className="col-md-12">
                                <div className="row lrm-0">
                                  {this.state.QPMode == 1 ? (
                                    <div className="col">
                                      <div className="row">
                                        <div className="filters-dash" />
                                        <div>
                                          {" "}
                                          &nbsp;&nbsp;
                                          <span className="text_grey pb-10 fs-14">
                                            Question Types{" "}
                                          </span>
                                        </div>
                                      </div>

                                      <form className="ptb-10 lrp-15">
                                        <div className="form-check-inline">
                                          <label
                                            className="form-check-label fs-12"
                                            for="allf"
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="allf"
                                              name="option1"
                                              value="allf"
                                              onChange={event =>
                                                this.toggleCheck(0, "qt", 1)
                                              }
                                              checked={
                                                this.state.filter["qt"].indexOf(
                                                  0
                                                ) > -1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            &nbsp; All
                                          </label>
                                        </div>
                                        <br />
                                        <div className="form-check-inline">
                                          <label
                                            className="form-check-label fs-12"
                                            for="sba"
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="sba"
                                              name="option1"
                                              value="1"
                                              onChange={event =>
                                                this.toggleCheck(1, "qt", 1)
                                              }
                                              checked={
                                                this.state.filter["qt"].indexOf(
                                                  1
                                                ) > -1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            &nbsp; SBA's (Single Best Answer)
                                          </label>
                                        </div>
                                        <br />
                                        <div className="form-check-inline">
                                          <label
                                            className="form-check-label fs-12"
                                            for="mcq"
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="mcq"
                                              name="option1"
                                              value="2"
                                              onChange={event =>
                                                this.toggleCheck(2, "qt", 1)
                                              }
                                              checked={
                                                this.state.filter["qt"].indexOf(
                                                  2
                                                ) > -1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            &nbsp; MCQ's (Multiple Choice)
                                          </label>
                                        </div>
                                        <br />
                                        <div className="form-check-inline">
                                          <label
                                            className="form-check-label fs-12"
                                            for="emq"
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="emq"
                                              name="option1"
                                              value="3"
                                              onChange={event =>
                                                this.toggleCheck(3, "qt", 1)
                                              }
                                              checked={
                                                this.state.filter["qt"].indexOf(
                                                  3
                                                ) > -1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            &nbsp;EMQ's (Extended Matching
                                            Questions)
                                          </label>
                                        </div>{" "}
                                        <br />
                                        <div className="form-check-inline">
                                          <label
                                            className="form-check-label fs-12 "
                                            for="tf"
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              id="tf"
                                              name="option1"
                                              value="4"
                                              onChange={event =>
                                                this.toggleCheck(4, "qt", 1)
                                              }
                                              checked={
                                                this.state.filter["qt"].indexOf(
                                                  4
                                                ) > -1
                                                  ? true
                                                  : false
                                              }
                                            />
                                            &nbsp; True/False (True/False)
                                          </label>
                                        </div>
                                      </form>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div className="col-md-4">
                                    <div className="row">
                                      <div className="filters-dash" />
                                      <div>
                                        &nbsp;&nbsp;
                                        <span className="text_grey pb-10 fs-14">
                                          With Questions{" "}
                                        </span>
                                      </div>
                                    </div>

                                    <form className="ptb-10 lrp-15">
                                      <div className="form-check">
                                        <label
                                          className="form-check-label fs-12"
                                          for="allf1"
                                        >
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="allf1"
                                            name="option1"
                                            value="allf1"
                                            onChange={event =>
                                              this.toggleCheck(0, "others", 1)
                                            }
                                            checked={
                                              this.state.filter[
                                                "others"
                                              ].indexOf(0) > -1
                                                ? true
                                                : false
                                            }
                                            disabled={
                                              this.state.userInsights == null
                                                ? true
                                                : false
                                            }
                                          />
                                          All Questions{" "}
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <label
                                          className="form-check-label fs-12"
                                          for="notattempted"
                                        >
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="notattempted"
                                            name="notattempted"
                                            value="notattempted"
                                            onChange={event =>
                                              this.toggleCheck(3, "others", 1)
                                            }
                                            checked={
                                              this.state.filter[
                                                "others"
                                              ].indexOf(3) > -1
                                                ? true
                                                : false
                                            }
                                            disabled={
                                              this.state.userInsights == null
                                                ? true
                                                : false
                                            }
                                          />
                                          Not seen before
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <label
                                          className="form-check-label fs-12"
                                          for="incorrect"
                                        >
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="incorrect"
                                            name="option1"
                                            value="incorrect"
                                            onChange={event =>
                                              this.toggleCheck(2, "others", 1)
                                            }
                                            checked={
                                              this.state.filter[
                                                "others"
                                              ].indexOf(2) > -1
                                                ? true
                                                : false
                                            }
                                            disabled={
                                              this.state.userInsights == null
                                                ? true
                                                : false
                                            }
                                          />
                                          Gotten wrong before
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <label
                                          className="form-check-label fs-12"
                                          for="attempted"
                                        >
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="attempted"
                                            name="option1"
                                            value="attempted"
                                            onChange={event =>
                                              this.toggleCheck(1, "others", 1)
                                            }
                                            checked={
                                              this.state.filter[
                                                "others"
                                              ].indexOf(1) > -1
                                                ? true
                                                : false
                                            }
                                            disabled={
                                              this.state.userInsights == null
                                                ? true
                                                : false
                                            }
                                          />
                                          Attempted Previously{" "}
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                  {this.state.QPMode == 2 ? (
                                    <React.Fragment>
                                      <div className="col-md-4">
                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="filters-dash" />
                                            <div>
                                              {" "}
                                              &nbsp;&nbsp;
                                              <span className="text_grey pb-10 fs-14 ">
                                                Number of Questions{" "}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="lrp-15 ptb-10 bp-0">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control fs-12"
                                                placeholder="Number of Questions"
                                                value={this.state.qMark}
                                                onChange={event =>
                                                  this.setState(
                                                    byPropKey(
                                                      "qMark",
                                                      event.target.value
                                                    )
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="filters-dash" />
                                            <div>
                                              {" "}
                                              &nbsp;&nbsp;
                                              <span className="text_grey pb-10 fs-14">
                                                Duration (min){" "}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="lrp-15 ptb-10 ">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control fs-12"
                                                placeholder="Duration"
                                                value={this.state.testTime}
                                                onChange={event =>
                                                  this.setState(
                                                    byPropKey(
                                                      "testTime",
                                                      event.target.value
                                                    )
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>{" "}
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )}
                                  {this.state.years.length > 0 ? (
                                    <div className="col-md-4">
                                      <div className="row">
                                        <div className="filters-dash" />
                                        <div>
                                          {" "}
                                          &nbsp;&nbsp;
                                          <span className="text_grey pb-10 fs-14">
                                            Select Year{" "}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="lrp-15 ptb-10">
                                        <div class="form-group">
                                          <CreatableSelect
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={this.state.years}
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="row ">
                        {this.state.courseData == null
                          ? ""
                          : Object.keys(this.state.courseData).map(key => (
                              <div
                                className="col ptb-10"
                                key={key}
                                // onClick={() => this.toggleCheck("", key, 3)}
                              >
                                {" "}
                                <div
                                  className="bg-grey course-instruction"
                                  // className={
                                  //   this.state.revisionPapers[key] ==
                                  //     undefined ||
                                  //   this.state.revisionPapers[key] == {}
                                  //     ? "bg-grey course-instruction selected-paper"
                                  //     : "bg-grey course-instruction"
                                  // }
                                >
                                  <div className="col-md-12  lrp-0">
                                    <h3 className="fs-14">
                                      {this.state.courseData[key].topicName}
                                    </h3>
                                  </div>

                                  <p className="bm-0">
                                    <div className="form-check ">
                                      <label
                                        className="form-check-label fs-12"
                                        for={key}
                                      >
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={key}
                                          name={key}
                                          value={key}
                                          onChange={event =>
                                            this.toggleCheck(0, key, 0)
                                          }
                                          checked={
                                            this.state.revisionPapers[key] !=
                                            undefined
                                              ? Object.keys(
                                                  this.state.revisionPapers[key]
                                                ).length ==
                                                Object.keys(
                                                  this.state.courseData[key][
                                                    "topics"
                                                  ]
                                                ).length
                                                ? true
                                                : false
                                              : false
                                          }
                                        />
                                        All
                                      </label>
                                    </div>
                                    {Object.keys(
                                      this.state.courseData[key].topics
                                    ).map(c => (
                                      <div className="form-check">
                                        <label
                                          className="form-check-label fs-12"
                                          for={key + c}
                                        >
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={key + c}
                                            name={key + c + "option1"}
                                            value={key + c}
                                            onChange={event =>
                                              this.toggleCheck(c, key, 0)
                                            }
                                            checked={
                                              this.state.revisionPapers[key] !=
                                              undefined
                                                ? this.state.revisionPapers[
                                                    key
                                                  ][c] == undefined ||
                                                  this.state.revisionPapers[
                                                    key
                                                  ][c] == {}
                                                  ? false
                                                  : true
                                                : false
                                            }
                                          />
                                          {this.state.courseData[key].topics[c]
                                            .examDetails != null
                                            ? this.state.courseData[key].topics[
                                                c
                                              ].examDetails.title.split(
                                                "/"
                                              )[1] != undefined
                                              ? this.state.courseData[
                                                  key
                                                ].topics[
                                                  c
                                                ].examDetails.title.split(
                                                  "/"
                                                )[1]
                                              : this.state.courseData[key]
                                                  .topics[c].examDetails.title
                                            : ""}
                                          &nbsp;
                                          {this.state.dataCount != null &&
                                          this.state.dataCount[key] !=
                                            undefined &&
                                          this.state.dataCount[key][c] !=
                                            undefined ? (
                                            <b>
                                              ({this.state.dataCount[key][c]})
                                            </b>
                                          ) : Object.keys(this.state.filter.qt)
                                              .length == 5 &&
                                            Object.keys(
                                              this.state.selectedOption
                                            ).length == 0 &&
                                            (Object.keys(
                                              this.state.filter.others
                                            ).length == 0 ||
                                              Object.keys(
                                                this.state.filter.others
                                              ).length == 4) ? (
                                            <b>
                                              (
                                              {
                                                Object.keys(
                                                  this.state.courseData[key]
                                                    .topics[c].exam
                                                ).length
                                              }
                                              )
                                            </b>
                                          ) : (
                                            <b>(0)</b>
                                          )}
                                        </label>
                                      </div>
                                    ))}
                                  </p>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                    <hr className="tm-0" />

                    <div className="d-flex justify-content-center">
                      {/* <Link
                          onClick={this.handleClick}
                          to={{
                            pathname: "/questions",
                            state: {
                              AttemptKey: this.state.attempt_Key,
                              type: 0,
                              filters: this.state.filter,
                              data: this.state.revisionPapers,
                              courseId: this.state.courseId,
                              courseType: 0
                            }
                          }}
                        > */}
                      {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                      <button
                        className="btn btn-red btn-width-250 white"
                        onClick={this.handleClick}
                        disabled={this.state.total_question == 0 ? true : false}
                      >
                        {" "}
                        Start
                      </button>
                      {/* </Link> */}
                      &nbsp;&nbsp;
                      <button
                        className="btn secondary_btn btn-width-250"
                        onClick={this.previousAttempts}
                      >
                        View previous attempts
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    this.state.viewPreviousAttempts +
                    " previous-attempt-course-model"
                  }
                >
                  <div className="modal-course-name text-center bg-white">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="row ">
                            {/* <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp; */}
                            <span
                              className="text_cyan pointer"
                              style={{ marginLeft: "30px", marginTop: " 10px" }}
                              onClick={() => this.goBack(0)}
                            >
                              {" "}
                              <i class="fa  fa-angle-left fa-lg " /> &nbsp; Go
                              back
                            </span>
                            {/* <span
                              className="tm-4 clr_cyan pointer"
                            >
                              <i
                                className="fa fa-angle-left  fa-2x"
                                aria-hidden="true"
                              />{" "}
                            </span> */}
                          </div>
                        </div>
                        <div className="col-md-8 lrp-0">
                          <div className="">
                            <div className="lrp-15 d-flex justify-content-center">
                              <h3 className="lrp-30 bg-white fs-32 bm-0">
                                Previous Attempts
                              </h3>
                            </div>

                            <div className="text-line" style={{}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="col-md-10 ">
                      <div className="row p-20">
                        <div className="col-md-9 ">
                          <div className="">Previous Attempts </div>
                        </div>
                        <div className="col-md-3 vertical-line">Date</div>
                      </div>
                      <div className="bg-grey p-10">
                        {this.state.examAtempts == null
                          ? ""
                          : Object.keys(this.state.examAtempts).map(key => (
                              <div
                                className={
                                  this.state.attempt_Key == key
                                    ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                                    : "row  lrm-0 previous-attempts-div pointer"
                                }
                                onClick={() => this.selectedAttempt(key)}
                              >
                                <div className="col-md-9 ">
                                  <div className="">
                                    {this.state.examAtempts[key].title}
                                  </div>
                                </div>
                                <div className="col-md-3 vertical-line">
                                  {this.state.examAtempts[key].DateCreated !=
                                  undefined
                                    ? this.state.examAtempts[
                                        key
                                      ].DateCreated.replace("T", " ").replace(
                                        "Z",
                                        ""
                                      )
                                    : ""}
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="row p-20 d-flex justify-content-center">
                    <Link
                      to={{
                        pathname: "/questions",
                        state: {
                          AttemptKey: this.state.attempt_Key,
                          data: this.state.attemptData,
                          type: 1,
                          subType: this.state.QPMode,
                          timer: this.state.attemptTime,
                          qMark: this.state.qMark,

                          courseId: this.state.courseId,
                          courseType: this.state.CourseType,
                          userId: this.props.userId
                        }
                      }}
                    >
                      {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                      <button
                        onClick={this.loadAttempt1}
                        className="btn sub_btn fix_width_btn_lg"
                        disabled={this.state.attemptData == null ? true : false}
                      >
                        {" "}
                        Load selected attempt
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.CourseType == 1
                  ? "show modal-content custom-modalcourse-width"
                  : "hide"
              }
            >
              <div className="modal-body zero_padding">
                {/* start-course-model */}
                <div
                  className={this.state.viewCourseModel + " start-course-model"}
                >
                  <div className="modal-course-name text-center bg-white">
                    <div className="lrp-65">
                      <div className="lrp-15 d-flex justify-content-center">
                        <h3 className="lrp-30 bg-white fs-32 bm-0">
                          {this.state.papers != null &&
                          this.state.paperKey != undefined &&
                          this.state.papers[this.state.sectionKey]["topics"][
                            this.state.paperKey
                          ]
                            ? this.state.papers[this.state.sectionKey][
                                "topics"
                              ][this.state.paperKey].examDetails.title
                            : ""}{" "}
                        </h3>
                      </div>

                      <div className="text-line" style={{}} />
                    </div>
                  </div>
                  <div className="container p-coursemodal">
                    <div className="col-md-12 ptb-20">
                      {this.state.papers != null &&
                      this.state.paperKey != undefined &&
                      this.state.papers[this.state.sectionKey]["topics"][
                        this.state.paperKey
                      ] ? (
                        <React.Fragment>
                          <p className="bm-0">
                            {
                              this.state.papers[this.state.sectionKey][
                                "topics"
                              ][this.state.paperKey].examDetails.info
                            }{" "}
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-flex justify-content-center tm-10 ">
                      <div className="col-md-9 bg-grey course-instruction text-center">
                        <div className="row">
                          {this.state.papers != null &&
                          this.state.paperKey != undefined &&
                          this.state.papers[this.state.sectionKey]["topics"][
                            this.state.paperKey
                          ] ? (
                            <React.Fragment>
                              <div className="col">
                                <p className="bm-0">
                                  <b>Time Allowed</b>
                                </p>
                                <p className="bm-0">
                                  {
                                    this.state.papers[this.state.sectionKey][
                                      "topics"
                                    ][this.state.paperKey].examDetails.max_time
                                  }{" "}
                                  &nbsp;Minutes
                                </p>
                              </div>

                              <div className="col">
                                <p className="bm-0">
                                  <b>Maximum Score</b>
                                </p>
                                <p className="bm-0">
                                  {
                                    this.state.papers[this.state.sectionKey][
                                      "topics"
                                    ][this.state.paperKey].examDetails.max_score
                                  }{" "}
                                  &nbsp;
                                </p>
                              </div>

                              <div className="col">
                                <p className="bm-0">
                                  <b>Passing Score</b>
                                </p>
                                <p className="bm-0">
                                  {
                                    this.state.papers[this.state.sectionKey][
                                      "topics"
                                    ][this.state.paperKey].examDetails.min_score
                                  }{" "}
                                  &nbsp;
                                </p>
                              </div>
                              <div className="col">
                                <p className="bm-0">
                                  <b>Total Questions</b>
                                </p>
                                <p className="bm-0">
                                  {this.state.papers != undefined &&
                                  this.state.paperKey != undefined &&
                                  this.state.papers[this.state.sectionKey][
                                    "topics"
                                  ][this.state.paperKey].exam != undefined ? (
                                    <React.Fragment>
                                      {
                                        Object.keys(
                                          this.state.papers[
                                            this.state.sectionKey
                                          ]["topics"][this.state.paperKey].exam
                                        ).length
                                      }
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )}
                                  &nbsp;
                                </p>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container rp-30">
                      <div className="col-md-12 ptb-20">
                        <div className="d-flex justify-content-center tm-10 ">
                          <h3 className="text-center fs-28">Instructions</h3>
                        </div>
                        {this.state.papers != null &&
                        this.state.paperKey != undefined &&
                        this.state.papers[this.state.sectionKey]["topics"][
                          this.state.paperKey
                        ] ? (
                          <React.Fragment>
                            <p
                              className="bm-0"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {
                                this.state.papers[this.state.sectionKey][
                                  "topics"
                                ][this.state.paperKey].examDetails.instructions
                              }{" "}
                            </p>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                      <Link
                        to={{
                          pathname: "/questions",
                          state: {
                            AttemptKey: this.state.attempt_Key,
                            type: 0,
                            courseId: this.state.courseId,
                            courseType: 1,
                            userId: this.props.userId,
                            data: this.state.examData,
                            paperKey: this.state.paperKey,
                            categories: this.state.categories,
                            sectionName: this.state.sectionName,
                            sectionKey: this.state.sectionKey
                          }
                        }}
                        data-href
                      >
                        {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                        <button className="btn btn-red btn-width-250 white">
                          {" "}
                          Start
                        </button>
                      </Link>
                      &nbsp;&nbsp;
                      <button
                        className="btn secondary_btn btn-width-250"
                        onClick={this.previousAttempts}
                      >
                        View previous attempts
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    this.state.viewPreviousAttempts +
                    " previous-attempt-course-model"
                  }
                >
                  {/* <div className="modal-course-name text-center">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="white col-md-2">
                          <div className="row">
                            <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              className="tm-4"
                              onClick={() => this.goBack(0)}
                            >
                              {" "}
                              <b>Go back</b>
                            </span>
                          </div>
                        </div>
                        
                        <div className="col-md-8">
                          <h4 className="white">P</h4>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="modal-course-name text-center bg-white">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="row ">
                            {/* <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp; */}
                            <span
                              className="text_cyan pointer"
                              style={{ marginLeft: "30px", marginTop: " 10px" }}
                              onClick={() => this.goBack(0)}
                            >
                              {" "}
                              <i class="fa  fa-angle-left fa-lg " /> &nbsp; Go
                              back
                            </span>
                            {/* <span
                              className="tm-4 clr_cyan pointer"
                            >
                              <i
                                className="fa fa-angle-left  fa-2x"
                                aria-hidden="true"
                              />{" "}
                            </span> */}
                          </div>
                        </div>
                        <div className="col-md-8 lrp-0">
                          <div className="">
                            <div className="lrp-15 d-flex justify-content-center">
                              <h3 className="lrp-30 bg-white fs-32 bm-0">
                                Previous Attempts
                              </h3>
                            </div>

                            <div className="text-line" style={{}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="col lrp-50 ">
                      <div className="row p-20">
                        <div className="col-md-9 ">
                          <div className="">Previous Attempts </div>
                        </div>
                        <div className="col-md-3 vertical-line">Date</div>
                      </div>
                      <div
                        className="bg-grey p-10"
                        style={{ borderRadius: "7px" }}
                      >
                        {this.state.examAtempts == null
                          ? "No previous attempts"
                          : Object.keys(this.state.examAtempts).map(key =>
                              this.state.paperKey == null ||
                              this.state.paperKey == undefined ? (
                                <div
                                  className={
                                    this.state.attempt_Key == key
                                      ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                                      : "row  lrm-0 previous-attempts-div pointer"
                                  }
                                  onClick={() => this.selectedAttempt(key)}
                                >
                                  <div className="col-md-9 ">
                                    <div className="">
                                      {this.state.examAtempts[key].title}
                                    </div>
                                  </div>
                                  <div className="col-md-3 vertical-line">
                                    {this.state.examAtempts[key].DateCreated !=
                                    undefined
                                      ? this.state.examAtempts[
                                          key
                                        ].DateCreated.replace("T", " ").replace(
                                          "Z",
                                          ""
                                        )
                                      : ""}
                                  </div>
                                </div>
                              ) : this.state.examAtempts[key].paperKey ==
                                this.state.paperKey ? (
                                <div
                                  //className="row  previous-attempts-div pointer lrm-0"
                                  className={
                                    this.state.attempt_Key == key
                                      ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                                      : "row  lrm-0 previous-attempts-div pointer"
                                  }
                                  onClick={() => this.selectedAttempt(key)}
                                >
                                  <div className="col-md-9 ">
                                    <div className="">
                                      {this.state.examAtempts[key].title}
                                    </div>
                                  </div>
                                  <div className="col-md-3 vertical-line">
                                    {this.state.examAtempts[
                                      key
                                    ].DateCreated.replace("T", " ").replace(
                                      "Z",
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                      </div>
                    </div>
                  </div>
                  <div className="row p-20 d-flex justify-content-center">
                    <Link
                      to={{
                        pathname: "/questions",
                        state: {
                          AttemptKey: this.state.attempt_Key,
                          data: this.state.attemptData,
                          type: 1,
                          subType: this.state.QPMode,
                          timer: this.state.attemptTime,
                          qMark: this.state.qMark,

                          courseId: this.state.courseId,
                          courseType: this.state.CourseType,
                          userId: this.props.userId
                        }
                      }}
                    >
                      {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                      <button
                        onClick={this.loadAttempt1}
                        className="btn sub_btn fix_width_btn_lg"
                        disabled={this.state.attemptData == null ? true : false}
                      >
                        {" "}
                        Load selected attempt
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.CourseType == 2
                  ? "show modal-content custom-modalcourse-width"
                  : "hide"
              }
            >
              <div className="modal-body zero_padding">
                {/* start-course-model */}
                <div
                  className={this.state.viewCourseModel + " start-course-model"}
                >
                  <div className="modal-course-name text-center bg-white">
                    <h4> asd sad ss</h4>
                  </div>
                  <div className="container p-coursemodal">
                    <div className="col-md-12 ptb-20">
                      {this.state.papers != null &&
                      this.state.paperKey != undefined &&
                      this.state.papers[this.state.sectionKey]["topics"][
                        this.state.paperKey
                      ] ? (
                        <React.Fragment>
                          <p className="bm-0">
                            {
                              this.state.papers[this.state.sectionKey][
                                "topics"
                              ][this.state.paperKey].examDetails.info
                            }{" "}
                          </p>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-flex justify-content-center tm-10 ">
                      <div className="col-md-9 bg-grey course-instruction text-center">
                        <div className="row">
                          {this.state.papers != null &&
                          this.state.paperKey != undefined &&
                          this.state.papers[this.state.sectionKey]["topics"][
                            this.state.paperKey
                          ] ? (
                            <React.Fragment>
                              <div className="col">
                                <p className="bm-0">
                                  <b>Time Allowed</b>
                                </p>
                                <p className="bm-0">
                                  {this.state.papers[this.state.sectionKey][
                                    "topics"
                                  ][this.state.paperKey].examDetails.max_time *
                                    60}{" "}
                                  &nbsp;Minutes
                                </p>
                              </div>

                              <div className="col">
                                <p className="bm-0">
                                  <b>Maximum Score</b>
                                </p>
                                <p className="bm-0">
                                  {
                                    this.state.papers[this.state.sectionKey][
                                      "topics"
                                    ][this.state.paperKey].examDetails.max_score
                                  }{" "}
                                  &nbsp;
                                </p>
                              </div>

                              <div className="col">
                                <p className="bm-0">
                                  <b>Passing Marks</b>
                                </p>
                                <p className="bm-0">
                                  {
                                    this.state.papers[this.state.sectionKey][
                                      "topics"
                                    ][this.state.paperKey].examDetails.min_score
                                  }{" "}
                                  &nbsp;
                                </p>
                              </div>
                              <div className="col">
                                <p className="bm-0">
                                  <b>Total Questions</b>
                                </p>
                                {this.state.papers != null &&
                                this.state.paperKey != undefined &&
                                this.state.papers[this.state.sectionKey][
                                  "topics"
                                ][this.state.paperKey].exam ? (
                                  <React.Fragment>
                                    {" "}
                                    <p className="bm-0">
                                      {
                                        Object.keys(
                                          this.state.papers[
                                            this.state.sectionKey
                                          ]["topics"][this.state.paperKey].exam
                                        ).length
                                      }{" "}
                                      &nbsp;
                                    </p>
                                  </React.Fragment>
                                ) : (
                                  ""
                                )}
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container rp-30">
                      <div className="col-md-12 ptb-20">
                        <div className="d-flex justify-content-center tm-10 ">
                          <h3 className="text-center fs-28">Instructions</h3>
                        </div>
                        {this.state.papers != null &&
                        this.state.paperKey != undefined &&
                        this.state.papers[this.state.sectionKey]["topics"][
                          this.state.paperKey
                        ] ? (
                          <React.Fragment>
                            <p
                              className="bm-0"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {
                                this.state.papers[this.state.sectionKey][
                                  "topics"
                                ][this.state.paperKey].examDetails.instructions
                              }{" "}
                            </p>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                      <Link
                        to={{
                          pathname: "/questions",
                          state: {
                            AttemptKey: this.state.attempt_Key,
                            type: 0,
                            courseId: this.state.courseId,
                            courseType: 1,
                            userId: this.props.userId,
                            data: this.state.examData,
                            categories: this.state.categories,

                            sectionName: this.state.sectionName,
                            paperKey: this.state.paperKey,
                            sectionKey: this.state.sectionKey
                          }
                        }}
                        data-href
                      >
                        {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                        <button className="btn btn-red btn-width-250 white">
                          {" "}
                          Start
                        </button>
                      </Link>
                      &nbsp;&nbsp;
                      <button
                        className="btn secondary_btn btn-width-250"
                        onClick={this.previousAttempts}
                      >
                        View previous attempts
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    this.state.viewPreviousAttempts +
                    " previous-attempt-course-model"
                  }
                >
                  {/* <div className="modal-course-name text-center">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="white col-md-2">
                          <div className="row">
                            <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span
                              className="tm-4"
                              onClick={() => this.goBack(0)}
                            >
                              {" "}
                              <b>Go back</b>
                            </span>
                          </div>
                        </div>
                        
                        <div className="col-md-8">
                          <h4 className="white">P</h4>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="modal-course-name text-center bg-white">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="row ">
                            {/* <span className="lp-15">
                              {" "}
                              <b>
                                <i
                                  className="fa fa-angle-left white fa-2x"
                                  aria-hidden="true"
                                />
                              </b>
                            </span>
                            &nbsp;&nbsp;&nbsp; */}
                            <span
                              className="text_cyan pointer"
                              style={{ marginLeft: "30px", marginTop: " 10px" }}
                              onClick={() => this.goBack(0)}
                            >
                              {" "}
                              <i class="fa  fa-angle-left fa-lg " /> &nbsp; Go
                              back
                            </span>
                            {/* <span
                              className="tm-4 clr_cyan pointer"
                            >
                              <i
                                className="fa fa-angle-left  fa-2x"
                                aria-hidden="true"
                              />{" "}
                            </span> */}
                          </div>
                        </div>
                        <div className="col-md-8 lrp-0">
                          <div className="">
                            <div className="lrp-15 d-flex justify-content-center">
                              <h3 className="lrp-30 bg-white fs-32 bm-0">
                                Previous Attempts
                              </h3>
                            </div>

                            <div className="text-line" style={{}} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="col lrp-50 ">
                      <div className="row p-20">
                        <div className="col-md-9 ">
                          <div className="">Previous Attempts </div>
                        </div>
                        <div className="col-md-3 vertical-line">Date</div>
                      </div>
                      <div
                        className="bg-grey p-10"
                        style={{ borderRadius: "7px" }}
                      >
                        {this.state.examAtempts == null
                          ? "No previous attempts"
                          : Object.keys(this.state.examAtempts).map(key =>
                              this.state.paperKey == null ||
                              this.state.paperKey == undefined ? (
                                <div
                                  className={
                                    this.state.attempt_Key == key
                                      ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                                      : "row  lrm-0 previous-attempts-div pointer"
                                  }
                                  onClick={() => this.selectedAttempt(key)}
                                >
                                  <div className="col-md-9 ">
                                    <div className="">
                                      {this.state.examAtempts[key].title}
                                    </div>
                                  </div>
                                  <div className="col-md-3 vertical-line">
                                    {this.state.examAtempts[key].DateCreated !=
                                    undefined
                                      ? this.state.examAtempts[
                                          key
                                        ].DateCreated.replace("T", " ").replace(
                                          "Z",
                                          ""
                                        )
                                      : ""}
                                  </div>
                                </div>
                              ) : this.state.examAtempts[key].paperKey ==
                                this.state.paperKey ? (
                                <div
                                  //className="row  previous-attempts-div pointer lrm-0"
                                  className={
                                    this.state.attempt_Key == key
                                      ? " row  lrm-0 previous-attempts-div selected-attempt pointer"
                                      : "row  lrm-0 previous-attempts-div pointer"
                                  }
                                  onClick={() => this.selectedAttempt(key)}
                                >
                                  <div className="col-md-9 ">
                                    <div className="">
                                      {this.state.examAtempts[key].title}
                                    </div>
                                  </div>
                                  <div className="col-md-3 vertical-line">
                                    {this.state.examAtempts[
                                      key
                                    ].DateCreated.replace("T", " ").replace(
                                      "Z",
                                      ""
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )
                            )}
                      </div>
                    </div>
                  </div>
                  <div className="row p-20 d-flex justify-content-center">
                    <Link
                      to={{
                        pathname: "/questions",
                        state: {
                          AttemptKey: this.state.attempt_Key,
                          data: this.state.attemptData,
                          type: 1,
                          subType: this.state.QPMode,
                          timer: this.state.attemptTime,
                          qMark: this.state.qMark,

                          courseId: this.state.courseId,
                          courseType: this.state.CourseType,
                          userId: this.props.userId
                        }
                      }}
                    >
                      {/* <Link to="/questions" params={{ testvalue: "hello" }}> */}
                      <button
                        onClick={this.loadAttempt1}
                        className="btn sub_btn fix_width_btn_lg"
                        disabled={this.state.attemptData == null ? true : false}
                      >
                        {" "}
                        Load selected attempt
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {/* ): ("")} */}
        </div>
        <React.Fragment>
          <br></br>
          <div
            className={
              this.state.isLearning || this.state.isQuiz
                ? "col course-book show-block lrp-0"
                : " hide "
            }
          >
            <div className="row lrm-0">
              {this.state.cc ? (
                <div
                  className={
                    this.state.fullScreen
                      ? " col-md-3 lrp-0 wp-50"
                      : " col-md-3 lrp-0 w-300"
                  }
                >
                  {this.state.fullScreen ? (
                    <div
                      className="fullscreen pointer"
                      onClick={this.goFullScreen}
                    >
                      <i class="fa fa-angle-right fa-lg"></i>{" "}
                    </div>
                  ) : (
                    <div
                      className="fullscreen pointer"
                      onClick={this.goFullScreen}
                    >
                      {/* <i class="fa fa-expand fa-lg"></i> */}
                      <i class="fa fa-angle-left fa-lg"></i>{" "}
                    </div>
                  )}
                  <div
                    className={
                      this.state.fullScreen
                        ? "sidebar-course wp-hide"
                        : "sidebar-course"
                    }
                  >
                    {/* content={this.state.content}
          courseType={this.state.CourseType}
          selectSection={this.selectSection}
          selectContentPaper={this.select_Paper_content} */}
                    <SidebarCourse
                      keyOffset={"cc"}
                      sectionKey={this.state.sectionKey}
                      sectionName={this.state.sectionName}
                      content={this.state.sideBarContent}
                      courseType={this.state.CourseType}
                      selectSection={
                        this.state.contentOrigion == 0
                          ? this.selectSection
                          : this.selectSection_recordings
                      }
                      selectContentPaper={
                        this.state.contentOrigion == 0
                          ? this.select_Paper_content
                          : this.select_Paper_content_live
                      }
                      id={this.state.courseId}
                      userId={this.props.userId}
                    ></SidebarCourse>
                  </div>
                  {/* {this.state.cc} */}
                </div>
              ) : (
                ""
              )}
              {this.state.isLearning ? (
                this.state.renderBook ? (
                  <CourseBook
                    examData={this.state.examData}
                    cc={this.state.cc}
                    goFullScreen={this.goFullScreen}
                    fullScreen={this.state.fullScreen}
                  />
                ) : null
              ) : this.state.isQuiz ? (
                <QuizBook
                  examData={this.state.examData}
                  cc={this.state.cc}
                  goFullScreen={this.goFullScreen}
                  fullScreen={this.state.fullScreen}
                  data={{
                    AttemptKey: this.state.attempt_Key,
                    type: 0,
                    filters: this.state.filter,
                    data: this.state.examData,
                    courseId: this.state.courseId,
                    subType: this.state.QPMode,

                    timer: this.state.testTime,
                    qMark: this.state.qMark,
                    courseType: 2,
                    userId: this.props.userId
                  }}
                />
              ) : null}
            </div>
            <hr></hr>
          </div>
        </React.Fragment>
        {!this.state.isLearning && !this.state.isQuiz ? (
          <React.Fragment>
            <div className="mycourse_slider top-fix">
              <div className="container ">
                <div className="col-md-12 ">
                  <div className="row ">
                    <div className="col-md-4 media_box media_box_adjust">
                      {this.state.overview == null ? (
                        ""
                      ) : (
                        <img
                          src={this.state.overview.media.Image}
                          className="border-5"
                          alt="featured image"
                          height="250"
                          width="100%"
                        />
                      )}
                    </div>

                    <div className="col-md-8 title_box_adjust ptb-50 white_clr ">
                      {this.state.overview !== null ? (
                        <h3>{this.state.overview.Title}</h3>
                      ) : (
                        ""
                      )}
                      {this.state.overview !== null ? (
                        <Ratings
                          courseId={this.state.courseId}
                          userId={this.props.userId}
                          readonly={false}
                          textWhite={true}
                        />
                      ) : (
                        ""
                      )}
                      <br />
                      <div className="col-md-8 lrp-0">
                        {this.state.CourseType != 2 ? (
                          <div className="col-md-4 lrp-0">
                            <button
                              className=" btn red_btn fs-13 course_start-btn"
                              disabled={
                                (this.state.paperKey == undefined ||
                                  this.state.paperKey == null) &&
                                this.state.CourseType == 1
                                  ? true
                                  : false
                              }
                              onClick={this.onOpenModal}
                            >
                              {" "}
                              <a className="text-white">Start </a>
                            </button>
                          </div>
                        ) : (
                          <div className="col-md-4 lrp-0">
                            <button
                              className=" btn red_btn fs-13 course_start-btn"
                              disabled={
                                (this.state.paperKey == undefined ||
                                  this.state.paperKey == null) &&
                                this.state.CourseType == 1
                                  ? true
                                  : false
                              }
                              onClick={this.startCourse}
                            >
                              {" "}
                              <a className="text-white">Start Course</a>
                            </button>
                          </div>
                        )}

                        <br />
                        <br />
                        {this.state.CourseType > 0 ? (
                          <React.Fragment>
                            {/* <span className="white_clr text-small mb-5neg">
                  <b>10%</b> complete &nbsp; ( <b>1</b> out of <b>10</b>{" "}

                  complete )

                </span>
                <Line
                  percent="10"
                  strokeWidth="1.5"
                  trailWidth="1.5"
                  strokeColor="#44CC11"
                  className="progress-bar"
                /> */}
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
        <div className="stripe" />
        <div className="container tab-container-course  mycourse">
          {this.state.test == true ? (
            <Tabs
              items={this.getTabs()}
              selectedTabKey={this.state.selectedTabKey}
            />
          ) : (
            ""
          )}
        </div>
        <Loader showLoader={this.state.showLoader} />
      </div>
    );
  }
}

export default MyCourse;
