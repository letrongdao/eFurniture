import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Flex, Typography, message } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import styles from './Order.module.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import OrderItemList from './OrderItemList'
import dateFormat from '../../assistants/date.format'

export default function OrderList() {
    const { Text, Title } = Typography
    const { messageApi, contextHolder } = message.useMessage()
    const navigate = useNavigate()
    const location = useLocation()
    const currentUserId = sessionStorage.getItem("loginUserId")
    const [orderList, setOrderList] = useState([])

    const fetchOrderList = async () => {
        await axios.get(`http://localhost:3344/orders/${currentUserId}`)
            .then((res) => {
                setOrderList(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (location.state) {
            if (location.state.noti === 'cart') {
                message.success("Thank you for supporting EFurni. Check your order status to get the process.")
            }
        }
        fetchOrderList()
    }, [])

    return (
        <>
            {contextHolder}
            <Navbar />
            {orderList.length === 0
                ?
                <Flex justify='space-around' align='center' gap={1} className={styles.orderListContainer} id={styles.emptyList}>
                    <Text italic style={{ fontFamily: 'monospace', opacity: '0.6' }}>There is nothing here yet</Text>
                    <Title style={{ fontSize: '150%' }}>
                        <Link to='/products' className={styles.shopNow}>SHOP NOW&ensp;<ArrowRightOutlined /></Link>
                    </Title>
                </Flex>
                :
                <>
                    {orderList.map((order) => (
                        <Flex style={{ border: 'solid 1px red' }} align='center' justify='start'>
                            <span className={styles.dateTimeSection}>
                                <Text>{dateFormat(order.date, 'HH:MM:ss dd/mm/yyyy')}</Text>
                            </span>
                            <OrderItemList orderId={order.order_id} />
                        </Flex>
                    ))}
                </>
            }
            <Footer />
        </>
    )
}
