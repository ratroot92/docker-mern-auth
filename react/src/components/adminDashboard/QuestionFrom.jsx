import React, { Component } from "react";
import QuestionPoolComponent from "./QuestionPoolComponent";
import QuestionList from "../QuestionList";
import AdminNav from "./AdminNav";
import Select from "react-select";
import DragCardQuestion from "../DragCardQuestion";
import QuestionsPool from "./QuestionsPool";
import { db } from "../../firebase/firebase";
import WebNotif from "../WebNotif";
const options = [];
var obj = new WebNotif();
class QuestionFrom extends Component {
  state = {
    items: [],
    newKey: "",
    isAdded: false,
    reportQuestion: false
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.qId !== null && this.props.qId !== "") {
      this.setState({ newKey: this.props.qId });
    } else {
      // this.setState({ newKey: db.ref(`questions`).push().key });
    }
  }
  // validateForm = data => {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].value == null || data[i].value == "") {
  //       obj.createNotification("error", data[i].slug + " is required");
  //       return false;
  //       break;
  //     }
  //   }
  //   return true;
  // };
  // updateTagCount = data => {
  //   Object.keys(data).map(key => {
  //     if (data[key] == true) {
  //       db.ref("Tags/" + key + "/All")
  //         .once("value")
  //         .then(tag => {
  //           var count = 0;

  //           if (tag.val() == null) {
  //             count = 0;
  //           } else if (tag.val() > 0) {
  //             count = tag.val();
  //           }
  //           db.ref("Tags/" + key + "/All").set(count + 1);
  //         });
  //     } else {
  //       Object.keys(data[key]).map(subkey => {
  //         db.ref("Tags/" + key + "/" + subkey)
  //           .once("value")
  //           .then(tag => {
  //             if (tag.val() != null) {
  //               var count = 0;
  //               if (tag.val() > 0) {
  //                 count = tag.val();
  //               }
  //               db.ref("Tags/" + key + "/" + subkey).set(count + 1);
  //             }
  //           });
  //       });
  //       db.ref("Tags/" + key + "/All")
  //         .once("value")
  //         .then(tag => {
  //           if (tag.val() != null) {
  //             var count = 0;
  //             if (tag.val() > 0) {
  //               count = tag.val();
  //             }
  //             db.ref("Tags/" + key + "/All").set(count + 1);
  //           }
  //         });
  //     }
  //   });
  // };
  // addQuestion = (
  //   year,
  //   question,
  //   answer,
  //   q_type,
  //   selectedOption,
  //   options,
  //   questionMedia,
  //   questionMediaType,
  //   qfile,
  //   answerMedia,
  //   answerMediaType,
  //   afile,
  //   ins,
  //   emq,
  //   isEdit,
  //   type
  // ) => {
  //   if (parseInt(q_type) !== 3) {
  //     if (
  //       this.validateForm([
  //         { value: q_type, slug: "Type" },
  //         { value: selectedOption, slug: "Tag" },
  //         { value: question, slug: "Question" },
  //         { value: answer, slug: "Answer" }
  //       ])
  //     ) {
  //       if (year == "" && year < 1880) {
  //         obj.createNotification("error", " Year cant be less than 1880");
  //         return;
  //       }
  //       if (year == "" && year.length > 4) {
  //         obj.createNotification("error", " Invalid Year");
  //         return;
  //       }
  //       var questionType = 1;
  //       if (questionMediaType !== null) {
  //         if (questionMediaType.indexOf("image") > -1) {
  //           questionType = 2;
  //         } else if (questionMediaType.indexOf("video") > -1) {
  //           questionType = 3;
  //         }
  //       } else {
  //         questionMedia = "";
  //         qfile = "";
  //         afile = "";
  //         answerMedia = "";
  //       }
  //       var my_json = {};
  //       var my_subjson = {};
  //       var my_option = {};
  //       var correct_ans = {};
  //       for (var i = 0; i < selectedOption.length; i++) {
  //         var keys = null;
  //         var subkeys = null;
  //         if (selectedOption[i].value.indexOf("~") == -1) {
  //           keys = selectedOption[i].value;
  //           my_json[keys] = true;
  //         } else {
  //           keys = selectedOption[i].value.split("~")[1];
  //           subkeys = selectedOption[i].value.split("~")[0];
  //           my_json[subkeys] = my_json[subkeys] ? my_json[subkeys] : {};
  //           my_json[subkeys][keys] = true;
  //           my_subjson[subkeys] = true;
  //         }
  //       }
  //       for (var i = 0; i < options.length - 1; i++) {
  //         var opt_val = options[i].text;
  //         var opt_answer = options[i].value;
  //         // if (
  //         //   this.validateForm([{ value: options[i].text, slug: "Option" }]) ==
  //         //   false
  //         // ) {
  //         //   alert("ASDa");
  //         //   return;
  //         // }
  //         if (opt_answer == true) {
  //           if (
  //             this.validateForm([
  //               { value: opt_val, slug: "Correct answer value" }
  //             ]) == false
  //           ) {
  //             return;
  //           }
  //           correct_ans["option" + (i + 1)] = opt_val;
  //         }
  //         my_option["option" + (i + 1)] = opt_val;
  //       }
  //       if (Object.keys(correct_ans).length == 0) {
  //         obj.createNotification("error", " No answer selected");
  //         return;
  //       }
  //       if (Object.keys(correct_ans).length != 1 && parseInt(q_type) == 1) {
  //         obj.createNotification(
  //           "error",
  //           " SBA Question should have only one correct answer "
  //         );
  //         return;
  //       }
  //       if (this.state.newKey.length == 0) {
  //         this.setState({ newKey: db.ref(`questions`).push().key });
  //       }
  //       if (this.state.newKey.length != 0 && this.props.isCourse) {
  //         db.ref(
  //           "courseExams/" +
  //             this.props.keyProp +
  //             "/" +
  //             this.props.keyGroup.topic +
  //             "/topics/" +
  //             this.props.keyGroup.subTopic +
  //             "/exam/" +
  //             this.state.newKey
  //         )
  //           .set({
  //             key: this.state.newKey,
  //             Description: question,
  //             exp: answer,
  //             answer: correct_ans,
  //             tags: my_json,

  //             options: my_option,
  //             type: q_type,
  //             mediaType: questionType,
  //             media: questionMedia,
  //             qName: qfile,
  //             aName: afile,
  //             mediaE: answerMedia,
  //             year: year != undefined ? year : null
  //           })
  //           .then(e => {
  //             obj.createNotification("success", "Question added successfully ");
  //             if (!isEdit) {
  //               this.updateTagCount(my_json);
  //             }
  //             this.setState({ newKey: db.ref(`questions`).push().key });
  //             var items = [...this.state.items];
  //             items.push(
  //               <DragCardQuestion
  //                 q={question}
  //                 q_option={my_option}
  //                 ans={answer}
  //               />
  //             );
  //             this.setState({ items });
  //             if (type == 0) {
  //               this.props.setComp(0);
  //             } else {
  //               this.setState({ isAdded: true });
  //             }
  //           });
  //       } else {
  //         db.ref(`questions/` + this.state.newKey)
  //           .set({
  //             key: this.state.newKey,
  //             Description: question,
  //             exp: answer,
  //             answer: correct_ans,
  //             tags: my_json,
  //             options: my_option,

  //             type: q_type,
  //             mediaType: questionType,
  //             media: questionMedia,
  //             qName: qfile,
  //             aName: afile,
  //             mediaE: answerMedia,
  //             year: year != undefined ? year : null
  //           })
  //           .then(e => {
  //             obj.createNotification("success", "Question added successfully ");
  //             if (!isEdit) {
  //               this.updateTagCount(my_json);
  //             }
  //             this.setState({ newKey: db.ref(`questions`).push().key });
  //             var items = [...this.state.items];
  //             items.push(
  //               <DragCardQuestion
  //                 q={question}
  //                 q_option={my_option}
  //                 ans={answer}
  //               />
  //             );
  //             this.setState({ items });
  //             if (type == 0) {
  //               this.props.setComp(0);
  //             } else {
  //               this.setState({ isAdded: true });
  //             }
  //           });
  //       }
  //     }
  //   } else {
  //     if (
  //       this.validateForm([
  //         { value: q_type, slug: "Type" },
  //         { value: selectedOption, slug: "Tag" },
  //         { value: ins, slug: "Instruction" }
  //         // { value: answer, slug: "Answer" }
  //       ])
  //     ) {
  //       if (year == "" && year < 1880) {
  //         obj.createNotification("error", " Year cant be less than 1880");
  //         return;
  //       }
  //       if (year == "" && year.length > 4) {
  //         obj.createNotification("error", " Invalid length of year");
  //         return;
  //       }
  //       var questionType = 1;
  //       if (questionMediaType !== null) {
  //         if (questionMediaType.indexOf("image") > -1) {
  //           questionType = 2;
  //         } else if (questionMediaType.indexOf("video") > -1) {
  //           questionType = 3;
  //         }
  //       } else {
  //         questionMedia = "";
  //         qfile = "";
  //         afile = "";
  //         answerMedia = "";
  //       }
  //       var my_json = {};
  //       var my_subjson = {};
  //       var my_option = {};
  //       var correct_ans = {};
  //       for (var i = 0; i < selectedOption.length; i++) {
  //         var keys = null;
  //         var subkeys = null;
  //         if (selectedOption[i].value.indexOf("~") == -1) {
  //           keys = selectedOption[i].value;
  //           my_json[keys] = true;
  //         } else {
  //           keys = selectedOption[i].value.split("~")[1];
  //           subkeys = selectedOption[i].value.split("~")[0];
  //           my_json[subkeys] = my_json[subkeys] ? my_json[subkeys] : {};
  //           my_json[subkeys][keys] = true;
  //           my_subjson[subkeys] = true;
  //         }
  //       }
  //       for (var i = 0; i < options.length; i++) {
  //         if (options[i].text != "") {
  //           var opt_val = options[i].text;
  //           var opt_answer = options[i].value;

  //           my_option["option" + (i + 1)] = opt_val;
  //         }
  //       }

  //       if (this.state.newKey.length == 0) {
  //         this.setState({ newKey: db.ref(`questions`).push().key });
  //       }
  //       if (this.state.newKey.length != 0 && this.props.isCourse) {
  //         db.ref(
  //           "courseExams/" +
  //             this.props.keyProp +
  //             "/" +
  //             this.props.keyGroup.topic +
  //             "/topics/" +
  //             this.props.keyGroup.subTopic +
  //             "/exam/" +
  //             this.state.newKey
  //         )
  //           .set({
  //             key: this.state.newKey,
  //             Description: ins,
  //             exp: answer,
  //             emq: emq,
  //             tags: my_json,
  //             options: my_option,
  //             type: q_type,

  //             mediaType: questionType,
  //             media: questionMedia,
  //             qName: qfile,
  //             aName: afile,
  //             mediaE: answerMedia,
  //             year: year
  //           })
  //           .then(e => {
  //             obj.createNotification("success", "Question added successfully ");

  //             if (!isEdit) {
  //               this.updateTagCount(my_json);
  //             }
  //             this.setState({ newKey: db.ref(`questions`).push().key });
  //             var items = [...this.state.items];
  //             items.push(
  //               <DragCardQuestion
  //                 q={question}
  //                 q_option={my_option}
  //                 ans={answer}
  //               />
  //             );
  //             this.setState({ items });
  //             if (type == 0) {
  //               this.props.setComp(0);
  //             } else {
  //               this.setState({ isAdded: true });
  //             }
  //           });
  //       } else {
  //         db.ref(`questions/` + this.state.newKey)
  //           .set({
  //             key: this.state.newKey,
  //             Description: ins,
  //             exp: answer,
  //             emq: emq,
  //             tags: my_json,
  //             options: my_option,
  //             type: q_type,
  //             mediaType: questionType,
  //             media: questionMedia,

  //             qName: qfile,
  //             aName: afile,
  //             mediaE: answerMedia,
  //             year: year != undefined ? year : null
  //           })
  //           .then(e => {
  //             obj.createNotification("success", "Question added successfully ");

  //             if (!isEdit) {
  //               this.updateTagCount(my_json);
  //             }
  //             this.setState({ newKey: db.ref(`questions`).push().key });
  //             var items = [...this.state.items];
  //             items.push(
  //               <DragCardQuestion
  //                 q={question}
  //                 q_option={my_option}
  //                 ans={answer}
  //               />
  //             );
  //             this.setState({ items });
  //             if (type == 0) {
  //               this.props.setComp(0);
  //             } else {
  //               this.setState({ isAdded: true });
  //             }
  //           });
  //       }
  //     }
  //   }
  // };

  render() {
    return (
      <React.Fragment>
        <WebNotif />
        <div className="col-md-12">
          <div className="row">
            {/* <div className="admin-sidebar" /> */}
            <div className="col qp-table-flow" id="main">
              <section>
                <div className="lrp-20">
                  <QuestionPoolComponent
                    add_question={this.addQuestion}
                    isAdded={this.state.isAdded}
                    qId={this.props.qId}
                    feedbackStatus={
                      this.props.feedbackStatus != null
                        ? this.props.feedbackStatus
                        : null
                    }
                  />
                  <hr className="hr-2" />
                </div>

                <div></div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default QuestionFrom;
