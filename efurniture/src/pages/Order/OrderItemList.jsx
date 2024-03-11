import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderItem from './OrderItem'
import { Flex } from 'antd'
import dateFormat from '../../assistants/date.format'
import moment from 'moment'

export default function OrderItemList({ orderId, date, status }) {
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
            {orderItemList.map((item, i) => (
                <tr className={status === 1 ? "table-success" : ""} style={{ marginBottom: "10px"}}>
                    <OrderItem productId={item.product_id} quantity={item.quantity} />
                    <td>
                        <Flex vertical justify='center' align='center'>
                            <p>
                                <strong style={{ fontSize: '120%' }}>{moment(date).fromNow()}</strong><br />
                                {dateFormat(date, 'HH:MM dd/mm/yyyy')}
                            </p>
                        </Flex>
                    </td>
                    <td>
                        {status === 1 ? 'Delivered' : 'On delivery'}
                    </td>
                </tr>
            ))}
        </>
    )
}
