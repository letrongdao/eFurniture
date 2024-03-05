import React, { useState, useEffect } from 'react';
import { List, InputNumber, Button, message, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './Cart.css';
import Footer from "../../components/Home/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx"; // Import the CSS file for custom styling
import axios from 'axios';

const Cart = () => {
  const cartId = sessionStorage.getItem('loginUserCartId')
  const [cartItems, setCartItems] = useState([])

  const fetchCartItems = async () => {
    await axios.get(`http://localhost:3344/cartItems/${cartId}`)
      .then((res) => {
        setCartItems(res.data)
        cartItems.map((cartItem) => {
          axios.get(`http://localhost:3344/products/${cartItem.product_id}`)
            .then((res) => {
              cartItem = {
                ...cartItem,
                ...{
                  product: res.data,
                }
              }
            })
        })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <>
      <Navbar />
      <h1>{cartItems.length}</h1>
      <Row justify="center" className="main">
        <Col span={14}>
          <div className="cart-list">
            <List
              dataSource={cartItems}
              renderItem={item => (
                <List.Item className="cart-item" style={{ display: "block" }}>
                  <Row align="middle">
                    <Col span={4}>
                      <img src={item.product} alt='' className="cart-item-image" />
                    </Col>
                    <Col span={7} style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{item.product_id}</Col>
                    <Col span={3}>Price: {item.product.price}</Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        defaultValue={item.quantity}
                        onChange={newQuantity => handleQuantityChange(item.product_id, newQuantity)}
                      />
                    </Col>
                    <Col span={3}>Total: {item.product_id}</Col>
                    <Col span={2} className="last-col">
                      <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteItem(item.product_id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Cart;