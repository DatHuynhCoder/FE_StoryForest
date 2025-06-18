import Chart from "react-apexcharts";
import React, { useState, useEffect } from 'react';
import { apiAuth } from '../../services/api';

export default function StatisticsChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartSeries, setChartSeries] = useState({ name: 'Sales', data: Array(12).fill(0) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [series, setSeries] = useState([{
    name: "Sales Target",
    data: [5, 10, 8, 5, 5, 6, 11, 15, 30, 60, 70, 90],
  }])

  const fetchMonthlyVIPSubs = async (year) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiAuth.get(`/api/admin/dashboard/monthly-count-vipsubs?year=${year}`);
      const monthlyData = response.data.data;

      // Create an array with 12 months, filling in the sales from the API
      const monthlySales = Array(12).fill(0);
      monthlyData.forEach(item => {
        monthlySales[item.month - 1] = item.count;
      })
      setChartSeries({ name: 'VIP Subcriptions Sold', data: monthlySales });
      setSeries([
        {
          name: "Sales Target",
          data: [5, 10, 8, 5, 5, 6, 11, 15, 30, 60, 70, 90],
        },
        {
          name: 'VIP Subcriptions Sold',
          data: monthlySales,
        }
      ]);
      console.log(series);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch monthly sales:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyVIPSubs(selectedYear);
  }, [selectedYear])

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#14B8A6", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Target you've set for each month in <span className="text-gray-800 font-bold">{selectedYear}</span>
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart
            options={options}
            series={series}
            type="area"
            height={310}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}