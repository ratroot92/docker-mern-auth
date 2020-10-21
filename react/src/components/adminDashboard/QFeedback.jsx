import React, { Component } from "react";
import Loader from "../loader";
import QuestionFrom from "./QuestionFrom";
import WebNotif from "../WebNotif";
// import { db } from "../firebase/firebase";
import Select from "react-select";
import Unauthorized from "../Unauthorized";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
var obj = new WebNotif();
class QFeedback extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showLoader: true,
    feedback: null,
    selectedOptionStatus: [],
    originalData: null,

    selectedOption: { value: "All", label: "All" },
    selectedOptionType: { value: "0", label: "All" },
    options: [
      { value: "All", label: "All" },
      { value: "Pending", label: "Pending" },
      { value: "Fixed", label: "Fixed" }
    ],
    optionsType: [
      { value: "0", label: "All" },
      { value: "1", label: "SBA" },
      { value: "2", label: "MCQ" },
      { value: "3", label: "EMQ" },
      { value: "4", label: "True/False" }
    ]
  };

  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref("correctionRequest")
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({
      //         feedback: snapshot.val(),
      //         originalData: snapshot.val()
      //       });
      //       var selectedOptionStatus = [];
      //       Object.keys(snapshot.val()).map(key => {
      //         if (
      //           (snapshot.val()[key].status != null) &
      //           (snapshot.val()[key].status != undefined)
      //         ) {
      //           selectedOptionStatus[key] = snapshot.val()[key].status;
      //         } else {
      //           selectedOptionStatus[key] = "Pending";
      //         }
      //       });
      //       this.setState({ selectedOptionStatus }, () => {});
      //     }

      //     this.setState({ showLoader: false });
      //   });
    }
  }
  deleteFeedback = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // db.ref("correctionRequest/" + key).set(null);
            // var feedback = { ...this.state.feedback };
            // delete feedback[key];
            // this.setState({ feedback, originalData: feedback });
            // var obj = new WebNotif();
            // obj.createNotification("success", "Feedback Deleted");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.filterResult(
        this.state.selectedOption,
        this.state.selectedOptionType
      );
    });
  };
  handleChangeType = selectedOptionType => {
    this.setState({ selectedOptionType }, () => {
      this.filterResult(
        this.state.selectedOption,
        this.state.selectedOptionType
      );
    });
  };
  filterResult = (selectedOption, selectedOptionType) => {
    var result = {};
    if ((selectedOption.label == "All") & (selectedOptionType.label == "All")) {
      this.setState({ feedback: this.state.originalData }, () => {});
    } else if (
      (selectedOption.label == "All") &
      (selectedOptionType.label != "All")
    ) {
      Object.keys(this.state.originalData).map(key => {
        if (
          parseInt(this.state.originalData[key].question.type) ==
          parseInt(selectedOptionType.value)
        ) {
          result[key] = this.state.originalData[key];
        }
      });
      this.setState({ feedback: result });
    } else if (
      (selectedOption.label != "All") &
      (selectedOptionType.label == "All")
    ) {
      Object.keys(this.state.originalData).map(key => {
        if (this.state.originalData[key].status == selectedOption.label) {
          result[key] = this.state.originalData[key];
        }
      });
      this.setState({ feedback: result });
    } else {
      Object.keys(this.state.originalData).map(key => {
        if (this.state.originalData[key].status == selectedOption.label) {
          if (
            this.state.originalData[key].question.type ==
            selectedOptionType.value
          ) {
            result[key] = this.state.originalData[key];
          }
        }
      });
      this.setState({ feedback: result });
    }
  };
  handleChangefeedback = selectedFeedbackStatus => {};
  changeStatus = (event, key) => {
    // this.setState({ value: event.target.value });
    // db.ref("correctionRequest/" + key + "/status").set(event.target.value);
    // var selectedOptionStatus = [...this.state.selectedOptionStatus];
    // selectedOptionStatus[key] = event.target.value;
    // this.setState({ selectedOptionStatus });
    // obj.createNotification("success", "Status changed successfully");
 
  };
  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <WebNotif />
            <div className="row mtb-20">
              <div className="form-group col-md-4">
                <label>
                  <b>Status</b>
                </label>
                <Select
                  // value={this.state.selectedOption}
                  // onChange={this.handleChange}
                  // options={this.state.options}
                />
              </div>
              <div className="col-md-4">
                <label>
                  <b />
                  <b>Type</b>
                </label>
                <Select
                  // value={this.state.selectedOptionType}
                  // onChange={this.handleChangeType}
                  // options={this.state.optionsType}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sr</th>
                      <th>Name</th>
                      <th>Question</th>
                      <th>Feedback</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.feedback == null ? (
                      <tr>
                        <td colSpan="4">No FeedBack Available</td>
                      </tr>
                    ) 
                    :
                     (
                    //   Object.keys(this.state.feedback).map(key => (
                    //     <tr key={key}>
                    //       <td>1</td>
                    //       <td>{this.state.feedback[key].name}</td>
                    //       <td>
                    //         {this.state.feedback[key].question.Description}
                    //       </td>
                    //       <td>{this.state.feedback[key].query}</td>
                    //       <td className="width-40p">
                    //         {/* {this.state.feedback[key].status} */}
                    //         <select
                    //           className="form-control"
                    //           onChange={event => this.changeStatus(event, key)}
                    //           value={this.state.selectedOptionStatus[key]}
                    //         >
                    //           <option value="Pending">Pending</option>
                    //           <option value="Fixed">Fixed</option>
                    //         </select>
                    //       </td>
                    //       <td>
                    //         {this.props.permissions["update"] ? (
                    //           <i
                    //             className="fa fa-external-link clr-purple pointer"
                    //             aria-hidden="true"
                    //             onClick={() =>
                    //               this.props.setComp(
                    //                 <QuestionFrom
                    //                   setComp={this.props.setComp}
                    //                   qId={this.state.feedback[key].qid}
                    //                   feedbackStatus={"pending"}
                    //                 />
                    //               )
                    //             }
                    //           />
                    //         ) : (
                    //           <i className="fa fa-external-link clr-purple pointer disabled" />
                    //         )}
                    //       </td>
                    //       <td>
                    //         {this.props.permissions["delete"] ? (
                    //           <i
                    //             className="fa fa-trash clr-purple pointer"
                    //             aria-hidden="true"
                    //             onClick={() => this.deleteFeedback(key)}
                    //           />
                    //         ) : (
                    //           <i className="fa fa-trash clr-purple pointer disabled" />
                    //         )}
                    //       </td>
                    //     </tr>
                    //   ))
                    <div></div>
                     )
                    }
                  </tbody>
                </table>
                {this.state.currentComp !== null ? this.state.currentComp : ""}
              </div>
            </div>

            {/* <Loader showLoader={this.state.showLoader} /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QFeedback;
