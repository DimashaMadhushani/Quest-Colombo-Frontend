import {
  Col,
  Row,
  Typography,
  Button,
  Table,
  Popconfirm,
  message,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import "./css/AdminInquiry.css";
import {
  deleteInquiryById,
  getAllFeedBacks,
} from "../../services/feedBackService";

const AdminInquiry = () => {
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchInquiries = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await getAllFeedBacks();
      if (response !== undefined) {
        const feedbackData = response.map((item) => ({
          ...item,
          key: item.id, // Make sure the table rows have a unique key
        }));
        setData(feedbackData);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInquiryById(id);
      message.success("Inquiry deleted successfully");
      // Refresh the table data after deletion
      fetchInquiries();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      message.error("There was an error deleting the inquiry.");
    }
  };

  const cancel = () => {
    message.error("Action canceled");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        record.status === "read" ? (
          <Tag color="orange">Already Read</Tag>
        ) : (
          <Popconfirm
            title="Are you sure you want to mark this message as read?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes, mark as read"
            cancelText="No, keep unread"
          >
            <Button danger>Mark as Read</Button>
          </Popconfirm>
        ),
    },
  ];

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div>
      <Row
        justify="space-between"
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <Col>
          <Title level={2}>Inquiries</Title>
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

export default AdminInquiry;
