import { Space, Table, Image, Modal, Input, Switch, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../../dataControllers/productController";
// import AddModal from "./Modal";

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

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [testRecord, setTestRecord] = useState();
  const [searchInput, setSearchInput] = useState();
  const [editFormData, setEditFormData] = useState({
    quantity: 0,
    status: 1,
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
      title: "Are you sure, you want to delete this product?",
      okText: "Confirm",
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

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getProduct().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.category_name
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Inventory</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name, category..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          // {
          //   title: "Id",
          //   key: "product_id",
          //   dataIndex: "product_id",
          // },
          {
            title: "Picture",
            key: "image_url",
            dataIndex: "image_url",
            render: (link) => {
              return <Image src={link} width={45} />;
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
            dataIndex: "category_name",
          },
          {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  backgroundColor: status ? "green" : "red",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {status ? "Available" : "Unavailable"}
              </span>
            ),
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            dataIndex: "product_id",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <EditOutlined
                    onClick={() => {
                      onUpdateProduct(record);
                    }}
                    style={{ color: "blue" }}
                  />
                  {/* <DeleteOutlined
                    onClick={() => {
                      onDeleteProduct(record);
                    }}
                    style={{ color: "red" }}
                  /> */}
                </div>
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
        title="Edit Product"
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
        <div style={{ lineHeight: "3" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            Quantity:{"   "}
            <Input
              style={{ marginLeft: "10px", width: "300px" }}
              value={editFormData?.quantity}
              onChange={(e) => {
                setEditFormData((pre) => {
                  return { ...pre, quantity: e.target.value };
                });
              }}
            />
          </div>
          Status:{" "}
          <Switch
            style={{ marginLeft: "20px" }}
            value={editFormData?.status}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, status: e ? 1 : 0 };
              });
            }}
          />
        </div>
      </Modal>
    </Space>
  );
}
export default Inventory;
