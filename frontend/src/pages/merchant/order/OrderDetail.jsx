import { Card, Table, Tag, Select, message } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
export default function OrderDetail(){
    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState("Processing");
    const orderItems = [
        {
        id: 1,
        product_name: "Blue T-Shirt",
        price: 799,
        quantity: 2,
        },
        {
        id: 2,
        product_name: "Shoes",
        price: 1000,
        quantity: 1,
        },
    ];

    const columns = [
        {
        title:(
                <span className="text-lg font-semibold text-black uppercase">Product</span>
            ),
        dataIndex: "product_name",
        },
        {
        title:(
                <span className="text-lg font-semibold text-black uppercase">Price</span>
            ),
        dataIndex: "price",
        },
        {
        title:(
                <span className="text-lg font-semibold text-black uppercase">Quantity</span>
            ),
        dataIndex: "quantity",
        },
        {
        title:(
                <span className="text-lg font-semibold text-black uppercase">Total</span>
            ),
        render: (_, record) => record.price * record.quantity,
        },
    ];

    const handleStatusChange = (value) => {
        setOrderStatus(value);
        message.success("Order Status Updated");
    };
    return (
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4 space-y-6">
                <h1  className="text-2xl font-semibold text-gray-800 !m-0 uppercase">
                    Order Detail (#id)
                </h1>
           
                <Card title={<span className="text-lg font-semibold uppercase">Customer Info</span>}>
                    <p className="text-base"><strong>Name:</strong> Rahul Sharma</p>
                    <p className="text-base"><strong>Address:</strong> Delhi, India</p>
                </Card>
                <Card title={<span className="text-lg font-semibold uppercase">Payment Info</span>}>
                    <Tag color="green" className="text-base font-medium">Paid</Tag>
                </Card>

                <Card title={<span className="text-lg font-semibold uppercase">Customer Info</span>}>
                    <Table
                    columns={columns}
                    dataSource={orderItems}
                    pagination={false}
                    rowKey="id"
                    />
                </Card>
                <Card title={<span className="text-lg font-semibold uppercase">Customer Info</span>}>
                    <Select
                    value={orderStatus}
                    onChange={handleStatusChange}
                    style={{ width: 200 }}
                    className="text-base font-medium"
                    >
                    <Select.Option value="Processing">
                        Processing
                    </Select.Option>
                    <Select.Option value="Shipped">
                        Shipped
                    </Select.Option>
                    <Select.Option value="Delivered">
                        Delivered
                    </Select.Option>
                    </Select>
                </Card>
            </div>
        </div>
    )
}