import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-80 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
