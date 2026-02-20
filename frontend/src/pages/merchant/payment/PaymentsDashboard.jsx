import { Card, Row, Col, Table, Tag } from "antd";
export default function PaymentsDashboard(){
    const payments = [
    {
      id: 1001,
      order_id: 501,
      amount: 2599,
      status: "Paid",
      date: "2026-02-10",
    },
    {
      id: 1002,
      order_id: 502,
      amount: 1200,
      status: "Pending",
      date: "2026-02-11",
    },
  ];

  const totalEarnings = 3799;
  const paidAmount = 2599;
  const pendingAmount = 1200;

  const columns = [
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Payment id</span>
            ),
      dataIndex: "id",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Order ID</span>
            ),
      dataIndex: "order_id",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Amount (₹)</span>
            ),
      dataIndex: "amount",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase"> Status</span>
            ),
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "orange"} className="text-base font-medium">
          {status}
        </Tag>
      ),
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Date</span>
            ),
      dataIndex: "date",
    },
  ];

    return(
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4 space-y-6">
                <h1  className="text-2xl font-semibold text-gray-800 !m-0 uppercase">
                   Payments
                </h1>


                 <Row gutter={16}>
                    <Col span={8}>
                    <Card>
                        <h3 className="text-xl font-semibold text-black uppercase">Total Earnings</h3>
                        <p className="text-xl font-bold text-pink-600">₹ {totalEarnings}</p>
                    </Card>
                    </Col>

                    <Col span={8}>
                    <Card>
                        <h3 className="text-xl font-semibold text-black uppercase">Paid Amount</h3>
                        <p className="text-xl font-bold text-green-600">
                        ₹ {paidAmount}
                        </p>
                    </Card>
                    </Col>

                    <Col span={8}>
                    <Card>
                        <h3 className="text-xl font-semibold text-black uppercase">Pending Amount</h3>
                        <p className="text-xl font-bold text-orange-500">
                        ₹ {pendingAmount}
                        </p>
                    </Card>
                    </Col>
                </Row>

                
                <Card title={<span className="text-lg font-semibold uppercase">Payment Transactions</span>}>
                    <Table
                        columns={columns}
                        dataSource={payments}
                        pagination={{ pageSize: 5 }}
                        rowClassName={() => "text-base"}
                        rowKey="id"
                    />
                </Card>
            </div>
        </div>
    )
}