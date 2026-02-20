import {Table, Tag, Button, Space, Input} from "antd";
import {EyeOutlined, CheckCircleOutlined, StopOutlined} from "@ant-design/icons"
const {Search} = Input;
export default function PlatformUser(){
    const columns = [
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Name</span>
            ),
            dataIndex:"name",
            key:"name",
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Email</span>
            ),
            dataIndex:"email",
            key:"email",
        },
        {
             title:(
                <span className="text-xl font-semibold text-black uppercase">Role</span>
            ),
            dataIndex:"role",
            key:"role",
            render:(role) => {
                const color = role === "Merchant" ? "blue" : role === "Support Admin" ? "purple" : "green";
                return <Tag color={color} className="text-base font-medium">{role}</Tag>
            }
        },
        {
            title: <span className="text-xl font-semibold text-black uppercase">Linked Store</span>,
            dataIndex: "store",
            key: "store",
            render: (store) =>
                store ? store : <span className="text-gray-400">—</span>,
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
                <Button icon={<EyeOutlined />}size="medium"
                        style={{ fontWeight: 500 }}>View</Button>

                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    size="medium"
                        style={{ fontWeight: 500 }}
                >
                    Enable
                </Button>

                <Button danger icon={<StopOutlined />} size="medium"
                        style={{ fontWeight: 500 }}>
                    Disable
                </Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
        key: "1",
        name: "Rahul Sharma",
        email: "rahul@store.com",
        role: "Merchant",
        store: "Rahul Fashion",
        status: "Active",
        },
        {
        key: "2",
        name: "Neha Verma",
        email: "support@platform.com",
        role: "Support Admin",
        store: null,
        status: "Active",
        },
        {
        key: "3",
        name: "Amit Gupta",
        email: "ops@platform.com",
        role: "Internal User",
        store: null,
        status: "Disabled",
        },
    ];
    return(
        <div className="p-6 bg-gray-100">
            <div className=" bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2">
                    Platform users
                </h1>
                <p className="text-2sm text-gray-500 !m-0">
                    Manage internal and merchant-level users
                </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 ">
                <div className="flex justify-end pr-4 mb-5">
                    <Search
                        placeholder="Search store / merchant"
                        allowClear
                        size="large"
                        className="w-72 custom-search"
                    />
                </div>
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