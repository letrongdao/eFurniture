import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Divider, Flex, List, Card, Typography, Image } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './checkout.module.css'
import Footer from '../../components/Home/Footer'

export default function Checkout() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { Text, Title } = Typography

    const [checkoutList, setCheckoutList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchProductInfo = async () => {
        await axios.get(`http://localhost:3344/products/${id}`)
            .then((res) => {
                setCheckoutList([res.data])
            })
    }

    const fetchOrderedList = async () => {
        await axios.get(`http://localhost:3344/products`)
            .then((res) => {
                setCheckoutList(res.data)
            })
    }

    useEffect(() => {
        if (id) {
            fetchProductInfo()
        } else {
            fetchOrderedList()
        }
    }, [])

    return (
        <>
            <Navbar />
            <Flex justify='space-around' align='center' gap={1} className={styles.checkoutContainer}>
                <div className={styles.orderItemSection}>
                    <List
                        grid={{
                            gutter: 20,
                            column: 1,
                        }}
                        loading={isLoading}
                        dataSource={checkoutList}
                        style={{ marginTop: '1%' }}
                        renderItem={(item) => (
                            <List.Item>
                                <Card hoverable className={styles.cardContainer}>
                                    <Flex align='center' justify='space-between'>
                                        <span className={styles.imageContainer}>
                                            <Image src={item.image_url} className={styles.image} preview={false} />
                                        </span>
                                        <Text strong className={styles.productInfo} style={{ fontWeight: "700", fontSize: "130%" }}>{item.name}</Text>
                                        <Text type='secondary' italic className={styles.productInfo} style={{ fontWeight: "400" }}>
                                            <Text>{item.price} $</Text>
                                        </Text>
                                    </Flex>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                <Flex vertical justify='center' align='center' className={styles.billingSection}>
                    <Title>BILLING</Title>
                    <span className={styles.productListSection}>

                    </span>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}
