import React, { useState, useEffect } from 'react';
import { apiAuth } from '../../services/api';
import Spinner from '../../components/Spinner';
import MonthlyTarget from '../../components/WebManagement/MonthlyTarget';
import MonthlySales from '../../components/WebManagement/MonthlySales';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    loading: true,
    error: null,
    data: {
      totalUsers: 0,
      totalStaffs: 0,
      totalOrders: 0
    }
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await apiAuth.get('/api/admin/users/summary');
        if (response.data?.success && response.data.data) {
          setStats({
            loading: false,
            error: null,
            data: {
              totalUsers: response.data.data.totalReaders || 0,
              totalStaffs: response.data.data.totalStaffs || 0,
              totalIncome: response.data.data.totalIncome || 0
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
            totalUsers: 0,
            totalStaffs: 0,
            totalIncome: 0
          }
        });
      }
    };

    fetchDashboardStats();
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
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">
            {stats.data.totalUsers}
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

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-3xl font-bold mb-2">
            {stats.data.totalIncome}
          </h3>
          <p className="text-gray-500">Total income (VND)</p>
        </div>
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