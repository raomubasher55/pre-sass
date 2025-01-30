import { getActiveAds } from "../../store/actions/adActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export const WelcomeSalesSlider = () => {
  const { loading, ads, error } = useSelector((state) => state.adData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveAds());
  }, [dispatch]);


  // Prepare ad images with links
  const adImages = ads.map((ad) => ({
    url: `${import.meta.env.VITE_APP}/${ad?.image?.replace(/\\/g, "/")}`,
    id: ad?.product?._id,
  }));

  return (
    <div className="w-full md:w-3/5 px-2 md:h-[500px] rounded overflow-hidden ">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={false}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full max-w-full mx-auto h-full overflow-hidden"
        >
          {adImages.map((ad) => (
            <SwiperSlide key={ad.id}>
              <Link to={`/single-product/${ad.id}`} className="block overflow-hidden rounded">
                <img
                  src={ad.url}
                  alt="Ad"
                  className="w-full h-[300px] md:h-[470px] object-cover rounded-lg shadow-lg cursor-pointer"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
