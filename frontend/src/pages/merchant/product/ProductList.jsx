import { Table, Tag, Button, Space, Input,message, Switch, Popconfirm } from "antd";
import {PlusOutlined, CheckCircleOutlined, EyeOutlined, DeleteOutlined} from "@ant-design/icons"
const {Search} = Input;
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList(){
     const navigate = useNavigate();
     const token = localStorage.getItem("token");
     const { slug } = useParams();
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(false);
     const [searchValue, setSearchValue] = useState("");
    const [total, setTotal] = useState(0);
    const[page,setPage] = useState(1);
    //  const handleSearch = (value) => {
    //         setSearchValue(value);
    //     };
    const columns = [
        {
            title:(<span className="text-xl font-semibold text-black uppercase">ID</span>),
            key:"index",
            render:(text,record,index)=>index+1,
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Name</span>
            ),
            dataIndex:"name",
            key:"name"
        },
        {
            title:(
                <span className="text-xl font-semibold text-black uppercase">Image</span>
            ),
            dataIndex:"image",
            render: (img) => (
            img ? (
                <img
                src={img}
                alt="product"
                className="w-16 h-16 rounded-md object-cover"
                />
            ) : (
                "No Image"
            )
            )
        },
        {
            title:(
                <span  className="text-xl font-semibold text-black uppercase" >Price (₹)</span>
            ),
            dataIndex:"price",
            key:"price",
        },
        {
            title:(
                <span  className="text-xl font-semibold text-black uppercase" >Stock</span>
            ),
            dataIndex:"stock",
            key:"stock"
        },
        {
            title: <span className="text-xl font-semibold text-black uppercase">Status</span>,
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Switch
                    checked={status === "active"}
                    onChange={(checked) => handleStatusToggle(record.key, checked)}
                    checkedChildren=""
                    unCheckedChildren=""
                />
            ),
        },
        {
            title: <span className="text-xl font-semibold text-black uppercase">Actions</span>,
            key: "actions",
            render: (text,record) => (
                <Space>
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    size="large"
                    className="uppercase font-bold"
                    onClick={() => navigate(`/merchant/${slug}/products/edit/${record.id}`)}
                >
                    Edit
                </Button>

                {/* <Button danger icon={<StopOutlined />} size="large"
                        className="uppercase font-bold"
                        onClick={() => handleDelete(record.key)}
                        >
                    Delete
                </Button> */}

                <Popconfirm
                    title="Delete Category"
                    description="Are you sure you want to delete this subcategory?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(record.key)}
                ><Button danger icon={<DeleteOutlined />}
                size="large"
                style={{ fontWeight: 500 }}>
                    Delete
                </Button></Popconfirm>

                <Button icon={<EyeOutlined />}size="large"
                        className="uppercase font-bold">View</Button>
                </Space>
            ),
        },
    ]
    const fetchProducts = async (search = "", pageNo = 1) => {
   
    try {
        setLoading(true);
        const res = await axios.get(
        `http://localhost:5000/api/merchant/${slug}/products?search=${search}&page=${pageNo}&limit=5`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );

        const formattedData = res.data.data.map((item) => ({
        ...item,
        key: item.id,
        image: item.image
            ? `http://localhost:5000/uploads/products/${item.image}`
            : null,
        }));
        
        setProducts(formattedData);
        setTotal(res.data.total);
        console.log(formattedData);
    } catch (error) {
        message.error("Failed to fetch products");
    } finally {
        setLoading(false);
    }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/merchant/${slug}/deleted-product/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });

            message.success("Product delete successfully ");
            fetchProducts(searchValue, page);
            
        } catch (error) {
            console.log(error);
            message.error("Failed to delete products");
        }
    }
    useEffect(() => {
    const delayDebounce = setTimeout(() => {
        fetchProducts(searchValue,page);
    }, 500); // 500ms wait

    return () => clearTimeout(delayDebounce);
    }, [searchValue,page]);

    const handleStatusToggle = async (id, checked) => {
    try {
        const newStatus = checked ? "active" : "inactive";

        await axios.put(
            `http://localhost:5000/api/merchant/${slug}/status-product/${id}`,
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        message.success("Status updated successfully");
        fetchProducts(searchValue, page);

    } catch (error) {
        console.log(error);
        message.error("Failed to update status");
    }
};
    return(
        <div className="p-6 bg-gray-100 ">
            <div className=" bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm"> 
                <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase !mb-2">
                    Products List
                </h1>
                <p className="text-2sm text-gray-500 !m-0">
                Manage all products on the platform
                </p>
            </div>

        <div className="bg-white rounded-xl shadow-sm p-4 ">
            <div className="flex justify-end pr-4 mb-5 gap-5">
                <Search
                    placeholder="Search merchant / store"
                    allowClear
                    size="large"
                    className="w-72 custom-search"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPage(1); // reset page
                    }}
                />  
                <Button 
                    type = "primary"
                    icon={<PlusOutlined />}
                    size="large"
                    className="uppercase font-bold"
                    onClick={() => navigate(`/merchant/${slug}/products/add`)}
                >Add Product</Button>                           
            </div>  
            <Table
            columns={columns}
            dataSource={products}
            loading={loading}
            pagination={{
                current: page,
                pageSize: 5,
                total: total,
                onChange: (pageNo) => setPage(pageNo),
            }}
            rowClassName={() => "text-lg"}
            />
      </div>
    </div>
    )
}