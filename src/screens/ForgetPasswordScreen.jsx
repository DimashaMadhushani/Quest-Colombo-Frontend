import { Button, Col, Row, Steps, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForgetPasswordSVG from "../assets/forgot-password.svg";
import "../styles/page-not-found.styles.css";
import ConfirmEmailForm from "../components/home/ConfirmEmailForm";
import ResetPasswordForm from "../components/home/ResetPasswordForm";

const { Title, Paragraph } = Typography;

const ForgetPasswordScreen = () => {
  const [current, setCurrent] = useState(0);
  const [formDissable, SetFormDissable] = useState(true);

  return (
    <div className="not-found-container">
      <Row
        justify="center"
        align="middle"
        className="not-found-content"
        style={{
          width: "100%",
          maxWidth: "1200px", // Limit max width for large screens
        }}
      >
        <Col xs={24} md={12}>
          <div className="not-found-image">
            <img src={ForgetPasswordSVG} alt="page not found image" />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="not-found-text">
            <Title level={1} className="not-found-title">
              Password Reset
            </Title>
            <div style={{ maxWidth: 400, margin: "0 auto", padding: "40px 0" }}>
              <Steps
                direction="vertical"
                size="large"
                current={current}
                items={[
                  {
                    title: "Confirm Email",
                    description: (
                      <ConfirmEmailForm
                        setCurrent={setCurrent}
                        SetFormDissable={SetFormDissable}
                      />
                    ),
                  },
                  {
                    title: "Reset Password",
                    description: (
                      <ResetPasswordForm
                        setCurrent={setCurrent}
                        formDissable={formDissable}
                      />
                    ),
                  },
                ]}
              />
            </div>
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

export default ForgetPasswordScreen;
