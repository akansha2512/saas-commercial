import axios from "axios";
import { NavLink, useNavigate   } from "react-router-dom";
import { Form, message,Input, Typography, Button } from "antd";
const { Title, Text } = Typography;
import home from "../../assets/images/home_4.jpg";

export default function Register() {
      const navigate = useNavigate();

      const onFinish = async (values) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              name: values.name,
              email: values.email,
              phone:values.phone,
              password: values.password,
              // storeName: values.store_name
            }
          );

          message.success(res.data.message);

          navigate("/login");

        } catch (error) {
          message.error(
            error.response?.data?.message || "Registration failed"
          );
        }
      };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-[#fff2ef] via-[#ffdbb6] via-[#f7a5a5] to-[#1a2a4f]">
      
      <div className="flex rounded-3xl overflow-hidden shadow-lg">
        
       
        <div className="w-[550px] h-[800px] flex-shrink-0">
          <img
            src={home}
            alt="Home"
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="md:w-[700px] bg-white flex items-center justify-center">
          <div className="w-[700px] px-14 py-16 flex flex-col">

            <Title level={1} className="text-left !m-0 !mb-7">
              <span className="bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
                ArtStick
              </span>
            </Title>

            <Title level={2} className="text-left !m-0 !mb-1 font-semibold uppercase">
              Register
            </Title>

            <Text className="text-gray-500 mb-8 text-base">
              Register your account to start using the platform
            </Text>

            <Form
              layout="vertical"
              onFinish={onFinish}
              className="space-y-4"
            >
             <div className="grid grid-cols-2 gap-5">
              <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Full Name</span>}
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input
                  placeholder="Enter full name"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item>

              {/* <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Store Name</span>}
                name="store_name"
                rules={[{ required: true, message: "Please enter store name" }]}
              >
                <Input
                  placeholder="Enter store name"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item> */}

              <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Email</span>}
                name="email"
                rules={[{ required: true, type: "email", message: "Enter valid email" }]}
              >
                <Input
                  placeholder="Enter email"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Phone</span>}
                name="phone"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input
                  placeholder="Enter phone number"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Password</span>}
                name="password"
                rules={[{ required: true, min: 6, message: "Minimum 6 characters" }]}
              >
                <Input.Password
                  placeholder="Create password"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Confirm Password</span>}
                name="confirm_password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm password"
                  className="h-12 rounded-lg bg-gray-100"
                />
              </Form.Item>
            </div>
              
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="!bg-[#1a2a4f] hover:!bg-[#0f1a33] !p-5 text-lg rounded-lg shadow-md"
                >
                  Submit Application
                </Button>
              

              <div className="text-center mt-4">
                <Text className="text-base ">
                  Already have an account? {" "}
                  {/* <a
                    href="/login"
                    className="text-blue-600 font-semibold"
                  >
                    Login
                  </a> */}
                  {/* navlink */}
                  <NavLink to="/login" className="font-semibold">SignIn</NavLink>
                </Text>
              
             </div>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
