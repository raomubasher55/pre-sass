import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listStores } from "../../store/actions/storeActions"; 
import { Link } from 'react-router-dom';

export default function OfficialStores() {
  const dispatch = useDispatch();

  const [shownStores, setShownStores] = useState(12);

  const storeList = useSelector((state) => state.storeList);
  const { stores, loading, error } = storeList;

  useEffect(() => {
    dispatch(listStores(1, 24, '-createdAt')); 
  }, [dispatch]);

  const loadMoreStores = () => {
    setShownStores(shownStores + 6);
  };

  return (
    <div className="p-6 bg-white container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#4222C4" }}>Official Stores</h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : stores && stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stores.slice(0, shownStores).map((store) => (
            <Link to={`/priceRange/products/${store.category}`} key={store._id} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={`${import.meta.env.VITE_APP}${store.photo.url}`}
                  alt={store.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col">
                  <h3 className="text-[16px] font-semibold text-gray-800">
                    {store.name.length > 13 ? store.name.slice(0, 12) + "..." : store.name}
                  </h3>

                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No stores found.</p>
      )}

      {shownStores < stores.length && (
        <button
          onClick={loadMoreStores}
          className="mt-4 bg-[#4222C4] text-white px-6 py-2 rounded-md block mx-auto"
        >
          See More
        </button>
      )}
    </div>
  );
}
