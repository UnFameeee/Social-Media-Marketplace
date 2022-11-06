import React from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import TwoColumns from "../../components/Layout/TwoColumns";
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
  gap: 10px;
  @media only screen and (max-width: 1780px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media only screen and (max-width: 1402px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (max-width: 906px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    justify-content: center;
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
      rightBarConfig= {{
        marketplace:true
      }}
    >
      <div className="mb-[2rem] rounded-xl shadow-md  h-full ">
        <div className="slide-show">
          <Slider {...settings} className="">
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1057&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1590126698754-510069860d27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1488&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-[300px] w-full object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1598057076865-c67fefd248d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
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
