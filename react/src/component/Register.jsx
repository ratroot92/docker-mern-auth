import React ,{useState, useRef, useEffect}from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import AuthService from "./../services/AuthService";
import Message from "./../component/Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidationService from './../services/ValidationService'
/* Validation starts here */
const schema = yup.object().shape({


  email: yup
    .string()
    .required(function (value) {toast.warning("Email is required")})
    .email("Invalid email")
    .test("Unique Email", "Email already in use", function (value) {
     ValidationService.validateEmail(value).then((data) => {const { message } = data;
     if(message.msgError){toast.info(message.msgBody)}});
    }),

  password: yup
    .string("Password must be string ")
    .required(function (value) {toast.warning("Password is required")})
    .min(3, function (value) {toast.warning("Password  must be atleast 3 charachters")})
    .max(32, function (value) {toast.warning("Password  must atmost 32 chrachters")}),
  c_password: yup
    .string()
    .required(function (value) {toast.warning("Confirm password is required")})
    .oneOf([yup.ref("password"), null], function (value) {toast.warning("Unmatched passwords");}),
  

  username: yup
    .string("Username must be string ")
    .required(function (value) {toast.warning("Username is required ")})
    .min(3, function (value) {toast.warning("Username  must be atleast 3 charachters")})
    .max(32, function (value) {toast.warning("Username  must atmost 32 chrachters");})
    // .test("Unique username", "Username already in taken", function (value) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post("http://localhost:3001/api/users/verify/username", {
    //         username: value,
    //       })
    //       .then((res) => {
    //         if (res.data.msg === "Username already been taken") {
    //           toast.error(res.data.msg);
    //           resolve(false);
    //         }
    //         resolve(true);
    //       });
    //   });
    // }),
});
/* Validation ends here */
/* Functional componennet starts here */

const Register = (props) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  reValidateMode: 'onSubmit',
  criteriaMode: "firstError",
  shouldFocusError: true,
  shouldUnregister: true,
    defaultValues: {
      username: "",
      email: "",
      mobile: "",
      role: "",
      password:"",
      c_password:"",
    }
  });

  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };


  const onSubmit = data => {
    AuthService.register(user).then((data) => {
    const { message } = data;
    setMessage(message);
    resetForm();
    if (!message.msgError) {
      timerID = setTimeout(() => {
        props.history.push("/login");
      }, 2000);
    }
  });}


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="form-control" name="username" ref={register} />
      <input className="form-control" name="email" type="email" ref={register} required />
      <input className="form-control" name="role" ref={register} />
      <input className="form-control" name="password" type="text" ref={register} />
      <input className="form-control" name="c_password" type="text" ref={register} />
      <input className="form-control" name="mobile" type="text" ref={register} />
      <input className="form-control" type="submit" />
      <ToastContainer />
    </form>
  );
};
export default Register;