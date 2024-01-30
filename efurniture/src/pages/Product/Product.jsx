import React from 'react'
import "react-toastify/dist/ReactToastify.css"
import { Avatar, List } from 'antd';
import 'Product'
export default function Product() {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  return (
    <div className='backdrop'>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="osaijdaosijsdoijs"
            />
          </List.Item>
        )}
      />
    </div>
  )
}
