import React from 'react';
import { FiSearch } from 'react-icons/fi';

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Search input */}
      <div className="relative w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          placeholder="Type to search..."
        />
      </div>

      {/* User profile */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-700">Thomas Anree</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          TA
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;