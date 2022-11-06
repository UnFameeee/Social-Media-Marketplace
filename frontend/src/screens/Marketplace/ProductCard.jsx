import React from "react";
import { Avatar, Button } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./ProductCard.scss";
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
  height: 3/5;
  justify-content: space-around;
  gap: 1rem;
  font-size: 1.5rem;
  @media only screen and (max-width: 906px) {
    flex-direction: column;
  }
`;
function ProductCard() {
  const userData = useSelector((state) => state.auth.user.userData);
  return (
    <ResponSiveGrid>
      <div className="card-Product card-product-normal  p-[1rem] ">
        <div className="card-image relative mb-[1rem]">
          <img
            className="w-full h-[25rem] rounded-lg"
            src="https://source.unsplash.com/random/1000x900/?Laptop"
            alt=""
          />
          <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-gray-400">
            <AiFillHeart className=" text-white cursor-pointer text-[2.2rem] hover:text-red-600" />
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
          <button className="btn-view-detail w-full p-[0.5rem] flex items-center">
            <span className="w-full">View details</span>
          </button>
          <button className="btn-add-to-cart w-full p-[0.5rem] flex items-center  ">
            <span className="w-full">Add to cart</span>
          </button>
        </ResponSiveButtonWrapper>
      </div>
    </ResponSiveGrid>
  );
}

export default ProductCard;
