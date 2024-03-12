import { useState, useEffect } from "react";
import { Button, Form, Modal, Input, Space, Rate, message } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { createFeedback } from "../../dataControllers/feedbackController";
import dateFormat from "../../assistants/date.format";
import { generateId } from "../../assistants/Generators";
import styles from "../../pages/Product/Product.module.css";
import axios from "axios";

const FeedbackForm = (record) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = sessionStorage.getItem("loginUserId");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    feedback_id: "",
    user_id: "",
    product_id: "",
    description: "",
    rating: 0,
    createdAt: "",
  });

  console.log("Report Artwork ID: ", record);

  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:3344/users/${currentUserId}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    setFormData({
      ...formData,
      feedback_id: generateId(30, ""),
      user_id: currentUserId,
      product_id: record.product,
      createdAt: dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss"),
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      ...formData,
      feedback_id: "",
      user_id: "",
      product_id: "",
      description: "",
      rating: 0,
      createdAt: "",
    });
  };

  const handleSubmit = (event) => {
    setIsModalOpen(false);
    event.preventDefault();
    createFeedback(formData);
    setFormData({
      ...formData,
      feedback_id: "",
      user_id: "",
      product_id: "",
      description: "",
      rating: 0,
      createdAt: "",
    });
    message.success("Feedback Successful!!!");
  };

  console.log("Report Data: ", formData);

  return (
    <>
      <Button
        style={{ marginLeft: "70px" }}
        size="large"
        onClick={showModal}
        icon={<WarningOutlined />}
      >
        Feedback
      </Button>
      <Modal
        title="FEEDBACK"
        style={{ textAlign: "center" }}
        width={500}
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Submit"
        onCancel={handleCancel}
        centered
      >
        <Form layout="vertical">
          <Space direction="vertical">
            <Form.Item name="rating" style={{ float: "left" }}>
              <span style={{ marginRight: "10px" }}>Rating: </span>
              <Rate
                value={formData?.rating}
                allowClear={true}
                onChange={(e) => {
                  setFormData({ ...formData, rating: e });
                }}
              />
            </Form.Item>
            <Form.Item name="description" label="Description of the feedback:">
              <Input.TextArea
                rows={5}
                cols={100}
                value={formData?.description}
                onChange={(e) => {
                  setFormData((pre) => {
                    return { ...pre, description: e.target.value };
                  });
                }}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default FeedbackForm;
