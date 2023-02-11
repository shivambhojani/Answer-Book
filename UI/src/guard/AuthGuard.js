import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const authentication = useSelector((state) => state.authentication);
  console.log("redux state token:: " + authentication.token);
  return authentication.token === null ? <Navigate to="/" /> : <Outlet />;
};

export default AuthGuard;
