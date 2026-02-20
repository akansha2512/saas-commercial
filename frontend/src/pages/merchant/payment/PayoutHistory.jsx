import { Table, Tag } from "antd";
export default function PayoutHistory(){
    const payouts = [
        {
        id: 1,
        amount: 5000,
        status: "Completed",
        date: "2026-02-05",
        },
        {
        id: 2,
        amount: 3000,
        status: "Processing",
        date: "2026-02-12",
        },
    ];

    const columns = [
        {
            title:(
                <span className="text-lg font-semibold text-black uppercase">Payout id</span>
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
            title:(
                <span className="text-lg font-semibold text-black uppercase">Status</span>
            ),
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === "Completed" ? "green" : "blue"} className="text-base font-medium">
                {status}
                </Tag>
            ),
        },
        {
            title:(
                <span className="text-lg font-semibold text-black uppercase"> Date</span>
            ),
            dataIndex: "date",
        },
    ];
    return(
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4 space-y-6">
                <h1  className="text-2xl font-semibold text-gray-800 !m-0 uppercase">
                    Payout History
                </h1>

                <Table
                    columns={columns}
                    dataSource={payouts}
                    pagination={{ pageSize: 5 }}
                    rowClassName={() => "text-base"}
                    rowKey="id"
                />
            </div>
        </div>
    )
}