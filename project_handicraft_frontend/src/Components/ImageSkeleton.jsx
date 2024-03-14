import React from "react";
// eslint-disable-next-line
import { Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { data } from "../DemoData/DataSet";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

function ImageSkeleton() {
  const navigate = useNavigate();

  // eslint-disable-next-line
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <>
      hello
      <Swiper
        effect={"coverflow"}
        slidesPerView={2}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        style={{
          width: "100%",
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image src={item.image} fluid />
            <div className="carousel-caption d-none d-md-block ">
              <h5>
                <span className="slide-inner-text">{item.name}</span>
              </h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ImageSkeleton;
