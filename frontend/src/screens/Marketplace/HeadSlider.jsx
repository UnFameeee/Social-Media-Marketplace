import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function importAll(r) {
  return r.keys().map(r);
}
const sliderImage = importAll(require.context("../../assets/sliderImage", false, /\.(png|jpe?g|svg)$/));
function HeadSlider() {
  const settings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      {sliderImage?.map((item, index) => (
        <img
          key={index}
          className="h-[300px] w-full object-fit rounded-xl"
          src={item}
          alt=""
        />
      ))}
    </Slider>
  );
}

export default HeadSlider;
