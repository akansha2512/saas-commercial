import { Table, Button,Input } from "antd";
import { EyeOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
const {Search} = Input;
export default function CustomerList(){
    const navigate = useNavigate();

    const data = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      total_orders: 3,
      total_spent: 4599,
    },
    {
      id: 2,
      name: "Anita Verma",
      email: "anita@gmail.com",
      phone: "9123456780",
      total_orders: 1,
      total_spent: 799,
    },
  ];

  const columns = [
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Customers Name</span>
            ),
      dataIndex: "name",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Email</span>
            ),
      dataIndex: "email",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Phone</span>
            ),
      dataIndex: "phone",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Total Orders</span>
            ),
      dataIndex: "total_orders",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Total Spent(₹)</span>
            ),
      dataIndex: "total_spent",
    },
    {
      title:(
                <span className="text-xl font-semibold text-black uppercase">Actions</span>
            ),
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}size="medium"
          className="uppercase font-bold"
          onClick={() =>
            // navigate(`/merchant/customers/${record.id}`)
            navigate("")
          }
        >
          View
        </Button>
      ),
    },
  ];
    return(
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4">
                <div className="flex justify-between pr-4 mb-5 gap-5">
                    <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase">Customers list</h1>

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
                    pagination={{ pageSize: 5 }}
                    rowClassName={() => "text-base"}
                    rowKey="id"
                />
            </div>
        </div>
    )
}