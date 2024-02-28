import React, {useState, useEffect} from 'react';
import {List, InputNumber, Button, message, Row, Col} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import './Cart.css';
import Footer from "../../components/Home/Footer.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx"; // Import the CSS file for custom styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = sessionStorage.getItem('loginUserId');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:3344/cart?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3344/cart`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: newQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      setCartItems(prevItems =>
        prevItems.map(item => (item.product_id === productId ? {...item, quantity: newQuantity} : item))
      );
      message.success('Quantity updated successfully.');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteItem = async productId => {
    try {
      const response = await fetch(`http://localhost:3344/cart?user_id=${userId}&product_id=${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
      message.success('Item deleted from cart.');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <Navbar/>
      <Row justify="center" className="main">
        <Col span={14}>
          <div className="cart-list">
            <List
              dataSource={cartItems}
              renderItem={item => (
                <List.Item className="cart-item" style={{display: "block"}}>
                  <Row align="middle">
                    <Col span={4}>
                      <img src={item.image_url} alt={item.name} className="cart-item-image"/>
                    </Col>
                    <Col span={7} style={{fontWeight: "bold", fontSize: "1.2rem"}}>{item.name}</Col>
                    <Col span={3}>Price: {item.price}</Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        defaultValue={item.quantity}
                        onChange={newQuantity => handleQuantityChange(item.product_id, newQuantity)}
                      />
                    </Col>
                    <Col span={3}>Total: {item.price * item.quantity}</Col>
                    <Col span={2} className="last-col">
                      <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => handleDeleteItem(item.product_id)}>
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
      <Footer/>
    </>
  );
};

export default Cart;