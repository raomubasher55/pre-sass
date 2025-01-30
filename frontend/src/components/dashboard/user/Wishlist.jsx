import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([
    {
      id: "P001",
      name: "Smartphone XYZ",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmQCnLLbDR-f1_1_GD2yC8dGVG3OZfAkRCQ&s',
      price: 699.99,
      description: "A high-quality smartphone with amazing features.",
    },
    {
      id: "P002",
      name: "Wireless Earbuds",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwd6KCbyWLsB1CzGPfWbjm1qFi8E6snAaLQ&s",
      price: 49.99,
      description: "Crystal clear sound and a comfortable fit.",
    },
    {
      id: "P003",
      name: "Gaming Laptop",
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBRxMgRlQ9xYfg_CJAjLbYz04ymMUHZLAfug&s',
      price: 1299.99,
      description: "High performance for all your gaming needs.",
    },
    
  ]);

  // Remove item from wishlist
  const handleRemove = (id) => {
    toast.warning("Item removed from wishlist!", { autoClose: 2000 });
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    toast.success(`${item.name} added to cart!`, { autoClose: 2000 });
    handleRemove(item.id); // Optionally remove from wishlist after adding to cart
  };

  return (
    <div className="flex h-screen overflow-hidden">
              <ToastContainer />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Your Wishlist</h2>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#4222C4] bg-opacity-10 rounded-lg shadow-md p-4 flex flex-col border
                   border-[#4222c47e]"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded"
                  />

                  {/* Product Details */}
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <p className="mt-2 text-lg font-bold text-blue-600">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-4 justify-center">
                  <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#4222C4] text-white p-1 sm:p-2 h-[30px] sm:h-[40px] mt-4 rounded hover:bg-[#4222C4]"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 text-white p-1 sm:p-2 h-[30px] sm:h-[40px] mt-4 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              Your wishlist is currently empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
