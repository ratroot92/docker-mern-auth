import React, { Component } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminNav from "./AdminNav";
import QPHome from "./QPHome";
class QPAdmin extends Component {
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
            <div className="col" id="main">
              <section>
                <div className="container">
                  <div className="admin-card card">
                    <div className="card-body">
                      <QPHome
                        userId={this.props.UserId}
                        permissions={this.props.permissions}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default QPAdmin;
