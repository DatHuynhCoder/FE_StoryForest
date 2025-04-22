import React from 'react';
import BarChartOne from '../../components/Chart/Bar/BarChartOne';
import MonthlyTarget from '../../components/WebManagement/MonthlyTarget';
import StatisticsChart from '../../components/WebManagement/StatisticsChart';
import NewUsersDailyChart from '../../components/UserMagement/NewUsersDailyChart';
import NewUserMonthlyChart from '../../components/UserMagement/NewUserMonthlyChart';
import UserTable from '../../components/UserMagement/UsersTable';
import StaffTable from '../../components/UserMagement/StaffsTable';

const UserManagement = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Reader */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">20</h3>
          <p className="text-gray-500">Total Readers</p>
        </div>

        {/* Cột 2: Total Staffs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">20</h3>
          <p className="text-gray-500">Total Staffs</p>
        </div>

        {/* Empty slot for balance */}
        <div className="hidden md:block"></div>
      </div>

      {/* New User Monthly Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <NewUserMonthlyChart />
      </div>

      {/* New Users Daily Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <NewUsersDailyChart />
      </div>
      
     
      <div className="bg-white p-6 rounded-lg shadow">
        <UserTable />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <StaffTable />
      </div>

    </div>
  );
};

export default UserManagement;