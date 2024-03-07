import { useState } from "react";
import { Button, Form, Modal, Input, Space, message } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { createBooking } from "../../../dataControllers/bookingController";
import { generateId } from "../../../assistants/Generators";

const BookingModal = (record) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: "",
    date: "2024-04-25",
    time: "",
    status: 0,
    contents: "",
    user_id: "us5833430108618",
    product_id: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setFormData({
      ...formData,
      booking_id: generateId(30, ""),
      product_id: record.product,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      ...formData,
      booking_id: "",
      date: "2024-04-25",
      time: "",
      status: 0,
      contents: "",
      user_id: "us5833430108618",
      product_id: "",
    });
  };

  const handleSubmit = (event) => {
    setIsModalOpen(false);
    event.preventDefault();
    createBooking(formData);
    setFormData({
      ...formData,
      date: "2024-04-25",
      time: "",
      status: 0,
      contents: "",
      user: "us5833430108618",
    });
    message.success("Report Successful!!!");
  };

  console.log("Report Data: ", formData);

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        size="large"
        onClick={showModal}
        icon={<WarningOutlined />}
      >
        Booking
      </Button>
      <Modal
        title="Booking"
        style={{ textAlign: "center" }}
        width={1000}
        open={isModalOpen}
        onOk={handleSubmit}
        okText="Submit"
        onCancel={handleCancel}
        centered
      >
        <Form layout="vertical">
          <Space direction="vertical">
            <Form.Item name="contents" label="Description of the offense(s):">
              <Input.TextArea
                rows={5}
                value={formData?.contents}
                onChange={(e) => {
                  setFormData((pre) => {
                    return { ...pre, contents: e.target.value };
                  });
                }}
                placeholder="If you can, please provide a detailed contents of the offense(s)"
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default BookingModal;
