import React, { useEffect, useState } from 'react'
import { Flex, Image, Typography, InputNumber, Button, Divider, Skeleton } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Product.module.css'
import Navbar from '../../components/Navbar/Navbar';
import RelatedProducts from '../../components/Related Products/RelatedProducts'
import Footer from '../../components/Home/Footer'

export default function Product() {
  const { Text, Title, Link } = Typography
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    image_url: '',
    description: '',
    price: '',
    category_name: '',
    status: 0,
  })
  const { id } = useParams()
  const fetchProductInfo = async () => {
    setIsLoading(true)
    await axios.get(`http://localhost:3344/products/${id}`)
      .then((res) => {
        setCurrentProduct(res.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 0)
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
      {isLoading
        ?
        <Flex align='center' justify='center' style={{ minHeight: '80vh' }}>
          <Skeleton active
            avatar={{ shape: 'square', size: 400 }}
            paragraph={{ rows: 5 }}
            style={{ margin: '0 5% 0 8%' }} />
        </Flex>
        :
        <>
          <Flex justify='space-around' align='center' className={styles.productInfoContainer}>
            <span className={styles.imageSection}>
              <Image src={currentProduct.image_url} alt='' width={400} style={{ minWidth: '400px', maxWidth: '400px' }} />
            </span>
            <Flex vertical justify='space-around' align='center' style={{ maxHeight: 'min-content' }}>
              <Flex vertical justify='space-between' align='center'>
                <Title style={{ width: '100%', textAlign: 'center', fontSize: '200%' }}>{currentProduct.name.toUpperCase()}</Title>
                <Text style={{ fontSize: '150%', fontWeight: '300', minWidth: '100%', textAlign: 'center' }}>
                  <Text style={{ fontSize: '100%', fontWeight: '300', minWidth: '100%', textAlign: 'center' }} delete={currentProduct.status === 0}>
                    {currentProduct.price} $
                  </Text>
                  &ensp;{currentProduct.status === 0 ? 'SOLD OUT' : ''}
                </Text>
                <Divider />
              </Flex>
              <Flex vertical justify='space-between' align='center' className={styles.detailSection}>
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
              <Flex vertical justify='space-evenly' align='center' gap={2} className={styles.buttonSection}>
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
          <Footer />
        </>
      }
    </>
  )
}
