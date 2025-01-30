import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import sliderSettings from "../sliders/sliderSettings";

export default function TopDeals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleProductClick = (id) => {
    navigate(`/single-product/${id}`);
  };

  const discountedProducts = products.filter(
    (product) =>
      product.discountPercentage && product.discountPercentage > 0
  );

  // Define dummy data
  const dummyProducts = [
    {
      _id: "dummy1",
      name: "Dummy Product 1",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/51/461016/1.jpg?5879" }],
      discountPercentage: 10,
      discountedPrice: 90,
      price: 100,
    },
    {
      _id: "dummy2",
      name: "Dummy Product 2",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/05/105255/1.jpg?0844" }],
      discountPercentage: 15,
      discountedPrice: 85,
      price: 100,
    },
    {
      _id: "dummy3",
      name: "Dummy Product 3",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/33/611536/1.jpg?6756" }],
      discountPercentage: 25,
      discountedPrice: 75,
      price: 100,
    },
    {
      _id: "dummy4",
      name: "Dummy Product 4",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/91/697016/1.jpg?8921" }],
      discountPercentage: 30,
      discountedPrice: 70,
      price: 100,
    },
    {
      _id: "dummy5",
      name: "Dummy Product 5",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/561016/1.jpg?3833" }],
      discountPercentage: 40,
      discountedPrice: 60,
      price: 100,
    },
    {
      _id: "dummy6",
      name: "Dummy Product 6",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/71/012146/1.jpg?8150" }],
      discountPercentage: 5,
      discountedPrice: 95,
      price: 100,
    },
    {
      _id: "dummy7",
      name: "Dummy Product 7",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/45/312146/1.jpg?0655" }],
      discountPercentage: 50,
      discountedPrice: 50,
      price: 100,
    },
    {
      _id: "dummy8",
      name: "Dummy Product 8",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/09/061705/1.jpg?3286" }],
      discountPercentage: 35,
      discountedPrice: 65,
      price: 100,
    },
    {
      _id: "dummy9",
      name: "Dummy Product 9",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/503426/1.jpg?6350" }],
      discountPercentage: 20,
      discountedPrice: 80,
      price: 100,
    },
    {
      _id: "dummy10",
      name: "Dummy Product 10",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/880223/1.jpg?4535" }],
      discountPercentage: 45,
      discountedPrice: 55,
      price: 100,
    },
    {
      _id: "dummy11",
      name: "Dummy Product 11",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/24/561016/1.jpg?3833" }],
      discountPercentage: 18,
      discountedPrice: 82,
      price: 100,
    },
    {
      _id: "dummy12",
      name: "Dummy Product 12",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/67/093656/1.jpg?1127" }],
      discountPercentage: 12,
      discountedPrice: 88,
      price: 100,
    },
    {
      _id: "dummy13",
      name: "Dummy Product 13",
      images: [{ url: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/20/842656/1.jpg?0100" }],
      discountPercentage: 8,
      discountedPrice: 92,
      price: 100,
    },
  ];

  const productsToDisplay =
    discountedProducts.length > 0 ? discountedProducts : dummyProducts;

  return (
    <div className="container px-4 mb-10 mt-[120px]">
      <h1 className="font-bold text-[#4222C4] text-2xl mb-5">Top Deals</h1>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        loop={true}
        grabCursor={true}
        navigation
        className="mySwiper"
      >
        {productsToDisplay.map((product) => (
          <SwiperSlide
            key={product._id}

            className="relative swiper-card overflow-hidden flex flex-col items-center border-2 rounded-lg p-2 border-[#4222c41f] shadow-xl"
          >
            <div className="w-full h-[160px] md:h-[210px]">
              {product.images && product.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {product.images.map((image, idx) => {
                    if (image?.url) {
                      const imageUrl = `${import.meta.env.VITE_APP}/${image.url.replace(/\\/g, '/')}`;
                      return (
                        <div key={idx}>
                          <img
                            src={imageUrl}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-[150px] md:h-[200px] object-fit rounded-lg m-0"
                          />
                        </div>
                      );
                    } else {
                      return <p key={idx}>Image not available</p>;
                    }
                  })}
                </Slider>
              ) : (
                product.images[0]?.url ? (
                  <img
                    src={`${import.meta.env.VITE_APP}/${product.images[0].url.replace(/\\/g, '/')}`}
                    alt={product.name}
                    className="w-full h-[150px] md:h-[200px] object-fit rounded-lg m-0"
                  />
                ) : (
                  <p>Image not available</p>
                )
              )}
            </div>
            {product.discountPercentage > 0 && (
              <div className="absolute top-5 right-0 bg-red-500 bg-opacity-80 text-white text-xs px-2 py-1 rounded-bl-lg">
                {product.discountPercentage}% OFF
              </div>
            )}
            <div className="w-full text-black p-2 text-sm">
              <div className="text-[#4222C4] font-semibold">
                {product.name}
              </div>
              <div className="text-lg font-semibold">
                {product.discountedPrice} $
              </div>
              <div className="text-xs line-through text-gray-400">
                {product.price} $
              </div>
            </div>
            <button
              className="absolute swiper-button bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-[#4222C4] text-white px-2 py-1 text-[12px] rounded hover:bg-[#3218a2] transition-all duration-300"
              onClick={() => handleProductClick(product._id)}
            >
              View Details
            </button>

          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
