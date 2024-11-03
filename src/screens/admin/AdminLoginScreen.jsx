import { Layout, theme } from "antd";
import React from "react";
import "../../styles/user-dashboard-layout.styles.css";
import AdminLoginForm from "../../components/admin/AdminLoginForm";

const { Content, Footer } = Layout;

const AdminLoginScreen = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="user-dashboard-layout">
      <Content className="user-dashbaord-layout-content-container">
        <div
          className="user-dashbaord-layout-content"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AdminLoginForm />
        </div>
      </Content>
      <Footer className="user-dashbaord-layout-footer">
        Quest Colombo Admin ©{new Date().getFullYear()} Created by Quest Colombo
      </Footer>
    </Layout>
  );
};

export default AdminLoginScreen;
