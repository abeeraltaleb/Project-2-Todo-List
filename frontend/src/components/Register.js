import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [RegisterStatus, setRegisterStatus] = useState(0);
  const [RegisterMessage, setRegisterMessage] = useState("");

  const registerFunc = (e) => {
    e.preventDefault();
    console.log("reg");
    const newUser = {
      // ES6
      email,
      // "email": "email value in the state"
      password,
      username,
    };
    axios
      .post(`http://localhost:5000/users/register`, newUser)
      .then((response) => {
        setRegisterStatus(response.status);
        setRegisterMessage(response.data.message);
        // console.log("DATA: ", response.data);
       
      })
      .catch((err) => {
        console.log("ERR: ", err);
        setRegisterStatus(err.response.status);
        setRegisterMessage(err.response.data.message);
      });
  };

  return (
<div className="m-3 Register d-flex justify-content-center">
<form className="d-grid gap-3">
    <div className="form-floating ">
    <input
      type="email"
      className="form-control"
      id="floatingInput"
      // placeholder="name@example.com"
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      value={email}
    />
    <label htmlFor="floatingInput">Email address</label>
  </div>
  <div className="form-floating">
    <input
      type="password"
      className="form-control"
      id="floatingPassword"
      // placeholder="Write password here ..."
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      value={password}
    />
    <label htmlFor="floatingPassword">Password</label>
  </div>
  <div className="form-floating ">
    <input
      type="text"
      className="form-control"
      id="floatingInput"
      // placeholder="name@example.com"
      onChange={(e) => {
        setUsername(e.target.value);
      }}
      value={username}
    />
    <label htmlFor="floatingInput">Username</label>
  </div>
  {RegisterStatus === 400 && (
          <div className="alert alert-success text-center" role="alert">
            {RegisterMessage}
          </div>
        )}

        {RegisterStatus === 201  && (
          <div className="alert alert-danger text-center" role="alert">
            {RegisterMessage}
          </div>
        )}

  <div className="text-center">
    <input
      type="submit"
      value="Register"
      onClick={registerFunc}
      className="btn btn-primary"
    />


    <Link to="/login" className="btn btn-link">
    Have An Account?
    </Link>
  </div>
</form>
</div>
);
}