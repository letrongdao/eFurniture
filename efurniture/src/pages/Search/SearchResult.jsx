import React, { useState, useEffect } from 'react';
import { List, Spin, Flex, Input, Button, Card, Tooltip, Typography} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import RelatedProducts from '../../components/Related Products/RelatedProducts';
import Footer from '../../components/Home/Footer';
import styles from '../Product/Product.module.css';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { Text } = Typography;

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3344/search?q=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <Input type="text" placeholder="Enter your search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {isLoading ? (
        <Flex align="center" justify="center" style={{ minHeight: '40vh' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </Flex>
      ) : (
        <>
          <List
            grid={{ gutter: 20, column: 4 }}
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item>
                {/* Hiển thị thông tin sản phẩm */}
                <Card hoverable style={{
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
      )}
    </>
  );
}