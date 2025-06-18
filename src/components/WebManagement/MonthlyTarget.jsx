import { set } from 'date-fns';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { data } from 'react-router';
import { apiAuth } from '../../services/api';

export default function MonthlyTarget() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartSeries, setChartSeries] = useState([{ name: 'Sales', data: Array(12).fill(0) }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const MONTHLY_TARGET = 600000;
  const YEARLY_TARGET = 4000000;

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
    fetchMonthlySales(selectedDate.getFullYear());
  }, [selectedDate.getFullYear()]); 

  // Separate useEffect for handling month selection changes
  useEffect(() => {
    const selectedMonth = selectedDate.getMonth();
    const currentSales = chartSeries[0].data[selectedMonth] || 0;
    setCurrentMonthSales(currentSales);
    const progress = ((currentSales / MONTHLY_TARGET) * 100).toFixed(2);
    setProgressPercentage(progress);
  }, [selectedDate, chartSeries]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const options = {
    colors: ["#14B8A6"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#14B8A6"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">

        <div className='flex justify-between items-center'>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>
            <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
              Target you've set for each month
            </p>
          </div>
          <div className='flex items-center'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="border rounded px-3 py-1 text-sm mr-2"
            />
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={[progressPercentage]}
              type="radialBar"
              height={330}
            />
          </div>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You earn {currentMonthSales} VND this month. Keep up your good work!
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
            Target
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {MONTHLY_TARGET} VND
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
            Income
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {currentMonthSales} VND
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-xs dark:text-gray-400 sm:text-sm">
            Month
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {selectedDate.getMonth() + 1}
          </p>
        </div>
      </div>
    </div>
  );
}