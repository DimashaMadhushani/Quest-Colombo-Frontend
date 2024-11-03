import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getToken,
  getUser,
  removeToken,
  removeUser,
} from "../../utils/authUtils";

const UserProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const token = getToken();
  const localUser = getUser();

  if (!user || user?.role !== "user" || (!token && !localUser)) {
    removeToken();
    removeUser();
    return <Navigate to="/" />;
  }

  return children;
};

export default UserProtectedRoute;
