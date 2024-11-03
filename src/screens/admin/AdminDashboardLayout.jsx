import React from "react";
import { Avatar, Dropdown, Layout, Menu, Modal, Space, theme } from "antd";
import AdminProtectedRoute from "../../components/admin/AdminProtectedRoute";
import Logo from "../../assets/logo.png";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const { Header, Content, Footer } = Layout;

const AdminDashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const goToProfile = () => {
    navigate("/admin-dashboard/admin-profile");
  };

  const goToWorkspaces = () => {
    navigate("/admin-dashboard");
  };

  const goToBookings = () => {
    navigate("/admin-dashboard/bookings");
  };

  const goToPackages = () => {
    navigate("/admin-dashboard/packages");
  };

  const goToUserManagement = () => {
    navigate("/admin-dashboard/user-management");
  };

  const goToInquiry = () => {
    navigate("/admin-dashboard/inquiry");
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
      label: "Workspaces",
      onClick: goToWorkspaces,
    },
    {
      key: "2",
      label: "Packages",
      onClick: goToPackages,
    },
    {
      key: "3",
      label: "Bookings",
      onClick: goToBookings,
    },
    {
      key: "4",
      label: "Manage Users",
      onClick: goToUserManagement,
    },
    {
      key: "5",
      label: "Inquiries",
      onClick: goToInquiry,
    },
  ];

  return (
    <AdminProtectedRoute>
      {contextHolder}
      <Layout className="user-dashboard-layout">
        <Header className="user-dashbaord-layout-header">
          <img
            className="user-dashbaord-layout-logo-image"
            src={Logo}
            alt="logo-image"
          />
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
      </Layout>
    </AdminProtectedRoute>
  );
};

export default AdminDashboardLayout;
