import { Form, Input, InputNumber,Select, Upload,Button,message  } from "antd";
import {PlusOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductForm(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const[loading, setLoading] = useState(false);
  const[categories,setCategories] = useState([]);
  const[subCategories,setsubCategories] = useState([]);

  const {slug, id} = useParams();
  const edit = !!id;
  useEffect(() => {
    fetchCategory();
    if(edit){
      fetchSingleProduct();
    }
  },[]);
  // Yaha problem ye hai ki Upload component event object bhejta hai, value nahi.
  const normFile = (e) => {
    if(Array.isArray(e)){
      return e;
    }
    return e?.fileList;
  }
  const fetchCategory = async() => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/merchant/${slug}/category`,{
        headers:{
                    Authorization:`Bearer ${token}`
                },
      }
    );
    setCategories(res.data.data);
   
    console.log(res.data.data);
    } catch (error) {
      message.error("failed to fetch");
    }
    finally{
      setLoading(false);
    }
  }

  const handleSubCategory = async(value)=>{
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/merchant/${slug}/subCategory/${value}`,{
                 headers: {
                    Authorization: `Bearer ${token}`,
                },
        }
    );
    setsubCategories(res.data.data);
    console.log(res.data);
    } catch (error) {
       message.error("failed to fetch");
    }
    finally{
      setLoading(false);
    }
  }

  const onFinish = async (values) => {

    try {
      
      const formData = new FormData();
      formData.append("name", values.name)
      formData.append("category_id", values.category_id);
      formData.append("sub_category_id", values.sub_category_id);
      formData.append("price", values.price);
      formData.append("compare_price", values.compare_price);
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      formData.append("status", values.status);
      formData.append("description", values.description);

      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }

      if(edit){
        await axios.put(`http://localhost:5000/api/merchant/${slug}/update-product/${id}`,
          formData,
          {
            headers:{
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            }
          }
        );
          message.success("Product created successfully");
          navigate(`/merchant/${slug}/products`);
      }else{
        await axios.post(
        `http://localhost:5000/api/merchant/${slug}/product`,
          formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          message.success("Product created successfully");
          navigate(`/merchant/${slug}/products`);
      }

     
    } catch (error) {
      console.log(error);
      message.error("Failed to create product");
    }

    
  }

  const fetchSingleProduct = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/merchant/${slug}/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.data;

    form.setFieldsValue({
      name: data.name,
      category_id: data.category_id,
      sub_category_id: data.sub_category_id,
      price: data.price,
      compare_price: data.compare_price,
      stock: data.stock,
      sku: data.sku,
      status: data.status,
      description: data.description,
      image: data.image
      ? [
          {
            uid: "-1",
            name: data.image,
            status: "done",
            url: `http://localhost:5000/uploads/products/${data.image}`,
          },
        ]
      : [],
    });

    //  load subcategory also
    handleSubCategory(data.category_id);

  } catch (error) {
    message.error("Failed to load product");
  }
};
  return (
    
    <div className="p-6 ">
      <div className="px-6 py-4 mb-6 bg-white rounded-xl shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800 text-center m-5 uppercase border-b-2 border-gray-300 pb-5">Add Product</h1>

      
        <Form  form={form} layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-10 px-[50px]">
            <Form.Item 
                    label = {<span className="text-gray-700 font-semibold text-lg uppercase">Name</span>}
                    name = "name"
                    rules = {[{required : true ,message: "Enter Category name"}]}
                >
                <Input placeholder="e.g : Fashion" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>

            
            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Category</span>}
                    name="category_id"
                    rules={[{ required: true, message: "Enter categories" }]}
                >
                    {/* <InputNumber placeholder="Men, Women, Kids" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/> */}
                    <Select
                        loading={loading}
                        placeholder="Select Category"  
                        className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"
                        onChange={handleSubCategory}

                        options={categories.map((cat) => ({
                        label:cat.name,
                        value:cat.id,
                      }))}
                    />
            </Form.Item>
            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Sub Category</span>}
                    name="sub_category_id"
                    rules={[{ required: true, message: "Enter sub categories" }]}
                >
                    {/* <InputNumber placeholder="Men, Women, Kids" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/> */}
                    <Select
                        placeholder="Select product sub category"  
                        className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"
                        loading={loading}
                        options={subCategories.map((sub) => ({
                          label: sub.name,
                          value: sub.id,
                        }))}
                    />
            </Form.Item>

            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Price</span>}
                    name="price"
                    rules={[{ required: true, message: "Enter product price" }]}
                >
                    <InputNumber placeholder="Please enter product price" className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>
            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Stock</span>}
                    name="stock"
                    rules={[{ required: true, message: "Please enter stock quantity" }]}
                >
                    <InputNumber placeholder="Enter available stock" className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>
            <Form.Item
                label={<span className="text-gray-700 font-semibold text-lg uppercase">Upload</span>}
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="file"
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/png,image/jpeg,image/webp"
                  
                >
                  <Button
                  type="default"
                size="large"
                icon={<PlusOutlined />}
                className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white">
                    Click to Upload
                  </Button>
                </Upload>
            </Form.Item>

            <Form.Item 
            label = {<span className="text-gray-700 font-semibold text-lg uppercase">SKU (Stock keep unit)</span>}
            name="sku"
            rules={[{required:true,message:"Enter sku"}]}
            >
              <Input placeholder="e.g : Enter SKU code" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>

            <Form.Item 
            label = {<span className="text-gray-700 font-semibold text-lg uppercase">Compare Price</span>}
            name="compare_price"
            rules={[{required:true,message:"Enter compare price"}]}
            >
              <InputNumber placeholder="e.g : Enter compare price" className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>
            
            <Form.Item
              label={<span className="text-gray-700 font-semibold text-lg uppercase">Status</span>}
              name="status"
              initialValue="active"
              rules={[{ required: true, message: "Select status" }]}
            >
              <Select
                className="h-10 rounded-lg bg-gray-100 border-gray-300 test-lg"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </Form.Item>
            <Form.Item
                     className="col-span-2"
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Description</span>}
                    name="description"
                    rules={[{ required: true, message: "Enter sub categories" }]}
                >
                    <Input.TextArea  rows={4} placeholder="Men, Women, Kids" className="h-10  rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>

            <Form.Item className="col-span-2">
               <div className="flex justify-center gap-6">
              <Button type="primary" htmlType="submit" size="large"
                    className="uppercase font-bold">
                Save Product
              </Button>

              <Button
                size="large"
                    className="uppercase font-bold"
                onClick={() => navigate(`/merchant/${slug}/products`)}
              >
                Cancel
              </Button>
              </div>
          </Form.Item>
          </div>
        </Form>
      </div>
     
    </div>
  )
}