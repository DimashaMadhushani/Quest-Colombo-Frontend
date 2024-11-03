import {
  Card,
  Col,
  Empty,
  List,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAllPackages } from "../../services/packagesService";

const { Title, Text } = Typography;

// const packages = [
//   {
//     id: 1,
//     package_name: "Base Package",
//     details: [
//       "Basic refreshments (coffee, tea, water)",
//       "Onsite technical support (standard IT assistance)",
//       "Basic printing services (up to 20 pages, black & white)",
//       "Standard free Wi-Fi",
//     ],
//     price: "3000.00",
//     created_at: "2024-10-10T14:08:22.000000Z",
//     updated_at: "2024-10-10T14:08:22.000000Z",
//   },
//   {
//     id: 2,
//     package_name: "Essential Package",
//     details: [
//       "Basic refreshments (coffee, tea, water)",
//       "Onsite technical support (standard IT assistance)",
//       "Basic printing services (up to 20 pages, black & white)",
//       "Standard free Wi-Fi",
//     ],
//     price: "3000.00",
//     created_at: "2024-10-10T14:08:22.000000Z",
//     updated_at: "2024-10-10T14:08:22.000000Z",
//   },
//   {
//     id: 3,
//     package_name: "Premium Package",
//     details: [
//       "Premium refreshments",
//       "Extended onsite technical support",
//       "Unlimited printing services",
//       "High-speed Wi-Fi",
//       "Access to premium lounges",
//     ],
//     price: "7000.00",
//   },
// ];

const UserPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
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

  useEffect(() => {
    fetchAllPackages();
  }, []);

  return (
    <div>
      {contextHolder}
      <Title level={2} style={{ textAlign: "left", marginBottom: "30px" }}>
        Available Packages
      </Title>

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
          {packages?.length > 0 ? (
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
            <Empty description={<Text>No Packages Available</Text>}></Empty>
          )}
        </Row>
      )}
    </div>
  );
};

export default UserPackages;
