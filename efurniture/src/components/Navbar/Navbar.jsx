import React, { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  LoginOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import {
  Dropdown,
  Space,
  message,
  Typography,
  Button,
  Badge,
  Tooltip,
  Flex,
} from "antd";
import axios from "axios";
import styles from "../../css/navbar.module.css";
import eFurniLogo from "../../assets/logos/eFurniLogo_transparent_white.png";

const Navbar = () => {
  const { Text } = Typography;

  const currentUserId = sessionStorage.getItem("loginUserId");

  const [currentUser, setCurrentUser] = useState(null);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuClick = (i) => {
    categories.map((item) => {
      if (item.key === i.key) {
        window.location.href = `/category/${item.label.toLowerCase()}`;
      }
    });
  };

  const fetchUserData = async () => {
    await axios
      .get(`http://localhost:3344/users/${currentUserId}`)
      .then((res) => {
        setCurrentUser(res.data[0]);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchCategoryData = async () => {
    await axios
      .get("http://localhost:3344/categories")
      .then((res) => {
        let a = res.data;
        a.map((item, i) => {
          item["label"] = item.category_name;
          item["key"] = i.toString();
        });
        setCategories(a);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchUserCartData = async () => {
    await axios.get(`http://localhost:3344/cartItems/${currentUserId}`)
      .then((res) => {
        setUserCart(res.data)
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchUserData();
    fetchCategoryData();
    fetchUserCartData();
  }, []);

  const menuProps = {
    items: categories,
    onClick: handleMenuClick,
  };

  const logout = () => {
    sessionStorage.removeItem("loginUserId");
    setTimeout(() => {
      navigate('/');
    }, 1000)
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link to="/">
          <img className={styles.logo} src={eFurniLogo} alt="" />
        </Link>
        <span className={styles.navigators}>
          <Link to="/products">
            <Dropdown menu={menuProps}>
              <a
                onClick={() => navigate("/products")}
                className={styles.button}
              >
                <Space>
                  PRODUCTS
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Link>
          <Link to="/about" className={styles.button}>
            ABOUT US
          </Link>
          <Link to="/contact" className={styles.button}>
            CONTACT
          </Link>
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.userSection}>
          <button className={styles.iconButton} onClick={() => navigate(`/search`)}>
            <SearchOutlined style={{ color: "#FFF", fontSize: "150%" }}/>
          </button>
          {currentUser ? (
            <>
              <Tooltip title="Orders">
                <button className={styles.iconButton}
                  onClick={() => navigate(`/order`)}>
                  <FileDoneOutlined style={{ color: "#FFF", fontSize: "150%" }} />
                </button>
              </Tooltip>
              <Tooltip title="Cart">
                <Badge count={userCart.length} showZero={true} title="">
                  <button className={styles.iconButton} onClick={() => navigate('/cart')}>
                    <ShoppingCartOutlined
                      style={{ color: "#FFF", fontSize: "180%" }}
                    />
                  </button>
                </Badge>
              </Tooltip>
              <Tooltip title="Profile">
                <button className={styles.iconButton}
                  onClick={() => navigate(`/profile/${currentUserId}`)}>
                  <UserOutlined style={{ color: "#FFF", fontSize: "150%" }} />
                </button>
              </Tooltip>
              <Tooltip title="Log out">
                <button className={styles.logButton} onClick={logout}>
                  <LogoutOutlined style={{ fontSize: "150%" }} />
                </button>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Sign in">
              <button
                className={styles.logButton}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <LoginOutlined style={{ fontSize: "150%" }} />
              </button>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
