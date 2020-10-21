
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from "axios";
import convert from 'xml-js';
import urlapi from '../config/urlapi';
import WebNotif from "../components/WebNotif";
import $ from 'jquery';
var obj = new WebNotif();
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email:"3740537445617",
            password: "03315077789m",
            checkemail:"admin",
            checkpassword:"admin123",
            loginResponse:[],
            engineeridResponse:[],
            //   show:"disabled"
        }
    }
    componentDidMount(){
        document.title = "Login";
        window.scrollTo(0, 0)
        var selector = '.nav a';
        $(selector).on('click', function(){
            $(selector).removeClass('active');
            // $(this).addClass('active');
        });
    }
            
    Login = (event) => {
           event.preventDefault();
           //1 eng login 2 eng info 3 eng send email
          axios.post(urlapi+'/admin/peclogin',{
                cnic:this.state.email,
                password:this.state.password
            })
            .then((response)=> {
                localStorage.setItem("CNIC",this.state.email);
            this.setState({loginResponse:response.data[0]})
            // console.log("loginResponse",response.data[0].engineerId)
            localStorage.setItem("engId",response.data[0].engineerId);
            axios.post(urlapi+'/admin/engineerInformation',{
                engineerId:response.data[0].engineerId,
            })
            .then((resi)=> {   
                 console.log("resi",resi.data[0].email);
                //  localStorage.setItem("info",JSON.stringify(resi.data[0]));
                //  this.setState({engineeridResponse:resi.data[0].email});
               axios.post(urlapi+'/admin/email',{
                    toemail:resi.data[0].email,
                    // toemail:'mohammadtalha163@gmail.com',
                    // toemail:'beenishkhan603@gmail.com',
                })
                .then((resi)=> {   
                    //  console.log("resi",resi.data)
                this.setState({engineeridResponse:resi.data})
                })
                .catch((erro)=> {  console.log("erro") })
            })
            .catch((erro)=> {  console.log("erro") })
              
            obj.createNotification('success',"Successful Login")
            // console.log("sadasdasd",this.state.engineeridResponse);
            if(response.data[0].engineerId !="undefined"){
                this.props.history.push("/DescriptionWebinar");
            }
           })
            .catch((error) => {
                // console.log("errr");
                obj.createNotification('error',"Please Enter Correct User Name And Password")
            });
 

            
   // if(this.state.email==this.state.checkemail && this.state.password==this.state.checkpassword){
        //     this.props.history.push("/admin/practicequestion");
        // }else{
        //     // alert("please enter correct User Name And Password")
        //     obj.createNotification('error',"Please Enter Correct User Name And Password")
        // }
   }
    statechange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { email, password } = this.state;
        const enabled =
            email.length > 0 &&
            password.length > 0;
    return (
            <React.Fragment>
                  <WebNotif />
                <section  className="backco_white" style={{ fontFamily: 'Arial' }}>
                    <Header />
                    <div className="container">
                 <div className="row">
                     <div className="col-md-12">
                       <div className="row col_margin mt_5v">  
                        <div className="col-md-4">
                            <ul className="nav nav-tabs" role="tablist">
                            <a className="a_prop active" data-toggle="tab" href="#OldWebinars">Login</a>
                            </ul>
                            </div>
                            <div className="col-md-4">
                            <ul className="nav nav-tabs" role="tablist">
                                <a className="a_prop" data-toggle="tab" href="#HappeningWebinars">Engineers Registration</a>
                            </ul>
                            </div>
                            <div className="col-md-4">
                            <ul className="nav nav-tabs" role="tablist">
                                <a className="a_prop" data-toggle="tab" href="#UpcomingWebinars">New Users</a>
                            </ul>
                            </div>
                      </div>
                   </div>
                </div>
            </div>
                   <hr className="hrrow" />


     <div className="tab-content">
          <div id="OldWebinars" className="container  tab-pane active " >
          <div className="row col_margin backco_white">
                        <div className="col-md-3 col-sm-2 col-xs-12 col_padding">
                        </div>
                        {/* form-paddin-margin  */}
                        <div className="col-md-6 col-sm-6 col-xs-12 col_padding">
                            <form className="form-horizontal form-paddin-register needs-validation" data-toggle="validator" role="form">
                                <h3 className="center bold">Login your Account</h3>
                                <div className="col-sm-12">
                                <p className="center fz_14">
                                Please enter your account credentials to log into Continuing Professional Development Portal. 
                                </p>
                              </div>
                             
                                <div className="pl_12">
                                    <div className="form-group">
                                        <label className="pl-18px control-label ipd_col_pad" for="emailr">Enter CNIC<span className="co_red">*</span></label>
                                        <div className="col-sm-10 ipd_col_pad">
                                            <input required id="emailr" type="text" name="email" className="form-control co_black"
                                                placeholder="CNIC" onChange={this.statechange} />
                                        </div>
                                        <div className="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                    <div className="form-group">
                                        <label className="pl-18px control-label ipd_col_pad">Enter Password<span className="co_red">*</span></label>
                                        <div className="col-sm-10 ipd_col_pad">
                                            <input type="password" className="form-control co_black" placeholder="Password "
                                                onChange={this.statechange} required name="password" />
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-10">
                                        <div className="custom-control custom-checkbox check-pl">
                                            <input type="checkbox" className="custom-control-input" id="customCheck" name="example1" />
                                            <label className="custom-control-label lb-font pt_3 " htmlFor="customCheck" style={{color:"black"}}>Remember me</label>
                                             <a target="_blank" href="https://portal.pec.org.pk/Login/RecoverPassword" className="forget float_r pt_3"> Forgot my password</a>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-10">
                                        <label className="pl-18px control-label ipd_col_pad fz_14 bold text-capitalize text-center">Only engineers registered with PEC can attend this webinar.</label>
                                   </div>
                                   <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" disabled={!enabled} className="btn btn-success bold" style={{ width: '100%' }} onClick={this.Login}>LOGIN</button>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <div className="col-sm-10">
                                            <ul className="nav nav-tabs" role="tablist">
                                            {/* <a className="forget a_width" data-toggle="tab" href="#UpcomingWebinars">Don't have an account? <u>Sign up now</u></a> */}
                                          </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-auto col_padding">
                        </div>
                    </div>
          </div>

          <div id="UpcomingWebinars" className="container tab-pane fade">
          <div className="row col_margin d-flex justify-content-center">
                            <div className="col-md-6 col_padding mr_23">
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
                        </div>
              </div>
  
         <div id="HappeningWebinars" className="container tab-pane fade" >
         <div className="row col_margin d-flex justify-content-center">
         <div className="col-md-6 col_padding mr_23  ">
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
                                                <ul className="nav nav-tabs" role="tablist">
                                                    <a className="forget a_width" data-toggle="tab" href="#UpcomingWebinars">Already have an account? <u>Sign in Now</u></a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                       </div>
                 </div>
          
                   </div>
                  <Footer />
                 </section>
            </React.Fragment>
        );
    }
}
export default Login;







































