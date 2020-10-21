import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import Unauthorized from "./Unauthorized";

const AdminRoute = ({ roleName, render: Render, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      roleName.toLowerCase() === "admin" ||
      roleName.toLowerCase() === "custom" ? (
        Render(props)
      ) : (
        <Unauthorized />
      )
    }
  />
);

const CourseRoute = ({ myCourses, render: Render, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // Render(props)
      myCourses && Object.keys(myCourses).includes(props.match.params.id) ? (
        Render(props)
      ) : (
        <Redirect to={{ pathname: "/error" }} />
      )
    }
  />
);

export { AdminRoute, CourseRoute };
