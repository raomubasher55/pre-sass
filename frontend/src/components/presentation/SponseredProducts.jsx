import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActiveAds } from "../../store/actions/adActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export default function SponsoredProducts() {
  const { loading, ads, error } = useSelector((state) => state.adData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveAds());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white container relative">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#4222C4" }}>
        Sponsored Products
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2 },
          }}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <Link to={`/single-product/${ad.product._id}`}>
                <div className="relative rounded-lg bg-white shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-300 ease-in-out border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_APP}/${ad.product.images[0]?.url.replace(/\\/g, '/')}`}
                    alt={ad.product.name}
                    className="w-full h-40 object-cover"
                  />
                  {ad.product.discountPercentage > 0 && (
                    <div className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 absolute top-2 right-2">
                      {ad.product.discountPercentage}% OFF
                    </div>
                  )}
                  <div className="p-4 flex flex-col">
                    <h3 className="text-[16px] font-semibold text-gray-800">
                      {ad.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {ad.description.slice(0, 12)}{ad.description.length > 12 && '...'}
                    </p>

                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">
                        ${ad.product.discountPercentage > 0
                          ? ad.product.discountedPrice.toFixed(2)
                          : ad.product.price.toFixed(2)}
                      </p>
                      {ad.product.discountPercentage > 0 && (
                        <p className="text-sm text-gray-600 line-through">
                          ${ad.product.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Stock: {ad.product.stock}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      )}
      <div className="swiper-button-next text-[#4222C4]">
        <IoMdArrowForward size={24} />
      </div>
      <div className="swiper-button-prev text-[#4222C4]">
        <IoMdArrowBack size={24} />
      </div>
    </div>
  );
}
