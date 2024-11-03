import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import React from "react";

const CreateNewPackageModal = ({
  form,
  isCreateModalVisible,
  setIsCreateModalVisible,
  handleCreatePackage,
  isCreateLoading,
}) => {
  return (
    <Modal
      title="Create New Package"
      open={isCreateModalVisible}
      onCancel={() => {
        setIsCreateModalVisible(false);
        form.resetFields();
      }}
      footer={null}
    >
      <Form
        name="create-package"
        form={form}
        layout="vertical"
        onFinish={handleCreatePackage}
        initialValues={{
          package_name: "",
          details: [" "],
          price: 0,
        }}
      >
        <Form.Item
          label="Package Name"
          name="package_name"
          rules={[{ required: true, message: "Please enter package name" }]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name="details"
          rules={[
            {
              validator: async (_, details) => {
                if (!details || details.length < 2) {
                  return Promise.reject(new Error("At least 2 details"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Details" : ""}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input detail or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Add a detail"
                      style={{
                        width: "90%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Price (LKR)"
          name="price"
          rules={[
            { required: true, message: "Please enter the package price" },
          ]}
        >
          <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={isCreateLoading}
          >
            Create Package
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNewPackageModal;
