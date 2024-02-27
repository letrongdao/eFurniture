import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Badge, Avatar } from "antd";
import axios from "axios";
import styles from "../../css/navbar.module.css";
import eFurniLogo from "../../assets/logos/eFurniLogo_transparent_white.png";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const handleMenuClick = (category) => {
    categories.map((item) => {
      if (item.key === category.keyPath[0]) {
        navigate(`/products/${item.label}`);
        console.log(item.label);
      }
    });
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

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const menuProps = {
    items: categories,
    onClick: handleMenuClick,
    theme: "dark",
    inlineIndent: 24,
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.logo} src={eFurniLogo} alt="" />
      </div>
      <div className={styles.right}>
        <Link to="/" className={styles.button}>
          HOME
        </Link>
        <Link to="/products" className={styles.button}>
          <Dropdown menu={menuProps} className={styles.button}>
            <a onClick={() => navigate("/products")} className={styles.button}>
              <Space>
                PRODUCTS
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Link>
        <Link to="/contact" className={styles.button}>
          CONTACT
        </Link>
        <Link to="/signin" className={styles.button}>
          SIGN IN
        </Link>
        <Link to="/carts" className={styles.button}>
          <Badge size="small" count={1}>
            <Avatar
              shape="square"
              size="large"
              className="fa fa-shopping-cart fa-2x"
            ></Avatar>
          </Badge>
        </Link>
        <div className={styles.searchContainer}>
          <span>
            <img src="./images/search.png" alt="" />
          </span>
          <input
            placeholder="Looking For Something"
            type="text"
            className={styles.search}
          />
        </div>
        <div
          onClick={() => setToggleNavbar(!toggleNavbar)}
          className={styles.hamburger}
        >
          {toggleNavbar ? `X` : "||||"}
        </div>
      </div>
      <div
        className={
          toggleNavbar
            ? `${styles.collapsedDisplay} ${styles.open}`
            : `${styles.collapsedDisplay} ${styles.close}`
        }
      >
        <Link to="/" className={styles.button}>
          HOME
        </Link>
        <Dropdown menu={menuProps} className={styles.button}>
          <a onClick={() => navigate("/products")} className={styles.button}>
            <Space>
              PRODUCTS
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Link to="/contact" className={styles.button}>
          CONTACT
        </Link>
        <Link to="/signin" className={styles.button}>
          SIGN IN
        </Link>
        <Link to="/carts" className={styles.button}>
          <Badge size="small" count={5}>
            <Avatar
              shape="square"
              size="large"
              className="fa fa-shopping-cart fa-2x"
            ></Avatar>
          </Badge>
        </Link>
        <input placeholder="Search..." type="text" className={styles.search} />
      </div>
    </div>
  );
};

export default Navbar;
