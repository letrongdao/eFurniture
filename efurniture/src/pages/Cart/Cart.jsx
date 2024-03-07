import React, { useState, useEffect } from 'react';
import { Flex, Typography, Divider, Button, Image } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.module.css'
import Footer from "../../components/Home/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from 'axios';
import CartItem from './CartItem.jsx';
import CartDetailList from './CartDetailList.jsx'
import efPointLogo from '../../assets/icons/efpoint_transparent.png'

export default function Cart() {
  const { Text, Title } = Typography
  const navigate = useNavigate()
  const currentUserId = sessionStorage.getItem("loginUserId")
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const fetchCartItems = async () => {
    await axios.get(`http://localhost:3344/cartItems/${currentUserId}`)
      .then((res) => {
        setCartItems(res.data)
      })
      .catch((err) => console.log(err))
  }

  const getTotalPrice = (price) => {
    setTotalAmount(c => c + (price / 2))
  }

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:3344/create_payment_url', {
        amount: totalAmount * 100,
        bankCode: 'VNBANK',
        language: 'vn',
        orderDescription: 'Mô tả đơn hàng',
        orderType: 'billpayment',
      }).then(res => {
        const responseData = res.data.vnpUrl;
        window.location.href = responseData;
      }).catch(error => console.log(error))

      // Redirect đến URL tạo được

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <>
      <Navbar />
      {cartItems.length === 0
        ?
        <div>
          <Flex justify='space-around' align='center' gap={1} className={styles.cartContainer} id={styles.emptyCart}>
            <img src='https://www.iconpacks.net/icons/2/free-shopping-cart-icon-1985-thumb.png' alt='' />
            <Text italic style={{ fontFamily: 'monospace', opacity: '0.6' }}>There is nothing here yet</Text>
            <Title style={{ fontSize: '150%' }}>
              <Link to='/products' className={styles.shopNow}>SHOP NOW&ensp;<ArrowRightOutlined /></Link>
            </Title>
          </Flex>
        </div>
        :
        <Flex justify='space-evenly' align='center' className={styles.cartContainer}>
          <div className={styles.orderItemSection}>
            {cartItems.map((item) => (
              <CartItem cartItemId={item.cartItem_id} productId={item.product_id} quantity={item.quantity} totalPrice={getTotalPrice} />
            ))}
          </div>
          <Flex vertical justify='space-between' align='center' className={styles.billingSection}>
            <Title className={styles.summary}>SUMMARY</Title>
            <div className={styles.productListSection}>
              {cartItems.map((item) => (
                <CartDetailList productId={item.product_id} quantity={item.quantity} />
              ))}
            </div>
            <Divider orientation='center'></Divider>
            <Flex gap={10}>
              <Title className={styles.totalAmount}>Total: {Math.round((totalAmount * 100)) / 100}</Title>
              <Image src={efPointLogo} alt='' width={50} preview={false} style={{ marginBottom: '18%' }} />
            </Flex>
            <Flex vertical justify='space-evenly' align='center' gap={2} className={styles.buttonSection}>
              <Button block className={styles.button} id={styles.buyButton} onClick={handleCheckout}>
                BUY
                <Image src='https://static.vecteezy.com/system/resources/previews/017/350/123/original/green-check-mark-icon-in-round-shape-design-png.png' width={30} alt='' preview={false} />
              </Button>
              <Button block className={styles.button} onClick={() => navigate('/products')}>
                Back to shop
              </Button>
            </Flex>
          </Flex>
        </Flex>
      }
      <Footer />
    </>
  )
};