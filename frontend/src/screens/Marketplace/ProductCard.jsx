import React from "react";
import { Avatar, Button } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled from "styled-components";
const ResponSiveGrid = styled.div`
  @media only screen and (max-width: 868px) {
  }
  @media only screen and (max-width: 1402px) {
  }
  @media only screen and (max-width: 906px) {
  }
`;
function ProductCard() {
  const userData = useSelector((state) => state.auth.user.userData);
  return (
    <ResponSiveGrid>
      <div
        style={{
          background: "#161334",
          borderRadius: "0px 15px 0px 15px",
          MozBorderRadius: "0px 15px 0px 15px",
          WebkitBorderRadius: "0px 15px 0px 15px",
        }}
        className="card-Product  p-[1rem] text-white"
      >
        <div className=" relative mb-[1rem]">
          <img
            style={{
              borderRadius: "0px 20px 0px 20px",
              MozBorderRadius: "0px 20px 0px 20px",
              WebkitBorderRadius: "0px 20px 0px 20px",
              border: "0px solid #000000",
            }}
            className="w-full h-[20rem] rounded-lg"
            src="https://source.unsplash.com/random/1423x1406/?Games"
            alt=""
          />
          <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-gray-400">
            <AiFillHeart className=" text-white cursor-pointer text-[2.2rem] hover:text-red-600" />
          </div>
        </div>
        <div className="flex items-center gap-[1rem] mb-[1rem]">
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
            <span>Product name</span>
            <span className=" font-light">Nguyễn Hoàng Hai Dụ</span>
          </div>
        </div>
        <span>Price</span>
        <div className=" flex gap-[1rem] justify-between mb-[1rem]">
          <span>20 Sold</span>
          <span>365 USD</span>
        </div>
        <div className="flex h-[3rem] justify-around gap-0 text-[1.5rem]">
          <button
            className=" p-[0.5rem] text-[#daf70a] flex items-center"
            style={{
              color: "#daf70a",
              background: "#161334",
              border: "1px solid #daf70a ",
              borderRadius: "0px 8px 0px 8px",
              MozBorderRadius: "0px 8px 0px 8px",
              WebkitBorderRadius: "0px 8px 0px 8px",
            }}
          >
            <span>View details</span>
          </button>
          <button
            className=" p-[0.5rem] flex items-center"
            style={{
              color: "#161334 ",
              background: "#daf70a",
              borderRadius: "0px 8px 0px 8px",
              MozBorderRadius: "0px 8px 0px 8px",
              WebkitBorderRadius: "0px 8px 0px 8px",
            }}
          >
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </ResponSiveGrid>
  );
}

export default ProductCard;
