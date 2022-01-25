import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthApi from "../../app/apis/auth/AuthApi";

export default function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({username:"", password:""});
  const [errorSubmit, setErrorSubmit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values?.username && values?.password) {
      AuthApi.Login(values?.username, values?.password).then((res) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem("accessToken", res.data);
          navigate("/");
        } else {
          setErrorSubmit("Login failed, please check again!");
        }
      });
    } else {
      setErrorSubmit("Enter all infomation to login!");
    }
  };

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setValues({
      ...values,
      [name]: val,
    });
  };

  return (
    <>
      <form
        action=""
        style={{ maxWidth: "250px", margin: "0 auto", paddingBottom: "20px" }}
        onSubmit={handleSubmit}
      >
        <div
          style={{ textAlign: "center", color: "red", marginBottom: "20px" }}
        >
          {errorSubmit}
        </div>
        <div className="feild_group">
          <label>Username</label>
          <input
            type="text"
            value={values?.username}
            name="username"
            placeholder="Username"
            onChange={handleChangeInput}
          />
          <span className="error_mes"></span>
        </div>
        <div className="feild_group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values?.password}
            placeholder="Password"
            onChange={handleChangeInput}
          />
          <span className="error_mes"></span>
        </div>
        <button className="save" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
}
