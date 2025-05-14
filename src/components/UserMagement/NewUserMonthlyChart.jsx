import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { api } from '../../services/api';

const NewUserMonthlyChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartSeries, setChartSeries] = useState([{ name: 'Users', data: Array(12).fill(0) }]);
  const [loading, setLoading] = useState(true);
  
  // Generate available years
  const years = Array.from(
    { length: new Date().getFullYear() - 2024 + 1 },
    (_, i) => 2024 + i
  );

  // Fetch data from API
  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/admin/users/monthly-stats?year=${selectedYear}`);
        console.log(`New user - year=${selectedYear}`,response.data.data)
        const monthlyData = response.data.data;
        
        // Create an array with 12 months, filling in the counts from the API
        const monthlyCounts = Array(12).fill(0);
        monthlyData.forEach(item => {
          monthlyCounts[item.month - 1] = item.count;
        });

        setChartSeries([{
          name: 'Users',
          data: monthlyCounts
        }]);
      } catch (err) {
        console.error('Error fetching monthly stats:', err);
        // Fallback to empty data if API fails
        setChartSeries([{
          name: 'Users',
          data: Array(12).fill(0)
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMonthlyStats();
  }, [selectedYear]);

  // Chart configuration
  const chartOptions = {
    colors: ['#14B8A6'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: { show: false },
      animations: {
        enabled: !loading,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { title: { text: undefined } },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val) => `${val} users` },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">New Users / Monthly</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
            disabled={loading}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#14B8A6] mr-2"></span>
            <span className="text-sm text-gray-500">Monthly</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {loading ? (
            <div className="h-[180px] flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading data...</div>
            </div>
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={180}
            />
          )}
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400 text-center">
        <div className="mt-1">Data updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default NewUserMonthlyChart;