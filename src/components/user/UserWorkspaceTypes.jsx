import { RightOutlined } from "@ant-design/icons";
import { Card, Col, Empty, notification, Row, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWorkspaceTypes } from "../../services/workspaceTypesService";

const { Title, Text } = Typography;

const UserWorkspaceTypes = () => {
  const navigate = useNavigate();
  const [workspaceTypes, setWorkspaceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onCardClick = (workspaceType) => {
    navigate(`workspace-types/${workspaceType.id}`, {
      state: { workspaceType },
    });
  };

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const fetchAllworkspaceTypes = async () => {
    setLoading(true);
    try {
      const response = await getAllWorkspaceTypes();
      setWorkspaceTypes(response);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.data?.message || "An error occurred"
      );
      console.error("Erro ocurred while getting workspace types: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllworkspaceTypes();
  }, []);

  return (
    <div>
      {contextHolder}
      <Title level={2} style={{ textAlign: "left", marginBottom: "30px" }}>
        Select Your Workspace Type
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
          {workspaceTypes?.length > 0 ? (
            workspaceTypes.map((workspaceType) => (
              <Col
                key={workspaceType.id}
                xs={24}
                sm={12}
                md={8}
                lg={6} // Responsive layout: 1 card on extra-small, 2 cards on small, 3 on medium, 4 on large+
              >
                <Card
                  hoverable
                  className="workspace-card"
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                  onClick={() => onCardClick(workspaceType)}
                >
                  <Title level={4}>
                    {workspaceType.type_name} <RightOutlined />
                  </Title>
                </Card>
              </Col>
            ))
          ) : (
            <Empty
              description={<Text>No Workspace types Available</Text>}
            ></Empty>
          )}
        </Row>
      )}
    </div>
  );
};

export default UserWorkspaceTypes;
