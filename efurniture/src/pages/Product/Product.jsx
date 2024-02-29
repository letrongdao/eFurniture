import React, { useEffect, useState } from 'react'
import { Flex, Image, Typography, InputNumber, Button, Divider } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Product.module.css'
import Navbar from '../../components/Navbar/Navbar';
import RelatedProducts from '../../components/Related Products/RelatedProducts'

export default function Product() {
  const { Text, Title, Link } = Typography
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    image_url: '',
    description: '',
    price: '',
    category_name: '',
  })
  const { id } = useParams()
  const fetchProductInfo = async () => {
    await axios.get(`http://localhost:3344/products/${id}`)
      .then((res) => {
        console.log("Product info: ", res.data)
        setCurrentProduct(res.data)
      })
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    fetchProductInfo()
  }, [])

  const onQuantityChange = (value) => {
    setQuantity(value)
  }

  const decreaseQuantity = () => {
    if (quantity > 1)
      setQuantity((currentQuantity) => currentQuantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < 20)
      setQuantity((currentQuantity) => currentQuantity + 1)
  }

  return (
    <>
      <Navbar />
      <Flex justify='space-around' align='center' className={styles.productInfoContainer}>
        <Image src={currentProduct.image_url} alt='' width={500} />
        <Flex vertical justify='space-between' align='center' gap={20}>
          <Flex vertical justify='space-between' align='center'>
            <Title>{currentProduct.name.toUpperCase()}</Title>
            <Text style={{ fontSize: '200%', fontWeight: '300' }}>{currentProduct.price} $</Text>
            <Divider />
          </Flex>
          <Flex vertical justify='space-between' align='center'>
            <ul style={{ listStyleType: 'circle' }}>
              <li>
                <Text>
                  Category: &nbsp;
                  <Link className={styles.link}
                    onClick={() => navigate(`/category/${currentProduct.category_name}`)}>
                    {currentProduct.category_name}
                  </Link>
                </Text>
              </li>
              <br />
              <li>
                <Text>
                  Description: {currentProduct.description}
                </Text>
              </li>
            </ul>
            <Divider />
          </Flex>
          <Flex justify='space-between' align='center' gap="large">
            <Flex justify='center' align='center' className={styles.quantitySection}>
              <Button onClick={decreaseQuantity} style={{ marginRight: "1%" }}>-</Button>
              <InputNumber min={1} max={20} onChange={onQuantityChange} controls={false} value={quantity} size='large' />
              <Button onClick={increaseQuantity} style={{ marginLeft: "1%" }}>+</Button>
            </Flex>
            <Link className={styles.favoriteSection}><HeartOutlined /> Favorite</Link>
          </Flex>
          <Flex vertical justify='space-evenly' align='center' gap={5} className={styles.buttonSection}>
            <Button block className={styles.button}>
              <ShoppingCartOutlined className={styles.cartIcon} />
              ADD TO CART
            </Button>
            <Button block className={styles.button} id={styles.buyButton}
              onClick={() => navigate(`/checkout/${id}`)}>
              <ShoppingOutlined className={styles.cartIcon} />
              BUY NOW
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <RelatedProducts />
    </>
  )
}
