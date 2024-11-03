import React from "react";
import AdminWorkspaceTypes from "../../components/admin/AdminWorkspaceTypes";
import AdminWorkspaces from "../../components/admin/AdminWorkspaces";

const AdminDashboardMainScreen = () => {
  return (
    <div>
      <AdminWorkspaceTypes />
      <AdminWorkspaces />
    </div>
  );
};

export default AdminDashboardMainScreen;
