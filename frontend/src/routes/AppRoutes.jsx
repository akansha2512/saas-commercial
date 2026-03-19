import { useRoutes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreateStore from "../pages/auth/Store";
import SelectStore from "../pages/auth/SelectStore";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Super Admin Pages
import AdminDashboard from "../pages/super_admin/Dashboard";
import AdminMerchant from "../pages/super_admin/Merchant";
import AdminStore from "../pages/super_admin/Store";
import PendingApproval from "../pages/super_admin/PendingApproval";
import PlatformUser from "../pages/super_admin/PlatformUser";
import Category from "../pages/super_admin/Category";
import Payment from "../pages/super_admin/payment/Payments";
import SubCategory from "../pages/super_admin/SubCategory";

// Merchant Pages

import Dashboard from "../pages/merchant/Dashboard";
import ProductList from "../pages/merchant/product/ProductList";
import ProductForm from "../pages/merchant/product/ProductForm";
import ProductView from "../pages/merchant/product/ProductView";
import OrderList from "../pages/merchant/order/OrderList";
import OrderDetail from "../pages/merchant/order/OrderDetail";
import CustomerList from "../pages/merchant/customer/CustomerList";
import CustomerDetail from "../pages/merchant/customer/CustomerDetail";
import Payments from "../pages/merchant/payment/Payments";



function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRoute(user.role)} replace />;
  }

  return children;
}
function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user?.role === "super_admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}


function getDefaultRoute(role) {
  switch (role) {
    case "super_admin":
      return "/admin/dashboard";
    case "admin":
      return "/dashboard/:slug";
    default:
      return "/login";
  }
}


export default function AppRoutes() {
  const routes = [

    // AUTH ROUTES
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
      ],
    },

    // SUPER ADMIN ROUTES
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={["super_admin"]}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "merchants", element: <AdminMerchant /> },
        { path: "stores", element: <AdminStore /> },
        { path: "pendingApproval", element: <PendingApproval /> },
        { path: "users", element: <PlatformUser /> },
        { path: "categories", element: <Category /> },
        { path: "payments", element: <Payment /> },
        {path: "categories/:id/subcategories", element:<SubCategory/>},
      ],
    },

    // MERCHANT ROUTES
    {
      path: "/create-store",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <CreateStore />
        </ProtectedRoute>
      ),
    },
    {
      path: "/select-store",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <SelectStore />
        </ProtectedRoute>
      ),
    },
    {
      path: "/merchant/:slug",
      element: (
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        // { path: "/dashboard", element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <ProductList /> },
        { path: "products/add", element: <ProductForm /> },
        { path: "products/edit/:id", element: <ProductForm /> },
        { path: "products/view/:id", element: <ProductView /> },
        { path: "orders", element: <OrderList /> },
        { path: "orders/:id", element: <OrderDetail /> },
        { path: "customers", element: <CustomerList /> },
        { path: "customers/:id", element: <CustomerDetail /> },
        { path: "payments", element: <Payments /> },
      ],
    },

    // FALLBACK
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
}