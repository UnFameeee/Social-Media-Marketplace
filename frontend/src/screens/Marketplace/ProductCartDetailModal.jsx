import React from "react";
import { Modal, Avatar, Button } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import macbook_example from "../../assets/macbook.jpeg";
import ShowMoreText from "react-show-more-text";
import "./ProductCard.scss";
import { useSelector } from "react-redux";
function ProductCartDetailModal(props) {
  const userData = useSelector((state) => state.auth.user.userData);
  const closeModal = () => {
    props.setShowModal(false);
  };
  return (
    <Modal open={props.showModal} onClose={closeModal}>
      <div className="productCartDetailModal border-[1px] border-gray-400 rounded-lg gap-[2rem] fixed p-[2rem] top-[50%] left-[50%] w-full overflow-y-scroll bg-white translate-x-[-50%] translate-y-[-50%]">
        <div className="image-wrapper">
          <div className="card-image relative mb-[1rem]">
            <img
              className="w-full max-h-[300px] rounded-lg shadow-md  brief-detail-img object-scale-down"
              src={macbook_example}
              alt=""
            />
            <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-primary-color">
              <AiFillHeart className=" text-[#fffdfd] cursor-pointer text-[2.2rem] hover:text-[#fda9a9]" />
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          <div className="card-info flex items-center gap-[0.5rem] mb-[0.5rem]">
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
              <span className="font-bold line-clamp-1">Product name</span>
              <span className=" font-light line-clamp-1">
                @Nguyễn Hoàng Hai Dụ
              </span>
            </div>
          </div>
          <div className="card-description text-justify mb-[0.5rem] ">
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              expanded={false}
              width={0}
              truncatedEndingComponent={"... "}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
              doloribus illo quia, nemo aut eius suscipit accusamus. Laudantium
              perspiciatis ipsa fuga ab minima labore accusamus totam, officia
              reprehenderit provident dolore magni, quisquam a cumque distinctio
              saepe vero nam laborum facilis ut laboriosam beatae. Quidem
              impedit a obcaecati minus rem quibusdam? Lorem ipsum, dolor sit
            </ShowMoreText>
          </div>
          <div className="card-price mb-[0.5rem] text-[2rem]">
            <span className="text-[#9a6de1]">Price</span>
            <div className="flex gap-[1rem] font-bold justify-between">
              <span>20 Sold</span>
              <span>365 USD</span>
            </div>
          </div>
          <div className="add-to-cart-btn w-full">
            <Button
              style={{
                width: "100%",
                color: "white",
                background: "var(--primary-color)",
                borderRadius: "8px",
                MozBorderRadius: "8px",
                WebkitBorderRadius: "8px",
              }}
            >
              <span className=" text-[1.3rem]">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductCartDetailModal;
