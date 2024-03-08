import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Flex } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Order.module.css'
import OrderItem from './OrderItem'

export default function OrderItemList({ orderId }) {
    const navigate = useNavigate()
    const currentUserId = sessionStorage.getItem("loginUserId")
    const [orderItemList, setOrderItemList] = useState([])

    const fetchOrderItemList = async () => {
        await axios.get(`http://localhost:3344/orderItems/${orderId}`)
            .then((res) => {
                setOrderItemList(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchOrderItemList()
    }, [])

    return (
        <>
            <Flex vertical style={{ marginTop: '2%' }}>
                {orderItemList.map((orderItem) => (
                    <OrderItem productId={orderItem.product_id} quantity={orderItem.quantity} />
                ))}
            </Flex>
        </>
    )
}
