import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import React from "react";

const FooterContainer = () => {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <p>© 2024 Quest Colombo. All rights reserved.</p>
        </Col>
        <Col>
          <Space>
            <FacebookOutlined className="home-footer-container-icons" />
            <TwitterOutlined className="home-footer-container-icons" />
            <InstagramOutlined className="home-footer-container-icons" />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default FooterContainer;
