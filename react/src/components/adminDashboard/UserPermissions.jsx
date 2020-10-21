import React, { Component } from "react";
import Unauthorized from "../Unauthorized";
import Loader from "../loader";
import AdminSidebar from "./AdminSidebar";
import RoleOptions from "../RoleOptions";
import AdminNav from "./AdminNav";
import WebNotif from "../WebNotif";
import Select from "react-select";
// import { db } from "../firebase/firebase";
var obj = new WebNotif();
var isUpdate = {};
class UserPermissions extends Component {
  state = {
    users: null,
    uOptions: [{ value: null, label: "Users" }],
    rtOptions: [{ value: null, label: "Roles" }],
    selectedOptionUser: { value: null, label: "Users" },
    selectedOptionRT: { value: null, label: "Template" },
    tempKey: null,
    customRole: false,
    chooseTemplate: false
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
      // db.ref("userInfo")
      //   .once("value")
      //   .then(snapshot => {
      //     this.setState({ users: snapshot.val() });
      //     var options = [];
      //     Object.keys(snapshot.val()).map(key => {
      //       options.push({ value: key, label: snapshot.val()[key].name });
      //     });
      //     this.setState({ uOptions: options });
      //   });
      // db.ref("roleTemplate")
      //   .once("value")
      //   .then(snapshot => {
      //     this.setState({ roleTemp: snapshot.val() });
      //     var options = [];
      //     Object.keys(snapshot.val()).map(key => {
      //       options.push({ value: key, label: snapshot.val()[key].roleName });
      //     });
      //     //this.setState({ selectedOptionRT: options[0] });
      //     this.setState({ rtOptions: options });
      //   });
    }
  }
  handleChangeUser = selectedOptionUser => {
    // this.setState({ selectedOptionUser }, () => {
    //   var test = this.state.users[this.state.selectedOptionUser.value];
    //   db.ref("roles/" + this.state.selectedOptionUser.value)
    //     .once("value")
    //     .then(snapshot => {
    //       if (snapshot.val() != null) {
    //         this.setState({ permiss: snapshot.val().role });
    //       }
    //     });
    //   this.setState({ tempKey: this.state.selectedOptionUser.value });
    // });
  };

  handleChangeRT = selectedOptionRT => {
    this.setState({ selectedOptionRT }, () => {
      var test = this.state.roleTemp[this.state.selectedOptionRT.value];
      this.setState({ permiss: test.role });
    });
  };
  saveUserRole = () => {
    // var userId = this.state.selectedOptionUser.value;
    // var priviledges = this.state.roleTemp[this.state.selectedOptionRT.value][
    //   "role"
    // ];
    // db.ref("roles/" + userId).set(priviledges);
  };
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
  // addRole = () => {
  //   if (this.state.tempKey != null) {
  //     db.ref("roles/" + this.state.tempKey)
  //       .set({ roleName: "Custom", role: this.state.permiss })
  //       .then(m => {
  //         db.ref("userInfo/" + this.state.tempKey + "/role").set("custom");
  //         obj.createNotification("success", "Role successfully customized");
  //       });
  //   }
  // };
  // addTemplateRole = () => {
  //   if (
  //     this.state.selectedOptionRT.value != null &&
  //     this.state.selectedOptionRT.value != "null"
  //   ) {
  //     db.ref("roleTemplate/" + this.state.selectedOptionRT.value)
  //       .once("value")
  //       .then(snapshot => {
  //         if (snapshot.val() != null) {
  //           this.setState({ permiss: snapshot.val().role }, () => {
  //             db.ref("roles/" + this.state.tempKey)
  //               .set({
  //                 roleName: this.state.selectedOptionRT.label,
  //                 role: this.state.permiss
  //               })
  //               .then(m => {
  //                 var role = this.state.selectedOptionRT.label.toLowerCase();
  //                 db.ref("userInfo/" + this.state.tempKey + "/role").set(role);
  //                 obj.createNotification("success", "Role assign to the user");
  //               });
  //           });
  //         }
  //       });
  //   } else {
  //     obj.createNotification("error", "You need to select a template");
  //   }
  // };

  customizeRole = () => {
    if (this.state.permiss != null) {
      this.setState({ customRole: true, chooseTemplate: false });
    } else {
      obj.createNotification("error", "Select user first");
    }
  };

  chooseTemplate = () => {
    if (this.state.permiss != null) {
      this.setState({ chooseTemplate: true, customRole: false });
    } else {
      obj.createNotification("error", "Select user first");
    }
  };
  cancelState = () => {
    this.setState({ chooseTemplate: false, customRole: false });
  };
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
                <div className="col">
                  <div className="admin-card card">
                    <div className="card-body">
                      <div className=" col-md-12">
                        <div className="row">
                          <div className="col-md-8">
                            <h5 className="card-title regular_font">
                              User Role Assignment
                            </h5>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                          <Select
                            options={this.state.uOptions}
                            value={this.state.selectedOptionUser}
                            onChange={this.handleChangeUser}
                          />
                          <br />
                          {this.state.customRole == true ||
                          this.state.chooseTemplate == true ? (
                            <div className="row" />
                          ) : (
                            <div className="row">
                              <div className="col-md-4">
                                <button
                                  className="btn btn-green fs-12"
                                  // onClick={this.chooseTemplate}
                                >
                                  Assign Templates
                                </button>
                              </div>
                              <div className="col-md-4">
                                <button
                                  className="btn btn-green fs-12"
                                  // onClick={this.customizeRole}
                                >
                                  Customize Role
                                </button>
                              </div>
                            </div>
                          )}

                          {this.state.chooseTemplate == true ? (
                            <React.Fragment>
                              <Select
                                options={this.state.rtOptions}
                                value={this.state.selectedOptionRT}
                                onChange={this.handleChangeRT}
                              />
                              <br />
                              <div className="row">
                                <div className="col-md-4">
                                  <button
                                    className="btn btn-green fs-12"
                                    // onClick={this.addTemplateRole}
                                  >
                                    Save Template
                                  </button>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    className="btn btn-red fs-12 white"
                                    // onClick={this.cancelState}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                          <br />
                          <br />
                          {this.state.permiss != null &&
                          this.state.customRole == true ? (
                            <React.Fragment>
                              <RoleOptions
                                permiss={this.state.permiss}
                                handleToggle_deep={this.handleToggle_deep}
                                // handleToggle={this.handleToggle}
                              />
                              <div className="row">
                                <div className="col-md-4">
                                  <button
                                    className="btn btn-green fs-12"
                                    // onClick={this.addRole}
                                  >
                                    Save Custom Template
                                  </button>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    className="btn btn-red fs-12 white"
                                    // onClick={this.cancelState}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                         <br />
                        </div>
                      </div>
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

export default UserPermissions;
