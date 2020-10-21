import React, { Component } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import Addfaq from "./Addfaq";
import Loader from "../loader";
import WebNotif from "../WebNotif";
class Adminfaq extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <AdminNav />
        <div className="col-md-12">
          <div className="row">
            <AdminSidebar />
            <br />
            <br />
            <div className="col lrp-50 ptb-30 ">
              <div className="admin-card card">
                <div className="card-body">
                  <div className="container">
                    <Addfaq keyProp="" permissions={this.props.permissions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loader showLoader={this.state.showLoader} />
      </React.Fragment>
    );
  }
}

export default Adminfaq;
