import React, { Component } from "react";
// import { db } from "../firebase/firebase";
import Loader from "../loader";
import FuzzySearch from "fuzzy-search";
import { parse } from "querystring";
import Select from "react-select";
import Unauthorized from "../Unauthorized";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import WebNotif from "../WebNotif";
import { object } from "prop-types";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var searcher = null;
var obj = new WebNotif();
class QuestionsPool extends Component {
  state = {
    // q_pool: [],
    // orignialData: [],
    // tag_options: [],
    // selectedOptionType: { value: null, label: "All" },
    // selectedOptionTag: { value: null, label: "All" },
    // optionsType: [
    //   { value: null, label: "All" },
    //   { value: "1", label: "SBA" },
    //   { value: "2", label: "MCQ" },
    //   { value: "3", label: "EMQ" },
    //   { value: "4", label: "True/False" }
    // ],
    // seletedQ: [],
    showLoader: false,
    // searchKeyword: ""
  };

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   if (
  //     !(this.props.permissions != undefined && this.props.permissions["read"])
  //   ) {
  //     this.setState({ redirect: true });
  //     return;
  //   } else {
  //     this.setState({ seletedQ: this.props.items });
  //     if (this.props.isCourse) {
  //       db.ref(`courseExams/${this.props.keyProp}`)
  //         .once("value")
  //         .then(snapshot => {
  //           if (snapshot.val() != null) {
  //             this.setState({
  //               q_pool: snapshot.val(),
  //               orignialData: snapshot.val()
  //             });
  //             if (this.props.isFree || parseInt(this.props.courseType) == 0) {
  //               this.removingKeys1(snapshot.val());
  //             } else {
  //               this.removingKeys(snapshot.val());
  //             }
  //           }
  //         });
  //     } else {
  //       db.ref(`questions`)
  //         .once("value")
  //         .then(snapshot => {
  //           this.setState({
  //             q_pool: snapshot.val(),
  //             orignialData: snapshot.val()
  //           });
  //           this.removingKeys(snapshot.val());
  //         });
  //     }
  //     db.ref(`Tags`)
  //       .once("value")
  //       .then(snapshot => {
  //         if ((snapshot.val() != null) & (snapshot.val() != undefined))
  //           var tag_options = [{ value: null, label: "All" }];
  //         snapshot.forEach(tags => {
  //           var new_option = { value: tags.key, label: tags.key };
  //           tag_options.push(new_option);
  //         });
  //         this.setState({ tag_options });
  //         this.setState({ showLoader: false });
  //       });
  //   }
  // }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ seletedQ: nextProps.items });
  // }
  // Search = keyword => {
  //   this.setState({ searchKeyword: keyword });
  //   const result = searcher.search(keyword);
  //   if (
  //     this.state.selectedOptionTag.value != null ||
  //     this.state.selectedOptionType.value != null
  //   ) {
  //     var newRes = [];
  //     for (var t = 0; t < result.length; t++) {
  //       if (
  //         this.state.selectedOptionTag.value != null &&
  //         this.state.selectedOptionType.value != null
  //       ) {
  //         if (
  //           parseInt(result[t].type) ==
  //             parseInt(this.state.selectedOptionType.value) &&
  //           result[t].tags[this.state.selectedOptionType.value] == true
  //         ) {
  //           newRes.push(result[t]);
  //         }
  //       } else if (
  //         this.state.selectedOptionTag.value != null &&
  //         this.state.selectedOptionType.value == null
  //       ) {
  //         if (result[t].tags[this.state.selectedOptionType.value] == true) {
  //           newRes.push(result[t]);
  //         }
  //       } else if (
  //         this.state.selectedOptionTag.value == null &&
  //         this.state.selectedOptionType.value != null
  //       ) {
  //         if (
  //           parseInt(result[t].type) ==
  //           parseInt(this.state.selectedOptionType.value)
  //         ) {
  //           newRes.push(result[t]);
  //         }
  //       }
  //     }
  //     this.setState({ q_pool: newRes });
  //   } else {
  //     this.setState({ q_pool: result });
  //   }
  // };
  // removingKeys = data => {
  //   var test = [];
  //   if ((data != null) & (data != undefined)) {
  //     Object.keys(data).map(key => {
  //       test.push(data[key]);
  //     });
  //     this.setState({ q_pool: test, orignialData: test });

  //     searcher = new FuzzySearch(test, ["Description"], {
  //       caseSensitive: true
  //     });
  //   }
  // };
  // removingKeys1 = data => {
  //   var test = [];
  //   if ((data != null) & (data != undefined)) {
  //     Object.keys(data).map(key => {
  //       Object.keys(data[key]["topics"]).map(key1 => {
  //         Object.keys(data[key]["topics"][key1]["exam"]).map(key2 => {
  //           test.push(data[key]["topics"][key1]["exam"][key2]);
  //         });
  //       });
  //       this.setState({ q_pool: test, orignialData: test });
  //     });
  //     searcher = new FuzzySearch(test, ["Description"], {
  //       caseSensitive: true
  //     });
  //   }
  // };
  // handleChangeType = selectedOptionType => {
  //   this.setState({ selectedOptionType }, () => {});
  // };
  // handleChangeTag = selectedOptionTag => {
  //   this.setState({ selectedOptionTag }, () => {});
  // };
  // deleteQuestion = (key, index) => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           var tags = this.state.q_pool[index].tags;
  //           var parentTag = null;
  //           var Tag = null;
  //           Object.keys(tags).map(key => {
  //             parentTag = key;
  //             Object.keys(tags[key]).map(key1 => {
  //               Tag = key1;
  //             });
  //           });
  //           db.ref("questions/" + key)
  //             .set(null)
  //             .then(c => {
  //               db.ref("Tags/" + parentTag + "/")
  //                 .once("value")
  //                 .then(snapshot => {
  //                   if (snapshot.val() != null) {
  //                     var tagObj = snapshot.val();
  //                     tagObj[Tag] = tagObj[Tag] - 1;
  //                     tagObj["All"] = tagObj["All"] - 1;
  //                     db.ref("Tags/" + parentTag).set(tagObj);
  //                   }
  //                 });
  //             });
  //           var q_pool = [...this.state.q_pool];
  //           q_pool.splice(index, 1);
  //           this.setState({ q_pool });
  //           obj.createNotification("success", "Question Deleted ");
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <div className="input-group mb-3">
              <div className="input-group-prepend col-md-4 lrp-0">
                <Select
                  className="col lrp-0"
                  // value={this.state.selectedOptionTag}
                  onChange={this.handleChangeTag}
                  options={this.state.tag_options}
                />
                <Select
                  className="col lrp-0"
                  // value={this.state.selectedOptionType}
                  onChange={this.handleChangeType}
                  options={this.state.optionsType}
                />
              </div>
              <input
                type="text"
                className="form-control"
                value={this.state.searchKeyword}
                aria-label="Text input with dropdown button"
                // onChange={event => this.Search(event.target.value)}
                // onChange={event =>
                //   this.setState(byPropKey("searchKeyword", event.target.value))
                // }
              />
              <div className="input-group-append">
                <button
                  className="input-group-text btn-purple"
                  // onClick={() => this.Search(this.state.searchKeyword)}
                >
                  <i className="fa fa-search white" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="table-responsive-sm qp-table-flow">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Questions</th>
                    <th>Type</th>
                    <th />
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.q_pool == null
                    ? ""
                    : Object.keys(this.state.q_pool).map((key, index) => (
                        <tr id={this.state.q_pool[key].key} key={key}>
                          <td>{index + 1}</td>
                          <td>{this.state.q_pool[key].Description}</td>
                          <td>
                            {this.state.q_pool[key].type == 1
                              ? "SBA"
                              : this.state.q_pool[key].type == 2
                              ? "MCQ"
                              : this.state.q_pool[key].type == 3
                              ? "EMQ"
                              : "T/F"}
                          </td>
                          {/* <td>
                        <i
                          className="fa fa-eye clr-darkpurple pointer"
                          aria-hidden="true"
                        />
                      </td> */}
                          {this.props.courseType == "1" ? (
                            <td>
                              <button
                                className="btn white    btn-red black admin-btn"
                                onClick={() =>
                                  this.props.add(
                                    this.state.q_pool[key],
                                    this.state.q_pool[key].key
                                  )
                                }
                                disabled={
                                  this.state.seletedQ.indexOf(
                                    this.state.q_pool[key].key
                                  ) != -1
                                    ? true
                                    : false
                                }
                              >
                                <i
                                  className="fa fa-plus  "
                                  aria-hidden="true"
                                />
                              </button>
                            </td>
                          ) : (
                            <td />
                          )}
                          {this.props.isFree ? (
                            <td style={{ width: "115px" }}>
                              <button
                                className="btn white    btn-red black admin-btn"
                                disabled={
                                  this.state.seletedQ.indexOf(
                                    this.state.q_pool[key].key
                                  ) != -1
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                  this.props.add(
                                    this.state.q_pool[key],
                                    this.state.q_pool[key].key
                                  )
                                }
                              >
                                {" "}
                                <i
                                  className="fa fa-plus pointer"
                                  aria-hidden="true"
                                />{" "}
                                Mark Free
                              </button>
                            </td>
                          ) : (
                            <React.Fragment>
                              <td>
                                {this.props.permissions["update"] ? (
                                  <i
                                    className="fa fa-pencil-square-o clr-darkpurple pointer"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.props.editQP(
                                        this.state.q_pool[key].key,
                                        null
                                      )
                                    }
                                  />
                                ) : (
                                  <i className="fa fa-pencil-square-o clr-darkpurple pointer disabled" />
                                )}
                              </td>
                              <td>
                                {this.props.permissions["delete"] ? (
                                  <i
                                    className="fa fa-trash clr-darkpurple pointer"
                                    aria-hidden="true"
                                    onClick={() =>
                                      this.deleteQuestion(
                                        this.state.q_pool[key].key,
                                        key
                                      )
                                    }
                                  />
                                ) : (
                                  <i
                                    className="fa fa-trash clr-darkpurple pointer disabled"
                                    aria-hidden="true"
                                  />
                                )}
                              </td>
                            </React.Fragment>
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            <Loader showLoader={this.state.showLoader} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QuestionsPool;
