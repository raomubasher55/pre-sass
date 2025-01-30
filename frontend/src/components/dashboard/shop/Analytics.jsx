import { useState } from "react";
import { FaDollarSign, FaShoppingCart, FaChartLine, FaUsers } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Analytics = () => {
  const data = [
    {
      date: "10 Dec 2024",
      orders: 120,
      revenue: 4800,
      customers: 85,
    },
    {
      date: "9 Dec 2024",
      orders: 140,
      revenue: 5200,
      customers: 90,
    },
    {
      date: "8 Dec 2024",
      orders: 110,
      revenue: 4500,
      customers: 80,
    },
  ];

  // Graph data for sales overview
  const salesData = data.map(item => ({
    date: item.date,
    sales: item.orders,
  }));

  // Graph data for revenue trends
  const revenueData = data.map(item => ({
    date: item.date,
    revenue: item.revenue,
  }));

  return (
    <div className="p-6 bg-gray-100 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#4222C4]">Analytics</h1>
      <p className="text-gray-600">Gain insights with detailed Analytics and Reports here.</p>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Card */}
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
          <FaDollarSign className="text-3xl text-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">${data.reduce((acc, item) => acc + item.revenue, 0)}</h2>
            <p className="text-gray-600">Total Sales</p>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
          <FaShoppingCart className="text-3xl text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{data.reduce((acc, item) => acc + item.orders, 0)}</h2>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
          <FaChartLine className="text-3xl text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">${data.reduce((acc, item) => acc + item.revenue, 0)}</h2>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4">
          <FaUsers className="text-3xl text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{data.reduce((acc, item) => acc + item.customers, 0)}</h2>
            <p className="text-gray-600">Total Customers</p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Graph */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#4222C4] text-white">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Revenue</th>
                <th className="px-4 py-2 text-left">Customers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.orders}</td>
                  <td className="px-4 py-2">${item.revenue}</td>
                  <td className="px-4 py-2">{item.customers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
