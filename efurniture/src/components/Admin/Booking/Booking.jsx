import moment from "moment";
import { Space, Table, Input, Modal } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  approveBooking,
  deleteBooking,
  getBooking,
} from "../../../dataControllers/bookingController";

function Bookings() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getBooking();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 1000);
    // return () => clearInterval(intervalId);
  }, []);

  const onApproveBooking = (record) => {
    Modal.confirm({
      title: "APPROVE THIS BOOKING?",
      okText: "Approve",
      onOk: () => {
        approveBooking(record);
      },
    });
  };

  console.log("DATEA: ", dataSource);

  const onDeleteBooking = (record) => {
    console.log(record);
    Modal.confirm({
      title: "DELETE THIS BOOKING?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteBooking(record);
      },
    });
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getBooking().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item) =>
              item.contents.toLowerCase().includes(searchText.toLowerCase()) ||
              item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
              item.productName.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  return (
    <Space size={20} direction="vertical">
      <Input.Search
        placeholder="Search by name..."
        value={searchInput}
        onChange={(e) => handleSearch(e.target.value)}
        enterButton
        style={{ width: "500px", marginTop: "10px" }}
      />
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Name",
            dataIndex: "fullName",
          },
          {
            title: "Product",
            dataIndex: "productName",
          },
          {
            title: "Description",
            dataIndex: "contents",
          },
          {
            title: "Booking Date",
            dataIndex: "date",
            render: (text) => moment(text).format("MM-DD-YYYY"),
          },
          {
            title: "Time",
            dataIndex: "time",
            render: (text) => moment(text, "HH:mm:ss").format("HH:mm"),
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  backgroundColor: status ? "green" : "gray",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {status ? "Approved" : "Pending"}
              </span>
            ),
          },
          {
            title: "Action",
            align: "center",
            dataIndex: "booking_id",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <CheckCircleOutlined
                    style={{ color: "green" }}
                    onClick={() => {
                      onApproveBooking(record);
                    }}
                  />
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => {
                      onDeleteBooking(record);
                    }}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 6,
        }}
      ></Table>
    </Space>
  );
}
export default Bookings;
