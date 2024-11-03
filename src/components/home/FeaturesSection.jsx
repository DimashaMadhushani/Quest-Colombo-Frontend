import {
  CalendarOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import React from "react";

const { Meta } = Card;
const { Title } = Typography;

const FeaturesSection = () => {
  return (
    <div className="home-feature-section">
      <Title className="home-feature-section-title ">Our Features</Title>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            className="home-feature-section-card"
            hoverable
            cover={
              <CalendarOutlined className="home-feature-section-card-icon" />
            }
          >
            <Meta
              className="home-feature-section-card-meta"
              title="Real-Time Booking"
              description="Book and manage spaces easily with real-time updates."
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="home-feature-section-card"
            hoverable
            cover={
              <VideoCameraOutlined className="home-feature-section-card-icon" />
            }
          >
            <Meta
              className="home-feature-section-card-meta"
              title="360-Degree View"
              description="Visualize the space before booking with a 360-degree view."
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="home-feature-section-card"
            hoverable
            cover={
              <DashboardOutlined className="home-feature-section-card-icon" />
            }
          >
            <Meta
              className="home-feature-section-card-meta"
              title="Admin Dashboard"
              description="Manage the entire system with a powerful admin dashboard."
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturesSection;
