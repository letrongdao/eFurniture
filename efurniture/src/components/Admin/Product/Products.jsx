import { Space, Table, Image, Modal, Input, Switch, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../../dataControllers/productController";
import AddModal from "./Modal";

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

function Products() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [testRecord, setTestRecord] = useState();
  const [searchInput, setSearchInput] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    status: 1,
    category_name: "",
  });

  // useEffect(() => {
  //   setLoading(true);
  //   getProduct().then((res) => {
  //     setDataSource(res);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getProduct();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 1000);
    // return () => clearInterval(intervalId);
  }, []);

  const onUpdateProduct = (record) => {
    setIsEditing(true);
    // let data = { ...editFormData, id: record };
    // setEditFormData(data);
    setTestRecord(record);
  };

  const onDeleteProduct = (record) => {
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
      {/* <Typography.Title level={4}>Product</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name, category..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
        <AddModal>Add Product</AddModal>
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
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
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteProduct(record);
                    }}
                    style={{ color: "red" }}
                  />
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
        <div style={{ lineHeight: "2.5" }}>
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
            value={editFormData?.price}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, price: e.target.value };
              });
            }}
          />
          Category:{" "}
          <Select
            value={editFormData?.category_name}
            options={options}
            style={{ width: 200, margin: "20px 20px 0px 0px" }}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, category_name: e };
              });
            }}
          />
          Status:{" "}
          <Switch
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
export default Products;
