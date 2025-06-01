import React, { useState, useEffect } from 'react';
import {apiAuth } from '../../services/api';
import Spinner from '../../components/Spinner';
import NewUsersDailyChart from '../../components/UserMagement/NewUsersDailyChart';
import NewUserMonthlyChart from '../../components/UserMagement/NewUserMonthlyChart';
import UserTable from '../../components/UserMagement/UsersTable';
import StaffTable from '../../components/UserMagement/StaffsTable';

const UserManagement = () => {
  const [stats, setStats] = useState({
    loading: true,
    error: null,
    data: {
      totalReaders: 0,
      totalStaffs: 0
    }
  });

  useEffect(() => {
    const fetchUserSummary = async () => {
      try {
        const response = await apiAuth.get('/api/admin/users/summary');
        if (response.data?.success && response.data.data) {
          setStats({
            loading: false,
            error: null,
            data: {
              totalReaders: response.data.data.totalReaders,
              totalStaffs: response.data.data.totalStaffs
            }
          });
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('API Error:', error);
        setStats({
          loading: false,
          error: error.message,
          data: {
            totalReaders: 0,
            totalStaffs: 0
          }
        });
      }
    };

    fetchUserSummary();
  }, []);

  if (stats.loading) {
    return (
      <div className="p-6 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="p-6 text-red-500">
        Error: {stats.error} 
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top Row - Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Reader */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">
            {stats.data.totalReaders}
          </h3>
          <p className="text-gray-500">Total Users</p>
        </div>

        {/* Total Staffs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">
            {stats.data.totalStaffs}
          </h3>
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