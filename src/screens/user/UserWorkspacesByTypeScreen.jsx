import { CheckOutlined, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  notification,
  Row,
  Spin,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getWorkspacesByTypeAndDate } from "../../services/workspacesService";
import {} from "react-router-dom";

const { Title, Text } = Typography;

const UserWorkspacesByTypeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaceType } = location.state || {};
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const fetchWorkspacesByTypeAndDate = async (date) => {
    setLoading(true);
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      const response = await getWorkspacesByTypeAndDate(
        workspaceType.type_name,
        formattedDate
      );
      setWorkspaces(response);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred while fetching workspaces"
      );
      console.error("Erro ocurred while getting workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchWorkspacesByTypeAndDate(selectedDate);
    }
  }, [selectedDate]);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const navigateToSingleWorkspaceView = (workspaceId, workspace) => {
    navigate(`${workspaceId}`, {
      state: { workspace, formattedDate: selectedDate.format("YYYY-MM-DD") },
    });
  };

  return (
    <div>
      {contextHolder}
      <Title level={2} style={{ textAlign: "left", marginBottom: "30px" }}>
        Available Workspaces
      </Title>
      <DatePicker
        defaultValue={selectedDate}
        onChange={onDateChange}
        style={{ marginBottom: "20px" }}
        minDate={dayjs()}
        allowClear={false}
      />
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
          {workspaces.length ? (
            workspaces.map((workspace) => (
              <Col
                key={workspace.id}
                xs={24}
                sm={12}
                md={8}
                lg={6} // Responsive grid for workspaces
              >
                <Card
                  hoverable
                  cover={
                    <img
                      alt={workspace.name}
                      src={workspace.imageUrl}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                  onClick={() =>
                    navigateToSingleWorkspaceView(workspace.id, workspace)
                  }
                >
                  <Title level={4}>{workspace.name}</Title>
                  <Text>{workspace.description}</Text>
                  <br />
                  <Text>Location: {workspace.location}</Text>
                  <br />
                  <Text>Fee: {workspace.fee} LKR</Text>
                  <br />
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      disabled={workspace.slot_1 === "booked"}
                      icon={
                        workspace.slot_1 === "booked" ? (
                          <LockOutlined />
                        ) : (
                          <CheckOutlined />
                        )
                      }
                      style={{ marginBottom: "10px", width: "100%" }}
                    >
                      {workspace.slot_1 === "booked"
                        ? "Slot 1 - Booked"
                        : "Slot 1 - Available"}
                    </Button>
                    <Button
                      disabled={workspace.slot_2 === "booked"}
                      icon={
                        workspace.slot_2 === "booked" ? (
                          <LockOutlined />
                        ) : (
                          <CheckOutlined />
                        )
                      }
                      style={{ marginBottom: "10px", width: "100%" }}
                    >
                      {workspace.slot_2 === "booked"
                        ? "Slot 2 - Booked"
                        : "Slot 2 - Available"}
                    </Button>
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
                    >
                      {workspace.slot_3 === "booked"
                        ? "Slot 3 - Booked"
                        : "Slot 3 - Available"}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Empty
              description={
                <Text>
                  No Workspaces are available under type{" "}
                  {workspaceType.type_name} on{" "}
                  {selectedDate.format("YYYY-MM-DD")}
                </Text>
              }
            ></Empty>
          )}
        </Row>
      )}
    </div>
  );
};

export default UserWorkspacesByTypeScreen;
