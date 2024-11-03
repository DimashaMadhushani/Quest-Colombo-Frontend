import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createAdmin,
  deleteUserById,
  getAllUsers,
} from "../../services/UserService";
import { createPackage } from "../../services/packagesService";
import CreateAdminModal from "../../components/admin/CreateAdminModal";

const { Option } = Select; // Import Option from Select

const AdminUserManagementScreen = () => {
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("all"); // State to hold selected role
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  //const [packages, setPackages] = useState([]);

  const fetchUsers = async (role = "all") => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await getAllUsers(role); // Pass role as a parameter
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
    //setIsCreateLoading(true);
    try {
      console.log("This user page admin", values);
      const response = await createAdmin(values);
      openNotificationWithIcon(
        "success",
        "Success",
        "Admin registered successfully"
      );
      //setPackages((prevPackages) => [...prevPackages, response]);
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
      //setIsCreateLoading(false);
      form.resetFields();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      message.success("User deleted successfully");
      // Refresh the table data after deletion
      fetchUsers(selectedRole); // Fetch users again with the selected role
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
    fetchUsers(value); // Fetch users based on the selected role
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.id)} // Use the handleDelete function
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers(); // Fetch all users on initial render
  }, []);

  return (
    <div>
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
