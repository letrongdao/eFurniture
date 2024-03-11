import {
  BookOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getProduct,
  getUser,
  getOrders,
  getRevenue,
} from "../../../dataControllers/index";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getBooking } from "../../../dataControllers/bookingController";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [bookings, setBookings] = useState(0);
  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getProduct().then((res) => {
      setProducts(res.length);
    });
    getUser().then((res) => {
      setUsers(res.length);
    });
    getBooking().then((res) => {
      setBookings(res.length);
    });
  }, []);
  return (
    <Space size={20} direction="vertical" style={{ padding: 20 }}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
          title={"Orders"}
          value={orders}
          gradientColors={["#FF512F", "#F09819"]}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                // color: "green",
                // backgroundColor: "rgba(0,255,0,0.25)",
                // borderRadius: 20,
                // padding: 8,
                fontSize: "20px",
              }}
            />
          }
          title={"Products"}
          value={products}
          gradientColors={["#00CDAC", "#8DD5E9"]}
        />
        <DashboardCard
          icon={<UserOutlined style={{ fontSize: "20px" }} />}
          title={"Customer"}
          value={users}
          gradientColors={["#F857A6", "#FF5858"]}
        />
        <DashboardCard
          icon={<BookOutlined style={{ fontSize: "20px" }} />}
          title={"Booking"}
          value={bookings}
          gradientColors={["#2196F3", "#00C9FF"]}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon, gradientColors }) {
  const gradientBackground = {
    background: `linear-gradient(to bottom right, ${gradientColors[0]}, ${gradientColors[1]})`,
  };
  const titleStyle = {
    color: "white", // Change the color to your desired color
    marginBottom: 0, // Adjust spacing if necessary
    fontWeight: "bold",
  };
  return (
    <Card style={{ width: "300px", ...gradientBackground }}>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={<Typography.Text style={titleStyle}>{title}</Typography.Text>}
          value={value}
        />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        style={{ width: "630px" }}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });
      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };
      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };
  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar data={reveneuData} />
    </Card>
  );
}

export default Dashboard;
