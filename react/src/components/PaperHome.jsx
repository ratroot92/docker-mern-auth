// import React, { Component } from "react";
// import Papers from "./Papers";
// import AddPaper from "./AddPaper";
// import { db } from "../firebase/firebase";

// import { confirmAlert } from "react-confirm-alert"; // Import
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// var paperData = {};
// var topics = [];
// class PaperHome extends Component {
//   constructor(props) {
//     super(props);
//   }
//   state = {
//     activeComp: 0,
//     papers: {},
//     exam: null,
//     keyProp: null,
//     isEdit: false,
//     paperList: null,
//     editData: null,
//     editIndex: null
//   };
//   componentDidMount() {
//    console.log("key prop", this.props);
//     this.setState({ keyProp: this.props.keyProp });
//     if (this.props.keyProp != null || this.props.keyProp != undefined) {
//       db.ref("courseExams/" + this.props.keyProp)
//         .once("value")
//         .then(snapshot => {
//           if (snapshot.val() != null) {
//             var data = snapshot.child("paper/topics").val();
//             topics = data;
//             this.setState({ paperList: data });

//             for (var t = 0; t < data.length; t++) {
//               var papers = { ...this.state.papers };
//               papers[t] = {
//                 title: data[t].examDetails.title,
//                 key: t
//               };
//               this.setState({ papers });
//             }
//           }
//         });
//     }
//   }
//   addPaperShow = () => {
//     this.setState({ activeComp: 1, isEdit: false });
//   };
//   addPaper = data => {
//     var items = data.items;
//     var exam = [];
//     for (var q = 0; q < items.length; q++) {
//       //items[q].props.qobj["key"] = items[q].props.qid;
//       exam.push(items[q].props.qobj);
//     }
//     if (data.edit) {
//      console.log("data recieved", data);
//      console.log("edit index", this.state.editIndex);
//       topics[this.state.editIndex] = {
//         //  topicName: data.title,

//         exam: exam,
//         examDetails: {
//           max_score: 100,
//           max_time: data.duration,
//           min_score: data.minScore,
//           title: data.title,
//           info: data.info,
//           instructions: data.ins,
//           isShuffle: data.isShuffle
//         }
//       };
//       var paperList = { ...this.state.paperList };
//       paperList[this.state.editIndex]["examDetails"]["title"] = data.title;
//       this.setState({ paperList });
//       var papers = { ...this.state.papers };
//       papers[this.state.editIndex] = {
//         title: data.title,
//         key: this.state.editIndex
//       };
//       this.setState({ papers });
//     } else {
//       topics.push({
//         //  topicName: data.title,

//         exam: exam,
//         examDetails: {
//           max_score: 100,
//           max_time: data.duration,
//           min_score: data.minScore,
//           title: data.title,
//           info: data.info,
//           instructions: data.ins,
//           isShuffle: data.isShuffle
//         }
//       });
//     }

//     if (!data.edit) {
//       var papers = { ...this.state.papers };
//       papers[topics.length - 1] = { title: data.title, key: topics.length - 1 };
//       this.setState({ papers });
//     } else {
//       this.setState({
//         editData: this.state.paperList[this.state.editIndex]
//       });
//     }
//    console.log("topics", topics);
//    console.log("papers", this.state.papers);
//    console.log("paperList", this.state.paperList);
//    console.log("Key ", this.state.keyProp);
//     this.setState({ activeComp: 0 });

//     // db.ref("courseExams/" + this.state.keyProp + "/paper")
//     //   .set(paperData)
//     //   .then(e => {
//     //     alert("Data posted");
//     //     var papers = { ...this.state.papers };
//     //     papers[data.title] = { title: data.title, key: "paper" };
//     //     this.setState({ papers });
//     //     this.setState({ activeComp: 0 });
//     //   });
//   };
//   savePaper = () => {
//    console.log("topics save", topics);

//     db.ref("courses/" + this.state.keyProp + "/Title")
//       .once("value")
//       .then(titlesnapshot => {
//         paperData = {
//           topicName: titlesnapshot.val(),
//           topics: topics
//         };
//         db.ref("courseExams/" + this.state.keyProp + "/paper").set(null);
//         db.ref("courseExams/" + this.state.keyProp + "/paper")
//           .set(paperData)
//           .then(e => {
//             db.ref("courseExams/" + this.props.keyProp)
//               .once("value")
//               .then(snapshot => {
//                 if (snapshot.val() != null) {
//                   this.setState({ papers: {} });

//                   var data = snapshot.child("paper/topics").val();
//                   topics = data;
//                   this.setState({ paperList: data });

//                   for (var t = 0; t < data.length; t++) {
//                     var papers = { ...this.state.papers };
//                     papers[t] = {
//                       title: data[t].examDetails.title,
//                       key: t
//                     };
//                     this.setState({ papers });
//                   }
//                 }
//               });
//             alert("Data posted");
//             this.props.isUpdate();
//           });
//       });
//   };
//   paperEdit = index => {
//    console.log("edit index", index);
//    console.log("paperList", this.state.paperList);
//     this.setState({
//       isEdit: true,
//       activeComp: 1,
//       editIndex: index,
//       editData: this.state.paperList[index]
//     });
//   };
//   paperDelete = index => {
//     confirmAlert({
//       title: "Confirm to submit",
//       message: "Are you sure to do this.",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//            console.log("delete index", index);
//             topics.splice(index, 1);
//             var papers = { ...this.state.papers };
//             delete papers[index]; // Removes json.foo from the dictionary.
//             var paperList = { ...this.state.paperList };
//             delete paperList[index]; // Removes json.foo from the dictionary.
//             this.setState({ paperList });
//             this.setState({ papers });
//           }
//         },
//         {
//           label: "No",
//           onClick: () => {}
//         }
//       ]
//     });
//   };

//   paperClone = index => {
//     var papers = { ...this.state.papers };

//     var nextIndex = topics.length;
//     var nextTitle = papers[index].title + " clone";
//    console.log("clone from", index);
//    console.log("clone to", nextIndex);
//    console.log("topics clone ", topics);

//     topics.push(topics[index]);
//    console.log("new index push", nextIndex);
//     // topics[nextIndex]["examDetails"]["title"] = nextTitle;
//    console.log("topics clone ed", topics);

//    console.log("clone idnex", nextIndex);
//     papers[nextIndex] = {
//       title: nextTitle,
//       key: topics.length
//     };

//    console.log("papers", papers);
//    console.log("paperList", this.state.paperList);

//     this.setState({ papers });
//     // topics[index]["examDetails"]["title"] = papers[index].title;
//   };
//   render() {
//     return (
//       <React.Fragment>
//         {this.state.activeComp == 0 ? (
//           <Papers
//             addPaper={this.addPaperShow}
//             savePaper={this.savePaper}
//             papers={this.state.papers}
//             paperEdit={this.paperEdit}
//             paperDelete={this.paperDelete}
//             paperClone={this.paperClone}
//           />
//         ) : (
//           <AddPaper
//             courseType={this.props.courseType}
//             addPaper={this.addPaper}
//             isEdit={this.state.isEdit}
//             data={this.state.editData}
//           />
//         )}
//       </React.Fragment>
//     );
//   }
// }

// export default PaperHome;
