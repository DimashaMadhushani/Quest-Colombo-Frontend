import { Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";
import ImageUploadComponent from "./ImageUploadComponent";

const CreateWorkspaceModal = ({
  isCreateModalVisible,
  setIsCreateModalVisible,
  handleCreateWorkspace,
  isCreateLoading,
  setImageUrl,
  imageUrl,
  workspaceTypes,
}) => {
  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    console.log("imageUrl", imageUrl);
    handleCreateWorkspace({ ...values, imageUrl });
  };

  return (
    <Modal
      open={isCreateModalVisible}
      title="Create a new workspace"
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{
        autoFocus: true,
        htmlType: "submit",
        loading: isCreateLoading,
      }}
      onCancel={() => setIsCreateModalVisible(false)}
      destroyOnClose
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="create_workspace"
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="name"
        label="Workspace Name"
        rules={[
          {
            required: true,
            message: "Please input the workspace name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input the description!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            required: true,
            message: "Please input the location!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price (LKR)"
        name="fee"
        rules={[
          {
            required: true,
            message: "Please enter the workspace price!",
          },
        ]}
      >
        <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="workspace_type_id"
        label="Workspace Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select the workspace type!",
          },
        ]}
      >
        <Select placeholder="Please select a workspace type">
          {workspaceTypes?.map((type) => (
            <Select.Option key={type.id} value={type.id}>
              {type.type_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Workspace Image">
        <ImageUploadComponent setImageUrl={setImageUrl} />
      </Form.Item>
    </Modal>
  );
};

export default CreateWorkspaceModal;
