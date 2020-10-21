import React, { Component } from "react";
import Unauthorized from "../Unauthorized";
import Loader from "../loader";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import RoleOptions from "../RoleOptions";
import WebNotif from "../WebNotif";
import { object } from "prop-types";
// import { db } from "../firebase/firebase";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { appendFileSync } from "fs";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();
class PermissionsTable extends Component {
  state = {
    permiss: null,
    checkboxStatus: [],
    templateName: "",
    roleType: null,
    isEdit: false,
    originalData: null,
    tempKey: null
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (
      !(this.props.permissions != undefined && this.props.permissions["read"])
    ) {
      this.setState({ redirect: true });
      return;
    } else {
      // db.ref("permissions")
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({
      //         permiss: snapshot.val(),
      //         originalData: snapshot.val()
      //       });
      //     }
      //   });
      // db.ref("roleTemplate")
      //   .once("value")
      //   .then(snapshot => {
      //     if (snapshot.val() != null) {
      //       this.setState({ roleType: snapshot.val() });
      //     }
      //   });
    }
  }
  handleToggle = (key, subKey) => {
    var cs = { ...this.state.permiss };
    var checked = cs[key][subKey];
    if (checked == false) {
      cs[key][subKey] = true;
    } else {
      cs[key][subKey] = false;
    }
    this.setState({ permiss: cs });
  };
  handleToggle_deep = (key, subKey, test) => {
    var cs = { ...this.state.permiss };
    var checked = cs[key][subKey][test];
    if (checked == false) {
      cs[key][subKey][test] = true;
    } else {
      cs[key][subKey][test] = false;
    }
    this.setState({ permiss: cs });
  };
  validateForm = data => {
    var obj = new WebNotif();
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == null || data[i].value == "") {
        obj.createNotification("error", data[i].slug + " is required");
        return false;
        break;
      }
    }
    return true;
  };

  // addRole = () => {
  //   if (
  //     this.validateForm([
  //       { value: this.state.templateName, slug: "Template Name" }
  //     ])
  //   ) {
  //     var tempKey = null;
  //     if (this.state.isEdit == false) {
  //       tempKey = db.ref(`roleTemplate`).push().key;
  //       this.setState({ tempKey }, () => {});
  //     } else {
  //       tempKey = this.state.tempKey;
  //     }
  //     db.ref("roleTemplate/" + tempKey).set({
  //       role: this.state.permiss,
  //       roleName: this.state.templateName
  //     });
  //     var roleType = { ...this.state.roleType };
  //     roleType[this.state.tempKey] = {
  //       role: this.state.permiss,
  //       roleName: this.state.templateName
  //     };
  //     this.setState({
  //       roleType,
  //       templateName: "",
  //       permiss: this.state.originalData
  //     });
  //   }
  // };
  // deleteRole = key => {
  //   confirmAlert({
  //     title: "Confirm to submit",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           db.ref(`roleTemplate/` + key).set(null);
  //           var roleType = { ...this.state.roleType };
  //           delete roleType[key];
  //           this.setState({ roleType }, () => {
  //             var obj = new WebNotif();
  //             obj.createNotification("success", "Role Template Deleted");
  //           });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // };
  // editRole = key => {
  //   db.ref("roleTemplate/")
  //     .orderByChild("roleName")
  //     .equalTo(this.state.roleType[key].roleName)
  //     .once("value")
  //     .then(snapshot => {
  //       Object.keys(snapshot.val()).map(key => {
  //         this.setState(
  //           {
  //             templateName: snapshot.val()[key].roleName,
  //             permiss: snapshot.val()[key].role,
  //             isEdit: true,
  //             tempKey: key
  //           },
  //           () => {}
  //         );
  //       });
  //     });
  // };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect ? (
          <Unauthorized />
        ) : (
          <React.Fragment>
            <AdminNav />
            <WebNotif />
            <div className="col-md-12">
              <div className="row">
                <AdminSidebar />
                <br />
                <br />
                {/* <div className="row"> */}
                <div className="col lrp-50 ptb-30 ">
                  <div className="admin-card card">
                    <div className="card-body">
                      <div className=" col-md-12">
                        <div className="row">
                          <div className="col-md-8">
                            <h5 className="card-title regular_font">
                              Role Template
                            </h5>
                          </div>
                          <div className="col-md-4 lrp-0" />
                        </div>
                      </div>
                      <hr className="mt-0" />
                      <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                          <label>
                            Template Name<span className="clr-red">*</span>
                          </label>
                          <input
                            type="text"
                            value={this.state.templateName}
                            placeholder="template name"
                            className="form-control"
                            onChange={event =>
                              this.setState(
                                byPropKey("templateName", event.target.value)
                              )
                            }
                          />
                          <br />
                          <RoleOptions
                            permiss={this.state.permiss}
                            handleToggle_deep={this.handleToggle_deep}
                            // handleToggle={this.handleToggle}
                          />
                          <button
                            className="btn btn-green"
                            // onClick={this.addRole}
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="admin-card card">
                    <div className="card-body">
                      {this.state.roleType == null
                        ? "Currently there is no role "
                        : Object.keys(this.state.roleType).map(key => (
                            <div className="accordion-group" key={key}>
                              <div className="accordion-heading admin_faq">
                                <div className="row">
                                  <div className="col-md-10">
                                    <a
                                      className="accordion-toggle faq no_border"
                                      data-toggle="collapse"
                                      data-parent="toggle"
                                      href={"#" + key}
                                    >
                                      <i className="fa fa-align-justify" />
                                      &nbsp; &nbsp;{" "}
                                      {this.state.roleType[key].roleName}
                                    </a>
                                  </div>
                                  <div className="col-md-2 pt-7">
                                    <i
                                      className="fa fa-pencil-square-o clr-darkpurple pointer"
                                      // onClick={() => this.editRole(key)}
                                    />
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <i
                                      className="fa fa-trash clr-darkpurple pointer "
                                      // onClick={() => this.deleteRole(key)}
                                    />
                                    &nbsp; &nbsp;
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default PermissionsTable;
