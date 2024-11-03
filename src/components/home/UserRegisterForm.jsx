import { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/authService";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/userSlice";

const UserRegisterForm = ({ handleCancel }) => {
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
    try {
      const response = await userRegister(values);

      if (response.user) {
        dispatch(loginSuccess(response.user));
        openNotificationWithIcon(
          "success",
          "Success",
          "Registration Successful"
        );
        handleCancel();
        // navigate("/user-dashboard");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.error || "An error occurred"
      );
      dispatch(loginFailure(error?.data?.erro || "Login failed"));
      console.error("Erro ocurred while login: ", error.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="register"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: "100%",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
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

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserRegisterForm;
