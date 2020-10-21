import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { stat } from 'fs';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            // name: "",
            // father: "",
            // discipline: "",
            // nationality: "",
            // cnic: "",
            // phone: "",
            // email: "",
            // conformEmail: "",
            // password: "",
            // conformPassword: "",
            discipline: "",
            pecnumber: "",
            registerNo: "",
            email: "",
            password: "",
          
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
            document.title = "Register";
    }
    ForgotPassword = (event) => {
        event.preventDefault();
    }
    statechange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        // const { name, father, discipline, nationality, cnic, phone, email, conformEmail, password, conformPassword } = this.state;
        // const enabled =
        //     name.length > 0 &&
        //     father.length > 0 &&
        //     discipline.length > 0 &&
        //     nationality.length > 0 &&
        //     cnic.length > 0 &&
        //     phone.length > 0 &&
        //     email.length > 0 &&
        //     conformEmail.length > 0 &&
        //     password.length > 0 &&
        //     conformPassword.length > 0;
        const { discipline, pecnumber, email,registerNo, password, } = this.state;
        const enabled =
        discipline.length > 0 &&
        pecnumber.length > 0 &&
             email.length > 0 &&
             registerNo.length > 0 &&
            password.length > 0;
        return (
            <React.Fragment>
                <section style={{ fontFamily: 'Arial',color:"black" }}>
                    <Header />
                    <div className="backco_white">
                        <h1 className="center bold " style={{ paddingTop: '60px', marginBottom: '0px' }}>Registeration</h1>
                        <div className="row col_margin d-flex justify-content-center">
                            <div className="col-md-5 col_padding mr_23">
                                <form className="form-horizontal form-paddin-register">
                                    <h3 className="center bold">New Users</h3>
                                    <p className="center mlr-p-30 fz_12">
                                    If you only want to sign up as a new user for Continuing Professional Development Portal, please sign up below.
                                    </p>
                                    <div className="form-group pl_12">
                                        <label className="pl-18px control-label">Select Your Discipline<span className="co_red">*</span></label>
                                        <div className="col-sm-10">
                                            <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black">
                                                <option>Choose Option </option>
                                                <option>CVIL</option>
                                                <option >ELECTRICAL</option>
                                                <option >MECHANICAL</option>
                                                <option>CHEMICAL</option>
                                                <option>ELECTRONICS</option>
                                                <option>METALLURGY</option>
                                                <option>AGRICULTURAL</option>
                                                <option>AERONAUTICAL</option>
                                                <option>MINING</option>
                                                <option>PETROGAS</option>
                                                <option>TELE COMMUNICATION</option>
                                                <option>MECHATRONICS</option>
                                                <option>INDUSTRIAL</option>
                                                <option>NUCLEAR</option>
                                                <option>TEXTILE</option>
                                                <option>BIOMEDICAL</option>
                                                <option>ENGINEERING SCIENCES</option>
                                                <option>ARCH ENGG</option>
                                                <option>COMPUTER</option>
                                                <option>GEOLOGY</option>
                                                <option>TRANSPORT</option>
                                                <option>POLY</option>
                                                <option>ENVIRONMENT</option>
                                                <option>URBAN</option>
                                                <option >AUTOMOTIVE</option>
                                                <option> GEOINFORMATICS</option>
                                                <option>ENERGY</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="pl_12">
                                        <div className="form-group">
                                            <label className="pl-18px control-label"> PEC Number<span className="co_red">*</span></label>
                                            <div className="col-sm-10">
                                                <input type="text" name="pecnumber" onChange={this.statechange} className="form-control co_black" placeholder="PEC Number " />
                                            </div>
                                        </div>
                                      <div className="form-group">
                                            <label className="pl-18px control-label">Registeration Number<span className="co_red">*</span></label>
                                            <div className="col-sm-10">
                                                <input type="text" name="registerNo" onChange={this.statechange} className="form-control co_black" placeholder="Registeration Number " />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="pl-18px control-label">Email<span className="co_red">*</span></label>
                                            <div className="col-sm-10">
                                                <input type="email" name="email" onChange={this.statechange} className="form-control co_black" placeholder="Email " />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="pl-18px control-label">Password<span className="co_red">*</span></label>
                                            <div className="col-sm-10">
                                                <input type="password" name="password" onChange={this.statechange} className="form-control co_black" placeholder="Password " />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <button type="button" disabled={!enabled} className="btn btn-success bold" style={{ width: '100%', margin: '15px 0px', paddingLeft: 'unset' }}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 col_padding mr_23  ">
                                <form className="form-horizontal form-paddin-register">
                                    <h3 className="center bold">Engineers Registeration</h3>
                                    <p className="center mlr-p-30 fz_12">
                                     If you are not a registered engineer and want to register yourself as an engineer, please click on register button below.
                                 </p>
                                    <div className="pl_12">
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <button type="button" className="btn btn-success bold" style={{ width: '100%' }}>Register</button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10 text-center">
                                                <label><Link to="/Login" className="forget" style={{ marginLeft: '35px' }}>Already have an account? <u>Sign in Now</u></Link></label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </React.Fragment>
        )
    };
}
export default Register;































// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
// import { stat } from 'fs';

// class Register extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             // name: "",
//             // father: "",
//             // discipline: "",
//             // nationality: "",
//             // cnic: "",
//             // phone: "",
//             // email: "",
//             // conformEmail: "",
//             // password: "",
//             // conformPassword: "",
//             discipline: "",
//             pecnumber: "",
//             registerNo: "",
//             email: "",
//             password: "",
          
