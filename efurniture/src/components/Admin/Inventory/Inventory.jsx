import { Space, Table, Image, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../../dataControllers/productController";

import AddModal from "./Modal";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [testRecord, setTestRecord] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    setLoading(true);
    getProduct().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const onUpdateProduct = (record) => {
    setIsEditing(true);
    // let data = { ...editFormData, id: record };
    // setEditFormData(data);
    setTestRecord(record);
  };

  console.log("DATA: ", editFormData);

  const onDeleteProduct = (record) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteProduct(record);
      },
    });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Inventory</Typography.Title> */}
      <AddModal>Add Product</AddModal>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Id",
            key: "product_id",
            dataIndex: "product_id",
          },
          {
            title: "Picture",
            key: "image_url",
            dataIndex: "image_url",
            render: (link) => {
              return <Image src={link} width={50} />;
            },
          },
          {
            title: "Name",
            key: "name",
            dataIndex: "name",
          },
          {
            title: "Price",
            key: "price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Category",
            key: "category",
            dataIndex: "category",
          },
          {
            title: "Action",
            key: "action",
            dataIndex: "product_id",
            render: (record) => {
              return (
                <>
                  <EditOutlined
                    onClick={() => {
                      onUpdateProduct(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteProduct(record);
                    }}
                    style={{ color: "red" }}
                  />
                </>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Modal
        title="Edit User"
        open={isEditing}
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateProduct(testRecord, editFormData);
          resetEditing();
        }}
      >
        Name:{" "}
        <Input
          value={editFormData?.name}
          onChange={(e) => {
            setEditFormData((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        Price:{" "}
        <Input
          value={editFormData?.Price}
          onChange={(e) => {
            setEditFormData((pre) => {
              return { ...pre, Price: e.target.value };
            });
          }}
        />
      </Modal>
    </Space>
  );
}
export default Inventory;
