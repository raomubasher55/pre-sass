import { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

export const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      totalOrders: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      totalOrders: 8,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1122334455",
      totalOrders: 12,
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeactivate = (customerId) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: customer.status === "Active" ? "Inactive" : "Active" }
          : customer
      )
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-100">
      {/* Header */}
      {/* <h1 className="text-2xl font-bold text-[#4222C4]">Customers</h1>
      <p className="text-gray-600">Manage your customers and their information efficiently.</p> */}

      {/* Search Bar */}
      <div className="flex flex-wrap items-center mb-4 space-y-2 sm:space-y-0">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search customers by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full sm:w-1/2 lg:w-1/3 border rounded-lg"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#4222C4] text-white text-xs sm:text-sm lg:text-base">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Total Orders</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">{customer.totalOrders}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    customer.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {customer.status}
                </td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="text-white bg-blue-500 px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-blue-600 text-xs sm:text-sm"
                  >
                    <FaEye className="inline-block mr-1" /> 
                  </button>
                  <button
                    onClick={() => console.log("Edit customer", customer.id)}
                    className="text-white bg-green-500 px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-green-600 text-xs sm:text-sm"
                  >
                    <FaEdit className="inline-block mr-1" /> 
                  </button>
                  <button
                    onClick={() => handleDeactivate(customer.id)}
                    className={`text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-opacity-80 text-xs sm:text-sm ${
                      customer.status === "Active" ? "bg-red-500" : "bg-gray-400"
                    }`}
                  >
                    <FaTrashAlt className="inline-block mr-1" />{" "}
                    {customer.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Customer Details */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/3">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Customer Details
            </h2>
            <p>
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Total Orders:</strong> {selectedCustomer.totalOrders}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  selectedCustomer.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {selectedCustomer.status}
              </span>
            </p>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-4 px-4 py-2 bg-[#4222C4] text-white rounded-lg hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
