import React from 'react';
import { FiMenu } from 'react-icons/fi';
import defaultAvatar from "../../assets/default_avatar.jpg";

const Staff = {
  username: "Minh Minh",
  role: "Staff",
  avatar: {
    url: "https://i.pravatar.cc/300" 
  }
};

const StaffHeader = ({ onToggleSidebar }) => {
  const userDisplay = {
    name: Staff.username || "Chưa có tên",
    role: Staff.role || "Vai trò",
    avatar: Staff.avatar?.url || defaultAvatar,
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Nút menu hiện ở mobile */}
      <button
        className="text-gray-600 md:hidden"
        onClick={onToggleSidebar}
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Khoảng trống giữa (giữ khoảng cho sidebar) */}
      <div className="w-64 hidden md:block"></div>

      {/* Thông tin người dùng */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700">{userDisplay.name}</span>
          <span className="text-xs text-gray-500">{userDisplay.role}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-teal-500 overflow-hidden">
          <img
            src={userDisplay.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
