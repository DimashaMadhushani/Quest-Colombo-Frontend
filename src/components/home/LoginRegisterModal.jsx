import { Modal, Tabs } from "antd";
import React, { useState } from "react";
import UserLoginForm from "./UserLoginForm";
import UserRegisterForm from "./UserRegisterForm";

const LoginRegisterModal = ({ open = false, handleCancel }) => {
  const items = [
    {
      key: "1",
      label: "Login",
      children: <UserLoginForm handleCancel={handleCancel} />,
    },
    {
      key: "2",
      label: "Register",
      children: <UserRegisterForm handleCancel={handleCancel} />,
    },
  ];

  return (
    <Modal open={open} onCancel={handleCancel} footer={null}>
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default LoginRegisterModal;
