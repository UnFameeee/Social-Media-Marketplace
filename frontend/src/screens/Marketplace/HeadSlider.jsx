import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/wallhaven-13dv2g_1920x1080.png";
import img2 from "../../assets/wallhaven-4vgg35_1920x1080.png";
import img3 from "../../assets/wallhaven-85335j_1920x1080.png";
import img4 from "../../assets/wallhaven-p983ve_1920x1080.png";
import img5 from "../../assets/wallhaven-weyyqr_1920x1080.png";
import img6 from "../../assets/wallhaven-yjl8mk_1920x1080.png";
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
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img1}
        alt=""
      />
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img2}
        alt=""
      />
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img3}
        alt=""
      />
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img4}
        alt=""
      />
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img5}
        alt=""
      />
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={img6}
        alt=""
      />
    </Slider>
  );
}

export default HeadSlider;
