import {ShoppingCartOutlined,DashboardOutlined,ShopOutlined,AppstoreOutlined,DollarOutlined,TeamOutlined,SettingOutlined,SafetyOutlined,FileTextOutlined,BellOutlined,TagsOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
export default function Sidebar() {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuth();
  const { slug } = useParams();
   if (!user) {
    return null; // user login nahi hai to redirect
  }
  const role = user?.role;
  return (
    <aside className="fixed left-0 top-0 w-80 min-h-screen bg-[linear-gradient(110.7deg,_rgba(15,33,43,1)_1.2%,_rgba(74,123,157,1)_88.2%)]  text-white flex flex-col z-40">

      <div className="h-20 flex items-center justify-center font-bold border-b border-white/10">
       <span className="text-3xl bg-gradient-to-r from-pink-500 via-green-500 to-blue-500 bg-clip-text text-transparent " >ArtStick </span>
      </div>

     
      <nav className="flex-1 px-6 py-10  space-y-5 text-base font-medium ">
      {role === "super_admin" && (
        
        <>
          <SidebarItem
          icon={<DashboardOutlined />}
          label="Dashboard"
          to="/admin/dashboard"
        />

        <SidebarItem
          icon={<ShopOutlined />}
          label="Merchants"
          to="/admin/merchants"
        />

        <SidebarItem
          icon={<AppstoreOutlined />}
          label="Stores"
          to="/admin/stores"
        />

        <SidebarItem
          icon={<TeamOutlined />}
          label="Platform Users"
          to="/admin/users"
        />
        <SidebarItem
          icon={<BellOutlined />}
          label="Pending Approval"
          to="/admin/pendingApproval"
        />
        <SidebarItem
           icon={<TagsOutlined />}
           label="Categories"
           to="/admin/categories"   
        />
        {/* <SidebarItem
          icon={<DollarOutlined />}
          label="Payments & Revenue"
          to="/admin/payments"
        /> */}

        {/* <SidebarItem
          icon={<SafetyOutlined />}
          label="Roles & Permissions"
          to="/admin/roles"
        /> */}

        {/* <SidebarItem
          icon={<FileTextOutlined />}
          label="Plans & Subscriptions"
          to="/admin/plans"
        /> */}

        {/* <SidebarItem
          icon={<SettingOutlined />}
          label="System Settings"
          to="/admin/settings"
        /> */}
        </>

      )}


      {role === "admin" && (
        <>
           <SidebarItem
          icon={<DashboardOutlined />}
          label="Dashboard"
           to={`/merchant/${slug}/dashboard`}
        />

        <SidebarItem
          icon={<AppstoreOutlined />}
          label="Products"
          
           to={`/merchant/${slug}/products`}
        />

        <SidebarItem
          icon={<ShoppingCartOutlined />}
          label="Orders"
         
           to={`/merchant/${slug}/orders`}
        />

        <SidebarItem
          icon={<TeamOutlined />}
          label="Customers"
          
           to={`/merchant/${slug}/customers`}
        />

        <SidebarItem
          icon={<DollarOutlined />}
          label="Payments"
          
           to={`/merchant/${slug}/payments`}
        />

        {/* <SidebarItem
          icon={<SettingOutlined />}
          label="Settings"
          to="/settings"
        /> */}
        </>
      )}
      </nav>
      <div className="px-6 py-4 text-xl flex itmes-center justify-center text-gray-400 border-t border-white/10">
        {user?.role === "super_admin" ? "SuperAdmin Panel" : "Merchant Panel"}
      </div>

    </aside>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        }`
      }>
      <span className="text-2xl">{icon}</span>
      <span className="text-lg ">{label}</span>
    </NavLink>
  );
}
