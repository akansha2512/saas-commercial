import { Table, Tag } from "antd";

const columns = [
  { title: "Merchant", dataIndex: "merchant" },
  { title: "Total Sales", dataIndex: "sales" },
  { title: "Commission", dataIndex: "commission" },
  { title: "Payout Amount", dataIndex: "payout" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === "Paid" ? "green" : "orange"}>
        {status}
      </Tag>
    ),
  },
];

const data = [
  {
    key: 1,
    merchant: "Fashion Store",
    sales: "₹50,000",
    commission: "₹5,000",
    payout: "₹45,000",
    status: "Pending",
  },
];

const MerchantPayoutTable = () => {
  return <Table columns={columns} dataSource={data} className="mt-6" />;
};

export default MerchantPayoutTable;
