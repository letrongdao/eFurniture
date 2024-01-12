import React, { useState } from "react";
import styles from "./navbar.module.css";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Home from "../pages/Home";
import App from "../App";

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = (theme) => {
    if (theme) {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.logo} src="./images/logo.png" alt="" />
      </div>
      <div className={styles.right}>
        <Link to="/" className={styles.button}>Home</Link>
        <Link to="/product" className={styles.button}>Product</Link>
        <div className={styles.button}>Shop</div>
        <div className={styles.button}>Blog</div>
        <div className={styles.button}>New at AntiQ</div>
        <div className={styles.button}>Contact</div>
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
        <div className={styles.button}>
          <Button radius="full" color="primary" isIconOnly>
            {isDarkMode ?
              <SunIcon /> :
              <MoonIcon />
            }
          </Button>
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
        <div className={styles.button}>Home</div>
        <div className={styles.button}>Products</div>
        <div className={styles.button}>Shop</div>
        <div className={styles.button}>Blog</div>
        <div className={styles.button}>New at AntiQ</div>
        <div className={styles.button}>Contact</div>
        <input placeholder="Search..." type="text" className={styles.search} />
      </div>
    </div>
  );
};

export default Navbar;