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
import { generateId } from '../../assistants/Generators.js'
import dateFormat from '../../assistants/date.format.js';
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal.jsx';

export default function Cart() {
  const [open, setOpen] = useState(false)
  const { Text, Title } = Typography
  const navigate = useNavigate()
  const currentUserId = sessionStorage.getItem("loginUserId")
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)

  const fetchUserData = async () => {
    await axios.get(`http://localhost:3344/users/${currentUserId}`)
      .then((res) => {
        setUser(res.data[0])
      })
      .catch((err) => console.log(err))
  }

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
    const newOrderId = generateId(30, '')

    try {
      const orderCreateDate = dateFormat(new Date, 'yyyy/mm/dd HH:MM:ss')
      await axios.post(`http://localhost:3344/orders`, {
        order_id: newOrderId,
        date: orderCreateDate,
        total: totalAmount,
        isDelivered: 0,
        status: 0,
        user_id: currentUserId
      })
        .then((res) => {
          console.log("Post order: ", res.data)
        })
        .catch((err) => console.log(err))

      cartItems.map(async (item) => {
        const newOrderItemId = generateId(30, '')
        console.log("cartItems list: ", item)
        await axios.get(`http://localhost:3344/products/${item.product_id}`)
          .then((res) => {
            axios.post(`http://localhost:3344/orderItems`, {
              orderItem_id: newOrderItemId,
              price: res.data.price,
              quantity: item.quantity,
              order_id: newOrderId,
              product_id: item.product_id
            })
              .then((res) => {
                console.log("Order items post process: ", res.data)
              })
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
        await axios.delete(`http://localhost:3344/cartItems/${item.cartItem_id}`)
          .then((res) => {
            console.log(res.data)
            // navigate('/order', { state: { noti: 'cart' } })
          })
          .catch((err) => console.log(err))
      })
    } catch (err) {
      console.log('Error: ', err)
    }

    await axios.post('http://localhost:3344/create_payment_url', {
      amount: totalAmount * 24850,
      bankCode: 'VNBANK',
      language: 'vn',
      orderDescription: `Purchase eFurniture order ${newOrderId}`,
      orderType: 'billpayment',
      orderId: newOrderId,
    })
      .then((res) => {
        const responseData = res.data.vnpUrl;
        window.location.href = responseData;
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchCartItems()
    fetchUserData()
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
              <Title className={styles.totalAmount}>Total: {Math.round((totalAmount * 100)) / 100} $</Title>
            </Flex>
            <Flex vertical justify='space-evenly' align='center' gap={2} className={styles.buttonSection}>
              <Button block className={styles.button} id={styles.buyButton} onClick={() => { handleCheckout() }}>
                BUY
                <Image src='https://static.vecteezy.com/system/resources/previews/017/350/123/original/green-check-mark-icon-in-round-shape-design-png.png' width={30} alt='' preview={false} />
              </Button>
              <AddAddressModal open={open} setOpen={setOpen} />

              <Button block className={styles.button} onClick={() => navigate('/products')}>
                Back to shop <ArrowRightOutlined />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      }
      <Footer />
    </>
  )
};