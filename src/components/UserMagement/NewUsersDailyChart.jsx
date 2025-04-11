import React from 'react';
import Chart from 'react-apexcharts';

const NewUsersDailyChart = () => {
  // Generate day labels for 30 days
  const days = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

  // Chart configuration
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
        columnWidth: '50%', // Thinner bars for daily data
        borderRadius: 2,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: days,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        rotate: 0,
        hideOverlappingLabels: true,
        formatter: function(value) {
          // Only show label for every 4th day
          return parseInt(value) % 4 === 0 ? value : '';
        },
        style: {
          fontSize: '10px',
          colors: '#6B7280',
        }
      }
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        formatter: function(val) {
          return val.toFixed(0);
        },
        style: {
          fontSize: '10px',
          colors: '#6B7280',
        }
      },
      min: 0,
      max: 400,
      tickAmount: 5,
    },
    grid: {
      show: true,
      borderColor: '#F3F4F6',
      strokeDashArray: 0,
      position: 'back',
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
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
        formatter: (val) => `${val} new users`,
      },
    },
  };

 
  const chartSeries = [
    {
      name: 'New Users',
      data: [
        350, 180, 150, 210, 90, 150, 200, 310, 130, 190, 
        220, 160, 240, 170, 240, 300, 160, 210, 330, 180, 
        230, 150, 190, 220, 110, 140, 200, 170, 360, 210
      ],
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">New users / day</h3>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#465FFF] mr-2"></span>
          <span className="text-sm text-gray-500">Daily</span>
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
        Monthly • Data updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default NewUsersDailyChart;