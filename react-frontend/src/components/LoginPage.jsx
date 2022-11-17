import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage({ addToken, setLoggedId, loggedId }) {
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
          let token = res.data.access_token;
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          addToken(token);

          let userId = res.data.id;
          //console.log(userId);
          //setLoggedId(userId);
          //console.log(loggedId);
          navigate("/");
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
