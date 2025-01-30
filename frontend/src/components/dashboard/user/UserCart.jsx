import { useState } from "react";

export default function UserCart() {
  const [cart, setCart] = useState([
    {
      id: "P001",
      name: "Smartphone XYZ",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmQCnLLbDR-f1_1_GD2yC8dGVG3OZfAkRCQ&s',
      price: 699.99,
      quantity: 1,
    },
    {
      id: "P002",
      name: "Wireless Earbuds",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwd6KCbyWLsB1CzGPfWbjm1qFi8E6snAaLQ&s",
      price: 49.99,
      quantity: 2,
    },
    {
      id: "P003",
      name: "Gaming Laptop",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBRxMgRlQ9xYfg_CJAjLbYz04ymMUHZLAfug&s',
      price: 1299.99,
      quantity: 1,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const shippingFee = 20;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-center text-[#4222C4] mb-8">
            Your Shopping Cart
          </h2>

          {/* Cart Items */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white border border-[#4222c449] rounded-lg p-4">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg"
                      />

                      {/* Product Details */}
                      <div className="flex-1 px-4">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mr-5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="font-semibold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 ml-4 border border-[#4222c449] bg-[#bab0e249] hover:bg-red-400 hover:text-white rounded p-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Your cart is empty.</p>
              )}
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-[#4222C4] mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Shipping:</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-[#4222C4] text-white py-2 mt-6 rounded hover:bg-opacity-90"
                onClick={() => setShowModal(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h3 className="text-2xl font-bold text-[#4222C4] mb-4">
              Payment Details
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-[#4222C4] focus:ring-2"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-[#4222C4] focus:ring-2"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-[#4222C4] focus:ring-2"
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4222C4] text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
