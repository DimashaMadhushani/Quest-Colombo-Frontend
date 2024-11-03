import { Button, notification, Select, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoookings } from "../../services/bookingService";
import { log } from "three/webgpu";

const { Text, Title } = Typography;

const AdminBookingListScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [usernames, setUsernames] = useState([]);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const columns = [
    {
      title: "Booked Date",
      dataIndex: "bookedDate",
      key: "bookedDate",
      render: (text) => <Text>{new Date(text).toLocaleDateString()}</Text>,
    },
    {
      title: "Booked Time",
      dataIndex: "bookedTime",
      key: "bookedTime",
      render: (time) => <Text>{time.slice(0, 5)}</Text>,
    },
    {
      title: "Username",
      dataIndex: ["user", "username"],
      key: "workspace",
    },
    {
      title: "Workspace",
      dataIndex: ["workspace", "name"],
      key: "workspace",
    },
    {
      title: "Total Charges",
      dataIndex: "totalCharges",
      key: "totalCharges",
      render: (charges) => <Text>{`${charges} LKR`}</Text>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Tag color={method === "Online" ? "green" : "blue"}>{method}</Tag>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() =>
            navigate(`${record.id}`, {
              state: { record },
            })
          }
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleUsernameChange = (selectedUsername) => {
    setLoading(true);
    if (selectedUsername) {
      const filtered = bookings.filter(
        (booking) => booking.user.username === selectedUsername
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
    setLoading(false);
  };

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBoookings();
      setBookings(response);
      setFilteredBookings(response);

      // Extract unique usernames
      const uniqueUsernames = [
        ...new Set(response.map((booking) => booking.user.username)),
      ].map((username) => ({ value: username, label: username }));
      setUsernames(uniqueUsernames);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      console.error("Erro ocurred while getting booking list: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div style={{}}>
      {contextHolder}
      <Title level={2}>All Bookings</Title>
      <Select
        showSearch
        placeholder="Search a username"
        optionFilterProp="label"
        onChange={handleUsernameChange}
        options={usernames}
        allowClear
        style={{ width: 200, marginBottom: 20 }}
        loading={loading}
      />
      <Table
        columns={columns}
        dataSource={filteredBookings}
        rowKey="id"
        style={{}}
        loading={loading}
      />
    </div>
  );
};

export default AdminBookingListScreen;
