import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { apiAuth } from '../../services/api';

const MonthlySales = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartSeries, setChartSeries] = useState([{ name: 'Sales', data: Array(12).fill(0) }]);
  // Danh sách năm có thể chọn (số năm có thể chọn dựa vào dữ liệu api trả về)
  const availableYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);
  // Phần call API 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMonthlySales = async (year) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiAuth.get(`/api/admin/dashboard/monthly-stats?year=${year}`);
      const monthlyData = response.data.data;
      
      // Create an array with 12 months, filling in the sales from the API
      const monthlySales = Array(12).fill(0);
      monthlyData.forEach(item => {
        monthlySales[item.month - 1] = item.totalIncome;
      })
      setChartSeries([{ name: 'Sales', data: monthlySales }]);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch monthly sales:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlySales(selectedYear);
  }, [selectedYear]);

  // Cấu hình biểu đồ
  const chartOptions = {
    colors: ['#14B8A6'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: {
        show: false,
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => `${val} VND`,
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Monthly income</h3>
        
        <div className="flex items-center space-x-4">
          {/* Dropdown chọn năm */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#14B8A6] mr-2"></span>
            <span className="text-sm text-gray-500">Income</span>
          </div>
        </div>
      </div>
      
      {/*Biểu đồ */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={180}
          />
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        Data updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default MonthlySales;