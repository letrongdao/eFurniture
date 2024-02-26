import React, { useEffect, useState } from 'react';
import { Card, List, Typography } from 'antd';
import axios from 'axios';
import Navbar from '../../components/Home/Navbar';
import "./Product.css"

export default function ProductList() {
    const [productDataSource, setProductDataSource] = useState([])
    const [categoryDataSource, setCategoryDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { Text } = Typography;

    const fetchProductData = async () => {
        setIsLoading(true)
        await axios.get('http://localhost:3344/products')
            .then((res) => {
                if (res) {
                    setProductDataSource(res.data)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                }
            })
            .catch((err) => console.log("Fail to fetch product data: ", err.message))
    }

    const fetchCategoryData = async () => {
        setIsLoading(true)
        await axios.get('http://localhost:3344/categories')
            .then((res) => {
                if (res) {
                    setCategoryDataSource(res.data)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                }
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
                            style={{
                                width: 300,
                                height: 400,
                            }}
                            cover={<img alt="example" src={item.image_url} />}
                            className='product-item'
                        >
                            <div className='info-section'>
                                <Text strong style={{ fontWeight: "700", fontSize: "110%" }}>{item.name}</Text>
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