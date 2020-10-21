import React, { Component } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import AdminCourseListing from "./AdminCourseListing";
import AddCourseHome from "../AddCourseHome";
import { Redirect } from "react-router-dom";
import Unauthorized from "../Unauthorized";

import AddCourse from "./AddCourse";

class AdminHome extends Component {
  state = { currentComp: null, redirect: false };

  componentDidMount() {
    if (
      this.props.match.params.key == "new" ||
      this.props.match.params.length > 1
    ) {
      this.setState({
        currentComp: (
          <AddCourseHome
            courseType={this.props.location.state.courseType}
            permissions={this.props.location.state.permissions}
            keyProp={
              this.props.location.state !== undefined
                ? this.props.location.state.key
                : null
            }
          />
        )
      });
    } else {
      if (
        !(this.props.permissions != undefined && this.props.permissions["read"])
      ) {
        this.setState({ redirect: true });
        return;
      } else {
        this.setState({
          currentComp: (
            <AdminCourseListing
              next={this.setComp}
              permissions={this.props.permissions}
              courseType={this.props.courseType}
            />
          )
          // currentComp: <QuestionsPool />
        });
      }
    }
  }

  setComp = comp => {
    this.setState({ currentComp: comp });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
       <React.Fragment>
       <AdminNav />
       <div className="col-md-12">
         <div className="row">
           <AdminSidebar />
           <div className="col" id="main">
             <section>
               {this.state.currentComp !== null
                 ? this.state.currentComp
                 : ""}
             </section>
           </div>
         </div>
       </div>
     </React.Fragment>
 
        ) : (
          <React.Fragment>
            <AdminNav />
            <div className="col-md-12">
              <div className="row">
                <AdminSidebar />
                <div className="col" id="main">
                  <section>
                    {this.state.currentComp !== null
                      ? this.state.currentComp
                      : ""}
                  </section>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AdminHome;
