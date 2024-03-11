import { useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Flex,
  Radio,
  Row,
  Space,
  Typography,
} from 'antd';

const Checkout = () => {
  const [shipType, setShipType] = useState(1);
  const [payType, setPayType] = useState(1);

  const handleShipTypeChange = (e) => {
    setShipType(e.target.value);
  };
  const handlePayTypeChange = (e) => {
    setPayType(e.target.value);
  };

  return (
    <Flex justify='center' align='center' style={{ minHeight: '100vh' }}>
      <Row
        gutter={32}
        style={{
          width: '50%',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <Col span={18}>
          <Flex gap={8} vertical>
            <Flex
              vertical
              gap={8}
              align='start'
              style={{ marginBottom: '32px' }}
            >
              <Typography.Title level={4}>
                Chọn hình thức giao hàng
              </Typography.Title>
              <Radio.Group value={shipType} onChange={handleShipTypeChange}>
                <Radio value={1}>
                  <Typography.Text>Giao tiết kiệm</Typography.Text>
                </Radio>
                <Radio value={2}>
                  <Typography.Text>Giao nhanh</Typography.Text>
                </Radio>
              </Radio.Group>
            </Flex>
            <Flex vertical gap={8} align='start'>
              <Typography.Title level={4}>
                Chọn hình thức thanh toán
              </Typography.Title>
              <Radio.Group value={payType} onChange={handlePayTypeChange}>
                <Space direction='vertical'>
                  <Radio value={1}>Thanh toán tiền mặt khi nhận hàng</Radio>
                  <Radio value={2}>Thanh toán bằng ví Momo</Radio>
                  <Radio value={3}>Thanh toán bằng ví VNPay</Radio>
                  <Radio value={4}>
                    Thanh toán bằng coin
                  </Radio>
                </Space>
              </Radio.Group>
            </Flex>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex vertical align='flex-start'>
            <Typography.Title level={4}>Đơn hàng</Typography.Title>
            <Flex justify='space-between' style={{ width: '100%' }}>
              <Typography>1 sản phẩm</Typography>
              <Typography.Link href='/'>Xem thông tin</Typography.Link>
            </Flex>
            <Divider />
            <Flex justify='space-between' style={{ width: '100%' }}>
              <Typography>Tạm tính</Typography>
              <Typography>90.000đ</Typography>
            </Flex>
            <Flex justify='space-between' style={{ width: '100%' }}>
              <Typography>Phí vận chuyển</Typography>
              <Typography>14.000đ</Typography>
            </Flex>
            <Divider />
            <Flex justify='space-between' style={{ width: '100%' }}>
              <Typography>Tổng tiền</Typography>
              <Typography.Title level={3}>104.000đ</Typography.Title>
            </Flex>
            <Button type='primary' size='large' style={{ width: '100%' }}>
              Đặt hàng
            </Button>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default Checkout;
