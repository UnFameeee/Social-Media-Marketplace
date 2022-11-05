import React from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import { homeLeftbar } from "../../common/layout/homeLeftbar";
import { Avatar, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ProductCard from "./ProductCard";
import styled from "styled-components";
const ResponSiveGrid = styled.div`
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;
  gap:10px;
  @media only screen and (max-width: 1780px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media only screen and (max-width: 1402px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (max-width: 906px) {
     grid-template-columns: repeat(1, minmax(0, 0.7fr));
     justify-content:center;
  }
`;
function Marketplace() {
  const userData = useSelector((state) => state.auth.user.userData);
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: "linear",
  };
  return (
    <ThreeColumns
      className="px-[23%] pt-6 pl-[22%]"
      leftBarConfig={{
        leftBarList: [
          {
            left: (
              <Avatar
                style={{
                  width: "3.6rem",
                  height: "3.6rem",
                  fontSize: "2rem",
                }}
                alt={userData.profile.profile_name}
                src={
                  userData.profile?.picture
                    ? JSON.parse(userData.profile?.picture)
                    : null
                }
              >
                {userData.profile.profile_name?.at(0)}
              </Avatar>
            ),
            middle: userData.profile.profile_name,
            navigate: `profile?id=${userData.profile.profile_id}`,
          },
        ].concat(homeLeftbar),
      }}
    >
      <div className="mb-[2rem] rounded-xl shadow-md  h-full ">
        <div className="slide-show">
          <Slider {...settings} className="">
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1400x1400/?gaming"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1401x1400/?gaming"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1400x1402/?gaming"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1403x1400/?gaming"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1450x1400/?gaming"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://source.unsplash.com/random/1400x1406/?gaming"
                alt=""
              />
            </div>
          </Slider>
        </div>
        <div className="product-container">
          <ResponSiveGrid>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </ResponSiveGrid>
        </div>
      </div>
    </ThreeColumns>
  );
}

export default Marketplace;
