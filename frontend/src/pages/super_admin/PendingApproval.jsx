import { Table, Tag, Button, Space, Input, Popconfirm , message} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const { Search } = Input;

export default function PendingApproval() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [actionLoading, setActionLoading] = useState(null);
    const token = localStorage.getItem("token");
    const columns = [
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
                    Owner Name
                </span>
            ),
            dataIndex: "owner",
            key: "owner",
        },
        {
            title: (
                <span className="text-xl font-semibold text-black uppercase">
                    Email
                </span>
            ),
            dataIndex: "email",
            key: "email",
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
                // console.log("STATUS FROM API 👉", status);
                if (status === "inactive") {
                return <Tag className="text-base font-medium" color="gold">In Active</Tag>;
                }
                if (status === "active") {
                return <Tag className="text-base font-medium" color="green">Approved</Tag>;
                }
                if (status === "disabled") {
                return <Tag className="text-base font-medium" color="red">Rejected</Tag>;
                }
                return <Tag className="text-base font-medium">Unknown</Tag>;
            }
        },
        {
            title: (
                <span className="text-xl font-semibold text-black uppercase">
                    Actions
                </span>
            ),
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Approve this store?" 
                        description="This merchant will get access to the platform." 
                        okText="Yes" 
                        cancelText="No" 
                        onConfirm={() => approve(record.key)}
                    >
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            loading={actionLoading === record.key}
                            style={{ fontWeight: 500 }}
                        >
                            Approve
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Reject the stores ? "
                        description="This merchant will not be able to access the platform."
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => reject(record.key)}
                    >
                        <Button
                            danger
                            icon={<CloseCircleOutlined />}
                            loading={actionLoading === record.key}
                            style={{ fontWeight: 500 }}
                        >
                            Reject
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    
    useEffect(() => {
        fetchPending();
    },[]);

    const fetchPending = async() => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/pending-stores",{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            }
        );
        console.log("API RESPONSE", res.data);
        const formatted = res.data.map((item) => ({
            key:item.id,
            store:item.name,
            owner:item.owner_name,
            email:item.email,
            status: item.status,
        }));
        setData(formatted);
        } catch (error) {
             message.error("Failed to fetch pending stores");
        }
        finally {
            setLoading(false);
        }
    }
    const approve = async(id) => {
        setActionLoading(id);
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/approve-store/${id}`,{},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        message.success("Store Approved Successfully");
         fetchPending();
        } catch (error) {
        message.error("Error approving store"); 
        } 
        finally 
        {
             setActionLoading(null); 
        }
    }
    const reject = async(id) => {
        setActionLoading(id);
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/reject-store/${id}`,{},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        message.success("Store Rejected Successfully");
         fetchPending();
        } catch (error) {
        message.error("Error rejecting store"); 
        } 
        finally 
        {
             setActionLoading(null); 
        }
    }
    return (
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase !mb-2">
                    Pending Approvals
                </h1>
                <p className="text-sm text-gray-500 !m-0">
                    Review and approve newly registered merchants
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-end pr-4 mb-5">
                    <Search
                        placeholder="Search store / merchant"
                        allowClear
                        size="large"
                        className="w-72"
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowClassName={() => "text-base"}
                />
            </div>
        </div>
    );
}
