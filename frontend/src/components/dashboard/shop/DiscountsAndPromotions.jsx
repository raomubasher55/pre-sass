import { useState } from "react";
import { FaTag, FaEdit, FaTrashAlt } from "react-icons/fa";

const DiscountsAndPromotions = () => {
  // Mock Products List
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
  ];

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "Black Friday Sale",
      type: "Percentage",
      value: "20%",
      startDate: "2024-11-25",
      endDate: "2024-11-30",
      products: [1, 2], // List of product IDs this discount applies to
    },
    {
      id: 2,
      name: "Holiday Discount",
      type: "Fixed",
      value: "$10",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      products: [3, 4], // List of product IDs this discount applies to
    },
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState({
    id: null,
    name: "",
    type: "Percentage",
    value: "",
    startDate: "",
    endDate: "",
    products: [],
  });

  // Open Modal (for Add or Edit)
  const openModal = (discount = null) => {
    if (discount) {
      setCurrentDiscount(discount);
    } else {
      setCurrentDiscount({
        id: null,
        name: "",
        type: "Percentage",
        value: "",
        startDate: "",
        endDate: "",
        products: [],
      });
    }
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add or Update Discount
  const handleSaveDiscount = () => {
    if (currentDiscount.id) {
      // Update existing discount
      const updatedDiscounts = discounts.map((discount) =>
        discount.id === currentDiscount.id ? currentDiscount : discount
      );
      setDiscounts(updatedDiscounts);
    } else {
      // Add new discount
      const newDiscount = { ...currentDiscount, id: discounts.length + 1 };
      setDiscounts([...discounts, newDiscount]);
    }
    closeModal();
  };

  // Delete Discount
  const deleteDiscount = (id) => {
    setDiscounts(discounts.filter((discount) => discount.id !== id));
  };

  // Handle value change and auto append $ or %
  const handleValueChange = (e) => {
    let value = e.target.value;
    if (currentDiscount.type === "Fixed" && !value.startsWith("$")) {
      value = `$${value.replace(/[^0-9.]/g, "")}`; // Remove non-numeric characters and add $
    } else if (currentDiscount.type === "Percentage" && !value.endsWith("%")) {
      value = `${value.replace(/[^0-9.]/g, "")}%`; // Remove non-numeric characters and add %
    }
    setCurrentDiscount({ ...currentDiscount, value });
  };

  // Handle product selection for discount
  const handleProductSelection = (e) => {
    const selectedProductId = parseInt(e.target.value);
    const isSelected = e.target.checked;
    setCurrentDiscount((prev) => {
      const updatedProducts = isSelected
        ? [...prev.products, selectedProductId]
        : prev.products.filter((id) => id !== selectedProductId);
      return { ...prev, products: updatedProducts };
    });
  };

  return (
    <div className="p-6 bg-gray-100 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#4222C4]">Discounts and Promotions</h1>
      <p className="text-gray-600">Manage your Discounts and Promotions here.</p>

      {/* Discount Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Discounts</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#4222C4] text-white">
                <th className="px-4 py-2 text-left">Discount Name</th>
                <th className="px-4 py-2 text-left">Discount Type</th>
                <th className="px-4 py-2 text-left">Discount Value</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{discount.name}</td>
                  <td className="px-4 py-2">{discount.type}</td>
                  <td className="px-4 py-2">{discount.value}</td>
                  <td className="px-4 py-2">{discount.startDate}</td>
                  <td className="px-4 py-2">{discount.endDate}</td>
                  <td className="px-4 py-2 space-x-4">
                    <button
                      onClick={() => openModal(discount)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteDiscount(discount.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Discount Button */}
      <div className="text-right">
        <button
          onClick={() => openModal()}
          className="bg-[#4222C4] text-white px-4 py-2 rounded-lg"
        >
          Add New Discount
        </button>
      </div>

      {/* Modal for Add/Edit Discount */}
      {isModalOpen && (
        <div className="overflow-y-scroll fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {currentDiscount.id ? "Edit Discount" : "Add New Discount"}
            </h3>

            <form>
              {/* Discount Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Discount Name</label>
                <input
                  type="text"
                  value={currentDiscount.name}
                  onChange={(e) =>
                    setCurrentDiscount({ ...currentDiscount, name: e.target.value })
                  }
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              {/* Discount Type */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Discount Type</label>
                <select
                  value={currentDiscount.type}
                  onChange={(e) =>
                    setCurrentDiscount({ ...currentDiscount, type: e.target.value })
                  }
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>

              {/* Discount Value */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Discount Value</label>
                <input
                  type="text"
                  value={currentDiscount.value}
                  onChange={handleValueChange}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>

              {/* Product Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Select Products</label>
                <div className="space-y-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={product.id}
                        checked={currentDiscount.products.includes(product.id)}
                        onChange={handleProductSelection}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">{product.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Fields */}
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={currentDiscount.startDate}
                    onChange={(e) =>
                      setCurrentDiscount({ ...currentDiscount, startDate: e.target.value })
                    }
                    className="w-full p-2 mt-1 border rounded-md"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={currentDiscount.endDate}
                    onChange={(e) =>
                      setCurrentDiscount({ ...currentDiscount, endDate: e.target.value })
                    }
                    className="w-full p-2 mt-1 border rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-600 border border-gray-400 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDiscount}
                  className="bg-[#4222C4] text-white px-4 py-2 rounded-md"
                >
                  {currentDiscount.id ? "Update Discount" : "Save Discount"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountsAndPromotions;
