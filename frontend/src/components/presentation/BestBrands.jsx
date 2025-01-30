import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStores } from "../../store/actions/storeActions";
import { Link } from "react-router-dom";

export default function BestBrands() {
  const dispatch = useDispatch();

  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  const sortBy = "-createdAt"; // Default sorting order

  // Get store data from Redux store
  const storeList = useSelector((state) => state.storeList);
  const { loading, error, stores, totalStores } = storeList;

  useEffect(() => {
    dispatch(listStores(currentPage, itemsPerPage, sortBy));
  }, [dispatch, currentPage]);

  // Handle pagination click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages based on product quantity
  const totalPages = Math.ceil((totalStores || 0) / itemsPerPage);

  return (
    <div className="w-full container p-4 bg-[#f3f4f6]">
      <h1 className="text-center text-2xl font-bold text-[#4222C4] mb-6">
        Our Best Stores:
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : stores && stores.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-2">
            {stores.map((store) => (
              <Link
                to={`/single-product/${store._id}`}
                key={store._id}
                className="relative h-[120px] rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_APP}${store.photo.url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <p className="text-white text-lg font-bold">{store.name}</p>
                </div>
                {/* Name below */}
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 py-1 text-center">
                  <p className="text-gray-800 font-medium">{store.name}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === page
                      ? "bg-[#4222C4] text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-lg text-gray-500">No store registered yet.</p>
      )}
    </div>
  );
}
