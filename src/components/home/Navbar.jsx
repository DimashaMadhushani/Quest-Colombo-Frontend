import React, { useEffect, useState } from "react";
import { Button, Menu, Modal } from "antd";
import Logo from "../../assets/logo.png";
import {
  ExclamationCircleOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LoginRegisterModal from "./LoginRegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const Navbar = ({ currentSection }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home-section");
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const token = getToken();
  const localUser = getUser();

  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: <a href="#home-section">Home</a>,
      key: "home-section",
    },
    {
      label: <a href="#features-section">Features</a>,
      key: "features-section",
    },
    {
      label: <a href="#about-us-section">About Us</a>,
      key: "about-us-section",
    },
    {
      label: <a href="#contact-us-section">Contact Us</a>,
      key: "contact-us-section",
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const menuOnClick = (e) => {
    setCurrent(e.key);
  };

  const goToDashboard = () => {
    navigate("/user-dashboard");
  };

  const confirmLogout = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to logout from the session?",
      okText: "Logout",
      cancelText: "cancel",
      onOk: () => {
        dispatch(logout());
      },
    });
  };

  useEffect(() => {
    setCurrent(currentSection);
  }, [currentSection]);

  return (
    <>
      {contextHolder}
      <div className="navbar-logo">
        <img src={Logo} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        items={menuItems}
        onClick={menuOnClick}
      />
      <div className="navbar-btn-container">
        {!user || user?.role !== "user" || (!token && !localUser) ? (
          <Button
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            onClick={showModal}
          >
            Login / Register
          </Button>
        ) : (
          <>
            <Button type="link" onClick={confirmLogout}>
              Logout
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<LoginOutlined />}
              onClick={goToDashboard}
            >
              Dashboard
            </Button>
          </>
        )}
      </div>
      <LoginRegisterModal open={open} handleCancel={handleCancel} />
    </>
  );
};

export default Navbar;
