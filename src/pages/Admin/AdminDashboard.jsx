import React from 'react';
import MonthlyTarget from '../../components/WebManagement/MonthlyTarget';
import MonthlySales from '../../components/WebManagement/MonthlySales';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Readers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">3,782</h3>
          <p className="text-gray-500">Total Users</p>
        </div>

        {/* Cột 2: Staffs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">3,782</h3>
          <p className="text-gray-500">Total Staffs</p>
        </div>
         {/* Cột 3: Orders */}
         <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">3,782</h3>
          <p className="text-gray-500">Total Oders</p>
        </div>


        {/* Empty slot for balance */}
        <div className="hidden md:block"></div>
      </div>

      {/* Middle Row - Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <MonthlySales />
      </div>

      {/* Bottom Row - Monthly Target */}
      <div className="bg-white p-6 rounded-lg shadow">
        <MonthlyTarget />
      </div>
      
   

    </div>
  );
};

export default AdminDashboard;