//         }
//     }
//     componentDidMount() {
//         window.scrollTo(0, 0)
//             document.title = "Register";
//     }
//     ForgotPassword = (event) => {
//         event.preventDefault();
//     }
//     statechange = (event) => {
//         this.setState({ [event.target.name]: event.target.value })
//     }
//     render() {
//         // const { name, father, discipline, nationality, cnic, phone, email, conformEmail, password, conformPassword } = this.state;
//         // const enabled =
//         //     name.length > 0 &&
//         //     father.length > 0 &&
//         //     discipline.length > 0 &&
//         //     nationality.length > 0 &&
//         //     cnic.length > 0 &&
//         //     phone.length > 0 &&
//         //     email.length > 0 &&
//         //     conformEmail.length > 0 &&
//         //     password.length > 0 &&
//         //     conformPassword.length > 0;
//         const { discipline, pecnumber, email,registerNo, password, } = this.state;
//         const enabled =
//         discipline.length > 0 &&
//         pecnumber.length > 0 &&
//              email.length > 0 &&
//              registerNo.length > 0 &&
//             password.length > 0;
//         return (
//             <React.Fragment>
//                 <section style={{ fontFamily: 'Arial',color:"black" }}>
//                     <Header />
//                     <div className="backco_white">
//                         <h1 className="center bold " style={{ paddingTop: '60px', marginBottom: '0px' }}>Registeration</h1>
//                         <div className="row col_margin d-flex justify-content-center">
//                             <div className="col-md-5 col_padding mr_23">
//                                 <form className="form-horizontal form-paddin-register">
//                                     <h3 className="center bold">New Users</h3>
//                                     <p className="center mlr-p-30 fz_12">
//                                     If you only want to sign up as a new user for Continuing Professional Development Portal, please sign up below.
//                                     </p>
//                                     <div className="form-group pl_12">
//                                         <label className="pl-18px control-label">Select Your Discipline<span className="co_red">*</span></label>
//                                         <div className="col-sm-10">
//                                             <select value={this.state.discipline} onChange={this.statechange} name="discipline" className="form-control co_black">
//                                                 <option>Choose Option </option>
//                                                 <option>CVIL</option>
//                                                 <option >ELECTRICAL</option>
//                                                 <option >MECHANICAL</option>
//                                                 <option>CHEMICAL</option>
//                                                 <option>ELECTRONICS</option>
//                                                 <option>METALLURGY</option>
//                                                 <option>AGRICULTURAL</option>
//                                                 <option>AERONAUTICAL</option>
//                                                 <option>MINING</option>
//                                                 <option>PETROGAS</option>
//                                                 <option>TELE COMMUNICATION</option>
//                                                 <option>MECHATRONICS</option>
//                                                 <option>INDUSTRIAL</option>
//                                                 <option>NUCLEAR</option>
//                                                 <option>TEXTILE</option>
//                                                 <option>BIOMEDICAL</option>
//                                                 <option>ENGINEERING SCIENCES</option>
//                                                 <option>ARCH ENGG</option>
//                                                 <option>COMPUTER</option>
//                                                 <option>GEOLOGY</option>
//                                                 <option>TRANSPORT</option>
//                                                 <option>POLY</option>
//                                                 <option>ENVIRONMENT</option>
//                                                 <option>URBAN</option>
//                                                 <option >AUTOMOTIVE</option>
//                                                 <option> GEOINFORMATICS</option>
//                                                 <option>ENERGY</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="pl_12">
//                                         <div className="form-group">
//                                             <label className="pl-18px control-label"> PEC Number<span className="co_red">*</span></label>
//                                             <div className="col-sm-10">
//                                                 <input type="text" name="pecnumber" onChange={this.statechange} className="form-control co_black" placeholder="PEC Number " />
//                                             </div>
//                                         </div>
//                                       <div className="form-group">
//                                             <label className="pl-18px control-label">Registeration Number<span className="co_red">*</span></label>
//                                             <div className="col-sm-10">
//                                                 <input type="text" name="registerNo" onChange={this.statechange} className="form-control co_black" placeholder="Registeration Number " />
//                                             </div>
//                                         </div>
//                                         <div className="form-group">
//                                             <label className="pl-18px control-label">Email<span className="co_red">*</span></label>
//                                             <div className="col-sm-10">
//                                                 <input type="email" name="email" onChange={this.statechange} className="form-control co_black" placeholder="Email " />
//                                             </div>
//                                         </div>
//                                         <div className="form-group">
//                                             <label className="pl-18px control-label">Password<span className="co_red">*</span></label>
//                                             <div className="col-sm-10">
//                                                 <input type="password" name="password" onChange={this.statechange} className="form-control co_black" placeholder="Password " />
//                                             </div>
//                                         </div>
//                                         <div className="form-group">
//                                             <div className="col-sm-offset-2 col-sm-10">
//                                                 <button type="button" disabled={!enabled} className="btn btn-success bold" style={{ width: '100%', margin: '15px 0px', paddingLeft: 'unset' }}>Login</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="col-md-5 col_padding mr_23  ">
//                                 <form className="form-horizontal form-paddin-register">
//                                     <h3 className="center bold">Engineers Registeration</h3>
//                                     <p className="center mlr-p-30 fz_12">
//                                      If you are not a registered engineer and want to register yourself as an engineer, please click on register button below.
//                                  </p>
//                                     <div className="pl_12">
//                                         <div className="form-group">
//                                             <div className="col-sm-offset-2 col-sm-10">
//                                                 <button type="button" className="btn btn-success bold" style={{ width: '100%' }}>Register</button>
//                                             </div>
//                                         </div>
//                                         <div className="form-group">
//                                             <div className="col-sm-offset-2 col-sm-10 text-center">
//                                                 <label><Link to="/Login" className="forget" style={{ marginLeft: '35px' }}>Already have an account? <u>Sign in Now</u></Link></label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                     <Footer />
//                 </section>
//             </React.Fragment>
//         )
//     };
// }
// export default Register;