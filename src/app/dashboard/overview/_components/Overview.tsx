"use client";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Link from "next/link";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data for chart
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Number of Properties",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

export default function Overview() {
  // get user detail from cookies
  const fullname = Cookies.get("fullname");
  // const email = Cookies.get("email");

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto lg:py-1 py-12">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {fullname}!</h1>
        <p className="text-gray-600">
          Here’s a summary of your latest property metrics.
        </p>
      </header>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Example Metric Card */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="text-blue-500 text-4xl mb-4">
            {/* Icon here */}
            <i className="fas fa-home"></i>
          </div>
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-gray-600">Total Properties</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="text-blue-500 text-4xl mb-4">
            <i className="fas fa-chart-line"></i>
          </div>
          <h2 className="text-3xl font-bold">₦120,000</h2>
          <p className="text-gray-600">Avg Rent Forecast</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="text-green-500 text-4xl mb-4">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <h2 className="text-3xl font-bold">₦1,200,000</h2>
          <p className="text-gray-600">Total Revenue</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <div className="text-red-500 text-4xl mb-4">
            <i className="fas fa-building"></i>
          </div>
          <h2 className="text-3xl font-bold">5</h2>
          <p className="text-gray-600">Vacant Properties</p>
        </div>
      </div>

      {/* Property Listings Overview (Chart) */}
      {/* <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Property Listings Overview</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div> */}

      {/* Rent Forecast Snapshot */}
      <div className="bg-blue-100 text-blue-900 rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-xl font-bold">Latest Rent Forecast</h2>
        <p className="mt-4">
          <span className="font-semibold">Location:</span> Abakaliki, Ebonyi
        </p>
        <p className="mt-2">
          <span className="font-semibold">Predicted Rent:</span> ₦140,000
        </p>
        <p className="mt-2">
          <span className="font-semibold">Property Type:</span> 3 Bedroom House
        </p>
      </div>

      {/* Recent Activities */}
      {/* <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Rent Forecast</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">3 Bedroom House</td>
              <td className="px-4 py-2">10 Oct 2024</td>
              <td className="px-4 py-2">₦150,000</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      {/* Quick Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Link href="/dashboard/property-listings">
          <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add New Property
          </Button>
        </Link>
        <Link href="/dashboard/rent-forecast">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Run Rent Forecast
          </Button>
        </Link>
      </div>
    </div>
  );
}
