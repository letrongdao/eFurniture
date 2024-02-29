import { useState, useEffect } from 'react'
import styles from './Product.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { Divider, Typography, List, Card, Spin, Flex } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProducts from '../../components/Related Products/RelatedProducts'

export default function CategorizedProductList() {
    const { Text, Title } = Typography
    const { name } = useParams()
    const navigate = useNavigate()

    const [productDataSource, setProductDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
            <Navbar />
            <Divider orientation='left'>
                <Title className={styles.categoryTag}>{name.toUpperCase()}</Title>
            </Divider>
            {isLoading
                ?
                <Flex align='center' justify='center' style={{ minHeight: '40vh' }}>
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    fontSize: 50,
                                }}
                                spin
                            />
                        }
                    />
                </Flex>
                :
                <>
                    <List
                        grid={{
                            gutter: 20,
                            column: 4,
                        }}
                        loading={isLoading}
                        pagination={{
                            position: "bottom",
                            align: "center",
                            pageSize: 8,
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
                                        <Text strong style={{ fontWeight: "700", fontSize: "130%" }}>{item.name}</Text>
                                        <Text type='secondary' italic style={{ fontWeight: "400" }}>
                                            <Text delete={item.status === 0}>{item.price} $</Text>&ensp;
                                            {item.status === 0 ? 'SOLD OUT' : ''}
                                        </Text>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <RelatedProducts />
                </>
            }

        </>
    )
}
