import React, { useState } from "react";
import { Button, Form, Modal, Input, Select, Switch } from "antd";
import { addProduct } from "../../../dataControllers/productController";
import { generateId } from "../../../assistants/Generators";
import { PlusCircleOutlined } from "@ant-design/icons";

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

const options = [
  {
    value: "Table",
    label: "Table",
  },
  {
    value: "Sofa",
    label: "Sofa",
  },
  {
    value: "Bed",
    label: "Bed",
  },
  {
    value: "Chair",
    label: "Chair",
  },
  {
    value: "Lighting",
    label: "Lighting",
  },
  {
    value: "Shelf",
    label: "Shelf",
  },
  {
    value: "Outdoor",
    label: "Outdoor",
  },
];

const AddModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
    status: 1,
    category_name: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
    setFormData({
      ...formData,
      product_id: generateId(30, ""),
    });
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
      status: 0,
      category_name: "",
    });
    setSelectedImage(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      // console.log("URL: ", imageUrl);
      setFormData({
        ...formData,
        image_url: file,
      });
    }
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, status: checked ? true : false });
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
      category_name: "",
    });
    setSelectedImage(null);
  };

  return (
    <>
      <Button
        style={{ float: "right", marginRight: "50px" }}
        type="primary"
        onClick={showModal}
        icon={<PlusCircleOutlined />}
      >
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        centered
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Product Name">
            <Input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              value={formData?.category_name}
              options={options}
              style={{ width: 200 }}
              onChange={(value) => {
                setFormData((pre) => {
                  return { ...pre, category_name: value };
                });
              }}
              // onChange={handleChange}
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
          <Form.Item label="Description">
            <Input
              type="text"
              name="description"
              value={formData?.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Input
              type="text"
              name="image"
              value={formData?.image_url}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Add Image">
            <Input
              type="file"
              name="image_url"
              value={formData?.image_url}
              onChange={handleImage}
            />
          </Form.Item>
          <Form.Item label="Available">
            <Switch value={formData?.status} onChange={handleSwitchChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
