import React, { useState } from "react";
import styles from "../../css/admin.module.css";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Customers from "../../components/Admin/Customers";
import Dashboard from "../../components/Admin/Dashboard";
import Inventory from "../../components/Admin/Inventory";
import Orders from "../../components/Admin/Orders";
// import avt from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";
const { Header, Sider, Content } = Layout;

// interface UserData {
//   avatar: string;
//   name: string;
//   email: string;
// }

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <SolutionOutlined />,
      label: "Dashboard",
      onClick: () => setActiveComponent("Dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Customers",
      onClick: () => setActiveComponent("Customers"),
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: "Inventory",
      onClick: () => setActiveComponent("Inventory"),
    },
    {
      key: "4",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => setActiveComponent("Orders"),
    },
  ];

  return (
    <Layout className={styles.admin}>
      <Sider style={{ background: "white" }}>
        <div className={styles.appHeader}>
          {/* <Avatar size={40} src={avt} className="logo" /> */}
          {/* {!collapsed ? (
            <>
              <span style={{ marginTop: "10px", fontWeight: "bold" }}>
                {userData.name}
              </span>
              <span>{userData.email}</span>
            </>
          ) : null} */}
        </div>
        <Menu
          className={styles.sideMenuVertical}
          mode="vertical"
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginLeft: "650px" }}>Admin</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "Customers" && <Customers />}
          {activeComponent === "Orders" && <Orders />}
          {activeComponent === "Inventory" && <Inventory />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
