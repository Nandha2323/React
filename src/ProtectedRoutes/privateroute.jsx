import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

function Privateroute() {
  const token = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default Privateroute;
