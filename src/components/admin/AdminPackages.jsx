import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  List,
  notification,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createPackage,
  deletePackageById,
  getAllPackages,
} from "../../services/packagesService";
import CreateNewPackageModal from "./CreateNewPackageModal";

const { Title, Text } = Typography;

const AdminPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deletePackageById(id);
      setPackages(packages.filter((pkg) => pkg.id !== id));
      openNotificationWithIcon(
        "success",
        "Success",
        "Package deleted successfully"
      );
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred while deleting the package"
      );
      console.error("Error occurred while deleting package: ", error);
    }
  };

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

  const fetchAllPackages = async () => {
    setLoading(true);
    try {
      const response = await getAllPackages();
      setPackages(response);
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

  const handleCreatePackage = async (values) => {
    setIsCreateLoading(true);
    try {
      const response = await createPackage(values); // Send API request to create the package
      openNotificationWithIcon(
        "success",
        "Success",
        "Package created successfully"
      );
      setPackages((prevPackages) => [...prevPackages, response]);
      setIsCreateModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "Failed to create package"
      );
      console.error("Error occurred while creating package: ", error);
    } finally {
      setIsCreateLoading(false);
      form.resetFields();
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      {contextHolder}
      <Row
        justify="space-between"
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <Col>
          <Title level={2}>Packages</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
            style={{ borderRadius: "5px" }}
          >
            Create Package
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <Col
              key={pkg.id}
              xs={24}
              sm={12}
              md={8}
              lg={6} // Responsive layout: 1 card on extra-small, 2 cards on small, 3 on medium, 4 on large+
            >
              <Card
                hoverable
                className="package-card"
                style={{
                  textAlign: "left",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
                actions={[
                  <EditOutlined key="edit" />,
                  <Popconfirm
                    title="Delete the Package"
                    description="Are you sure to delete this package?"
                    onConfirm={() => handleDelete(pkg.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined key="delete" />,
                  </Popconfirm>,
                ]}
              >
                <Title level={4}>{pkg.package_name}</Title>
                <List
                  dataSource={pkg.details}
                  renderItem={(detail) => <List.Item>• {detail}</List.Item>}
                  style={{ marginBottom: "15px" }}
                />
                <Text strong style={{ fontSize: "16px", color: "#1890ff" }}>
                  Price: {pkg.price} LKR
                </Text>
              </Card>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
      <CreateNewPackageModal
        form={form}
        isCreateModalVisible={isCreateModalVisible}
        setIsCreateModalVisible={setIsCreateModalVisible}
        handleCreatePackage={handleCreatePackage}
        isCreateLoading={isCreateLoading}
      />
    </div>
  );
};

export default AdminPackages;
