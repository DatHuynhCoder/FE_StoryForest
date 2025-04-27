import React from 'react';
import MonthlyTarget from '../../components/WebManagement/MonthlyTarget';
import StatisticsChart from '../../components/WebManagement/StatisticsChart';
import MonthlySales from '../../components/WebManagement/MonthlySales';
import DailySales from '../../components/WebManagement/DailySales';

const WebManagement = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Thống kê chính */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">3,782</h3>
          <p className="text-gray-500">Tổng số truyện</p>
        </div>

        {/* Cột 22: StaffStaffs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">20.000.000 vnd</h3>
          <p className="text-gray-500">Tổng số thu nhập</p>
        </div>
         {/* Cột 3: Orders */}
         <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">3,782</h3>
          <p className="text-gray-500">Tổng số đơn </p>
        </div>


        {/* Empty slot for balance */}
        <div className="hidden md:block"></div>
      </div>

      {/* MonthlySales Chart  */}
      <div className="bg-white p-6 rounded-lg shadow">
        <MonthlySales />
      </div>
      {/* DailySales Chart  */}
      <div className="bg-white p-6 rounded-lg shadow">
        <DailySales />
      </div>
      

      {/* Bottom Row - Monthly Target */}
      <div className="bg-white p-6 rounded-lg shadow">
        <MonthlyTarget />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <StatisticsChart />
      </div>

    </div>
  );
};

export default WebManagement;