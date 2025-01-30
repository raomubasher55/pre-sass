import Navbar from "../components/homepage/Navbar";
import { HeroBanner } from "../components/homepage/HeroBanner";
import ProductDetail from "../components/products/ProductDetail";
import ShippingReturn from "../components/products/ShippingReturn";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../store/actions/productActions";
import { getCategoryById } from "../store/actions/categoryActions";
import { FooterPrime } from '../components/presentation/FooterPrime';
import { AllAbouJumiaFooter } from '../components/presentation/AllAbouJumiaFooter';
import { fetchProductsByStore, getStore } from "../store/actions/storeActions";

const SingleProduct = () => {
  const { id } = useParams();
  const { product } = useSelector((state) => state.SingleproductDetails);
  const { categories } = useSelector((state) => state.categoryForStore);
  const { store } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [orderGuide , setOrderGuide] = useState(0)


  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      dispatch(getCategoryById(product.category));
      dispatch(getStore(product.seller));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (store) {
      dispatch(fetchProductsByStore(store._id));
    }
  }, [dispatch, store]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);

  return (
    <>
      <HeroBanner />
      <Navbar />
      <div className="w-full bg-[#F1F1F2] bg-opacity-40 py-10 md:px-5 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-sm text-gray-500">
            Home / {categories[0]?.name} / <span className="text-gray-800 font-semibold">{product?.name}</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-0 overflow-hidden container m-auto flex gap-0 md:gap-2">
          <ProductDetail productId={id} category={categories[0]?.name} setOrderGuide={setOrderGuide} />

          {/* Product shipping and return */}
          <ShippingReturn store={store} product={product} orderGuide={orderGuide} />
        </div>
      </div>

      <FooterPrime />
      <AllAbouJumiaFooter />
    </>
  );
};

export default SingleProduct;
