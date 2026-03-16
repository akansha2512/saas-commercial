import { Table, Tag, Button, Space, Input, Modal, Form, Switch,message,Popconfirm  } from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const {Search, TextArea} = Input;
export default function SubCategory(){
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
     const [editingId, setEditingId] = useState(null);
     const token = localStorage.getItem("token");
     const { id } = useParams();
    const columns = [
        {
            title:(<span className="text-xl font-semibold text-black uppercase">ID</span>),
            key:"index",
            render:(text,record,index)=>index+1,
        },
        {
            title:(<span className="text-xl font-semibold text-black uppercase">SubCategory</span>),
            dataIndex:"name",
            key:"name",
            render: (text) =>
            text ? text.charAt(0).toUpperCase() + text.slice(1) : "",
        },
        {
            title:(<span className="text-xl font-semibold text-black uppercase">Slug</span>),
            dataIndex:"slug",
            key:"slug",
            
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
            render: (_, record) => (
                <Space>
                <Button icon={<EditOutlined />}
                size="large"
                onClick={() => handleEdit(record)}
                style={{ fontWeight: 500 }}>Edit</Button>
                
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
                
                </Space>
            ),
        },
    ]
    const handleEdit = (record) => {
       setIsModalOpen(true);
        setEditingId(record.key);
        form.setFieldsValue({
            name:record.name,
            description:record.description || "",
        });
        
    };

    const handleStatusToggle = (key, checked) => {
        const updatedData = categories.map((item) => {
            if (item.key === key) {
                return {
                    ...item,
                    status: checked ? "active" : "inactive",
                };
            }
            return item;
        });

        setCategories(updatedData);
    };
    const onFinish = async(values) => {
        try {
            setLoading(true)
            if(editingId){
                await axios.put(`http://localhost:5000/api/category/${id}/subcategories/${editingId}`,{
                name: values.name,
                description: values.description,
                },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
             message.success("SubCategory updated successfully");
            
            }else{
                await axios.post(`http://localhost:5000/api/category/${id}/subcategories/save`,{
                name: values.name,
                description: values.description,
            },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
        message.success("SubCategory created successfully");
        }
            fetchSubCategory();           
            setIsModalOpen(false);     
            setEditingId(null);        
            form.resetFields(); 
        } catch (error) {
            message.error("Sub Category failed");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSubCategory();
    },[]);

    const fetchSubCategory = async() => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/category/${id}/subcategories/list`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            }
        );
        const data = res.data.data.map((item) => ({
                key:item.id,
                name:item.name,
                slug:item.slug,
                description:item.description,
                status:item.status,
            }));
            // console.log(res.data.data);
        setCategories(data)
        } catch (error) {
             message.error("failed to fetch");
        }
        finally{
            setLoading(false);
        }
    }

    const handleDelete = async(subCategoryId) =>{
        try {
            setLoading(true)
            await axios.delete(`http://localhost:5000/api/category/${id}/subcategories/delete-subcategory/${subCategoryId}`,
                {
                 headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );


            message.success("Category Delete successfully");
            fetchSubCategory(); 
        } catch (error) {
           message.error("Failed to delete category"); 
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div className="p-6 bg-gray-100 ">
           <div className="bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-2xl font-semibold text-gray-800 !m-0 uppercase">
                    Sub Categories & Master Data
                </h1>
                <p className="text-sm text-gray-500 !m-0 mt-1">
                    Manage global Sub categories for the platform
                </p>
                </div>

                <Button
                icon={<ArrowLeftOutlined  />}
                size="large"
                className="uppercase font-bold"
                onClick={() => navigate(-1)}
                >
                Back
                </Button>

            </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-end pr-4 mb-5 gap-5">
                    <Search
                    placeholder="Search merchant / store"
                        allowClear
                        size="large"
                        className="w-72 custom-search"
                    />
                    <Button 
                     type = "primary"
                    icon={<PlusOutlined />}
                    size="large"
                    className="uppercase font-bold"
                    onClick={() =>  {
                        setIsModalOpen(true);
                        setEditingId(null);
                        
                        form.resetFields();
                    }}
                    >Add SubCategory</Button>
                </div>
                <Table
                columns={columns}
                dataSource={categories}
                rowClassName={() => "text-lg"}
                loading={loading}
                pagination={{ pageSize: 5 }}
                />
            </div>

            <Modal
                title = {
                    <div className="text-center text-lg font-semibold !mt-5 !m-5">
                    {editingId ? "EDIT SUB-CATEGORY" : "ADD NEW SUB-CATEGORY"}
                    </div>
                }

                open = {isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    form.resetFields();
                }}
                destroyOnHidden
                footer={null}
            >
            <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-5">
                <Form.Item 
                    label = {<span className="text-gray-700 font-semibold text-lg ">Enter a subcategory name</span>}
                    name = "name"
                    rules = {[{required : true ,message: "Enter Category name"}]}
                >
                <Input placeholder="e.g : Fashion" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
                </Form.Item>
                <Form.Item
                    label={
                        <span className="text-gray-700 font-semibold text-lg">
                            Enter description
                        </span>
                        }
                        name="description"
                        rules={[{ required: true, message: "Enter Description" }]}
                    >
                    <TextArea
                    rows={4}
                    placeholder="Write category description..."
                    className="rounded-lg bg-gray-100 border-gray-300 focus:bg-white"
                    />
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: "100%", justifyContent: "end" }}>
                        <Button onClick={() => {
                            setIsModalOpen(false);
                            form.resetFields();
                        }} className="text-base font-semibold h-10 px-6">
                        Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" className="text-base font-semibold h-10 px-6">
                        {editingId ? "UPDATE SUB-CATEGORY" : "SAVE SUB-CATEGORY"}
                        
                         
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            </Modal>
        </div>
    )
}