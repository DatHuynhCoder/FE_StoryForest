import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { api } from '../../services/api';

const NewUsersDailyChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [chartData, setChartData] = useState({ days: [], values: [] });
  const [loading, setLoading] = useState(true);

  const fetchDataForMonth = async (month) => {
    try {
      setLoading(true);
      const year = month.getFullYear();
      const monthNumber = month.getMonth() + 1; 
      
      const response = await api.get(`/api/admin/users/daily-stats?year=${year}&month=${monthNumber}`);

      console.log(`New user year=${year}&month=${monthNumber} `, response.data)
      
      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error('Invalid data format');
      }

      const daysInMonth = new Date(year, monthNumber, 0).getDate();
      const dailyCounts = Array(daysInMonth).fill(0);

      response.data.data.forEach(item => {
        if (item && typeof item.day === 'number' && typeof item.count === 'number') {
          const dayIndex = item.day - 1;
          if (dayIndex >= 0 && dayIndex < daysInMonth) {
            dailyCounts[dayIndex] = item.count;
          }
        }
      });

      return {
        days: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
        values: dailyCounts
      };
    } catch (error) {
      console.error('Error fetching daily stats:', error);
      const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      return {
        days: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
        values: Array(daysInMonth).fill(0)
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDataForMonth(selectedMonth);
      setChartData(data);
    };
    loadData();
  }, [selectedMonth]);

  const chartOptions = {
    colors: ['#14B8A6'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 180,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: !loading,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
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
      categories: chartData.days,
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
          return parseInt(value) % 4 === 0 ? value : '';
        },
        style: {
          fontSize: '10px',
          colors: '#6B7280',
        }
      }
    },
    yaxis: {
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
        show: true,
        formatter: function(val) {
        return `Day ${val}`;
      }
      },
      y: {
        formatter: (val) => `${val} `,
      },
    },
  };

  const chartSeries = [
    {
      name: 'New Users',
      data: chartData.values,
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">New users / Day</h3>
        <div className="flex items-center">
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="border rounded px-3 py-1 text-sm mr-2"
          />
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#14B8A6] mr-2"></span>
            <span className="text-sm text-gray-500">Daily</span>
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
        Data for: {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </div>
    </div>
  );
};

export default NewUsersDailyChart;