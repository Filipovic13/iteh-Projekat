import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Navbar() {
   let navigate = useNavigate();

   function handleLogout(e) {
      e.preventDefault();
      var config = {
         method: "post",
         url: "api/admin/logout",
         headers: {
            Authorization:
               "Bearer " + window.sessionStorage.getItem("auth_token"),
         },
      };

      axios(config)
         .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.sessionStorage.removeItem("auth_token");
            window.sessionStorage.removeItem("user_id");

            swal("Success", response.data.message, "success");
            navigate("/");
         })
         .catch(function (error) {
            console.log(error);
         });
   }
   return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
         <Link className="navbar-brand ps-3" to="/admin">
            Admin Page
         </Link>

         <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
         >
            <i className="fas fa-bars"></i>
         </button>

         <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
               <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  <i className="fas fa-user fa-fw"></i>
               </Link>
               <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
               >
                  {/* <li>
                     <Link className="dropdown-item" to="#!">
                        Settings
                     </Link>
                  </li>
                  <li>
                     <Link className="dropdown-item" to="#!">
                        Activity Log
                     </Link>
                  </li> */}
                  <li>
                     <hr className="dropdown-divider" />
                  </li>
                  <li>
                     <Link
                        className="dropdown-item"
                        to="#!"
                        onClick={handleLogout}
                     >
                        Logout
                     </Link>
                  </li>
               </ul>
            </li>
         </ul>
      </nav>
   );
}

export default Navbar;
