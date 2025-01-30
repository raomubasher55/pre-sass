import React, { useState } from "react";
import { FaCheckCircle, FaShippingFast, FaTimesCircle } from "react-icons/fa";

// Sample fake data for Orders and Transactions
const sampleOrders = [
  {
    id: 1,
    orderNumber: "ORD001",
    customerName: "John Doe",
    shopName: "Tech Store",
    orderDate: "2024-12-01",
    status: "Completed",
    totalAmount: "$250.00",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    orderNumber: "ORD002",
    customerName: "Jane Smith",
    shopName: "Fashion Shop",
    orderDate: "2024-12-05",
    status: "Pending",
    totalAmount: "$130.00",
    paymentStatus: "Pending",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    orderNumber: "ORD003",
    customerName: "Emily Green",
    shopName: "Electronics World",
    orderDate: "2024-12-06",
    status: "Shipped",
    totalAmount: "$180.00",
    paymentStatus: "Paid",
    paymentMethod: "Debit Card",
  },
  {
    id: 4,
    orderNumber: "ORD004",
    customerName: "David Black",
    shopName: "Home Goods",
    orderDate: "2024-12-07",
    status: "Completed",
    totalAmount: "$500.00",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: 5,
    orderNumber: "ORD005",
    customerName: "Alice Johnson",
    shopName: "Bookstore",
    orderDate: "2024-12-08",
    status: "Pending",
    totalAmount: "$70.00",
    paymentStatus: "Failed",
    paymentMethod: "Credit Card",
  },
];

export default function OrdersTransactions() {
  const [orders, setOrders] = useState(sampleOrders);
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 2 });

  // Function to change order status
  const handleStatusChange = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  // Paginate orders
  const paginatedOrders = orders.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders & Transactions</h2>

      {/* Overview: Total Orders & Payments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#4222C4] text-white rounded-lg p-6">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-[#42C4A5] text-white rounded-lg p-6">
          <h3 className="text-xl font-semibold">Total Payments</h3>
          <p className="text-3xl font-bold">
            ${orders.reduce((acc, order) => acc + parseFloat(order.totalAmount.slice(1)), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-[#FFC107] text-white rounded-lg p-6">
          <h3 className="text-xl font-semibold">Pending Orders</h3>
          <p className="text-3xl font-bold">
            {orders.filter((order) => order.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2 px-4">Order Number</th>
              <th className="py-2 px-4">Customer Name</th>
              <th className="py-2 px-4">Shop Name</th>
              <th className="py-2 px-4">Order Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Payment Status</th>
              <th className="py-2 px-4">Payment Method</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-800">{order.orderNumber}</td>
                <td className="py-2 px-4 text-gray-600">{order.customerName}</td>
                <td className="py-2 px-4 text-gray-600">{order.shopName}</td>
                <td className="py-2 px-4 text-gray-600">{order.orderDate}</td>
                <td className="py-2 px-4 text-gray-600">{order.status}</td>
                <td className="py-2 px-4 text-gray-600">{order.paymentStatus}</td>
                <td className="py-2 px-4 text-gray-600">{order.paymentMethod}</td>
                <td className="py-2 px-4 space-x-4">
                  <button
                    onClick={() => handleStatusChange(order.id, "Completed")}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                  >
                    <FaCheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Shipped")}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    <FaShippingFast className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Cancelled")}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    <FaTimesCircle className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          className="bg-[#4222C4] text-white p-3 rounded-md"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {pagination.currentPage} of {Math.ceil(orders.length / pagination.pageSize)}
        </span>
        <button
          disabled={pagination.currentPage * pagination.pageSize >= orders.length}
          onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          className="bg-[#4222C4] text-white p-3 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
