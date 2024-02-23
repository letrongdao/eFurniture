import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../../dataControllers/index";
import axios from "axios";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res);
      setLoading(false);
    })
  }, []);


  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "User_id",
            dataIndex: "user_id",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Password",
            dataIndex: "password",
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
export default Customers;
