import { Outlet } from "react-router";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSideBar from "../../components/Admin/AdminSideBar"

const AdminLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
          {/* Header */}
          <AdminHeader />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <AdminSideBar />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
              <Outlet />
            </main>
          </div>
        </div>
      );
}

export default AdminLayout;