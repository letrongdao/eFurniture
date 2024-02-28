import {Space, Table, Typography, Button, Form, Input, DatePicker, TimePicker, message, InputNumber} from "antd";
import moment from 'moment';
import React, {useEffect, useState} from "react";
import {getBookings, deleteBooking, editBooking} from "../../../dataControllers/index";
import {generateId} from "../../../assistants/Generators.js";

function Bookings() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBookings()
      .then((res) => {
        setDataSource(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (record) => {
    setEditingId(record.booking_id);
    setEditFormData(record);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleEditSubmit = (values) => {
    setLoading(true);
    values.date = values.date.format("YYYY-MM-DD");
    values.time = values.time.format("HH:mm:ss");
    values.user_id = sessionStorage.getItem("loginUserId");
    console.log(values);
    editBooking(editingId, values)
      .then(() => {
        message.success("Booking updated successfully");
        setEditingId(null);
        setEditFormData(null);
        getBookings().then((res) => {
          setDataSource(res);
        });
      })
      .catch((error) => {
        console.error("Error editing booking:", error);
        message.error("Failed to edit booking");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (bookingId) => {
    setLoading(true);
    deleteBooking(bookingId)
      .then(() => {
        setDataSource(dataSource.filter((booking) => booking.booking_id !== bookingId));
        message.success("Booking deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        message.error("Failed to delete booking");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Bookings</Typography.Title>
      {!editingId && (
        <Table
          style={{width: "1250px"}}
          loading={loading}
          columns={[
            {
              title: "ID",
              dataIndex: "booking_id",
            },
            {
              title: "Date",
              dataIndex: "date",
              render: (value) => <span>{value}</span>,
            },
            {
              title: "Time",
              dataIndex: "time",
              render: (value) => <span>{value}</span>,
            },
            {
              title: "Status",
              dataIndex: "status",
            },
            {
              title: "Content",
              dataIndex: "contents",
            },
            {
              title: "Action",
              render: (_, record) => (
                <Space>
                  <Button type="primary" onClick={() => handleEdit(record)}>
                    Edit
                  </Button>
                  <Button type="primary" danger onClick={() => handleDelete(record.booking_id)}>
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
        />
      )}

      {editingId && (
        <Form
          initialValues={{
            ...editFormData,
            date: editFormData.date ? moment(editFormData.date, 'YYYY-MM-DD') : null,
            time: editFormData.time ? moment(editFormData.time, 'HH:mm:ss') : null
          }}
          onFinish={handleEditSubmit}
          style={{minWidth: 800, marginTop: "2rem"}}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY"/>
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[
              {
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <TimePicker format="HH:mm:ss"/>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status!",
              },
            ]}
          >
            <InputNumber
              min={0}
            />
          </Form.Item>
          <Form.Item
            name="contents"
            label="Contents"
            rules={[
              {
                required: true,
                message: "Please input contents!",
              },
            ]}
          >
            <Input.TextArea rows={4}/>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 8}}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Space>
  );
}

export default Bookings;
