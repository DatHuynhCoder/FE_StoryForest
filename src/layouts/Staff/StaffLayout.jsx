import { useState } from "react";
import { Outlet } from "react-router";
import StaffHeader from "../../components/Staff/StaffHeader";
import StaffSideBar from "../../components/Staff/StaffSideBar";

const StaffLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <StaffHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r shadow-md transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0`}
        >
          <StaffSideBar />
        </div>

        {/* Overlay (mờ nền khi sidebar mở ở mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
