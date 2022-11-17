import React from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function NavBar({ token, addLoggedData, cartNum }) {
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
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
              {token == null ? (
                <></>
              ) : (
                <Link className="nav-link" to="/tournaments">
                  Tournaments
                </Link>
              )}

              <Link className="nav-link" aria-current="page" to="/stats">
                Stats
              </Link>
              <Link className="nav-link" aria-current="page" to="/contact">
                Contact
              </Link>
              {token == null ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              )}
              <div className="cart">
                {" "}
                <FiShoppingCart />
                &nbsp;
                {cartNum}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
