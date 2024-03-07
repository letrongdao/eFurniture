import React, { useEffect, useState } from 'react'
import { Typography, Flex } from 'antd'
import styles from './Cart.module.css'
import axios from 'axios'

export default function CartItem({ productId, quantity }) {
    const { Text } = Typography
    const [cartProduct, setCartProduct] = useState({})

    const fetchProduct = async () => {
        await axios.get(`http://localhost:3344/products/${productId}`)
            .then((res) => {
                console.log("Product data: ", res.data)
                setCartProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <Flex justify='space-between' align='center'>
            <Text>{cartProduct.name}</Text>
            <Text>{quantity}</Text>
        </Flex>
    )
}
