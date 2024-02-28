import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Row,
  message
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import {generateId} from "../../assistants/Generators.js";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Booking = () => {

  const onFinish = (values) => {
    values.date = values.date.format("YYYY-MM-DD");
    values.time = values.time.format("HH:mm:ss");
    values.booking_id = generateId(10, 'b');
    values.user_id = sessionStorage.getItem("loginUserId");
    console.log(values);
    fetch("http://localhost:3344/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        message.success("Booking successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Booking failed. Please try again!");
      });
  };

  return (
    <div>
      <Navbar />
      <Row justify="center">
        <Col span={12}>
          <Form
            {...layout}
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              marginTop: "2rem",
            }}
          >
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="time"
              label="Time"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TimePicker format="HH:mm:ss" />
            </Form.Item>
            <Form.Item
              name="contents"
              label="Contents"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Booking;
