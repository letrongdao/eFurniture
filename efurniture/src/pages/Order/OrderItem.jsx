import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Flex, Image, Typography } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Order.module.css'
import efPointLogo from '../../assets/icons/efpoint_transparent.png'

export default function OrderItem({ productId, quantity }) {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [product, setProduct] = useState({})

    const fetchProductData = async () => {
        await axios.get(`http://localhost:3344/products/${productId}`)
            .then((res) => {
                console.log("Product: ", res.data)
                setProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    return (
        <>
            <Flex align='center' justify='center' gap={30} className={styles.orderItemSection}>
                <Image src={product.image_url} alt='' preview={false} width={200} />
                <Flex vertical justify='center' align='center' gap={10} className={styles.orderInfo}>
                    <Title id={styles.name}>{product.name}</Title>
                    <Text id={styles.quantity}>Quantity: {quantity}</Text>
                </Flex>
                <Flex gap={10} className={styles.orderInfo}>
                    <Title id={styles.total}>Total: {product.price * quantity}</Title>
                    <Image src={efPointLogo} alt='' width={50} preview={false} style={{ marginBottom: '18%' }} />
                </Flex>
            </Flex>
        </>
    )
}
