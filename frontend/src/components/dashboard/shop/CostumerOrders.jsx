import { useState } from "react";
import { FaSearch, FaEye, FaShippingFast, FaTimesCircle } from "react-icons/fa";

export const CostumerOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      totalAmount: 120.5,
      status: "Pending",
      date: "2024-12-01",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      totalAmount: 89.99,
      status: "Shipped",
      date: "2024-12-05",
    },
    {
      id: 3,
      customerName: "Sam Johnson",
      totalAmount: 250.0,
      status: "Delivered",
      date: "2024-11-28",
    },
    {
      id: 4,
      customerName: "Chris Lee",
      totalAmount: 150.75,
      status: "Canceled",
      date: "2024-11-30",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModal, setStatusModal] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search)
  );

  const handleChangeStatusModal = (order) => {
    setStatusModal(order);
    setNewStatus(order.status); // Default to the current status
  };

  const handleSaveStatus = () => {
    if (statusModal) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === statusModal.id ? { ...order, status: newStatus } : order
        )
      );
      setStatusModal(null); // Close the modal
    }
  };

  const handleCancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status !== "Delivered"
          ? { ...order, status: "Canceled" }
          : order
      )
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by order ID or customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-1/3 border rounded-lg"
        />
      </div>

      {/* Order List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#4222C4] text-white">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">${order.totalAmount}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td
                  className={`px-4 py-2 ${order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Process"
                        ? "text-orange-500"
                        : order.status === "Delivered"
                          ? "text-green-500"
                          : "text-red-500"
                    }`}
                >
                  {order.status}
                </td>
                <td className="px-1 py-2 flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center text-white bg-blue-500 px-2 py-2 rounded-lg hover:bg-blue-600"
                  >
                    <FaEye />
                  </button>
                  {order.status !== "Delivered" && order.status !== "Canceled" && (
                    <button
                      onClick={() => handleChangeStatusModal(order)}
                      className="flex items-center text-white bg-green-500 px-2 py-2 rounded-lg hover:bg-green-600"
                    >
                      <FaShippingFast />
                    </button>
                  )}
                  {order.status !== "Delivered" && order.status !== "Canceled" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="flex items-center text-white bg-red-500 px-2 py-2 rounded-lg hover:bg-red-600"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Total Amount:</strong> ${selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-[#4222C4] text-white rounded-lg hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Updating Status */}
      {statusModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Status</h2>
            <label className="block mb-2 font-medium">Select Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Process">Process</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setStatusModal(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-4 py-2 bg-[#4222C4] text-white rounded-lg hover:bg-purple-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
