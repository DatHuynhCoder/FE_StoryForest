import React from 'react';
import Chart from 'react-apexcharts';

const BarChartOne = () => {
  // Cấu hình biểu đồ
  const chartOptions = {
    colors: ['#465FFF'],
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
        formatter: (val) => `${val}`,
      },
    },
  };

  // Dữ liệu biểu đồ
  const chartSeries = [
    {
      name: 'Sales',
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Sales</h3>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#465FFF] mr-2"></span>
          <span className="text-sm text-gray-500">Sales</span>
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
        Data updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default BarChartOne;