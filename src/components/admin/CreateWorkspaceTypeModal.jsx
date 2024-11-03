import { Form, Input, Modal } from "antd";

const CreateWorkspaceTypeModal = ({
  isCreateModalVisible,
  setIsCreateModalVisible,
  handleCreateWorkspaceType,
  isCreateLoading,
}) => {
  const [form] = Form.useForm();

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    handleCreateWorkspaceType(values);
  };

  return (
    <Modal
      open={isCreateModalVisible}
      title="Create a new workspace Type"
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
          name="create_workspace_type"
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="typename"
        label="Type Name"
        rules={[
          {
            required: true,
            message: "Please input the workspace type!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Modal>
  );
};

export default CreateWorkspaceTypeModal;
