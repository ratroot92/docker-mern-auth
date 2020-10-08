import React, { useState, useContext } from "react";
import AuthService from "./../services/AuthService";
import Message from "./../component/Message";
import { AuthContext } from "./../context/AuthContext";
import loginBackgroundImage from "./../assets/images/background-2.jpg";
import ClockContainer from "./../component/SpecialComponents/ClockContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();

    setUser({ ...user, [e.target.name]: [e.target.value] });
    //console.log({ user });
  };

const routeChange=()=>{
  props.history.push("/register");
}

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      console.log(isAuthenticated, user, message);
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/todos");
        console.log("isAuthenticated");
      } else {
        setMessage(message);
      }
    });
  };
  return (
    <div
      className="row align-items-center  border border-danger"
      style={{
        backgroundImage: "url(" + loginBackgroundImage + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "800px",
      }}
    >
   

      <div className="col-md-12">
        <div className="row">
         
<div className="col-md-3"></div>
          <div
            className="col-md-6 bg-white "
            style={{
              // backgroundImage: "url(" + loginBackgroundImage + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* start card form  */}
            <div className="row">
              {/* clock colmd-12 */}
              <div className="col-md-12 text-center bg-dark">
                <ClockContainer />
              </div>
              {/* end clock col-md-12 */}
              {/* start col-md-12 social icons  */}
              <div className="col-md-12">
              <div className="d-flex flex-row justify-content-center align-items-center mt-3 mb-3">
              <span className="ml-2 mr-2 ">
                <i
                  className=" fa-2x text-primary fa fa-facebook-official"
                  aria-hidden="true"
                ></i>
              </span>
              <span className="ml-2 mr-2 ">
                <i
                  className=" fa-2x text-success fa fa-google-plus-official"
                  aria-hidden="true"
                ></i>
              </span>
              <span className="ml-2 mr-2 ">
                <i
                  className=" fa-2x text-info fa fa-twitter-square"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
              </div>
              {/* end col-md-12 social icons */}
              {/* form start  col-md-12 */}
              <div className="col-md-12">
              <form onSubmit={onSubmit}>
              <div className="form-group form-inline">
                <label className="btn bg-white"style={{width:"150px",textAlign:"",fontWeight:"bold"}} htmlFor="username">Username </label>
                <input
                type="text"
                className="form-control "
                style={{width:"50%",marginLeft:"15px",height:"35px",borderRadius:"0px!important"}}
                onChange={onChange}
                name="username"
                required
              />
              </div>
              <div className="form-group form-inline">
                <label className="btn bg-white"style={{width:"150px",textAlign:"",fontWeight:"bold"}} htmlFor="password">password </label>
              <input
                type="password"
                className="form-control "
                style={{width:"50%",marginLeft:"15px",height:"35px",borderRadius:"0px!important"}}
                onChange={onChange}
                name="password"
                required
              />
              </div>
             <div className="text-center mb-5">
             <button type="submit" className="btn btn-lg btn-success">
                <i className="fa fa-sign-in " aria-hidden="true"></i>
              </button>
             </div>
            </form>
        
              </div>
                  {/* form end  col-md-12 */}
                  <div className="col-md-12 mb-5 text-center  ">
                    <p className="text-info">Not a Member ! click here  <button type="button" className="btn btn-warning" onClick={routeChange}>Sign Up</button> </p>

                  </div>
            </div>
          
            
            

            {/* end card form  */}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
      <div className="col-md-2"></div>

      {message ? <Message message={message} /> : null}
      {message ?  <ToastContainer message={message} /> : null}
     
    </div>
  );
};
export default Login;
