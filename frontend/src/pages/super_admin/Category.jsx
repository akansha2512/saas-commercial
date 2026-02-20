import { Table, Tag, Button, Space, Input, Modal, Form } from "antd";
import {PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons"
import { useState } from "react";
const {Search} = Input;
export default function Category(){
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([
        {
        key: "1",
        name: "Fashion",
        subCategories: ["Men", "Women", "Kids"],
        status: "Active",
        },
        {
        key: "2",
        name: "Electronics",
        subCategories: ["Mobiles", "Laptops", "Accessories"],
        status: "Active",
        },
        {
        key: "3",
        name: "Beauty",
        subCategories: ["Makeup", "Skincare"],
        status: "Inactive",
        },
    ]);
    const columns = [
        {
            title:(<span className="text-xl font-semibold text-black uppercase">Category</span>),
            dataIndex:"name",
            key:"categories",
        },
        {
            title:(<span className="text-xl font-semibold text-black uppercase">Sub Categories</span>),
            dataIndex:"subCategories",
            key:"subCategories",
            render:(subs)=>(
                <>
                {subs.map((sub,index) =>(
                    <Tag key={index} color="blue" className=" text-base font-medium mb-1">{sub}</Tag>
                ))}
                </>
            )
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
                <Button icon={<EditOutlined />}
                size="medium"
                style={{ fontWeight: 500 }}>Edit</Button>
                <Button danger icon={<DeleteOutlined />}
                size="medium"
                style={{ fontWeight: 500 }}>
                    Delete
                </Button>
                <Button type="primary" icon={<EyeOutlined/>}
                size="medium"
                style={{ fontWeight: 500 }}>View</Button>
                </Space>
            ),
        },
    ]
    const handleAddCategory = () => {
        form.validateFields().then((values) => {
        const newCategory = {
            key: Date.now(),
            name: values.name,
            subCategories: values.subCategories.split(",").map(s => s.trim()),
            status: "Active",
        };
        setCategories([...categories, newCategory]);
        setIsModalOpen(false);
        form.resetFields();
        });
    };
    return(
        <div className="p-6 bg-gray-100 ">
            <div  className="bg-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm ">
                <h1 className="text-2xl font-semibold text-gray-800 !m-0 !mb-2 uppercase">
                    Categories & Master Data
                </h1>
                <p className="text-2sm text-gray-500 !m-0">
                    Manage global categories for the platform
                </p>
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
                    onClick={() => setIsModalOpen(true)}
                    >Add Category</Button>
                </div>
                <Table
                columns={columns}
                dataSource={categories}
                rowClassName={() => "text-base"}
                pagination={{ pageSize: 5 }}
                />
            </div>

            <Modal
                title = {
                    <div className="text-center text-lg font-semibold !mt-5 !m-5">
                    ADD NEW CATEGORY
                    </div>
                }
                open = {isModalOpen}
                footer={[
                    <Button
                    key="cancel"
                    onClick={() => setIsModalOpen(false)}
                    className="text-base font-medium h-10 px-6"
                    >
                    Cancel
                    </Button>,
                    <Button
                    key="save"
                    type="primary"
                    onClick={handleAddCategory}
                    className="text-base font-semibold h-10 px-6"
                    >
                    Save
                    </Button>,
                ]}
            >
            <Form form={form} layout="vertical" className="space-y-5">
                <Form.Item 
                    label = {<span className="text-gray-700 font-semibold text-lg ">Enter a category name</span>}
                    name = "name"
                    rules = {[{required : true ,message: "Enter Category name"}]}
                >
                <Input placeholder="e.g : Fashion" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
                </Form.Item>

                <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg ">Enter a sub category name</span>}
                    name="subCategories"
                    rules={[{ required: true, message: "Enter sub categories" }]}
                >
                    <Input placeholder="Men, Women, Kids" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
                </Form.Item>
            </Form>

            </Modal>
        </div>
    )
}