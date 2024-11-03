import { Button, notification, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoookingByUserId } from "../../services/bookingService";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;

const UserBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.user.user);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const fetchAllBookingsByUserId = async (userId) => {
    setLoading(true);
    try {
      const response = await getAllBoookingByUserId(userId);
      setBookings(response);
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
    if (user) {
      fetchAllBookingsByUserId(user.id);
    }
  }, [user]);

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
  return (
    <div style={{}}>
      {contextHolder}
      <Title level={2}>Your Bookings</Title>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        style={{}}
        loading={loading}
      />
    </div>
  );
};

export default UserBookings;
