import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, notification, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/authService";
import { loginStart, loginSuccess } from "../../redux/userSlice";
/*import AdminLoginImg from "../../assets/innovation-pana.svg";*/
import "../../styles/admin.styles.css";

const { Title, Text } = Typography;

const AdminLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    dispatch(loginStart());
    try {
      const response = await userLogin(values);

      if (response.user) {
        dispatch(loginSuccess(response.user));
        navigate("/admin-dashboard");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      dispatch(loginFailure(error?.data?.message || "Login failed"));
      console.error("Erro ocurred while login: ", error?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-container"
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}

      <img
        className="admin-login-image"
        src={AdminLoginImg}
        alt="admin-login-img"
      />
      <Form
        name="admin-login"
        initialValues={{
          remember: true,
        }}
        style={{
          minWidth: "400px",
        }}
        onFinish={onFinish}
      >
        <Title level={3}>Admin Login</Title>
        <Text type="secondary">
          Please enter your credentials to access the admin dashboard.
        </Text>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <Link to="/forget-password">Forgot password</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLoginForm;
