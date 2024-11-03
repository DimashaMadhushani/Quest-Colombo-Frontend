import { Button, notification, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../../utils/authUtils";

const { Title, Text } = Typography;

const HeroSection = () => {
  const user = useSelector((state) => state.user.user);
  const token = getToken();
  const localUser = getUser();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const handleBookNow = () => {
    if (!user || user?.role !== "user" || (!token && !localUser)) {
      openNotificationWithIcon(
        "info",
        "Info",
        "Please log in to the system to book your workspace"
      );
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div className="home-hero-section">
      {contextHolder}
      <div>
        <Title style={{ color: "#fff", boxShadow: 1 }}>
          Your Ideal Co-working Space
        </Title>
        <Text style={{ fontSize: "18px", color: "#fff" }}>
          Efficiently book and manage your workspace today.
        </Text>
        <br />
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{
            marginTop: "20px",
            backgroundColor: "#0d8751",
            borderColor: "#0d8751",
          }}
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
