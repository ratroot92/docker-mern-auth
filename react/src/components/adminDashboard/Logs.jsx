import React, { Component } from "react";
import "../../assets/css/logs.css";
import AdminNav from "./AdminNav";
import AdminSidebar from "./AdminSidebar";
import Select from "react-select";
import FuzzySearch from "fuzzy-search";
import arraySort from "array-sort";

// import { db } from "../firebase/firebase";

var searcher = null;

export default class Logs extends Component {
  state = {
    logs: {},
    searchKeyword: "",
    selectedCourseType: { label: "All", value: null },
    selectedDate: { label: "Recent First", value: "rto" },
    selectedCourse: { label: "None", value: null },
    optionsDate: [
      { label: "Recent First", value: "rto" },
      { label: "Recent Last", value: "otr" }
    ],
    courseTypeOptions: [
      { label: "All", value: null },
      { label: "Practice Questions", value: 0 },
      { label: "Mock Exams", value: 1 },
      { label: "Courses", value: 2 }
    ],
    coursesOptions: []
  };

  componentDidMount() {
    // db.ref(`/paymentLogs`)
    //   .once("value")
    //   .then(snapshot => {
    //     this.removingKeys(snapshot.val());
    //   });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.logs != prevState.logs) {
      window.$("#admin-logs-table").DataTable({
        pageLength: 10
      });
    }
  }

  removingKeys = logs => {
    let logsTemp = [];
    if (logs != null || logs != undefined) {
      Object.keys(logs).map(logKey => {
        logs[logKey]["key"] = logKey;
        logsTemp.push(logs[logKey]);
      });
    }
    this.setState({ logsCopy: logsTemp, logs: logsTemp });
    searcher = new FuzzySearch(this.state.logsCopy, ["username"], {
      caseSensitive: false
    });
    logsTemp = null;
  };

  setKeyword(keyword) {
    this.setState({ searchKeyword: keyword }, () => {
      this.search();
    });
  }
  filterCourseType = selectedCourseType => {
    this.setState({ selectedCourseType }, () => {
      this.search();
    });
  };
  filterDate = selectedDate => {
    this.setState({ selectedDate }, () => {
      this.search();
    });
  };
  filterCourse = selectedCourse => {
    this.setState({ selectedCourse }, () => {
      this.search();
    });
  };

  sortByDate = result => {
    if (this.state.selectedDate.value == "rto") {
      let filtered = arraySort(result, "datePurchased", { reverse: true });
    } else {
      let filtered = arraySort(result, "datePurchased");
    }
    return result;
  };

  search = () => {
    if (this.state.selectedCourseType.value !== null) {
      const newLogs = [];
      const result = searcher.search(this.state.searchKeyword);

      for (let logKey = 0; logKey < result.length; logKey++) {
        for (
          let courseKey = 0;
          courseKey < result[logKey]["coursesPurchased"].length;
          courseKey++
        ) {
          if (
            result[logKey]["coursesPurchased"][courseKey]["type"] ===
            this.state.selectedCourseType.value
          ) {
            newLogs.push(result[logKey]);
            break;
          }
        }
      }
      const filtered = this.sortByDate(newLogs);
      this.setState({ logs: filtered });
    } else {
      const result = searcher.search(this.state.searchKeyword);
      const filtered = this.sortByDate(result);
      this.setState({ logs: filtered });
    }
  };

  render() {
    return (
      <React.Fragment>
        <AdminNav />
        <div className="col-md-12">
          <div className="row">
            <AdminSidebar />
            <div className="col lrp-50 ptb-30">
              <div className="admin-card card">
                <div className="card-body">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-7">
                          <h5 className="card-title regular_font">Logs</h5>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <table
                        id="admin-logs-table"
                        className="col-md-12 table-bordered table-hover table logs-table"
                      >
                        <thead>
                          <tr>
                            <th scope="col">Username</th>

                            <th scope="col">Price of Purchase</th>
                            <th scope="col">Course Name</th>

                            <th scope="col">Date Purchased</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {Object.keys(this.state.logs).map((itemKey, idx) => {
                            let log = this.state.logs[itemKey];
                            return (
                              <tr key={itemKey + "_" + idx}>
                                <td>{log.username}</td>
                                <td>{log.price}</td>
                                <td>
                                  {Object.keys(log.coursesPurchased).map(
                                    (courseKey, idx) => {
                                      return (
                                        <span key={courseKey}>
                                          {
                                            log.coursesPurchased[courseKey]
                                              .courseTitle
                                          }
                                          <br />
                                          <hr />
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                                <td>
                                  {new Date(log.datePurchased).toDateString()}
                                </td>
                              </tr>
                            );
                          })} */}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
