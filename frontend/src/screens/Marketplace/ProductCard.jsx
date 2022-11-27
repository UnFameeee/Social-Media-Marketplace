import React, { useState } from "react";
import { Avatar, Button, Modal } from "@mui/material";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./ProductCard.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import ProductCartDetailModal from "./ProductCartDetailModal";
import notFoundImage from "../../assets/noimage_1.png";
import ManagerProductModal from "./ManagerProductModa";
import macbook_example from "../../assets/macbook.jpeg";
function ProductCard({ arrayBtn, productObj, ...props }) {
  const userData = useSelector((state) => state.auth.user.userData);
  const [showModal, setShowModal] = useState(false);
  const handleShowModalDetail = () => {
    if (window.innerWidth <= 822) {
      setShowModal(true);
    }
  };
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    autoplaySpeed: 5000,
    cssEase: "linear",
    dotsClass: "slick-dots bottom-[10px]",
  };
  const [showManagerModal, setShowManagerModal] = useState(false);

  return (
    <>
      <ProductCartDetailModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="card-Product card-product-normal shadow-md  p-[1.5rem] ">
        <div className="card-image relative mb-[1rem]">
          <div className="slide-show rounded-lg  shadow-lg">
            <Slider {...settings}>
              {productObj?.product_image &&
                productObj.product_image.map((image) => (
                  <img
                    key={image.link}
                    alt="not found"
                    className="w-full object-cover rounded-lg h-[228px]"
                    src={image.link}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = notFoundImage;
                    }}
                  />
                ))}
              {productObj.product_image.length == 0 && (
                <img
                  alt="not found"
                  className="w-full object-cover rounded-lg h-[228px]"
                  src={notFoundImage}
                />
              )}
            </Slider>
          </div>
          {
            // <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-[#9a6de1]">
            //   <AiFillHeart className=" text-[#fffdfd] cursor-pointer text-[2.2rem] hover:text-[#fda9a9]" />
            // </div>
          }
        </div>
        <div className="card-info flex items-center gap-[0.5rem] mb-[1rem]">
          <Avatar
            style={{
              fontSize: "2rem",
            }}
            alt={productObj.Profile.profile_name}
            src={
              productObj.Profile?.profile_avatar
                ? productObj.Profile?.profile_avatar
                : null
            }
          >
            {productObj.Profile.profile_name?.at(0)}
          </Avatar>
          <div className="flex flex-col ">
            <span className="font-bold line-clamp-1 ">{productObj.name}</span>
            <span className=" font-light line-clamp-1">
              @{productObj.Profile.profile_name}
            </span>
          </div>
        </div>
        <div className="card-price mb-[1rem]  text-[1.6rem]">
          <span className="text-[#9a6de1]">Price</span>
          <div className="flex gap-[1rem] font-bold justify-between">
            <span>20 Sold</span>
            <span>{productObj.price} USD</span>
          </div>
        </div>
        <div className="btn-product-action">
          {
            // <Button
            //   onClick={handleShowModalDetail}
            //   style={{
            //     color: "black",
            //     background: "white",
            //     border: "1px solid var(--primary-color)",
            //     borderRadius: "8px",
            //     MozBorderRadius: "8px",
            //     WebkitBorderRadius: "8px",
            //     textTransform: "capitalize",
            //   }}
            // >
            //   <span className="text-[1.3rem]">View details</span>
            // </Button>
          }
          {arrayBtn &&
            arrayBtn.map((btn) => (
              <Button
                key={btn.pos}
                onClick={(e) => {
                  btn.handle(productObj);
                }}
                style={{
                  color: ` ${btn.pos ? "white" : "var(--primary-color)"}`,
                  background: ` ${btn.pos ? "var(--primary-color)" : "white"}`,
                  borderRadius: "8px",
                  MozBorderRadius: "8px",
                  WebkitBorderRadius: "8px",
                  textTransform: "capitalize",
                }}
              >
                <span className=" text-[1.3rem]">{btn.text}</span>
              </Button>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
