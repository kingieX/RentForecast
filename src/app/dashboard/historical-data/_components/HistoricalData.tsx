"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary components
import { Bar } from "react-chartjs-2"; // For bar charts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const HistoricalDataPage = () => {
  // Mock historical data
  const historicalData = [
    { year: 2020, avgPrice: 100000, sales: 15000 },
    { year: 2021, avgPrice: 120000, sales: 20000 },
    { year: 2022, avgPrice: 140000, sales: 25000 },
    { year: 2023, avgPrice: 160000, sales: 30000 },
  ];

  // State for filters
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Data for chart
  const chartData = {
    labels: historicalData.map((data) => data.year),
    datasets: [
      {
        label: "Average Price (₦)",
        data: historicalData.map((data) => data.avgPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Number of Sales",
        data: historicalData.map((data) => data.sales),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Function to filter data based on price range
  const handleFilter = () => {
    console.log("Filtering data based on price range...");
  };

  return (
    <div className="container mx-auto px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Historical Housing Data for Ebonyi, Nigeria
      </h1>
      <p className="text-center mb-4">
        Explore historical trends in housing prices and sales data.
      </p>

      {/* Filters */}
      {/* <div className="flex justify-center space-x-4 mb-6">
        <div>
          <Label htmlFor="minPrice">Min Price (₦)</Label>
          <Input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseInt(e.target.value) : "")
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="maxPrice">Max Price (₦)</Label>
          <Input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value) : "")
            }
            className="mt-1"
          />
        </div>
        <Button
          onClick={handleFilter}
          className="self-end bg-blue-600 text-white hover:bg-blue-700"
        >
          Filter
        </Button>
      </div> */}

      {/* Chart Section */}
      <div className="max-w-3xl mx-auto mb-4 h-64 overflow-y-auto">
        {/* Apply max height and overflow to make this scrollable */}
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-md bg-white shadow-md max-h-72 overflow-y-auto">
        {/* Apply height and overflow to make the table scrollable */}
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Average Price (₦)</th>
              <th className="px-4 py-2">Number of Sales</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((data) => (
              <tr key={data.year} className="border-b">
                <td className="px-4 py-1">{data.year}</td>
                <td className="px-4 py-1">
                  {data.avgPrice.toLocaleString("en-NG")}
                </td>
                <td className="px-4 py-1">{data.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalDataPage;
