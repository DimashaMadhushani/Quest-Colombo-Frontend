import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Space,
  theme,
} from "antd";
import Logo from "../../assets/logo.png";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import "../../styles/user-dashboard-layout.styles.css";
import UserProtectedRoute from "../../components/user/UserProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const UserDashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const user = useSelector((state) => state.user.user);

  const goToProfile = () => {
    navigate("/user-dashboard/user-profile");
  };

  const goToHome = () => {
    navigate("/user-dashboard");
  };

  const goToBookings = () => {
    navigate("/user-dashboard/bookings");
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

  const profileItems = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      onClick: goToProfile,
    },
    {
      key: "3",
      label: "Logout",
      onClick: confirmLogout,
    },
  ];

  const navItems = [
    {
      key: "1",
      label: "Home",
      onClick: goToHome,
    },
    {
      key: "2",
      label: "Bookings",
      onClick: goToBookings,
    },
  ];

  return (
    <UserProtectedRoute>
      {contextHolder}
      <Layout className="user-dashboard-layout">
        <Header className="user-dashbaord-layout-header">
          <Link
            to="/"
            style={{ height: "100%", display: "flex", alignItems: "center" }}
          >
            <img
              className="user-dashbaord-layout-logo-image"
              src={Logo}
              alt="logo-image"
            />
          </Link>

          <Menu
            className="user-dashbaord-layout-menu"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
          />

          <Dropdown
            menu={{
              items: profileItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  className="user-dashbaord-layout-avatar"
                  icon={<UserOutlined />}
                />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content className="user-dashbaord-layout-content-container">
          <div
            className="user-dashbaord-layout-content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer className="user-dashbaord-layout-footer">
          Quest Colombo ©{new Date().getFullYear()} Created by Quest Colombo
        </Footer> */}
      </Layout>
    </UserProtectedRoute>
  );
};

export default UserDashboardLayout;
