import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LoginPage({ addToken, setRole }) {
  //////////////////////////
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    //console.log(newUserData);
    setUserData(newUserData);
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("api/login", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          window.sessionStorage.setItem("user_id", res.data.user_id);

          addToken(res.data.access_token);
          setRole(res.data.role);

          swal("Logged in succesfully", res.data.message, "success");
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          swal("Please try again", res.data.message, "warning");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onInput={handleInput}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onInput={(e) => handleInput(e)}
          />
        </div>

        <div className="mb-3">
          <a href="/register">Don't have an account? Register now</a>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
