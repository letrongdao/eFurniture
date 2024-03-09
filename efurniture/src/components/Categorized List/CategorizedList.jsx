import { useState, useEffect } from 'react'
import styles from './Product.module.css'
import { Divider, Typography, List, Card, Tooltip, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import efPointLogo from '../../assets/icons/efpoint_transparent.png'

export default function CategorizedList({ name }) {
    const currentUserId = sessionStorage.getItem("loginUserId")
    const { Text, Title } = Typography
    const navigate = useNavigate()

    const [productDataSource, setProductDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const fetchProductData = async () => {
        setIsLoading(true)
        await axios.get(`http://localhost:3344/products/category/${name}`)
            .then((res) => {
                setIsLoading(true)
                setProductDataSource(res.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
            .catch((err) => console.log("Fail to fetch product data: ", err.message))
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    return (
        <>
            <Divider orientation='left' orientationMargin="50">
                <Title className={styles.categoryTag} onClick={() => navigate(`/category/${name}`)}>{name}</Title>
            </Divider>
            <List
                grid={{
                    gutter: 20,
                    column: 4,
                }}
                loading={isLoading}
                pagination={{
                    position: "bottom",
                    align: "center",
                    pageSize: 4,
                    current: page,
                    hideOnSinglePage: true,
                    onChange: (page, pageSize) => {
                        setIsLoading(true)
                        setTimeout(() => {
                            setIsLoading(false)
                            setPage(page)
                        }, 1000)
                    }
                }}
                dataSource={productDataSource}
                style={{
                    marginLeft: '2%'
                }}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                                height: 350,
                            }}
                            onClick={() => { navigate(`/products/${item.product_id}`) }}
                        >
                            <div className={styles.productImageSection}>
                                <img alt="example" src={item.image_url} />
                            </div>
                            <div className={styles.infoSection}>
                                <Tooltip title={item.name}>
                                    <Text strong className={styles.productName}>{item.name}</Text>
                                </Tooltip>
                                <Text type='secondary' italic style={{ fontWeight: "400" }}>
                                    <Text delete={item.status === 0}>
                                        {item.price} &ensp;
                                        <Image src={efPointLogo} alt='' width={20} preview={false} style={{ marginBottom: '18%' }} />
                                    </Text>&ensp;
                                    {item.status === 0 ? 'SOLD OUT' : ''}
                                </Text>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}
