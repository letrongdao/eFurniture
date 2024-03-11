import { useState } from 'react';
import {
  Button,
  Row,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
  Col,
  Flex,
} from 'antd';

const provinces = [
  {
    value: '1',
    label: 'TP.Hồ Chí Minh',
  },
  {
    value: '2',
    label: 'Hà Nội',
  },
  {
    value: '3',
    label: 'Đà Nẵng',
  },
  {
    value: '4',
    label: 'Cần Thơ',
  },
  {
    value: '5',
    label: 'Hải Phòng',
  },
  {
    value: '6',
    label: 'Huế',
  },
];

const districts = [
  {
    value: '1',
    label: 'Cần Giờ',
  },
  {
    value: '2',
    label: 'Nhà Bè',
  },
  {
    value: '3',
    label: 'Quận 1',
  },
  {
    value: '4',
    label: 'Quận 3',
  },
  {
    value: '5',
    label: 'Quận 10',
  },
  {
    value: '6',
    label: 'TP. Thủ Đức',
  },
];

const wards = [
  {
    value: '1',
    label: 'Linh Xuân',
  },
  {
    value: '2',
    label: 'Tăng Nhơn Phú A',
  },
  {
    value: '3',
    label: 'Tăng Nhơn Phú B',
  },
  {
    value: '4',
    label: 'Bình Thọ',
  },
  {
    value: '5',
    label: 'Tân Phú',
  },
  {
    value: '6',
    label: 'Long Thạnh Mỹ',
  },
];

const AddAddressModal = ({open, setOpen}) => {
  
  const [radioValue, setRadioValue] = useState(1);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <>
      
      <Modal
        title='Chỉnh sửa địa chỉ'
        centered
        open={open}
        width={750}
        okText='Tiếp tục'
        onOk={() => setOpen(false)}
        cancelText='Hủy'
        onCancel={() => setOpen(false)}
      >
        <Flex vertical gap={16}>
          <Row>
            <Col span={6}>
              <Typography>Họ và tên</Typography>
            </Col>
            <Col span={18}>
              <Input placeholder='Họ và tên' />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography>Công ty</Typography>
            </Col>
            <Col span={18}>
              <Input placeholder='Công ty' />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography>Số điện thoại</Typography>
            </Col>
            <Col span={18}>
              <Input placeholder='Số điện thoại' />
            </Col>
          </Row>
          <Flex vertical gap={8}>
            <Row>
              <Col span={8}>
                <Typography>Tỉnh/Thành phố</Typography>
              </Col>
              <Col span={8}>
                <Typography>Quận/Huyện</Typography>
              </Col>
              <Col span={8}>
                <Typography>Phường/Xã</Typography>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder='Tỉnh/Thành phố'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={provinces}
                />
              </Col>
              <Col span={8}>
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder='Search to Select'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={districts}
                />
              </Col>
              <Col span={8}>
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder='Search to Select'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={wards}
                />
              </Col>
            </Row>
          </Flex>
          <Row>
            <Col span={6}>
              <Typography>Lưu địa chỉ</Typography>
            </Col>
            <Col>
              <Radio.Group onChange={handleRadioChange} value={radioValue}>
                <Radio value={1}>Nhà riêng</Radio>
                <Radio value={2}>Công ty/Cơ quan</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Flex>
      </Modal>
    </>
  );
};
export default AddAddressModal;
