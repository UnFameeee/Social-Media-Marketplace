import React, { useState } from "react";
import { Avatar, Button, Modal } from "@mui/material";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import "./ProductCard.scss";
import styled from "styled-components";
import ProductCartDetailModal from "./ProductCartDetailModal";
import macbook_example from "../../assets/macbook.jpeg";
function ProductCard({ arrayBtn, ...props }) {
  const userData = useSelector((state) => state.auth.user.userData);
  const [showModal, setShowModal] = useState(false);

  const handleShowModalDetail = () => {
    if (window.innerWidth <= 822) {
      setShowModal(true);
    }
  };
  return (
    <>
      <ProductCartDetailModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="card-Product card-product-normal shadow-md  p-[1.5rem] ">
        <div className="card-image relative mb-[1rem]">
          <img
            className="w-full rounded-lg shadow-lg"
            src={macbook_example}
            alt=""
          />
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
            alt={userData.profile.profile_name}
            src={
              userData.profile?.picture
                ? JSON.parse(userData.profile?.picture)
                : null
            }
          >
            {userData.profile.profile_name?.at(0)}
          </Avatar>
          <div className="flex flex-col ">
            <span className="font-bold line-clamp-1 ">
              Product name Lorem ipsum dolor sit amet.
            </span>
            <span className=" font-light line-clamp-1">
              @Nguyễn Hoàng Hai Dụ
            </span>
          </div>
        </div>
        <div className="card-price mb-[1rem]  text-[1.6rem]">
          <span className="text-[#9a6de1]">Price</span>
          <div className="flex gap-[1rem] font-bold justify-between">
            <span>20 Sold</span>
            <span>365 USD</span>
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
                onClick={btn.handle}
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
