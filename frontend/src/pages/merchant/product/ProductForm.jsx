import { Form, Input, InputNumber,Select, Upload,Button  } from "antd";
import {PlusOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ProductForm(){
  const navigate = useNavigate();
  return (
    
    <div className="p-6 ">
      <div className="px-6 py-4 mb-6 bg-white rounded-xl shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800 text-center m-5 uppercase border-b-2 border-gray-300 pb-5">Add Product</h1>

      
        <Form  layout="vertical">
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
                    name="subCategories"
                    rules={[{ required: true, message: "Enter categories" }]}
                >
                    {/* <InputNumber placeholder="Men, Women, Kids" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/> */}
                    <Select
                        placeholder="Select Category"  
                        className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"
                    

                      options={[
                        { label: "Fashion", value: "fashion" },
                        { label: "Electronics", value: "electronics" },
                      ]}
                    />
            </Form.Item>
            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Sub Category</span>}
                    name="subCategories"
                    rules={[{ required: true, message: "Enter sub categories" }]}
                >
                    {/* <InputNumber placeholder="Men, Women, Kids" className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/> */}
                    <Select
                        placeholder="Select product sub category"  
                        className="h-10 rounded-lg bg-gray-100 border-gray-300 focus:bg-white"

                        options={[
                        { label: "Fashion", value: "fashion" },
                        { label: "Electronics", value: "electronics" },
                      ]}
                    />
            </Form.Item>

            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Price</span>}
                    name="subCategories"
                    rules={[{ required: true, message: "Enter product price" }]}
                >
                    <InputNumber placeholder="Please enter product price" className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>
            <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Stock</span>}
                    name="subCategories"
                    rules={[{ required: true, message: "Please enter stock quantity" }]}
                >
                    <InputNumber placeholder="Enter available stock" className="h-10 !w-full rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
            </Form.Item>
            

            <Form.Item  label={<span className="text-gray-700 font-semibold text-lg uppercase">Upload</span>} valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="" listType="picture-card">
                <button
                  style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                  type="button"
                >
                  <PlusOutlined />
                  <div >Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item
                     className="col-span-2"
                    label={<span className="text-gray-700 font-semibold text-lg uppercase">Description</span>}
                    name="subCategories"
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
                onClick={() => navigate("/products")}
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