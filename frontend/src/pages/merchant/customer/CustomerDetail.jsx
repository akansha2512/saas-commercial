import { Card, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
export default function CustomerDetail(){
    const { id } = useParams();

    const orders = [
    {
      id: 1001,
      amount: 2599,
      payment_status: "Paid",
      order_status: "Delivered",
      date: "2026-02-01",
    },
    {
      id: 1002,
      amount: 2000,
      payment_status: "Paid",
      order_status: "Shipped",
      date: "2026-02-05",
    },
  ];

  const columns = [
    {
      title:(
                <span className="text-lg font-semibold text-black uppercase">Order ID</span>
            ),
      dataIndex: "id",
    },
    {
      title:(
                <span className="text-lg font-semibold text-black uppercase">Amount (₹)</span>
            ),
      dataIndex: "amount",
    },
    {
      title: (
                <span className="text-lg font-semibold text-black uppercase">Payments</span>
            ),
      dataIndex: "payment_status",
      render: (status) => (
        <Tag color="green" className="text-base font-medium">{status}</Tag>
      ),
    },
    {
      title:(
                <span className="text-lg font-semibold text-black uppercase">Orders Status</span>
            ),
      dataIndex: "order_status",
      render: (status) => {
        let color = "blue";
        if (status === "Delivered") color = "green";
        if (status === "Shipped") color = "purple";

        return <Tag color={color}  className="text-base font-medium">{status}</Tag>;
      },
    },
    {
      title:(
                <span className="text-lg font-semibold text-black uppercase">Date</span>
            ),
      dataIndex: "date",
    },
  ];
    return(
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4 space-y-6">
                <h1  className="text-2xl font-semibold text-gray-800 !m-0 uppercase">
                    Customer Detail (#id)
                </h1>

                <Card title={<span className="text-lg font-semibold uppercase">Customer Info</span>}>
                    <p className="text-base"><strong>Name :</strong> Rahul Sharma</p>
                    <p className="text-base"><strong>Address :</strong> Delhi, India</p>
                    <p className="text-base"><strong>Phone :</strong> 9877897898</p>
                </Card>

                <Card title={<span className="text-lg font-semibold uppercase">Order History</span>}>
                    <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="id"
                    pagination={false}
                    />
                </Card>
            </div>
        </div>
    )
}