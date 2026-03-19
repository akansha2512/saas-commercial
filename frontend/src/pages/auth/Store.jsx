import { Form,Input,Typography,Button,message  } from "antd";
// import axios from "axios";
import { useNavigate,NavLink  } from "react-router-dom";
import axios from "axios";
const {Title ,Text} =Typography
export default function Store() {
  const navigate = useNavigate();

const onFinish = async (values) => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/store/create-stores",
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    message.success("Store created. Waiting for approval");

    navigate("/select-store");

  } catch (err) {
    message.error("Failed to create store");
  }
};

  return (
    

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#fff2ef] via-[#ffdbb6] via-[#f7a5a5] to-[#1a2a4f]">

  {/* Center Card */}
  <div className="w-[500px] bg-white rounded-3xl shadow-2xl px-10 py-12">

    <Title level={2} className="!mb-4">
      <span className="bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
        ArtStick
      </span>
    </Title>

    <Title level={3} className="!mb-1">Welcome!!</Title>

    <Text className="text-gray-500 block mb-6">
      Please enter your details to create store 
    </Text>

    <Form layout="vertical"  onFinish={onFinish}
              className="space-y-4">

     <Form.Item
                label={<span className="text-gray-700 font-semibold text-lg ">Store Name</span>}
                name="name"
                rules={[{ required: true, message: "Please enter Store name" }]}
              >
                <Input
                  placeholder="Enter store name"
                  className="h-12 rounded-lg bg-gray-100"
                />
        </Form.Item>

      <Form.Item
                    label={<span className="text-gray-700 font-semibold text-lg ">Description</span>}
                    name="description"
                    rules={[{ required: true, message: "Enter description" }]}
                >
                    <Input.TextArea  rows={4} placeholder="Enter description" className="h-10  rounded-lg bg-gray-100 border-gray-300 focus:bg-white"/>
        </Form.Item>

      <Form.Item
        label={<span className="text-gray-700 font-semibold text-lg ">Logo</span>}
        name="logo"
        rules={[{ required: true, message: "Enter logo" }]}
      >
       <Input
                  placeholder="Enter Logo name"
                  className="h-12 rounded-lg bg-gray-100"
                />
      </Form.Item>

      <Form.Item className="pt-4">
              <Button
                type="primary" htmlType="submit" block className="!bg-[#1a2a4f] hover:!bg-[#0f1a33] !p-5 text-lg rounded-lg shadow-md">Create Store
              </Button>
            </Form.Item>

      <div className="text-center mt-4">
        <Text>
          Want to do it later?{" "}
          <span
            // onClick={() => navigate("/dashboard")} 
            className="font-semibold cursor-pointer text-blue-500"
          >
            Skip for now
          </span>
        </Text>
      </div>

    </Form>
  </div>
</div>
  );
}