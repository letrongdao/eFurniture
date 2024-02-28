import React, { useEffect, useState } from 'react';
import { Card, List, Typography } from 'antd';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Product.module.css'
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const [productDataSource, setProductDataSource] = useState([])
    const [categoryDataSource, setCategoryDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { Text } = Typography;

    const fetchProductData = async () => {
        await axios.get('http://localhost:3344/products')
            .then((res) => {
                setProductDataSource(res.data)
            })
            .catch((err) => console.log("Fail to fetch product data: ", err.message))
    }

    const fetchCategoryData = async () => {
        await axios.get('http://localhost:3344/categories')
            .then((res) => {
                setCategoryDataSource(res.data)
            })
            .catch((err) => console.log("Fail to fetch category data: ", err.message))
    }

    useEffect(() => {
        fetchProductData()
        fetchCategoryData()
    }, [])

    return (
        <>
            <Navbar />
            <br />
            <List
                grid={{
                    gutter: 20,
                    column: 4,
                }}
                loading={isLoading}
                dataSource={productDataSource}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{
                                width: 300,
                                height: 400,
                            }}
                            cover={<img alt="example" src={item.image_url} />}
                            onClick={() => { navigate(`/products/${item.product_id}`) }}
                        >
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
        </>
    );
}