import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi'; // Nút mở sidebar
import { useSelector } from 'react-redux';
import DefaultAvt from "../../assets/default_avatar.jpg";

const AdminHeader = ({ onToggleSidebar }) => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Sidebar Toggle Button (only on small screens) */}
       {/* Nút menu hiện ở mobile */}
            <button
              className="text-gray-600 md:hidden"
              onClick={onToggleSidebar}
            >
              <FiMenu className="w-6 h-6" />
            </button>

      <div className="w-64"></div> {/* Placeholder */}

      {/* User Profile */}
      {loading ? (
        <div className="flex items-center space-x-3 animate-pulse">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-700">
              {user.username}
            </span>
            <span className="text-xs text-gray-500">{user.role}</span>
          </div>
          <img src={user?.avatar?.url || DefaultAvt} alt="admin avartar" className='w-8 h-8 rounded-full'/>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
