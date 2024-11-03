import {
  CodeSandboxOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, notification } from "antd";
import React, { useState } from "react";
import { resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = ({ setCurrent, formDissable }) => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };
  const onFinish = async (values) => {
    setLoading(true);
    setCurrent(1);
    try {
      const response = await resetPassword(values);
      setCurrent(1);
      openNotificationWithIcon("success", "Success", response?.message);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.error || "An error occurred"
      );
      console.error("Erro ocurred while resetting password", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        name="reset_password"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: "100%",
        }}
        layout="vertical"
        onFinish={onFinish}
        disabled={formDissable}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            { type: "email", message: "Please enter a valid email" },
          ]}
          label="Email"
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="new_password"
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
          ]}
          hasFeedback
          label="New Password"
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["new_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          label="Confirm New Password"
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your otp!",
            },
            { type: "number", message: "Please enter a valid otp number." },
          ]}
          label="OTP"
        >
          <InputNumber
            min={0}
            length={6}
            style={{ width: "100%" }}
            prefix={<CodeSandboxOutlined />}
            placeholder="OTP"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
