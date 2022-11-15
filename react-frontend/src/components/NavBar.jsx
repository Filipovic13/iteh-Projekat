import React from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

function NavBar({ token, addLoggedData }) {
  function handleLogout() {
    var config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.setItem("auth_token", null);
        addLoggedData(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://t4.ftcdn.net/jpg/04/43/34/03/360_F_443340374_QqpPwEqSCgChDSJFJNt2bTu2XTe4fISp.jpg"
              alt="belt"
              style={{ width: 100 }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" aria-current="page" to="/products">
                Shop
              </Link>
              <Link className="nav-link" to="/tournaments">
                Tournaments
<<<<<<< HEAD
              </Link>
=======
              </a>
              <a className="nav-link" aria-current="page" href="/stats">
                Stats
              </a>
              <a className="nav-link" aria-current="page" href="/contact">
                Contact
              </a>
>>>>>>> 07a673ce0d62796f80c28c5d2b0e37d94dd366de
              {token == null ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              )}
              
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
