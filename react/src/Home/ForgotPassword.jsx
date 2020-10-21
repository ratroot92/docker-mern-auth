import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
    }
  }
  ForgotPassword = (event) => {
    event.preventDefault();
  }
  statechange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <React.Fragment>
        <section style={{ fontFamily: 'Arial' }}>
          <Header />
          <div className="row col_margin backco_white">
            <div className="col-md-3 col-sm-2 col-xs-12 col_padding">
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12 col_padding">
              <form className="form-horizontal form-paddin-margin">
                <h3 className="center bold">Forgot Password</h3>
                <p className="center fz_12">
                  Lorem Ipsum is simply dummy text of the simply dummy text of printing Lorem Ipsum is simply dummy text of the printing.
                </p>
                <div className="pl_12">
                  <div className="form-group">
                    <label className="pl-18px control-label" htmlFor="email">Email Address<span className="co_red">*</span> </label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" name="email" onChange={this.statechange} placeholder="Your Email " />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="button" disabled={!this.state.email} onClick={this.ForgotPassword} className="btn btn-success" style={{ width: '100%' }}>Send Reset Instruction</button>
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <div className="col-sm-10">
                      <Link to="/Login" className="forget"><u>Go Back Link</u></Link>
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
    )
  };
}
export default ForgotPassword;