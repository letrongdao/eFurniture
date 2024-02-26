import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import eFurniLogo from '../assets/logos/eFurniLogo_transparent.png'

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
        <img className={styles.logo} src={eFurniLogo} alt="" />
      </div>
      <div className={styles.right}>
        <Link to="/" className={styles.button}>Home</Link>
        <Link to="/products" className={styles.button}>Products</Link>
        <Link to="/contact" className={styles.button}>Contact</Link>
        <Link to="/signin" className={styles.button}>Sign in</Link>
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
        <Link to="/" className={styles.button}>Home</Link>
        <Link to="/products" className={styles.button}>Products</Link>
        <Link to="/contact" className={styles.button}>Contact</Link>
        <Link to="/signin" className={styles.button}>Sign in</Link>
        <input placeholder="Search..." type="text" className={styles.search} />
      </div>
    </div>
  );
};

export default Navbar;
