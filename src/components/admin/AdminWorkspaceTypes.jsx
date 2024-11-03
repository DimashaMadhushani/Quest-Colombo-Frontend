import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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
  createWorkspaceType,
  deleteWorkspaceTypeById,
  getAllWorkspaceTypes,
} from "../../services/workspaceTypesService";
import CreateWorkspaceTypeModal from "./CreateWorkspaceTypeModal";

const { Title, Text } = Typography;

const AdminWorkspaceTypes = () => {
  const [workspaceTypes, setWorkspaceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

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

  const fetchAllworkspaceTypes = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspaceType = async (values) => {
    setIsCreateLoading(true);
    try {
      const response = await createWorkspaceType(values); // Send API request to create the package
      openNotificationWithIcon(
        "success",
        "Success",
        "Workspace Type created successfully"
      );
      setWorkspaceTypes((prevTypes) => [...prevTypes, response]);
      setIsCreateModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "Failed to create Workspace Type"
      );
      console.error("Error occurred while creating workspace type: ", error);
    } finally {
      setIsCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWorkspaceTypeById(id);
      setWorkspaceTypes(workspaceTypes.filter((type) => type.id !== id));
      openNotificationWithIcon(
        "success",
        "Success",
        "Workspace Type deleted successfully"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message ||
          "An error occurred while deleting the workspace type"
      );
      console.error("Error occurred while deleting workspace type: ", error);
    }
  };

  useEffect(() => {
    fetchAllworkspaceTypes();
  }, []);

  return (
    <div>
      {contextHolder}
      <Title level={2} style={{ textAlign: "left", marginBottom: "30px" }}>
        Workspace Types
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
          Workspace Type
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
          {workspaceTypes?.length > 0 ? (
            workspaceTypes?.map((workspaceType) => (
              <Col
                key={workspaceType.id}
                xs={24}
                sm={12}
                md={8}
                lg={6} // Responsive layout: 1 card on extra-small, 2 cards on small, 3 on medium, 4 on large+
              >
                <Card
                  hoverable
                  className="workspace-card"
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                  actions={[
                    <Popconfirm
                      key={workspaceType.id}
                      title="Delete the Workspace Type"
                      description="Are you sure to delete this type?"
                      onConfirm={() => handleDelete(workspaceType.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />,
                    </Popconfirm>,
                  ]}
                >
                  <Title level={4}>{workspaceType?.type_name}</Title>
                </Card>
              </Col>
            ))
          ) : (
            <Empty description={<Text>No Workspace types Available</Text>}>
              <Button type="primary" onClick={showCreateModal}>
                Create Now
              </Button>
            </Empty>
          )}
        </Row>
      )}
      <CreateWorkspaceTypeModal
        isCreateModalVisible={isCreateModalVisible}
        setIsCreateModalVisible={setIsCreateModalVisible}
        handleCreateWorkspaceType={handleCreateWorkspaceType}
        isCreateLoading={isCreateLoading}
      />
    </div>
  );
};

export default AdminWorkspaceTypes;
