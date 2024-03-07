import React, { useEffect, useState } from 'react'
import { Card, Typography, Flex, Image, Button, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './Cart.module.css'
import axios from 'axios'

export default function CartItem({ cartItemId, productId, quantity }) {
    const { Text, Title } = Typography
    const navigate = useNavigate()
    const [cartProduct, setCartProduct] = useState({})

    const fetchProduct = async () => {
        await axios.get(`http://localhost:3344/products/${productId}`)
            .then((res) => {
                setCartProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const [quantityValue, setQuantityValue] = useState(quantity)

    const onQuantityChange = (value) => {
        if (value) {
            setQuantityValue(value)
            axios.patch(`http://localhost:3344/cartItems/${cartItemId}`, {
                quantity: value
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err.message))
        }
    }

    const decreaseQuantity = () => {
        if (quantityValue > 1) {
            setQuantityValue((currentQuantity) => currentQuantity - 1)
            axios.patch(`http://localhost:3344/cartItems/${cartItemId}`, {
                quantity: quantityValue - 1
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err.message))
        }
    }

    const increaseQuantity = () => {
        if (quantityValue < 20) {
            setQuantityValue((currentQuantity) => currentQuantity + 1)
            axios.patch(`http://localhost:3344/cartItems/${cartItemId}`, {
                quantity: quantityValue + 1
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => console.log(err.message))
        }
    }

    return (
        <Card hoverable className={styles.cardContainer}>
            <Flex align='center' justify='space-between'>
                <span className={styles.imageContainer}>
                    <Image src={cartProduct.image_url} className={styles.image} preview={false} />
                </span>
                <Flex vertical justify='space-between' align='center' gap={40}>
                    <Text strong className={styles.productName}
                        onClick={() => { navigate(`/products/${cartProduct.product_id}`) }}>
                        {cartProduct.name}
                    </Text>
                    <Flex justify='center' align='center' className={styles.quantitySection}>
                        <Button onClick={decreaseQuantity} style={{ marginRight: "2%" }}>-</Button>
                        <InputNumber min={1} max={20} onChange={onQuantityChange} controls={false} value={quantityValue} size='medium' style={{ width: '15%' }} />
                        <Button onClick={increaseQuantity} style={{ marginLeft: "2%" }}>+</Button>
                    </Flex>
                </Flex>
                <div className={styles.priceSection}>
                    <Text type='secondary' italic className={styles.productInfo}>
                        <Text style={{ fontSize: '80%', opacity: '0.5' }} className={styles.price}>
                            {cartProduct.price} $ / each
                        </Text>
                    </Text>
                    <Text>
                        <Title style={{ fontSize: '180%', color: '#8A2013' }} className={styles.price}>
                            {Math.round(cartProduct.price * quantityValue * 100) / 100} $
                        </Title>
                    </Text>
                </div>
            </Flex>
        </Card>
    )
}
