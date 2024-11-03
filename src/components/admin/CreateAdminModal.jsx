import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal } from "antd";

const CreateAdminModal = ({
  form,
  isCreateModalVisible,
  setIsCreateModalVisible,
  handleAdminRegister,
  //isCreateLoading,
}) => {
  const validatePassword = (_, value) => {
    if (value && form.getFieldValue("password") !== value) {
      return Promise.reject(new Error("Passwords do not match!"));
    }
    return Promise.resolve();
  };

  const onFinish = (values) => {
    console.log("Form Data:", values); // Console log form data
    handleAdminRegister(values); // Call the package creation function with form values
  };

  return (
    <Modal
      title="Register New Admin"
      open={isCreateModalVisible}
      onCancel={() => {
        setIsCreateModalVisible(false);
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        name="create-admin"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          package_name: "",
          details: [" "],
          price: 0,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User Name"
          name="username"
          rules={[{ required: true, message: "Please enter the user name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            //loading={isCreateLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAdminModal;
