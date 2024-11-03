import {
  Button,
  Card,
  Col,
  Empty,
  notification,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  createWorkspace,
  deleteWorkspaceById,
  getAllWorkspaces,
} from "../../services/workspacesService";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllWorkspaceTypes } from "../../services/workspaceTypesService";

const { Title, Text } = Typography;

const AdminWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [workspaceTypes, setWorkspaceTypes] = useState([]);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const fetchAllworkspaces = async () => {
    setLoading(true);
    try {
      const response = await getAllWorkspaces();
      setWorkspaces(response);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      console.error("Erro ocurred while getting workspaces: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (values) => {
    setIsCreateLoading(true);
    try {
      const response = await createWorkspace(values); // Send API request to create the package
      openNotificationWithIcon(
        "success",
        "Success",
        "Workspace created successfully"
      );
      console.log(response);
      fetchAllworkspaces();
      // setWorkspaces((prevTypes) => [...prevTypes, response]);
      setIsCreateModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "Failed to create Workspace"
      );
      console.error("Error occurred while creating workspace: ", error);
    } finally {
      setImageUrl("");
      setIsCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkspaceById(id);
      setWorkspaces(workspaces.filter((type) => type.id !== id));
      openNotificationWithIcon(
        "success",
        "Success",
        "Workspace deleted successfully"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred while deleting the workspace"
      );
      console.error("Error occurred while deleting workspace: ", error);
    }
  };

  const fetchAllworkspaceTypes = async () => {
    try {
      const response = await getAllWorkspaceTypes();
      setWorkspaceTypes(response);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      console.error("Erro ocurred while getting packages: ", error);
    }
  };

  useEffect(() => {
    if (isCreateModalVisible) {
      fetchAllworkspaceTypes();
    }
  }, [isCreateModalVisible]);

  useEffect(() => {
    fetchAllworkspaces();
  }, []);

  return (
    <div>
      {contextHolder}
      <Title level={2} style={{ textAlign: "left", marginBottom: "30px" }}>
        Workspaces
      </Title>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Workspace
        </Button>
      </div>
      {loading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {workspaces?.length > 0 ? (
            workspaces?.map((workspace) => (
              <Col
                key={workspace.id}
                xs={24}
                sm={12}
                md={8}
                lg={6} // Responsive layout: 1 card on extra-small, 2 cards on small, 3 on medium, 4 on large+
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt={workspace.name}
                      src={workspace.imageUrl}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  }
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                  actions={[
                    <Popconfirm
                      key={workspace.id}
                      title="Delete the Workspace Type"
                      description="Are you sure to delete this type?"
                      onConfirm={() => handleDelete(workspace.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />,
                    </Popconfirm>,
                  ]}
                >
                  <Title level={4}>{workspace.name}</Title>
                  <Text>{workspace.description}</Text>
                  <br />
                  <Text>Location: {workspace.location}</Text>
                  <br />
                  <Text>
                    Workspace Type: {workspace.workspace_type.type_name}
                  </Text>
                  <br />
                  <Text>Fee: {workspace.fee} LKR</Text>
                  <br />
                </Card>
              </Col>
            ))
          ) : (
            <Empty description={<Text>No Workspace Available</Text>}>
              <Button type="primary" onClick={showCreateModal}>
                Create Now
              </Button>
            </Empty>
          )}
        </Row>
      )}
      <CreateWorkspaceModal
        isCreateModalVisible={isCreateModalVisible}
        setIsCreateModalVisible={setIsCreateModalVisible}
        handleCreateWorkspace={handleCreateWorkspace}
        isCreateLoading={isCreateLoading}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        workspaceTypes={workspaceTypes}
      />
    </div>
  );
};

export default AdminWorkspaces;
