import { useNavigate } from 'react-router-dom'
import styles from '../../css/related.module.css'
import { useState, useEffect } from 'react'
import { List, Typography, Card, Divider } from 'antd'
import axios from 'axios'


export default function RelatedProducts() {
  const { Text } = Typography
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const navigate = useNavigate()
  const fetchRelatedProducts = async () => {
    await axios.get('http://localhost:3344/topProducts')
      .then((res) => {
        setDataSource(res.data)
      })
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    fetchRelatedProducts()
  }, [])

  return (
    <>
      <Divider orientation='left'>
        <Text className={styles.title}>OTHER PRODUCTS</Text>
      </Divider>
      <List
        grid={{
          gutter: 800,
          column: dataSource.length,
        }}
        loading={isLoading}
        pagination={{
          position: "bottom",
          align: "center",
          pageSize: 5,
        }}
        dataSource={dataSource}
        itemLayout='horizontal'
        style={{ marginLeft: "8%" }}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{
                width: 200,
                height: 300,
              }}
              cover={<img alt="example" src={item.image_url} />}
              onClick={() => { navigate(`/products/${item.product_id}`) }}
            >
              <div className={styles.infoSection}>
                <Text strong style={{ fontWeight: "700", fontSize: "130%" }} className={styles.itemName}>{item.name}</Text>
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
  )
}
