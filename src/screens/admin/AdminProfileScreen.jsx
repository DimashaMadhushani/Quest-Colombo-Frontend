import { Card, Col, Row, Avatar, Typography, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/UserService";
import { getUser } from "../../utils/authUtils";

const AdminProfileScreen = () => {
  const { Title, Text } = Typography;
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchAdmin = async () => {
    setLoading(true);
    try {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      const response = await getUserById(user.id);
      setAdmin(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle" style={{ marginBottom: "30px" }}>
        <Col>
          <Title level={2}>Admin Profile</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            {/* Spinner */}
            {loading ? (
              <Row justify="center" align="middle">
                <Spin size="large" />
              </Row>
            ) : (
              <>
                {/* Avatar */}
                <Row justify="center" align="middle">
                  <Col>
                    <Avatar
                      size={100}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#87d068" }}
                    />
                  </Col>
                </Row>

                {/* Admin Details */}
                <Row justify="center" style={{ marginTop: "20px" }}>
                  <Col span={24}>
                    <Row gutter={[16, 16]} justify="center">
                      {/* Username */}
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "#f0f2f5",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        >
                          <Text strong>Username</Text>
                        </div>
                      </Col>
                      <Col span={16}>
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Text>{admin.username}</Text>
                        </div>
                      </Col>

                      {/* Email */}
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "#f0f2f5",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        >
                          <Text strong>Email</Text>
                        </div>
                      </Col>
                      <Col span={16}>
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Text>{admin.email}</Text>
                        </div>
                      </Col>

                      {/* Role */}
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "#f0f2f5",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        >
                          <Text strong>Role</Text>
                        </div>
                      </Col>
                      <Col span={16}>
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            textAlign: "center",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Text>{admin.role}</Text>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfileScreen;
