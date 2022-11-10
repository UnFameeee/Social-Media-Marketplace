import React from "react";
import { Avatar, Button } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./ProductCard.scss";
import styled from "styled-components";
const ResponSiveGrid = styled.div`
  @media only screen and (max-width: 868px) {
  }
  @media only screen and (max-width: 1402px) {
  }
  @media only screen and (max-width: 906px) {
  }
`;
const ResponSiveButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  font-size: 1.5rem;
  @media only screen and (max-width: 1402px) {
    flex-direction: column;
  }
`;
function ProductCard() {
  const userData = useSelector((state) => state.auth.user.userData);
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = randomNumberInRange(800,1050)
  return (
    <ResponSiveGrid>
      <div className="card-Product card-product-normal shadow-md  p-[1rem] ">
        <div className="card-image relative mb-[1rem]">
          <img
            className="w-full h-[25rem] rounded-lg"
            src={`https://source.unsplash.com/random/1000x${randomNum}/?macbook`}
            alt=""
          />
          <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-[#9a6de1]">
            <AiFillHeart className=" text-[#fffdfd] cursor-pointer text-[2.2rem] hover:text-[#fda9a9]" />
          </div>
        </div>
        <div className="card-info flex items-center gap-[0.5rem] mb-[1rem]">
          <Avatar
            style={{
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
          <div className="flex flex-col">
            <span className="font-bold">Product name</span>
            <span className=" font-light">@Nguyễn Hoàng Hai Dụ</span>
          </div>
        </div>
        <div className="card-price mb-[1rem]  text-[1.6rem]">
          <span className="text-[#9a6de1]">Price</span>
          <div className="flex gap-[1rem] font-bold justify-between">
            <span>20 Sold</span>
            <span>365 USD</span>
          </div>
        </div>
        <ResponSiveButtonWrapper>
        <Button
        style={{
          color: "black",
          background: "white",
          border: "1px solid var(--primary-color)",
          borderRadius: "0px 8px 0px 8px",
          MozBorderRadius: "0px 8px 0px 8px",
          WebkitBorderRadius: "0px 8px 0px 8px",
        }}
      >
        <span className="text-[1.3rem]">View details</span>
      </Button>
      <Button
        style={{
          color: "white",
          background: "var(--primary-color)",
          borderRadius: "0px 8px 0px 8px",
          MozBorderRadius: "0px 8px 0px 8px",
          WebkitBorderRadius: "0px 8px 0px 8px",
        }}
      >
        <span className=" text-[1.3rem]">Add to cart</span>
      </Button>
        </ResponSiveButtonWrapper>
      </div>
    </ResponSiveGrid>
  );
}

export default ProductCard;
