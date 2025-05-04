import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const NewUserMonthlyChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Số năm (giả)
  const years = Array.from(
    { length: new Date().getFullYear() - 2024 +1   },
    (_, i) => 2024 + i
  );

  // Dữ liệu giả theo năm 
  const mockData = {
    2024: [200, 220, 250, 300, 280, 320, 350, 240, 260, 400, 380, 300],
    2025: [180, 240, 210, 280, 260]
  };

  // Lấy dữ liệu giả theo năm được chọn
  const chartSeries = [{
    name: 'Users',
    data: mockData[selectedYear] || mockData[2023] // Fallback nếu không có data
  }];

  /* 
  // call api
  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const response = await axios.get(`/api/admin/users/monthly-stats?year=${selectedYear}`);
        const monthlyData = response.data.data;
        setChartData([{
          name: 'Users',
          data: monthlyData.map(month => month.count)
        }]);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchMonthlyStats();
  }, [selectedYear]);
  */

  // Cấu hình biểu đồ 
  const chartOptions = {
    colors: ['#14B8A6'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: { show: false },
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
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={180}
          />
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400 text-center">
        <div className="mt-1">Data updated: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default NewUserMonthlyChart;