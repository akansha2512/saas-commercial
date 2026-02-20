import {ShopOutlined,TeamOutlined,DollarOutlined,UsergroupAddOutlined,
  ShoppingCartOutlined} from "@ant-design/icons";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 ">
      <div className="bg-gray-200 rounded-xl px-6 py-4    mb-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2 text-gray-800">
          Dashboard
        </h1>
        <p className="text-2sm text-gray-500 !m-0 ">
          Platform overview & statistics
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <StatCard
          icon={<ShopOutlined />}
          title="Total Stores"
          value="124"
          bg="bg-blue-100"
          color="text-blue-600"
          borderBottom="border-b-4 border-blue-600"
        />
        <StatCard
          icon={<TeamOutlined />}
          title="Total Merchants"
          value="86"
          bg="bg-green-100"
          color="text-green-600"
          borderBottom="border-b-4 border-green-600"
        />
         <StatCard
            icon={<UsergroupAddOutlined />}
            title="Total Customers"
            value="1,248"
            bg="bg-yellow-100"
            color="text-yellow-600"
            borderBottom="border-b-4 border-yellow-600"
        />
        <StatCard
          icon={<DollarOutlined />}
          title="Platform Revenue"
          value="₹2,45,000"
          bg="bg-purple-100"
          color="text-purple-600"
          borderBottom="border-b-4 border-purple-600"
        />
        <StatCard
            icon={<ShoppingCartOutlined />}
            title="Total Orders"
            value="3,672"
            bg="bg-red-100"
            color="text-red-600"
            borderBottom="border-b-4 border-red-600"
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

