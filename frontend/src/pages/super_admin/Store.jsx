import {Input, Table, Tag, Space, Button} from "antd";
import {EyeOutlined, CheckCircleOutlined, StopOutlined} from "@ant-design/icons";

const {Search} = Input;
export default function Store(){
    const columns =[
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Store Name</span>
            ),
            dataIndex:"store",
            key:"store",
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Merchant</span>
            ),
            dataIndex:"merchant",
            key:"merchant",
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">category</span>
            ),
            dataIndex:"category",
            key:"category",
            render:(cat) => (
                <Tag color="blue" className="text-base font-medium">{cat}</Tag>
            ),
        },
        {
            title: (
                <span className="text-xl font-semibold text-black uppercase">
                Plan
                </span>
            ),
            dataIndex: "plan",
            key: "plan",
            render: (plan) => (
                <Tag color={plan === "Pro" ? "blue" : "default"}
                className="text-base font-medium">{plan}</Tag>
            ),
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">
                Products
                </span>
            ),
            dataIndex:"products",
            key:"products",
            render:(count) => (
                <span className="font-semibold text-gray-700 text-base">{count}</span>
            ),
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">
                Products
                </span>
            ),
                dataIndex: "orders",
                key: "orders",
                render: (count) => (
                <span className="font-semibold text-gray-700 text-base">
                {count}
                </span>
            ),
        },
        {
            title: <span className="text-xl font-semibold uppercase">Actions</span>,
            key: "actions",
            render: () => (
                <Space>
                    <Button
                        primary
                        icon={<EyeOutlined />}
                        size="medium"
                        style={{ fontWeight: 500 }}
                    >View
                    </Button>
                    <Button
                        
                        icon={<CheckCircleOutlined />}
                        size="medium"
                        style={{ fontWeight: 500 }}
                    >Enable
                    </Button>
                    <Button
                        danger
                        icon={<StopOutlined />}
                        size="medium"
                        style={{ fontWeight: 500 }}
                    >Disable
                    </Button>
                </Space>
            )
        }
    ];
    const data = [
        {
      key: "1",
      store: "Rahul Fashion",
      merchant: "Rahul Sharma",
      category: "Fashion",
      plan: "Pro",
      products: 245,
      orders: 1820,
      status: "Active",
    },
    {
      key: "2",
      store: "Anita Beauty",
      merchant: "Anita Verma",
      category: "Beauty",
      plan: "Free",
      products: 3,
      orders: 1,
      status: "Disabled",
    },
    {
      key: "3",
      store: "MG Electronics",
      merchant: "Mohit Gupta",
      category: "Electronics",
      plan: "Pro",
      products: 120,
      orders: 980,
      status: "Active",
    },
    ]
    return (
        <div className="p-6 bg-gray-100 ">
      
        <div className=" bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm">
            
            <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2">
                Stores
            </h1>
            <p className="text-2sm text-gray-500 !m-0">
                Manage all stores on the platform
            </p>
        </div>

      
      <div className="bg-white rounded-xl shadow-sm p-4 ">
        <div className="flex justify-end pr-4 mb-5" >
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
    )
}