import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { confirmEmail } from "../../services/authService";

const ConfirmEmailForm = ({ setCurrent, SetFormDissable }) => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    setCurrent(0);
    SetFormDissable(true);
    try {
      const response = await confirmEmail(values);
      setCurrent(1);
      SetFormDissable(false);
      openNotificationWithIcon("success", "Success", response?.message);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      console.error("Erro ocurred while confirming email", error?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="confirm_email"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: "100%",
        }}
        layout="vertical"
        onFinish={onFinish}
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

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Confirm Email
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ConfirmEmailForm;
