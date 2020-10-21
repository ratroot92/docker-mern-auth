import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'


function ResetPassword() {
  return (
    <React.Fragment>
      <section style={{ fontFamily: '"Merriweather", serif' }}>
        <Header />
        <div className="row col_margin">
          <div className="col-md-3 col-sm-2 col-xs-12 col_padding">
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12 col_padding">
            <form className="form-horizontal form-paddin-margin">
              <h3 className="center bold">Rest Password</h3>
              <p className="center fz_12">
                Lorem Ipsum is simply dummy text of the simply dummy text of printing Lorem Ipsum is simply dummy text of the printing.
            </p>
              <div className="pl_12">
                <div className="form-group">
                  <label className="pl-18px control-label" htmlFor="email">Enter existing password:</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" placeholder="Current Password" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="pl-18px control-label">Set a new Password:</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" placeholder="New Password" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="pl-18px control-label">Confirm new Password:</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" placeholder="Confirm new Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="button" className="btn btn-success" style={{ width: '100%' }}>RESET PASSWORD</button>
                  </div>
                </div>
                <div className="form-group text-center">
                  <div className="col-sm-10">
                    <Link to="" className="forget"><u>Go Back Link</u></Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-auto col_padding">
          </div>
        </div>
        <Footer />
      </section>
    </React.Fragment>
  );
}
export default ResetPassword;