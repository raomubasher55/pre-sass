import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreProducts } from "../../store/actions/storeActions";
import { getCategoryById } from "../../store/actions/categoryActions";
import { Link } from "react-router-dom";

export default function ProductsByCategory() {
  const dispatch = useDispatch();

  const { products, error, loading } = useSelector((state) => state.ProductsByReducer);
  const { categories, categoryError, categoryLoading } = useSelector((state) => state.categoryForStore);

  useEffect(() => {
    dispatch(fetchStoreProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const categoryIds = products.map((store) => store.category);
      if (categoryIds.length > 0) {
        dispatch(getCategoryById(categoryIds));
      }
    }
  }, [dispatch, products]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // ✅ Group products by unique category names
  const groupedProducts = products.reduce((acc, product) => {
    const category = categories.find((cat) => cat._id === product.category);
    if (!category) return acc;

    if (!acc[category.name]) {
      acc[category.name] = { category, products: [] };
    }
    acc[category.name].products.push(product);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-white container mx-auto">
      {Object.entries(groupedProducts).map(([categoryName, { category, products }]) => (
        <div key={category._id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: "#4222C4" }}>
            {categoryName} - New Arrivals & Discounts
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map((store, index) => (
              <Link to={`/single-product/${store._id}`} key={index} className="p-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative">
                  {store.discountPercentage && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-sm font-semibold px-2 py-1">
                      -{store.discountPercentage}%
                    </div>
                  )}
                  <img
                    src={`${import.meta.env.VITE_APP}/${store?.images[0]?.url.replace(/\\/g, "/")}`}
                    alt={`Store ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col">
                    <h3 className="text-[16px] font-semibold text-gray-800">{store.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-semibold text-gray-800">
                        {store.discountedPrice && `$${store.discountedPrice}`}
                      </p>
                      {store.discountedPrice != null && store.discountedPrice !== store.price && (
                        <p className="text-sm text-gray-500 line-through">${store.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {categoryLoading && <div>Loading categories...</div>}
      {categoryError && <div>Error: {categoryError}</div>}
    </div>
  );
}
