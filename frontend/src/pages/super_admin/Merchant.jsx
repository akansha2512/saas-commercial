import { Table, Tag, Button, Space, Input,Popconfirm,message } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState, useEffect} from "react";
import axios from "axios";
const { Search } = Input;

export default function Merchants() {
  const[data, setData] = useState([]);
  const[loading, setLoading] = useState(false);
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
        className="text-lg font-medium">{plan}</Tag>
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
        const normalized = status?.toLowerCase();

        const color =
          normalized === "active"
            ? "green"
            : normalized === "pending"
            ? "orange"
            : normalized === "suspended"
            ? "volcano"
            : "red";

        return (
          <Tag color={color} className="text-lg font-medium">
            {normalized?.toUpperCase()}
          </Tag>
        );
      }
    },
    {
  title: (
    <span className="text-xl font-semibold text-black uppercase">
      Actions
    </span>
  ),
  key: "actions",
  render: (_, record) => {
    const status = record.status?.toLowerCase();

    return (
      <Space>
        {/* PENDING */}
        {status === "pending" && (
          <>
            <Popconfirm
              title="Approve this merchant?"
              description="Merchant will gain full platform access."
              onConfirm={() => updateStatus(record.key, "active")}
              okText="Approve"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="large"
              >
                Approve
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Block this merchant?"
              description="This merchant will not be allowed to access the platform."
              onConfirm={() => updateStatus(record.key, "blocked")}
              okText="Block"
              cancelText="Cancel"
            >
              <Button
                danger
                icon={<StopOutlined />}
                size="large"
              >
                Block
              </Button>
            </Popconfirm>
          </>
        )}

        {/* ACTIVE */}
        {status === "active" && (
          <>

          <Popconfirm
                        title="Suspend this merchant?"
                        description="Merchant will temporarily lose access."
                        onConfirm={() => updateStatus(record.key, "suspended")}
                        okText="Yes"
                        cancelText="No"
                    >
            <Button
              danger
              icon={<StopOutlined />}
               size="large"
            >
              Suspend
            </Button>
            </Popconfirm>
            <Popconfirm
                        title="Block this merchant permanently?"
                        description="This action is serious and restricts access completely."
                        onConfirm={() => updateStatus(record.key, "blocked")}
                        okText="Block"
                        cancelText="Cancel"
                    >
            <Button
              icon={<StopOutlined />}
               size="large"
              onClick={() => updateStatus(record.key, "blocked")}
            >
              Block
            </Button>
            </Popconfirm>
          </>
        )}

        {/* SUSPENDED */}
        {status === "suspended" && (
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
              
            >
              Activate
            </Button>
            </Popconfirm>

            <Popconfirm
                        title="Block this merchant permanently?"
                        onConfirm={() => updateStatus(record.key, "blocked")}
                        okText="Block"
                        cancelText="Cancel"
                    >
            <Button
              danger
              icon={<StopOutlined />}
               size="large"
              
            >
              Block
            </Button>

            </Popconfirm>
          </>
        )}

        {/* BLOCKED */}
        {status === "blocked" && (
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
            
          >
            Restore
          </Button></Popconfirm>
        )}
      </Space>
    );
  },
  }
  ];
  useEffect(()=>{
    fetchMerchants();
  },[]);
  const fetchMerchants= async()=>{
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:5000/api/merchant/list-merchant",{
        headers:{
          Authorization:`Bearer ${token}`
        },
      }
    );
      console.log(res.data.data);
    const formated = res.data.data.map((item) => ({
            key:item.id,
            name:item.name,
            email:item.email,
            role:item.role,
            plan: item.plan || "-",
            store:item.store_name,
            status: item.status,
    }));
    
    setData(formated);
    } catch (error) {
       message.error("failed to fetch pending merchant");
    }

    finally{
            setLoading(false);
        }
  }
  const updateStatus = async (id, newStatus) => {
        setLoading(true);
        try {
            const res = await axios.put(
            `http://localhost:5000/api/merchant/update/${id}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
            );
            message.success(res.data.message);
            fetchMerchants(); // Refresh table data
        } catch (error) {
            message.error(
            error.response?.data?.message || "Failed to update status"
            );
        } finally {
            setLoading(false);
        }
    };

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
          rowClassName={() => "text-lg"}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
