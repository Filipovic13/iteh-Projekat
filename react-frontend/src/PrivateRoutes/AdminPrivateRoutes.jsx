import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function AdminPrivateRoutes() {
  let navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/admin/checkingAuthenticated").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setLoading(false);
    });
    return () => {
      setAuthenticated(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        //Nelogovan korisnik
        swal("Unauthorized", err.response.data.message, "warning");
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        //Ulogovan korisnik koji nije admin - Access denied
        swal("Forbidden", error.response.data.message, "warning");
        navigate("/");
      } else if (error.response.status === 404) {
        //Page not found
        swal("404 Error", "Page not found", "warning");
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" />;
}
