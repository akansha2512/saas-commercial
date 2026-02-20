import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
  CaretDownOutlined,
  ShopOutlined,
  ClockCircleOutlined 
} from "@ant-design/icons";

import { Avatar, Badge, Dropdown, message } from "antd";
import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function Header() {
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingList, setPendingList] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user.role === "super_admin";
  const navigate = useNavigate();
    const dropdownItems = isSuperAdmin
    ? [

      {
          key: "profile",
          label: <span className="text-[15px] font-medium text-[#111]">{user.name}</span>,
          icon: <UserOutlined />,
        },
        {
          key: "mail",
          label: <span className="text-[15px] font-medium text-[#111]">{user.email}</span>,
          icon: <MailOutlined />,
        },
        {
          key: "logout",
          label: <span className="text-[15px] font-medium text-red-600">Logout</span>,
          icon: <LogoutOutlined />,
        },
        
      ]
    : [
        {
          key: "profile",
          label: <span className="text-[15px] font-medium text-[#111]">Store Name</span>,
          icon: <UserOutlined />,
        },
        {
          key: "mail",
          label: <span className="text-[15px] font-medium text-[#111]">Store Email</span>,
          icon: <MailOutlined />,
        },
        {
          key: "logout",
          label: <span className="text-[15px] font-medium text-red-600">Logout</span>,
          icon: <LogoutOutlined />,
        },
      ];
      useEffect(() => {
        if (isSuperAdmin) {
          fetchPending();
        }
      }, []);

      const fetchPending = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/admin/pending-stores",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPendingList(res.data);
          setPendingCount(res.data.length);

        } catch (error) {
          console.log(error);
        }
      };

      const dropPending = pendingList.length > 0 ? [
        ...pendingList.slice(0,5).map((item) => ({
          key:item.id,
          label:(
            <div onClick={() => navigate("/admin/pendingApproval")}
            className="py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
            >
             <ClockCircleOutlined className="text-base text-gray-800 mr-2" />
              <strong className="text-base text-gray-500 capitalize">
                {item.name} requested approval
              </strong>
              
            </div>
          ),
        })),
        {
          key: "view_all",
        label: (
          <div
            onClick={() => navigate("/admin/pendingApproval")}
            className="text-blue-600 font-medium text-center"
          >
            View All
          </div>
        ),
        },
      ]
      : [
      {
        key: "no_data",
        label: <span className="text-gray-400">No pending approvals</span>,
      },
    ];
  return (
    

    <header className="sticky z-50 top-0 h-20 bg-[linear-gradient(110.7deg,_rgba(46,83,106,1)_1.2%,_rgba(15,33,43,1)_88.2%)] border-b border-gray-700 px-6 flex items-center justify-between">  
      <div className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-300">
        {!isSuperAdmin && (
          <>
            <ShopOutlined className="text-2xl" />
            <span className="text-lg font-medium">View Store</span>
          </>
        )}
      </div>


      
      <div className="flex items-center gap-6">
        {isSuperAdmin && (
          <Dropdown menu={{items:dropPending}} placement="bottomRight" trigger={["click"]}>
            
            <Badge count={pendingCount}>
              <BellOutlined className="text-2xl text-white cursor-pointer hover:text-gray-300" />
            </Badge>
          
          </Dropdown>
        )}


        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" trigger={["click"]}>
          <div className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg">
            
           
            {isSuperAdmin ? (
              <Avatar size={38} style={{ backgroundColor: "#97acdb" }} icon={<UserOutlined />} />
            ) : (
              <img
                src="/store-logo.png"
                alt="Store Logo"
                className="w-9 h-9 rounded-full object-cover"
              />
            )}

            <p className="text-white text-lg font-semibold leading-none !m-0">
              {isSuperAdmin ? user.name : "Admin"}
              <CaretDownOutlined className="text-white text-sm ml-1" />
            </p>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
