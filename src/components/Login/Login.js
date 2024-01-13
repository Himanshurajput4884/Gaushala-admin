import React, { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      toast.error("Fill all fileds", {
        position: "top-right",
      });
      return;
    }

    try {
      const inputData = {
        username: formData.username,
        password: formData.password,
      };
      console.log(inputData);
      const response = await axios.post(
        `http://localhost:8008/admin/login`,
        inputData
      );
      if (response.status === 200 && response.data.message === "admin login") {
        console.log("Here");
        const token = response.data.token;
        localStorage.setItem("token", token);
        await setIsLogin(true);
        toast.success("Logged In", {
          position: "top-right",
        });
        console.log("Here2");
        navigate("/");
      } else if (
        response.status === 401 &&
        response.data.message === "Incorrect username and password"
      ) {
        toast.error("Incorrect Username and Password", {
          position: "top-center",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("Some error in login: ", err);
        toast.error("Incorrect Username and password", {
          position: "top-center",
        });
      }
      return;
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-section">
        <div className="login-heading">
          <div className="login-actual-heading"> Hey Admin </div>
        </div>
        <div className="login-outer-box">
          <div className="login-form">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
            <button onClick={handleLogin}> Login </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
