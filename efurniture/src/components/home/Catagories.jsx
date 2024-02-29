import React from "react";
import styles from "../../css/catagories.module.css";
import { useNavigate } from "react-router-dom";

const Catagories = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div
        id={styles.plate}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/plate");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Plate</h3>
          <span>Decoration Plates</span>
        </div>
        <img className={styles.plate} src="./images/plate.png" alt="" />
      </div>
      <div
        id={styles.africanArt}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/decoration");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Decoration</h3>
          <span>African Art sculptures</span>
        </div>
        <img
          className={styles.africanArt}
          src="./images/africanArt.png"
          alt=""
        />
      </div>
      <div
        id={styles.light}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/lighting");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Lighting</h3>
          <span>Lamp and Bulb</span>
        </div>
        <img className={styles.light} src="./images/light.png" alt="" />
      </div>
      <div
        id={styles.sofa}
        className={styles.catagoryContainer}
        onClick={() => {
          navigate("/category/sofa");
        }}
      >
        <div className={styles.textContainer}>
          <h3>Sofa</h3>
          <span>Home Stuff</span>
        </div>
        <img className={styles.sofa} src="./images/sofa.png" alt="" />
      </div>
    </div>
  );
};
export default Catagories;
