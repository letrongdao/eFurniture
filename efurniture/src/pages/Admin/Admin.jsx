import React, { useState } from "react";
import styles from "../../css/admin.module.css";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SolutionOutlined,
  HomeOutlined,
  InboxOutlined,
  BookOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb, Image } from "antd";
import eFurniLogo from "../../assets/logos/eFurniLogo_transparent.png";
import Users from "../../components/Admin/User/Users";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import Products from "../../components/Admin/Product/Products";
import Orders from "../../components/Admin/Orders/Orders";
import Inventory from "../../components/Admin/Inventory/Inventory";
import Booking from "../../components/Admin/Booking/Booking";
import Feedback from "../../components/Admin/Feedback/Feedback";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

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
      label: "Users",
      onClick: () => setActiveComponent("Users"),
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: "Products",
      onClick: () => setActiveComponent("Products"),
    },
    {
      key: "4",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => setActiveComponent("Orders"),
    },
    {
      key: "5",
      icon: <InboxOutlined />,
      label: "Inventory",
      onClick: () => setActiveComponent("Inventory"),
    },
    {
      key: "6",
      icon: <BookOutlined />,
      label: "Booking",
      onClick: () => setActiveComponent("Booking"),
    },
    {
      key: "7",
      icon: <ExceptionOutlined />,
      label: "Feedback",
      onClick: () => setActiveComponent("Feedback"),
    },
  ];

  return (
    <Layout className={styles.admin}>
      <Sider style={{ background: "white" }}>
        <div className={styles.appHeader}>
          <Link to="/">
            <Image
              preview={false}
              size={30}
              src={eFurniLogo}
              className="logo"
            />
          </Link>
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
          <h2 style={{ marginLeft: "620px" }}>Admin</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Breadcrumb
            style={{ marginBottom: "10px" }}
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                href: "/admin",
                title: (
                  <>
                    <UserOutlined />
                    <span>Admin</span>
                  </>
                ),
              },
              {
                href: "",
                title: activeComponent,
              },
            ]}
          />
          {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "Users" && <Users />}
          {activeComponent === "Orders" && <Orders />}
          {activeComponent === "Products" && <Products />}
          {activeComponent === "Inventory" && <Inventory />}
          {activeComponent === "Booking" && <Booking />}
          {activeComponent === "Feedback" && <Feedback />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
