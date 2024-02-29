import React, { useEffect, useState } from 'react';
import { List, Typography, Spin, Flex, FloatButton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import CategorizedList from '../../components/Categorized List/CategorizedList';
import Footer from '../../components/Home/Footer'

export default function ProductList() {
    const [productDataSource, setProductDataSource] = useState([])
    const [categoryDataSource, setCategoryDataSource] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { Text } = Typography;

    const fetchProductData = async () => {
        await axios.get('http://localhost:3344/products')
            .then((res) => {
                setIsLoading(true)
                setProductDataSource(res.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
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
            {isLoading
                ?
                <Flex align='center' justify='center' style={{ minHeight: '60vh' }}>
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
                            column: 1,
                        }}
                        loading={isLoading}
                        dataSource={categoryDataSource}
                        renderItem={(item) => {
                            return <CategorizedList name={item.category_name} />
                        }}
                    />
                    <FloatButton.BackTop duration={300}/>
                </>
            }
            <Footer />
        </>
    );
}