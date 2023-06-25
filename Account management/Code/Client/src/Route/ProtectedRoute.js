import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "../Pages/Login/Login";

export default function ProtectedRoute() {
  const { curruntUser } = useSelector((state) => state.user);
  const isAdmin = curruntUser.isAdmin;
  return isAdmin ? <Outlet /> : <Login />;
}
