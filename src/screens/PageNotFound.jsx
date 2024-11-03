import React from "react";
import { Button, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import NotFoundSVG from "../assets/404-error.svg";
import "../styles/page-not-found.styles.css";

const { Title, Paragraph } = Typography;

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <Row justify="center" align="middle" className="not-found-content">
        <Col xs={24} md={12}>
          <div className="not-found-image">
            <img src={NotFoundSVG} alt="page not found image" />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="not-found-text">
            <Title level={1} className="not-found-title">
              Oops! Page Not Found
            </Title>
            <Paragraph className="not-found-paragraph">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, let's get you back on track.
            </Paragraph>
            <Link to="/">
              <Button type="primary" shape="round" size="large">
                Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PageNotFound;
