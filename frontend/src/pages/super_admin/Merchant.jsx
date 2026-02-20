import { Table, Tag, Button, Space, Input } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export default function Merchants() {
  const columns = [
    {
      title: (
        <span className="text-xl font-semibold text-black uppercase">
          Merchant Name
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span className="text-xl font-semibold text-black uppercase">
          Store Name
        </span>
      ),
      dataIndex: "store",
      key: "store",
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
      title: (
        <span className="text-xl font-semibold text-black uppercase">
          Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Pending"
            ? "orange"
            : "red";
        return <Tag color={color} className="text-base font-medium">{status}</Tag>;
      },
    },
    {
      title: (
        <span className="text-xl font-semibold text-black uppercase">
          Actions
        </span>
      ),
      key: "actions",
      render: () => (
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            size="medium"
            style={{ fontWeight: 500 }} 
          >
            Approve
          </Button>

          <Button
            danger
            icon={<StopOutlined />}
            size="medium"
            style={{ fontWeight: 500 }} 
          >
            Suspend
          </Button>

          <Button

            icon={<LockOutlined />}
            size="medium"
            style={{ fontWeight: 500 }} 
          >
            Reset Password
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Rahul Sharma",
      store: "Rahul Fashion",
      plan: "Pro",
      status: "Active",
    },
    {
      key: "2",
      name: "Anita Verma",
      store: "Anita Beauty",
      plan: "Free",
      status: "Pending",
    },
    {
      key: "3",
      name: "Mohit Gupta",
      store: "MG Electronics",
      plan: "Pro",
      status: "Suspended",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 ">     
      <div className="bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm ">
        
          <h1 className="text-2xl font-semibold text-gray-800 !m-0 !mb-2 uppercase">
            Merchants
          </h1>
          <p className="text-2sm text-gray-500 !m-0">
            Manage all merchants on the platform
          </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-end pr-4 mb-5">
           <Search
              placeholder="Search merchant / store"
              allowClear
              size="large"
              className="w-72 custom-search"
        />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={() => "text-base"}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
