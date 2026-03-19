import axios from "axios";
import { useNavigate,NavLink  } from "react-router-dom";
import { Form,Input,Typography,Button,message  } from "antd";
const {Title ,Text} =Typography
import home from "../../assets/images/home_4.jpg";
import {useAuth} from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  return (
  <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-r from-[#fff2ef] via-[#ffdbb6] via-[#f7a5a5] to-[#1a2a4f]">
    <div className="flex  rounded-3xl overflow-hidden shadow-lg">
      <div className="w-[550px] h-[750px] flex-shrink-0">
          <img
            src={home}
            alt="Home"
            className="w-full h-full object-cover"/>
      </div>

       
      <div className="md:w-1/2 bg-white flex items-center justify-center">
        <div className="w-[550px] px-14 py-16 flex flex-col">
            <Title level={1} className="text-left !m-0 !mb-7">
              <span className="bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 bg-clip-text text-transparent">ArtStick </span>
            </Title>

            <Title level={1} className="text-left !m-0 !mb-1  font-semibold">
              Welcome!!
            </Title>

            <Title level={3} className="text-left !m-0 !mb-1 font-medium text-gray-600">
              Get started with ArtStick
            </Title>

            <Text className="text-gray-500 mb-8 text-base">
              Please enter your email and password for login
            </Text>

   
          <Form layout="vertical" className="space-y-5" 
              
               onFinish={async (values) => {
                  try {
                    const res = await axios.post(
                      "http://localhost:5000/api/auth/login",
                      values
                    );

                    // Token store
                     const { token, user, stores } = res.data;

                    // localStorage.setItem("token", res.data.token);
                    localStorage.setItem("token",token);
                    console.log(res.data.token);

                    // localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem("stores", JSON.stringify(stores));

                    // login(res.data.user);
                    login(user);

                    message.success("Login Successful");

                    // if(res.data.user.role === "super_admin"){
                    //   navigate("/admin/dashboard")
                    // }else{
                    //   navigate("/dashboard")
                    // }

                    if(user.role === "super_admin"){
                      navigate("/admin/dashboard");
                      return;
                    }

                    // if(stores.length===0){
                    //   navigate("/create-store")
                    // }else if(stores.length === 1){
                    //     localStorage.setItem("activeStoreId", stores[0].id);
                    //     navigate(`/merchant/${stores[0].slug}/dashboard`);
                    // }
                    // else{
                    //   // navigate("/select-store");
                    // }

                    if (stores.length === 0) {
                      navigate("/create-store");
                    }
                    else if (stores.length === 1) {

                      if (stores[0].status === "active") {
                        navigate(`/merchant/${stores[0].slug}/dashboard`);
                      } else {
                        navigate("/select-store"); // show pending UI
                      }

                    }
                    else {
                      navigate("/select-store"); // multiple stores
                    }
                    console.log(res.data);

                  } catch (err) {
                    message.error(
                      err.response?.data?.message || "Login Failed"
                    );
                  }
                }}>

            <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Email</span>}
                name="email"
                rules={[{ required: true, message: "Please enter email" }]}>
                <Input
                  placeholder="Enter email"
                  className="h-12 rounded-lg bg-gray-100 border-gray-300 focus:bg-white text-lg"/>
            </Form.Item>

            
            <Form.Item
                label={<span className="text-gray-700 font-semibold text-base">Password</span>}
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}>
                <Input.Password
                  placeholder="Enter password"
                  className="h-12 rounded-lg bg-gray-100 border-gray-300 focus:bg-white text-lg"/>
            </Form.Item>

            <Form.Item className="pt-4">
              <Button
                type="primary" htmlType="submit" block className="!bg-[#1a2a4f] hover:!bg-[#0f1a33] !p-5 text-lg rounded-lg shadow-md">Login
              </Button>
            </Form.Item>

            <div className="text-center mt-4">
                <Text className="text-base ">
                  Don't have an account ?  {" "}
                  <NavLink to="/register"  className="font-semibold">SignUp</NavLink>
                </Text>
              
             </div>
          </Form>
        </div>
      
      </div>
    </div>
  </div>
  );
}
