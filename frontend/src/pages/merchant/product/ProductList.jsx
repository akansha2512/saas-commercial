import { Table, Tag, Button, Space, Input} from "antd";
import {PlusOutlined, CheckCircleOutlined, EyeOutlined, StopOutlined} from "@ant-design/icons"
const {Search} = Input;
import { useNavigate } from "react-router-dom";
export default function ProductList(){
     const navigate = useNavigate();
    const data = [
        {
        id: 1,
      name: "Blue T-Shirt",
      price: 799,
      stock: 50,
      image: "https://via.placeholder.com/80",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneakers",
      price: 2499,
      stock: 12,
      image: "https://via.placeholder.com/80",
      status: "Inactive",
    },
    ]
    const columns = [
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Name</span>
            ),
            dataIndex:"name",
            key:"name"
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Image</span>
            ),
            dataIndex:"image",
            render:(img) => (
                <img src={img} alt="productImage" className="w-16 h-16 rounded-md"/>
            )
        },
        {
            title:(
                <span  className="text-xl font-semibold text-black uppercase" >Price (₹)</span>
            ),
            dataIndex:"price",
            key:"price",
        },
        {
            title:(
                <span  className="text-xl font-semibold text-black uppercase" >Stock</span>
            ),
            dataIndex:"stock",
            key:"stock"
        },
        {
            title: <span className="text-xl font-semibold text-black uppercase">Status</span>,
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"} className="text-base font-medium">
                {status}
                </Tag>
            ),
        },
        {
            title: <span className="text-xl font-semibold text-black uppercase">Actions</span>,
            key: "actions",
            render: () => (
                <Space>
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    size="medium"
                    className="uppercase font-bold"
                >
                    Edit
                </Button>

                <Button danger icon={<StopOutlined />} size="medium"
                        className="uppercase font-bold">
                    Delete
                </Button>

                <Button icon={<EyeOutlined />}size="medium"
                        className="uppercase font-bold">View</Button>
                </Space>
            ),
        },
    ]

    return(
        <div className="p-6 bg-gray-100 ">
            <div className=" bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm"> 
                <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2">
                    Products
                </h1>
                <p className="text-2sm text-gray-500 !m-0">
                Manage all products on the platform
                </p>
            </div>

        <div className="bg-white rounded-xl shadow-sm p-4 ">
            <div className="flex justify-end pr-4 mb-5 gap-5">
                <Search
                    placeholder="Search merchant / store"
                    allowClear
                    size="large"
                    className="w-72 custom-search"
                />  
                <Button 
                    type = "primary"
                    icon={<PlusOutlined />}
                    size="large"
                    className="uppercase font-bold"
                    onClick={() => navigate("/products/add")}
                >Add Product</Button>                           
            </div>  
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