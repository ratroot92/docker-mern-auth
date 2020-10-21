import React, { Component } from "react";
import AdminNav from "./AdminNav";
import AdminCourse from "./AdminCourse";
import "../../assets/css/adminDashboard.css";

class AdminMockCourse extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AdminCourse />
      </React.Fragment>
    );
  }
}

export default AdminMockCourse;
