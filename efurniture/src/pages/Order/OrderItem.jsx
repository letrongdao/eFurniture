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
            <Flex align='center' justify='center' gap={10}>
                <Image src={product.image_url} alt='' preview={false} width={200} />
                <Title>{product.name}</Title>
                <Title>{quantity}</Title>
                <Title>
                    {product.price * quantity}
                    <Image src={efPointLogo} alt='' width={50} preview={false} style={{ marginBottom: '18%' }} />
                </Title>
            </Flex>
        </>
    )
}
