import { Avatar, Space, Table, Input, Modal, Select, Switch } from "antd";
import {
  EditOutlined,
  InfoCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getUser,
  getUserById,
  updateUser,
  banUser,
} from "../../../dataControllers/userController";

const options = [
  {
    value: "US",
    label: "User",
  },
  {
    value: "staff",
    label: "Staff",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [testRecord, setTestRecord] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [banData, setBanData] = useState({
    status: 0,
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    role_id: "",
    status: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = await getUser();
      setDataSource(newData);
      setLoading(false);
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 1000);
    // return () => clearInterval(intervalId);
  }, []);

  // const onDeleteUser = (record) => {
  //   console.log(record);
  //   Modal.confirm({
  //     title: "Are you sure, you want to delete this user?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       setLoading(true);
  //       deleteUser(record).then(() => setLoading(false));
  //     },
  //   });
  // };

  const onBanUser = (record) => {
    setTestRecord(record);
    Modal.confirm({
      title: "BAN THIS ACCOUNT?",
      okText: "Ban",
      okType: "danger",
      onOk: () => {
        banUser(record, banData);
      },
    });
  };

  const onEditUser = (record) => {
    setIsEditing(true);
    // let data = { ...editFormData };
    // setEditFormData(data);
    setTestRecord(record);
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleCardClick = (request) => {
    getUserById(request).then((res) => {
      console.log("ID ", res);
      setSelectedRequest(res);
      console.log("DA: ", selectedRequest);
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
    getUser().then((res) => {
      if (searchText === "") {
        setDataSource(res);
      } else {
        setDataSource(
          res.filter((item) =>
            item.fullName.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    });
  };

  const handleSwitchChange = (checked) => {
    setEditFormData({ ...editFormData, status: checked ? 1 : 0 });
  };

  return (
    <Space size={20} direction="vertical">
      {/* <Typography.Title level={4}>Users</Typography.Title> */}
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
            title: "Avatar",
            dataIndex: "avatar",
            render: (link) => {
              return <Avatar src={link} size={45} />;
            },
          },
          {
            title: "Name",
            dataIndex: "fullName",
          },
          {
            title: "Role",
            dataIndex: "role_id",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                style={{
                  backgroundColor: status ? "green" : "red",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                {status ? "Online" : "Banned"}
              </span>
            ),
          },
          {
            title: "Action",
            align: "center",
            dataIndex: "user_id",
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
                      handleCardClick(record);
                    }}
                  />
                  <EditOutlined
                    onClick={() => {
                      onEditUser(record);
                    }}
                  />
                  <WarningFilled
                    onClick={() => {
                      // onDeleteUser(record);
                      onBanUser(record);
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
      <Modal
        title="Edit User"
        open={isEditing}
        centered
        okText="Confirm"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateUser(testRecord, editFormData);
          resetEditing();
        }}
      >
        <div style={{ lineHeight: "2.5" }}>
          Name:{" "}
          <Input
            value={editFormData?.fullName}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, fullName: e.target.value };
              });
            }}
          />
          Email:{" "}
          <Input
            value={editFormData?.email}
            onChange={(e) => {
              setEditFormData((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          Role:{" "}
          <Select
            value={editFormData?.role_id}
            options={options}
            style={{ width: 100, margin: "20px 20px 0px 0px" }}
            onChange={(value) => {
              setEditFormData((pre) => {
                return { ...pre, role_id: value };
              });
            }}
          />
          Status:{" "}
          <Switch value={editFormData?.status} onChange={handleSwitchChange} />
        </div>
      </Modal>

      <Modal
        title="User Information"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={1000}
        centered
      >
        {selectedRequest && (
          <Table
            dataSource={selectedRequest}
            columns={[
              {
                title: "Username",
                dataIndex: "fullName",
                key: "fullName",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "Role",
                dataIndex: "role_id",
                key: "role_id",
              },
              {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
              },
              {
                title: "Date Joined",
                dataIndex: "create_at",
                key: "date",
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (status) => (status ? "Online" : "Banned"),
              },
            ]}
            pagination={false}
          />
        )}
      </Modal>
    </Space>
  );
}
export default Users;
