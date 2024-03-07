import React, { useState, useEffect } from 'react';
import { Flex, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './Cart.module.css'
import Footer from "../../components/Home/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx"; // Import the CSS file for custom styling
import axios from 'axios';
import CartItem from './CartItem.jsx';
import CartDetailList from './CartDetailList.jsx'

export default function Cart() {
  const { Text, Title } = Typography
  const currentUserId = sessionStorage.getItem("loginUserId")
  const [cartItems, setCartItems] = useState([])

  const fetchCartItems = async () => {
    await axios.get(`http://localhost:3344/cartItems/${currentUserId}`)
      .then((res) => {
        setCartItems(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div>
          <h1>EMPTY</h1>
        </div>
        <Footer />
      </>
    )
  }
  else {
    return (
      <>
        <Navbar />
        <Flex justify='space-around' align='center' gap={1} className={styles.cartContainer}>
          <div className={styles.orderItemSection}>
            {cartItems.map((item) => (
              <CartItem cartItemId={item.cartItem_id} productId={item.product_id} quantity={item.quantity} />
            ))}
          </div>
          <Flex vertical justify='center' align='center' className={styles.billingSection}>
            <div className={styles.productListSection}>
              {cartItems.map((item) => (
                <CartDetailList productId={item.product_id} quantity={item.quantity} />
              ))}
            </div>
          </Flex>
        </Flex>
        <Footer />
      </>
    )
  }
};