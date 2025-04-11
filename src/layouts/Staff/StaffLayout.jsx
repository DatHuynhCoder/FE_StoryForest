import { Outlet } from "react-router";
import StaffHeader from "../../components/Staff/StaffHeader";
import StaffSideBar from "../../components/Staff/StaffSideBar";

const StaffLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
          {/* Header */}
          <StaffHeader />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <StaffSideBar />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
              <Outlet />
            </main>
          </div>
        </div>
      );
}

export default StaffLayout;