import { useState, useEffect } from 'react'
import styles from './Product.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { Divider, Typography, List, Card, Spin, Flex, Tooltip, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProducts from '../../components/Related Products/RelatedProducts'
import Footer from '../../components/Home/Footer'

export default function CategorizedProductList() {
    const { Text, Title } = Typography
    const { name } = useParams()
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
                                                {item.price}&ensp;
                                                $</Text>&ensp;
                                            {item.status === 0 ? 'SOLD OUT' : ''}
                                        </Text>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <RelatedProducts />
                    <Footer />
                </>
            }

        </>
    )
}
