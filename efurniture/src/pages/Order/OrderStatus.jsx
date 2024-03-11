import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Flex, Image, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { generateId } from '../../assistants/Generators'
import dateFormat from '../../assistants/date.format'
import styles from './Order.module.css'

export default function OrderStatus() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [product, setProduct] = useState({})

    const handleCheckout = async () => {
        const newOrderId = generateId(30, '')

        try {
            const orderCreateDate = dateFormat(new Date, 'yyyy/mm/dd HH:MM:ss')
            await axios.post(`http://localhost:3344/orders`, {
                order_id: newOrderId,
                date: orderCreateDate,
                total: totalAmount,
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
                        navigate('/order', { state: { noti: 'cart' } })
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
            orderId: newOrderId
        })
            .then(res => {
                const responseData = res.data.vnpUrl;
                window.location.href = responseData;
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Navbar />
            <Flex vertical justify='center' align='center'>
                <Title>YOU HAVE SUCCESSFULLY ORDERED</Title>
                <Text>You can check your orders here</Text>
                <Button type='primary' onClick={handleCheckout}>CONFIRM</Button>
            </Flex>
        </>
    )
}
