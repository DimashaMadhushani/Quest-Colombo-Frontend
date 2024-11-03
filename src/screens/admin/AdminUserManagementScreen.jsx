import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  Form,
  notification,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createAdmin,
  deleteUserById,
  getAllUsers,
} from "../../services/UserService";
import CreateAdminModal from "../../components/admin/CreateAdminModal";

const { Option } = Select;

const AdminUserManagementScreen = () => {
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all");
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const fetchUsers = async (role = "all") => {
    setLoading(true);
    try {
      const response = await getAllUsers(role);
      if (response !== undefined) {
        const userData = response.map((item) => ({
          ...item,
          key: item.id,
        }));
        setData(userData);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const handleAdminRegister = async (values) => {
    try {
      console.log("This user page admin", values);
      const response = await createAdmin(values);
      openNotificationWithIcon(
        "success",
        "Success",
        "Admin registered successfully"
      );
      fetchUsers();
      setIsCreateModalVisible(false);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "Failed to create package"
      );
      console.error("Error occurred while creating package: ", error);
    } finally {
      form.resetFields();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      message.success("User deleted successfully");
      fetchUsers(selectedRole);
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("There was an error deleting the user.");
    }
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    fetchUsers(value);
  };

  const cancel = () => {
    message.error("Action canceled");
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status === "active" ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Activated
          </Tag>
        ) : record.status === "deactivated" ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Deactivated
          </Tag>
        ) : (
          <Tag color="default">NULL</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to deactivate this user?"
          onConfirm={() => handleDelete(record.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            disabled={record.status === "deactivated" ? true : false}
            danger
          >
            Deactivate
          </Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {contextHolder}
      <CreateAdminModal
        form={form}
        isCreateModalVisible={isCreateModalVisible}
        setIsCreateModalVisible={setIsCreateModalVisible}
        handleAdminRegister={handleAdminRegister}
        //isCreateLoading={isCreateLoading}
      />
      <Row
        justify="space-between"
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <Col>
          <Title level={2}>Manage Users</Title>
        </Col>
        <Col>
          <Select
            defaultValue="all"
            style={{ width: 120, marginRight: "10px" }} // Style the select box
            onChange={handleRoleChange} // Handle role change
            title="Filter By Role"
          >
            <Option value="all">All Users</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
            style={{ borderRadius: "5px" }}
          >
            Register Admin
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        loading={loading} // Add loading prop here
      />
    </div>
  );
};

export default AdminUserManagementScreen;
