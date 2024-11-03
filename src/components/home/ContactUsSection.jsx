import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { createFeedBack } from "../../services/feedBackService";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactUsSection = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Initialize form instance

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "topLeft",
    });
  };

  const onFinish = async (values) => {
    console.log("Form Submitted: ", values);
    setLoading(true);
    try {
      const response = await createFeedBack(values);
      openNotificationWithIcon("success", "Success", response.message);

      // Reset the form fields after successful submission
      await form.resetFields();
      console.log("Form reset successfully.");
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        error?.response?.data?.message || "An error occurred"
      );
      console.error("Error occurred on submit", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed: ", errorInfo);
  };

  return (
    <section className="home-contact-section">
      {contextHolder}
      <div className="contact-container">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div className="contact-info">
              <Title className="contact-title">Get In Touch</Title>
              <Paragraph>
                We would love to hear from you! Fill out the form and we will
                get back to you shortly.
              </Paragraph>

              <Space
                direction="vertical"
                size="middle"
                className="home-contact-section-details"
              >
                <div>
                  <MailOutlined /> Email: info@questcolombo.com
                </div>
                <div>
                  <PhoneOutlined /> Phone: +94 123 456 789
                </div>
                <div>
                  <EnvironmentOutlined /> Location: Colombo, Sri Lanka
                </div>
              </Space>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <Form
              form={form} // Attach form instance here
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed} // Handle form submission failure
              className="contact-form"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  { required: true, message: "Please enter the subject" },
                ]}
              >
                <Input placeholder="Subject" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea rows={4} placeholder="Your Message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                  loading={loading}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ContactUsSection;
