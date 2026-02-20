import { useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/Register"

import AdminDashboard from "../pages/super_admin/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminMerchant from "../pages/super_admin/Merchant";
import AdminStore from "../pages/super_admin/Store";
import PendingApproval from "../pages/super_admin/PendingApproval";
import PlatformUser from "../pages/super_admin/PlatformUser"
import Category from "../pages/super_admin/Category"
import Payment from "../pages/super_admin/payment/Payments"

import Dashboard from "../pages/merchant/Dashboard"
import ProductList from "../pages/merchant/product/ProductList"
import ProductForm from "../pages/merchant/product/ProductForm"
import ProductView from "../pages/merchant/product/ProductView"
import OrderList from "../pages/merchant/order/OrderList"
import OrderDetail from "../pages/merchant/order/OrderDetail"
import CustomerList from "../pages/merchant/customer/CustomerList"
import CustomerDetail from "../pages/merchant/customer/CustomerDetail"
import Payments from "../pages/merchant/payment/Payments"

export default function AppRoutes(){
    const routes = [
        {   
            
            element:<AuthLayout/>,
            children:[
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/register",
                    element:<Register/>
                }
            ]
        },
        {   
            path:"/admin",
            element:<DashboardLayout/>,
            children:[
                {
                    path:"dashboard",
                    element:<AdminDashboard/>
                },
                {
                    path:"merchants",
                    element:<AdminMerchant/>
                },
                {
                    path:"stores",
                    element:<AdminStore/>
                },
                {
                    path:"pendingApproval",
                    element:<PendingApproval/>
                },
                {
                    path:"users",
                    element:<PlatformUser/>
                },
                {
                    path:"categories",
                    element:<Category/>
                },
                {
                    path:"payments",
                    element:<Payment/>
                }
            ]
        },
        {
           
            element:<DashboardLayout/>,
            children:[
                {
                    path:"dashboard",
                    element:<Dashboard/>
                },
                {
                    path: "products",
                    element: <ProductList />
                },
                {
                    path: "products/add",
                    element: <ProductForm />
                },
                {
                    path: "products/edit/:id",
                    element: <ProductForm />
                },
                {
                    path: "products/view/:id",
                    element: <ProductView />
                },
                {
                    path:"orders",
                    element:<OrderList/>
                },
                {
                    path:"orders/:id",
                    element:<OrderDetail/>
                },
                {
                    path:"customers",
                    element:<CustomerList/>
                },
                {
                    path:"customers/:id",
                    element:<CustomerDetail/>
                },
                {
                    path: "payments",
                    element: <Payments />
                },
                
            ]
        }
    ];
    return useRoutes(routes);
}