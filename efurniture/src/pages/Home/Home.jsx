import React from "react";
import styles from "./home.module.css";
import Navbar from "../../components/Navbar/Navbar";

import Herosection from "../../components/Home/Herosection";
import ShopYourChoice from "../../components/Home/ShopYourChoice";
import ProductsOfTheWeek from "../../components/Home/ProductsOfTheWeek";
import Catagories from "../../components/Home/Catagories";
import UpcomingCollections from "../../components/Home/UpcomingCollections";
import BlueBanner from "../../components/Home/BlueBanner";
import Features from "../../components/Home/Features";
import Footer from "../../components/Home/Footer";

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Herosection />
      <ShopYourChoice />
      <ProductsOfTheWeek />
      <Catagories />
      <UpcomingCollections />
      <BlueBanner />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
