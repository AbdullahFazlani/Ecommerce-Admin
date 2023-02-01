import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  const LoggedIn = token ? true : false;
  if (LoggedIn === true && token) {
    return <Outlet />;
  } else if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
};

export default RequireAuth;
