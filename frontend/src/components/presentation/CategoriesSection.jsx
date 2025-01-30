import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listStores } from "../../store/actions/storeActions"; 
import { getCategoryById } from "../../store/actions/categoryActions"; 

export default function CategoriesSection() {
  const dispatch = useDispatch();

  const { stores, error, loading } = useSelector((state) => state.storeList);
  const { categories, error: categoryError, loading: categoryLoading } = useSelector((state) => state.categoryForStore);

  useEffect(() => {
    dispatch(listStores()); 
  }, [dispatch]);

  useEffect(() => {
    if (stores && stores.length > 0) {
      const categoryIds = stores.map(store => store.category); 
      if (categoryIds.length > 0) {
        dispatch(getCategoryById(categoryIds)); 
      }
    }
  }, [dispatch, stores]);

  if (loading) {
    return <div>Loading stores...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 mt-20 bg-gray-100 container">
      <h2 className="text-center text-2xl font-bold mb-6" style={{ color: "#4222C4" }}>
        Stores by Categories
      </h2>
      <div className="grid gap-4 max-w-6xl mx-auto md:grid-cols-6 sm:grid-cols-2 grid-cols-1">
        {stores && stores?.map((store) => (
          <div
            key={store._id}
            className="relative h-40 rounded-lg shadow-lg overflow-hidden group"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_APP}${store.photo.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to={`/priceRange/products/${store.category}`} className="absolute inset-0 transition-transform duration-500 group-hover:scale-110 bg-black bg-opacity-40 flex items-center justify-center">
              <h3
                className="text-white text-lg font-semibold text-center"
                style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)" }}
              >
                {categories?.find(category => category._id === store.category)?.name}
              </h3>
            </Link>

          </div>
        ))}
      </div>

      {categoryLoading && <div>Loading categories...</div>}
      {categoryError && <div>Error: {categoryError}</div>}
    </div>
  );
}
