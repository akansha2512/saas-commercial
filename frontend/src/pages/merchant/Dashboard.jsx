import { Input, Table, Tag } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
const {Search} = Input;

export default function MerchantDashboard() {

  // 🔹 Dummy Summary Data (API se aayega future me)
//   const summaryData = {
//     totalOrders: 120,
//     totalRevenue: 54000,
//     totalProducts: 45,
//     pendingOrders: 8,
//   };

  // 🔹 Recent Orders Dummy Data
   
  const data = [
    {
      key: "1",
      orderId: "#ORD001",
      customer: "Rahul Sharma",
      amount: 1200,
      status: "Delivered",
    },
    {
      key: "2",
      orderId: "#ORD002",
      customer: "Priya Singh",
      amount: 2500,
      status: "Pending",
    },
    {
      key: "3",
      orderId: "#ORD003",
      customer: "Amit Verma",
      amount: 800,
      status: "Cancelled",
    },
  ];

  const columns = [
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Order Id</span>
            ),
      dataIndex: "orderId",
      key:"orderId"
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Customer</span>
            ),
      dataIndex: "customer",
      key: "customer",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Amount</span>
            ),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Status</span>
            ),
      dataIndex: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Delivered") color = "green";
        if (status === "Pending") color = "orange";
        if (status === "Cancelled") color = "red";

        return <Tag color={color} className="text-base font-medium">{status}</Tag>;
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-100">

        <div className="bg-gray-200 rounded-xl px-6 py-4    mb-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2 text-gray-800">
            Dashboard
            </h1>
            <p className="text-2sm text-gray-500 !m-0 ">
            Platform overview & statistics
            </p>
        </div>
     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">


        <StatCard
          icon={<ShoppingCartOutlined />}
          title="Total Orders"
          value="124"
          bg="bg-blue-100"
          color="text-blue-600"
          borderBottom="border-b-4 border-blue-600"
        />
        <StatCard
          icon={<DollarOutlined />}
          title="Total Revenue"
          value="86"
          bg="bg-green-100"
          color="text-green-600"
          borderBottom="border-b-4 border-green-600"
        />
         <StatCard
            icon={<AppstoreOutlined />}
            title="Total Products"
            value="1,248"
            bg="bg-yellow-100"
            color="text-yellow-600"
            borderBottom="border-b-4 border-yellow-600"
        />
        <StatCard
          icon={<ClockCircleOutlined />}
          title="Pending Orders"
          value="₹2,45,000"
          bg="bg-purple-100"
          color="text-purple-600"
          borderBottom="border-b-4 border-purple-600"
        />

      </div>

       <div className="bg-white rounded-xl shadow-sm p-4 mt-5">
        <div className="flex justify-between pr-4 mb-5 itmes-center" >
            <h4 className="uppercase text-xl font-semibold">Recent Order</h4>
        <Search
          placeholder="Search store / merchant"
          allowClear
            size="large"
            className="w-72 custom-search"
        /></div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          rowClassName={() => "text-base"}
        />
        
      </div>
     

    </div>
  );
}
function StatCard({ icon, title, value, bg, color, borderBottom }) {
  return (
    <div className={`bg-white rounded-xl p-6 flex items-center gap-10 shadow-sm hover:shadow-md transition ${borderBottom}`}>

      <div className={`w-14 h-14 flex items-center justify-center rounded-lg ${bg} ${color} text-2xl`}>
        {icon}
      </div>

      <div>
        <p className="text-2xl text-gray-800 font-semibold !m-0 !mb-3">{title}</p>
        <h2 className="text-2xl font-base text-gray-500">
          {value}
        </h2>
      </div>

    </div>
  );
}