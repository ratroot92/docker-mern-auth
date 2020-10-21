import React, { Component } from "react";
import AddCourse from "./AddCourse";
import AdminNav from "./AdminNav";
import "../../assets/css/adminDashboard.css";

class AdminDashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {/* <AdminNav /> */}

        <div className="col-md-12">
          <div className="row">
            <div className="admin-sidebar" />
            <div className="col-md-8">
              <AddCourse />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
