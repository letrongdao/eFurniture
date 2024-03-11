import { Space, Table, Image, Modal, Input } from "antd";
import moment from "moment";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteFeedback,
  getFeedback,
  getFeedbackById,
} from "../../../dataControllers/feedbackController";

function Feedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    setLoading(true);
    getFeedback().then((res) => {
      setDataSource(res);
      console.log("SOURESCE:", dataSource);
      setLoading(false);
    });
  }, []);

  const onViewFeedbackProduct = (record) => {
    getFeedbackById(record).then((res) => {
      navigate(`/products/${res[0].product_id}`);
    });
  };

  const onDeleteFeedback = (record) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure, you want to delete this feedback?",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        deleteFeedback(record);
      },
    });
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getFeedback().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.description.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Feedback</Typography.Title> */}
      <div>
        <Input.Search
          placeholder="Search by name, category..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          enterButton
          style={{ width: "500px" }}
        />
      </div>
      <Table
        style={{ width: "1250px" }}
        loading={loading}
        columns={[
          {
            title: "Picture",
            key: "image",
            dataIndex: "productImage",
            render: (link) => {
              return <Image src={link} width={45} />;
            },
          },
          {
            title: "Name",
            key: "name",
            dataIndex: "fullName",
          },
          {
            title: "Product",
            key: "product",
            dataIndex: "productName",
          },
          {
            title: "Description",
            key: "description",
            dataIndex: "description",
          },
          {
            title: "Date",
            key: "date",
            dataIndex: "createdAt",
            render: (text) =>
              moment(text, "HH:mm:ss").format("MM-DD-YYYY HH:mm"),
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            dataIndex: "feedback_id",
            render: (record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    fontSize: "20px",
                  }}
                >
                  <InfoCircleOutlined
                    onClick={() => {
                      onViewFeedbackProduct(record);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteFeedback(record);
                    }}
                    style={{ color: "red" }}
                  />
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Feedback;
