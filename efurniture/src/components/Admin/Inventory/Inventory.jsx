import { Avatar, Rate, Space, Table, Typography, Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get("http://localhost:3344/products")
      .then((res) => {
        setDataSource(res.data);
        setLoading(false);
      });
    }
    fetchData()
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table style={{ width: '1250px' }}
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
              return <Image src ={link} width={100} />;
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
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 6,
        }}
      ></Table>
    </Space>
  );
}
export default Inventory;
