import React, { Component } from "react";
import Select from "react-select";
import WebNotif from "../WebNotif";
import Loader from "../loader";
import UserProfile from "../UserProfile";
import { db } from "../../firebase/firebase";
import Modal from "react-responsive-modal";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import Unauthorized from "../Unauthorized";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});
var obj = new WebNotif();
class ManageUsers extends Component {
  state = {
    showLoader: true,
    userData: [],
    userKey: "",
    openModel: false,
    options: [
      { value: "1", label: "Admin" },
      { value: "2", label: "Instructor" },
      { value: "3", label: "Student" }
    ],
    selectedRole: { value: "3", label: "Student" }
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
      // db.ref(`userInfo`)
      //   .once("value")
      //   .then(snapshot => {
      //     {
      //       this.setState({ userData: snapshot.val() });
      //       this.setState({ showLoader: false });
      //     }
      //   });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userData !== prevState.userData) {
      window.$("#admin-manage-users-table").DataTable({
        destroy: true,
        pageLength: 10,
        searching: false
      });
    }
  }
  handleChange = (key, selectedRole) => {
    this.setState({ selectedRole });
    var userData = { ...this.state.userData };
    userData[key].role = selectedRole;
    this.setState({ userData });
  };
  onOpenModal = key => {
    this.setState({ openModel: true, userKey: key });
  };

  onCloseModal = () => {
    this.setState({ openModel: false });
  };
  deleteUser = key => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var userData = { ...this.state.userData };
            delete userData[key];
            this.setState({ userData });
            obj.createNotification("success", "User deleted");
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
 };
  updateUser = key => {
    var role = parseInt(this.state.userData[key].role);
    obj.createNotification("success", "Role updated");
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
                <div className="col lrp-50 ptb-30 ">
                  <div className="admin-card card">
                    <div className="card-body">
                      <div className="container">
                        <div className=" col-md-12">
                          <div className="row">
                            <div className="col-md-7">
                              <h5 className="card-title regular_font">
                                User Details
                              </h5>
                            </div>
                         </div>
                        </div>
                        <hr />
                        <Modal
                          open={this.state.openModel}
                          onClose={this.onCloseModal}
                          center
                        >
                          <UserProfile
                            userId={this.state.userKey}
                            roleChange={true}
                          />
                        </Modal>
                        <div>
                          <table
                            id="admin-manage-users-table"
                            className="table table-hover"
                          >
                            <thead className="text-center">
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Update</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            {/* <tbody className="text-center">
                              {this.state.userData == null
                                ? ""
                                : Object.keys(this.state.userData).map(key => (
                                    <tr>
                                      <td>
                                        {this.state.userData[key].name == null
                                          ? "-"
                                          : this.state.userData[key].name}
                                      </td>
                                      <td>
                                        {this.state.userData[key].email == null
                                          ? "-"
                                          : this.state.userData[key].email}
                                      </td>
                                      <td>
                                        {" "}
                                        {this.state.userData[key].role}
                                      </td>
                                      <td>
                                        {this.props.permissions["update"] ? (
                                          <i
                                            class="fa fa-floppy-o clr-darkpurple pointer"
                                            aria-hidden="true"
                                            //onClick={() => this.updateUser(key)}
                                            onClick={() =>
                                              this.onOpenModal(key)
                                            }
                                          />
                                        ) : (
                                          <i class="fa fa-floppy-o clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                      <td>
                                        {this.props.permissions["delete"] ? (
                                          <i
                                            class="fa fa-trash clr-darkpurple pointer"
                                            aria-hidden="true"
                                            // onClick={() => this.deleteUser(key)}
                                          />
                                        ) : (
                                          <i class="fa fa-trash clr-darkpurple pointer disabled" />
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Loader showLoader={this.state.showLoader} /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ManageUsers;
