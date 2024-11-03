import React from "react";
import UserWorkspaceTypes from "../../components/user/UserWorkspaceTypes";
import UserPackages from "../../components/user/UserPackages";

const UserDashboardMainScreen = () => {
  return (
    <div>
      <UserWorkspaceTypes />
      <UserPackages />
    </div>
  );
};

export default UserDashboardMainScreen;