// import React from 'react';
// import { Link } from 'react-router-dom'
// import Header from './Header'
// import Footer from './Footer'
// import apiUrl from "../config/urlapi";
// import axios from "axios";
// import urlapi from '../config/urlapi';
// import WebNotif from "../components/WebNotif";
// var obj = new WebNotif();
// class Login extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             email: "",
//             password: "",
//             checkemail:"admin",
//             checkpassword:"admin123"
//             //   show:"disabled"
//         }
//     }
//     componentDidMount(){
//         document.title = "Login";
//     }
//     Login = (event) => {
//         event.preventDefault();
//         if(this.state.email==this.state.checkemail && this.state.password==this.state.checkpassword){
//             this.props.history.push("/admin/practicequestion");
//         }else{
//             // alert("please enter correct User Name And Password")
//             obj.createNotification('error',"Please Enter Correct User Name And Password")
//         }
//    }
//     statechange = (event) => {
//         this.setState({ [event.target.name]: event.target.value })
//     }
//     render() {
//         const { email, password } = this.state;
//         const enabled =
//             email.length > 0 &&
//             password.length > 0;
//         return (
//             <React.Fragment>
//                   <WebNotif />
//                 <section style={{ fontFamily: 'Arial' }}>
//                     <Header />
//                     <div className="row col_margin backco_white">
//                         <div className="col-md-3 `col-sm-2 col-xs-12 col_padding">
//                         </div>
//                         <div className="col-md-6 col-sm-6 col-xs-12 col_padding">
//                             <form className="form-horizontal form-paddin-margin needs-validation" data-toggle="validator" role="form">
//                                 <h3 className="center bold">Login your Account</h3>
//                                 <p className="center fz_12">
//                                 Please enter your account credentials to log into Continuing Professional Development Portal. 
//                                 </p>
//                                 <div className="pl_12">
//                                     <div className="form-group">
//                                         <label className="pl-18px control-label ipd_col_pad" for="emailr">Enter Email<span className="co_red">*</span></label>
//                                         <div className="col-sm-10 ipd_col_pad">
//                                             <input required id="emailr" type="email" name="email" className="form-control co_black"
//                                                 placeholder="Email " onChange={this.statechange} />
//                                         </div>
//                                         <div className="invalid-feedback">Please fill out this field.</div>
//                                     </div>
//                                     <div className="form-group">
//                                         <label className="pl-18px control-label ipd_col_pad">Enter Password<span className="co_red">*</span></label>
//                                         <div className="col-sm-10 ipd_col_pad">
//                                             <input type="password" className="form-control co_black" placeholder="Password "
//                                                 onChange={this.statechange} required name="password" />
//                                         </div>
//                                     </div>
//                                     <div className="form-group col-sm-10">
//                                         <div className="custom-control custom-checkbox check-pl">
//                                             <input type="checkbox" className="custom-control-input" id="customCheck" name="example1" />
//                                             <label className="custom-control-label lb-font pt_3 " htmlFor="customCheck" style={{color:"black"}}>Remember me</label>
//                                              <Link to="/ForgotPassword" className="forget float_r pt_3"> Forgot my password</Link>
//                                         </div>
//                                     </div>
//                                     <div className="form-group">
//                                         <div className="col-sm-offset-2 col-sm-10">
//                                             <button type="submit" disabled={!enabled} className="btn btn-success bold" style={{ width: '100%' }} onClick={this.Login}>LOGIN</button>
//                                         </div>
//                                     </div>
//                                     <div className="form-group text-center">
//                                         <div className="col-sm-10">
//                                             <Link to="/Register" className="forget">Don't have an account? <u>Sign up now</u></Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="col-auto col_padding">
//                         </div>
//                     </div>
//                     <Footer />
//                  </section>
//             </React.Fragment>
//         );
//     }
// }
// export default Login;