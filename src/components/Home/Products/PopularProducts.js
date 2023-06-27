import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";
import ProductCard from "./ProductCard";

const PopularProducts = ({ products }) => {
  return (
    <div>
      <div className="mt-3">
        <div className="mb-10">
          <Swiper
            autoplay={true}
            // modules={[Autoplay]}
            className="mySwiper pb-3 h-full"
            // spaceBetween={50}
            // slidesPerView={6}
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              440: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
                width: 768,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {products?.map((product) => (
              <SwiperSlide key={product?.id} className="h-full mb-1">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
