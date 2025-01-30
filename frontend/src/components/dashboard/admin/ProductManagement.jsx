import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStoreProducts } from "../../../store/actions/storeActions";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, stores, products, error } = useSelector((state) => state.ProductsByReducer);

  const [allProducts, setAllProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchStoreProducts());
  }, [dispatch]);

  useEffect(() => {
    if (stores.length && products.length) {
      const flattenedProducts = stores.flatMap((store) =>
        products
          .filter((product) => store.products.includes(product._id))
          .map((product) => ({
            ...product,
            storeName: store.name, // Add store name to each product
          }))
      );
      setAllProducts(flattenedProducts);
    }
  }, [stores, products]);

  const handleCopy = (productId) => {
    navigator.clipboard.writeText(productId).then(() => {
      alert("Product ID copied to clipboard!");
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 pt-14 pb-6 rounded bg-gray-100">
      <h1 className="text-2xl font-bold text-center my-4 text-[#4222C4]">Products</h1>
      {(!allProducts || allProducts.length === 0) ? (
        <div className="text-center text-gray-600 text-xl">No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allProducts.map((product) => (
            <div
              // to={`/single-product/${product._id}`}
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <div
                className="relative h-60 rounded-lg shadow-lg overflow-hidden group"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_APP}/${product.images[0].url.replace(/\\/g, "/")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setHoveredProductId(product._id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4 text-white">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm truncate">{product.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      className="hover:underline"
                      style={{
                        color: "white",
                        textShadow:
                          "0 0 8px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)",
                      }}
                    >
                      {product.storeName}
                    </div>
                    {product.discountPercentage && (
                      <div
                        className="rounded-full text-center p-1 animate-pulse"
                        style={{
                          backgroundColor: "#4222C4",
                          color: "white",
                          fontSize: "10px",
                          width: "auto",
                        }}
                      >
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                  {/* Copy ID Button */}
                  {hoveredProductId === product._id && (
                    <div
                      className="absolute bottom-2 right-2 bg-gray-800 text-white p-1 rounded-md shadow-md cursor-pointer transition-transform transform translate-x-full group-hover:translate-x-0"
                      onClick={() => handleCopy(product._id)}
                    >
                      Copy ID
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
