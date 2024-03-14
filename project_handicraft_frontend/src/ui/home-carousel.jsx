import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import slide1 from "../DemoData/slide(5).jpg"
import slide2 from "../DemoData/slide(6).jpg"
import slide3 from "../DemoData/slide(7).jpg"

const HomeCarousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={slide1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slide2}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slide3}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeCarousel;
