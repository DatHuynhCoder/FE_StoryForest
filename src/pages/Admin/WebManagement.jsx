import React from 'react';
import MonthlyTarget from '../../components/WebManagement/MonthlyTarget';
import StatisticsChart from '../../components/WebManagement/StatisticsChart';
import MonthlySales from '../../components/WebManagement/MonthlySales';
import DailySales from '../../components/WebManagement/DailySales';

const WebManagement = () => {
  return (
    <div className="p-6 space-y-6">

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