import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const MonthlySales = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Danh sách năm có thể chọn (số năm có thể chọn dựa vào dữ liệu api trả về)
  const availableYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  // Dữ liệu giả 
  const mockData = {
    2025: [
      { month: 'Jan', sales: 120 },
      { month: 'Feb', sales: 250 },
      { month: 'Mar', sales: 180 },
      { month: 'Apr', sales: 220 },
      { month: 'May', sales: 150 },
      { month: 'Jun', sales: 210 },
      { month: 'Jul', sales: 270 },
      { month: 'Aug', sales: 90 },
      { month: 'Sep', sales: 190 },
      { month: 'Oct', sales: 350 },
      { month: 'Nov', sales: 240 },
      { month: 'Dec', sales: 100 }
    ],
    2024: [
      { month: 'Jan', sales: 168 },
      { month: 'Feb', sales: 385 },
      { month: 'Mar', sales: 201 },
      { month: 'Apr', sales: 298 },
      { month: 'May', sales: 187 },
      { month: 'Jun', sales: 195 },
      { month: 'Jul', sales: 291 },
      { month: 'Aug', sales: 110 },
      { month: 'Sep', sales: 215 },
      { month: 'Oct', sales: 390 },
      { month: 'Nov', sales: 280 },
      { month: 'Dec', sales: 112 }
    ],
    2023: [
      { month: 'Jan', sales: 168 },
      { month: 'Feb', sales: 385 },
      { month: 'Mar', sales: 201 },
      { month: 'Apr', sales: 298 },
      { month: 'May', sales: 187 },
      { month: 'Jun', sales: 195 },
      { month: 'Jul', sales: 291 },
      { month: 'Aug', sales: 110 },
      { month: 'Sep', sales: 215 },
      { month: 'Oct', sales: 390 },
      { month: 'Nov', sales: 280 },
      { month: 'Dec', sales: 112 }
    ],
    2022: [
      { month: 'Jan', sales: 120 },
      { month: 'Feb', sales: 250 },
      { month: 'Mar', sales: 180 },
      { month: 'Apr', sales: 220 },
      { month: 'May', sales: 150 },
      { month: 'Jun', sales: 210 },
      { month: 'Jul', sales: 270 },
      { month: 'Aug', sales: 90 },
      { month: 'Sep', sales: 190 },
      { month: 'Oct', sales: 350 },
      { month: 'Nov', sales: 240 },
      { month: 'Dec', sales: 100 }
    ],
    // Thêm dữ liệu cho các năm khác nếu cần
  };

  // Lấy dữ liệu theo năm được chọn, mặc định là 2023 nếu không có dữ liệu
  const chartData = mockData[selectedYear] ;

  /*
  // Phần call API 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMonthlySales = async (year) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/admin/dashboard/monthly-sales?year=${year}`);
      setChartData(response.data.monthlySales);
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
  */

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
      categories: chartData.map(item => item.month),
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
        formatter: (val) => `${val}`,
      },
    },
  };

  // Dữ liệu biểu đồ
  const chartSeries = [
    {
      name: 'Sales',
      data: chartData.map(item => item.sales),
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Sales</h3>
        
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
            <span className="text-sm text-gray-500">Sales</span>
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