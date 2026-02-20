import { Table,Input,Tag,Button} from "antd";
import { EyeOutlined} from "@ant-design/icons"

const {Search} = Input;
export default function OrderList(){
    const data = [
    {
      id: 1001,
      customer_name: "Rahul Sharma",
      total_amount: 2599,
      payment_status: "Paid",
      order_status: "Processing",
      created_at: "2026-02-10",
    },
  ];
    const columns = [
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Order ID</span>
            ),
            dataIndex:"name",
            
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Customer</span>
            ),
            dataIndex:"customer_name",
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Amount (₹)</span>
            ),
            dataIndex:"total_amount",
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Payment</span>
            ),
            dataIndex:"total_amount",
            render:(status)=>(
                <Tag color={status === "Paid" ? "green" : "orange"}className="text-base font-medium">{status}</Tag>
            )
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Payment</span>
            ),
            dataIndex:"order_status",
            render:(status)=>{
                let color ="blue";
                if(status === "Delivered") color = "green";
                if(status ==="Shipped") color = "purple";
                return <Tag color={color} className="text-base font-medium">{status}</Tag>
            }
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">
                    Date
                </span>
            ),
            dataIndex:"created_at"
        },
        {
             title:(
                <span className="text-xl font-semibold text-black uppercase">
                    Actions
                </span>
            ),
            render:(_,record) => (
                <Button icon={<EyeOutlined />}size="medium"
                className="uppercase font-bold"  onClick={()=>""}>View</Button>
            )
        }
    ]
    return(
        <div className="p-6 bg-gray-100">
            <div className="bg-gray-200 rounded-xl px-6 py-4">
                <div className="flex justify-between pr-4 mb-5 gap-5">
                    <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase">Orders list</h1>
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