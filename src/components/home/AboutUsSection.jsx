import { Col, Row, Typography } from "antd";
import AboutUsImage from "../../assets/about-us.jpg";
import React from "react";

const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <div className="home-about-us-section">
      <Row justify="space-evenly" align="middle">
        <Col xs={24} sm={12} md={10}>
          <Title
            className="home-about-us-section-title"
            style={{ color: "white" }}
          >
            About Us
          </Title>
          <Paragraph className="home-about-us-section-paragraph">
            Quest Colombo is dedicated to providing professionals with the best
            co-working experience. Whether you're working solo or in a team, our
            spaces are designed to foster productivity, creativity, and
            collaboration.
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={10}>
          <img
            src={AboutUsImage}
            alt="About Us"
            className="home-about-us-section-image"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsSection;
