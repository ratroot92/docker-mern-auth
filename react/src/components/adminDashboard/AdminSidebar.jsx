import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as routes from "../../constants/routes";

class AdminSidebar extends Component {
  state = {};
  render() {
    return (
    <React.Fragment>
      <div className="sidebar-width-admin px-1 bg-gardient sidebar-admin">
        <div className=" sticky-top flex-grow-1">
          <div className="nav flex-sm-column">
            <NavLink
              to={routes.PQA}
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              PEC Courses
            </NavLink>
            <NavLink
              to={routes.MEA}
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              PEC Training
            </NavLink>
            <NavLink
              to={routes.COA}
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              Webinars
            </NavLink>
            <NavLink
              to="#"
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
             Online Courses
            </NavLink>
            <NavLink
              to="#"
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              Email Management
            </NavLink>
            <NavLink
              to="#"
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              Web Management
            </NavLink>
            <NavLink
              to="#"
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
              User Management
            </NavLink>
            <NavLink
              to="#"
              className="nav-link white"
              activeClassName="sidebar-nav-active"
            >
            Financial Management
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
 
   );
  }
}

export default AdminSidebar;

      // <React.Fragment>
      //   <div className="sidebar-width-admin px-1 bg-gardient sidebar-admin">
      //     <div className=" sticky-top flex-grow-1">
      //       <div className="nav flex-sm-column">
      //         <NavLink
      //           to={routes.PQA}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Practice Questions{" "} */}
      //           PEC Courses
      //         </NavLink>
      //         <NavLink
      //           to={routes.MEA}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Mock Exams */}
      //           PEC Training
      //         </NavLink>
      //         <NavLink
      //           to={routes.COA}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Courses{" "} */}
      //           Webinars
      //         </NavLink>
      //         <NavLink
      //           to={routes.QuestionBank}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Question Bank{" "} */}
      //           Online Courses
      //         </NavLink>
      //         <NavLink
      //           to={routes.Assignments}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Assignments{" "} */}
      //           Email Management
      //         </NavLink>

      //         <NavLink
      //           to={routes.ManageUsers}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           {/* Users */}

      //         </NavLink>
      //         <NavLink
      //           to={routes.ManageUsersCourse}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Manage User Course
      //         </NavLink>

      //         <NavLink
      //           to={routes.ManageCT}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Tags/Categories
      //         </NavLink>

      //         <NavLink
      //           to={routes.Addfaq}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           FAQ's
      //         </NavLink>
      //         <NavLink
      //           to={routes.QFeedback}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Feedback
      //         </NavLink>
      //         <NavLink
      //           to={routes.Coupons}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Coupon
      //         </NavLink>

      //         <NavLink
      //           to={routes.UserPermissions}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Access Control
      //         </NavLink>
      //         <NavLink
      //           to={routes.PermissionsTable}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Permissions Table{" "}
      //         </NavLink>
      //         <NavLink
      //           to={routes.ManageSlider}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Slider
      //         </NavLink>
      //         <NavLink
      //           to="#"
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Web View
      //         </NavLink>
      //         <NavLink
      //           to={routes.Logs}
      //           className="nav-link white"
      //           activeClassName="sidebar-nav-active"
      //         >
      //           Payment Logs
      //         </NavLink>
      //       </div>
      //     </div>
      //   </div>
      // </React.Fragment>