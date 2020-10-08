import React, { useState, useRef, useEffect } from "react";
import AuthService from "./../services/AuthService";
import Message from "./../component/Message";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log({ user });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          name="username"
          value={user.username}
          required
        />
        <input
          type="password"
          className="form-control"
          onChange={onChange}
          name="password"
          value={user.password}
          required
        />
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          name="role"
          value={user.role}
          required
        />

        <button type="submit" className="btn btn-lg btn-success">
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};
export default Register;








