import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  List,
  notification,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Image360Viewer from "../../components/user/Image360Viewer";
import { getAllPackages } from "../../services/packagesService";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createBooking } from "../../services/bookingService";
import { getUserById } from "../../services/UserService";

const { Text, Title } = Typography;
const { Option } = Select;

const tiers = [
  {
    id: 1,
    name: "platinum",
    description: "No discount is available.",
    discount: 0,
  },
  {
    id: 2,
    name: "silver",
    description: "Discount 2% is available.",
    discount: 2,
  },
  {
    id: 3,
    name: "gold",
    description: "Discount 5% is available.",
    discount: 5,
  },
];

const UserWorkspaceScreen = () => {
  const location = useLocation();
  const { workspace, formattedDate } = location.state || {};
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageLoading, setPackageLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const loggedUser = useSelector((state) => state.user.user);
  const [stripeToken, setStripeToken] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

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

  const KEY =
    "pk_test_51Q9YlcF8iH0Dbw29Nqjo2HndgfPnbys93GiTE5XIjNPiO1074hGHUQzX5Q86BJDtdaAg0uuSLZLjbUHQvP69Gv3R00R335nHq6";

  const onToken = (token) => {
    console.log("This is stripe token", token);
    setStripeToken(token);
  };

  const getTotalAmount = () => {
    const result = packages.find((pkg) => pkg.id === selectedPackage);
    let totalCharges =
      parseFloat(workspace.fee) + (result ? parseFloat(result.price) : 0);

    if (selectedTier) {
      if (selectedTier === "silver") {
        totalCharges = totalCharges * 0.98;
      } else if (selectedTier === "gold") {
        totalCharges = totalCharges * 0.95;
      }
    }
    return totalCharges;
  };

  const onFinish = async (values) => {
    // Construct the new object with the form values

    const result = packages.find((pkg) => pkg.id === selectedPackage);

    let bookingStart = "";
    let bookingEnd = "";

    if (values.bookedSlot === "slot_1") {
      bookingStart = "8:00:00";
      bookingEnd = "10:00:00";
    }
    if (values.bookedSlot === "slot_2") {
      bookingStart = "1o:30:00";
      bookingEnd = "13:30:00";
    }
    if (values.bookedSlot === "slot_3") {
      bookingStart = "14:00:00";
      bookingEnd = "17:00:00";
    }

    let totalCharges =
      parseFloat(workspace.fee) + (result ? parseFloat(result.price) : 0);

    if (selectedTier) {
      if (selectedTier === "silver") {
        totalCharges = totalCharges * 0.98;
      } else if (selectedTier === "gold") {
        totalCharges = totalCharges * 0.95;
      }
    }

    // setTotalAmount(totalCharges);

    console.log("This is package", result);
    console.log("This is booking start", bookingStart);
    console.log("This is booking end", bookingEnd);

    const bookingData = {
      // Assuming workspace ID exists
      totalCharges: totalCharges,
      bookedDate: values.bookedDate.format("YYYY-MM-DD"), // Formatting the date
      bookedTime: dayjs().format("HH:mm:ss"),
      paymentMethod: "Online",
      paymentStatus: "Paid",
      bookedSlot: values.bookedSlot,
      startTime: bookingStart,
      endTime: bookingEnd,
      user_id: loggedUser.id,
      workspace_id: workspace.id,
      package_id: selectedPackage ? selectedPackage : null,
      tier: selectedTier ? selectedTier : null,
    };

    // Log the constructed object (for testing purposes)
    console.log("Booking Data: ", bookingData);
    //console.log("This token: ", bookingData.stripeToken);
    setSelectedBookingData(bookingData);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const bookingObj = {
          stripeToken: stripeToken.id,
          ...selectedBookingData,
        };

        const response = await createBooking(bookingObj, loggedUser.id);
        console.log("order placed", response);
        openNotificationWithIcon(
          "success",
          "Booking Successful",
          "Your booking has been placed successfully!"
        );
      } catch (err) {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Booking Failed",
          err?.response?.data?.message || "An error occurred during booking."
        );
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const fetchAllPackages = async () => {
    setPackageLoading(true);
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
      setPackageLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <DatePicker
        defaultValue={dayjs(formattedDate, "YYYY-MM-DD")}
        disabled
        style={{ marginBottom: "20px" }}
      />

      <Image360Viewer imageUrl={workspace.imageUrl} />

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Title level={3} style={{ marginBottom: "10px" }}>
          {workspace.name}
        </Title>
        <Text>{workspace.description}</Text>
        <div
          style={{ marginTop: "10px", fontWeight: "bold", color: "#1890ff" }}
        >
          <Text>Location: {workspace.location}</Text>
        </div>
        <div
          style={{ marginTop: "10px", fontWeight: "bold", color: "#ff4d4f" }}
        >
          <Text>Price: {workspace.fee} LKR</Text>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Title level={4}>Available Slots</Title>
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Button
              disabled={workspace.slot_1 === "booked"}
              icon={
                workspace.slot_1 === "booked" ? (
                  <LockOutlined />
                ) : (
                  <CheckOutlined />
                )
              }
              style={{ width: "100%" }}
              onClick={() => setSelectedSlot(1)}
            >
              Slot 1: {workspace.slot_1 === "booked" ? "Booked" : "Available"}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Button
              disabled={workspace.slot_2 === "booked"}
              icon={
                workspace.slot_2 === "booked" ? (
                  <LockOutlined />
                ) : (
                  <CheckOutlined />
                )
              }
              style={{ width: "100%" }}
              onClick={() => setSelectedSlot(2)}
            >
              Slot 2: {workspace.slot_2 === "booked" ? "Booked" : "Available"}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Button
              disabled={workspace.slot_3 === "booked"}
              icon={
                workspace.slot_3 === "booked" ? (
                  <LockOutlined />
                ) : (
                  <CheckOutlined />
                )
              }
              style={{ width: "100%" }}
              onClick={() => setSelectedSlot(3)}
            >
              Slot 3: {workspace.slot_3 === "booked" ? "Booked" : "Available"}
            </Button>
          </Col>
        </Row>
      </div>

      {/* Packages Section */}
      <div style={{ marginTop: "30px" }}>
        <Title level={4}>Packages Available</Title>
        {packageLoading ? (
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
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <Col key={pkg.id} xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    style={{
                      // textAlign: "center",
                      borderRadius: "10px",
                      borderColor:
                        selectedPackage === pkg.id ? "#00b96b" : "#f0f0f0",
                      backgroundColor: "white",
                    }}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <Title level={5}>{pkg.package_name}</Title>
                    <List
                      size="small"
                      dataSource={pkg.details}
                      renderItem={(item) => <List.Item>• {item}</List.Item>}
                    />
                    <div
                      style={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        color: "#ff4d4f",
                        textAlign: "center",
                      }}
                    >
                      <Text>{pkg.price} LKR</Text>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <Empty description={<Text>No Packages Available</Text>}></Empty>
            )}
          </Row>
        )}
      </div>

      {/* Teiers available */}
      <div style={{ marginTop: "30px" }}>
        <Title level={4}>Tiers Available</Title>
        <Row gutter={[16, 16]} justify="center">
          {tiers?.map((tier) => (
            <Col key={tier.id} xs={24} sm={12} md={8}>
              <Badge.Ribbon text={`Discount ${tier.discount}%`} color="purple">
                <Card
                  hoverable
                  style={{
                    borderRadius: "10px",
                    borderColor:
                      selectedTier === tier.name ? "#00b96b" : "#f0f0f0",
                    backgroundColor: "white",
                  }}
                  onClick={() => setSelectedTier(tier.name)}
                  title={tier.name}
                >
                  <Text>{tier.description}</Text>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      </div>

      {/* Book Now Form  */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Title level={4}>Book Now</Title>
        <Row gutter={[32, 16]} justify="right">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form
              layout="vertical"
              name="create_booking"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: "100%",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Selected Date"
                name="bookedDate"
                rules={[
                  { required: true, message: "Please select a booking date!" },
                ]}
                initialValue={dayjs(formattedDate, "YYYY-MM-DD")}
              >
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Select Slot"
                rules={[
                  {
                    required: true,
                    message: "Please select a slot!",
                  },
                ]}
                name="bookedSlot"
              >
                <Select
                  placeholder="Select a slot"
                  value={selectedSlot}
                  onChange={setSelectedSlot}
                >
                  <Option
                    value="slot_1"
                    disabled={workspace.slot_1 === "booked"}
                  >
                    Slot 1:{" "}
                    {workspace.slot_1 === "available" ? "Available" : "Booked"}
                  </Option>
                  <Option
                    value="slot_2"
                    disabled={workspace.slot_2 === "booked"}
                  >
                    Slot 2:{" "}
                    {workspace.slot_2 === "available" ? "Available" : "Booked"}
                  </Option>
                  <Option
                    value="slot_3"
                    disabled={workspace.slot_3 === "booked"}
                  >
                    Slot 3:{" "}
                    {workspace.slot_3 === "available" ? "Available" : "Booked"}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Select Package" name="package_id">
                <Select
                  placeholder="Select a package"
                  value={selectedPackage}
                  onChange={setSelectedPackage}
                >
                  {packages.map((pkg) => (
                    <Select.Option key={pkg.id} value={pkg.id}>
                      {pkg.package_name} - {pkg.price} LKR
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Select Tier" name="tier">
                <Select
                  placeholder="Select a Tier"
                  value={selectedTier}
                  onChange={setSelectedTier}
                >
                  <Option value="silver" disabled={admin.points <= 1000}>
                    Silver
                  </Option>
                  <Option value="gold" disabled={admin.points <= 4000}>
                    Gold
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <StripeCheckout
                  name="Quest Colombo"
                  shippingAddress
                  description={`Your total is Rs.${getTotalAmount()}`}
                  amount={getTotalAmount() * 100}
                  token={onToken}
                  stripeKey={KEY}
                  currency="LKR"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Book Now
                  </Button>
                </StripeCheckout>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserWorkspaceScreen;
