import React, { useState } from "react";
import { Button, Form, Modal, Input } from "antd";
import { addProduct } from "../../../dataControllers/productController";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
    status: 1,
    category_id: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      ...formData,
      product_id: "",
      name: "",
      price: "",
      description: "",
      image_url: "",
      status: 1,
      category_id: "",
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    setIsModalOpen(false);
    event.preventDefault();
    addProduct(formData);
    setFormData({
      ...formData,
      product_id: "",
      name: "",
      price: "",
      description: "",
      image_url: "",
      status: 1,
      category_id: "",
    });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Product ID">
            <Input
              type="text"
              name="product_id"
              value={formData?.product_id}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product Name">
            <Input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Input
              type="text"
              name="category_id"
              value={formData?.category_id}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              type="number"
              name="price"
              value={formData?.price}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
