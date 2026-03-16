import {Table, Tag, Button, Space, Input,  Popconfirm , message} from "antd";
import {EyeOutlined, CheckCircleOutlined, StopOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const {Search} = Input;
export default function PlatformUser(){
    const [data,setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    const columns = [
        {
            title:(<span className="text-xl font-semibold text-black uppercase">ID</span>),
            key:"index",
            // render: (text, record, index) =>
            //  (currentPage - 1) * pageSize + index + 1
           render: (text, record, index) => {
            console.log(text, record, index);
            return index + 1;
            }
        },
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
            render: (status) => {
                let color = "default";
                switch(status){
                    case "active":color ="green"; break;
                    case "pending":color="orange";break;
                    case "suspended":color="volcano";break;
                    case "blocked":color="red";break;
                    default : color="default";
                }
               return <Tag color={color} className="text-lg font-medium">
                {status.toUpperCase()}
                </Tag>
            }
        },
        


        {
            title: <span className="text-xl font-semibold text-black uppercase">Actions</span>,
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />}size="large"
                                    style={{ fontWeight: 500 }}>View</Button>
                {/* ACTIVE MERCHANT */}
                {record.status === "active" && (
                    <>
                    <Popconfirm
                        title="Suspend this merchant?"
                        description="Merchant will temporarily lose access."
                        onConfirm={() => updateStatus(record.key, "suspended")}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                size="large"
                                    style={{ fontWeight: 500 }}
                            >
                                Suspended
                            </Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Block this merchant permanently?"
                        description="This action is serious and restricts access completely."
                        onConfirm={() => updateStatus(record.key, "blocked")}
                        okText="Block"
                        cancelText="Cancel"
                    >
                        <Button danger icon={<StopOutlined />} size="large"
                                    style={{ fontWeight: 500 }}>
                                Block
                            </Button>
                    </Popconfirm>
                    </>
                )}

                {/* SUSPENDED MERCHANT */}
                {record.status === "suspended" && (
                    <>
                    <Popconfirm
                        title="Activate this merchant?"
                        onConfirm={() => updateStatus(record.key, "active")}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                size="large"
                                    style={{ fontWeight: 500 }}
                            >
                                Active 
                            </Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Block this merchant permanently?"
                        onConfirm={() => updateStatus(record.key, "blocked")}
                        okText="Block"
                        cancelText="Cancel"
                    >
                        <Button danger icon={<StopOutlined />} size="large"
                                    style={{ fontWeight: 500 }}>
                                Block
                            </Button>
                    </Popconfirm>
                    </>
                )}

                {/* BLOCKED MERCHANT */}
                {record.status === "blocked" && (
                    <Popconfirm
                    title="Restore this merchant?"
                    onConfirm={() => updateStatus(record.key, "active")}
                    okText="Restore"
                    cancelText="Cancel"
                    >
                    <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                size="large"
                                    style={{ fontWeight: 500 }}
                            >
                                Restore
                            </Button>
                    </Popconfirm>
                )}

                </Space>
            ),
        }
    ];

   useEffect(() => {
    fetchUsers();
   },[]);

   const fetchUsers = async() => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/user/list-user",{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            }
        );
        // console.log(res.data.data);
        const formated = res.data.data.map((item) => ({
            key:item.id,
            name:item.name,
            email:item.email,
            role:item.role,
            store:item.store,
            status: item.status,
        }));
        setData(formated)
        } catch (error) {
            message.error("failed to fetch pending users");
        }
        finally{
            setLoading(false);
        }
   }
    const updateStatus = async (id, newStatus) => {
        setLoading(true);
        try {
            const res = await axios.put(
            `http://localhost:5000/api/user/update/${id}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
            );
            message.success(res.data.message);
            fetchUsers(); // Refresh table data
        } catch (error) {
            message.error(
            error.response?.data?.message || "Failed to update status"
            );
        } finally {
            setLoading(false);
        }
    };
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
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    rowClassName={() => "text-lg"}
                />
            </div>
        </div>
    );
}