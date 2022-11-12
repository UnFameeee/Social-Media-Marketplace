import React from "react";
import { Modal, Avatar, Button, IconButton } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import macbook_example from "../../assets/macbook.jpeg";
import ShowMoreText from "react-show-more-text";
import "./ProductCard.scss";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MUI from "../../components/MUI";

//#region media responsive
const ResponSiveDiv = styled.div`
  .productCartDetailModal {
    display:none;
  }
  @media only screen and (max-width: 820px) {
    .productCartDetailModal {
      display: flex;
      .image-wrapper {
        flex: 1;
      }
      .info-wrapper {
        flex: 1;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .productCartDetailModal {
      display: block;
  }
`;
//#endregion
function ProductCartDetailModal(props) {
  const userData = useSelector((state) => state.auth.user.userData);
  const closeModal = () => {
    props.setShowModal(false);
  };
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 822) {
        props.setShowModal(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <Modal open={props.showModal} onClose={closeModal}>
      <ResponSiveDiv>
        <div className="productCartDetailModal border-[1px] border-gray-400 rounded-xl gap-[2rem] fixed p-[2rem] top-[50%] left-[50%] w-full overflow-y-scroll bg-white translate-x-[-50%] translate-y-[-50%]">
          <div className="image-wrapper relative flex items-center justify-center">
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
            <MUI.BetterIconButton onClick={closeModal} style={{position:'absolute', top:'-2rem',right:'-2rem'}}>
              <CloseIcon style={{fontSize:'3rem'}} />
            </MUI.BetterIconButton>
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
            <div className="card-description text-justify mb-[0.5rem] max-h-[120px] overflow-y-scroll ">
              <ShowMoreText
                lines={5}
                more="Show more"
                less="Show less"
                anchorClass="show-more-less-clickable"
                expanded={false}
                width={0}
                truncatedEndingComponent={"... "}
              >
                ☎️Liên lạc với chúng tôi 👉🏾👉🏾 Địa chỉ : 🏠CN1: Số 97 Lê Đức Thọ
                - Phường 7 - Gò Vấp - TP.HCM 🏠CN2: Số 55 Nguyễn Thiện Thuật -
                P2 -Q3 - TP.HCM 🏠CN3: Số 1140 Kha Vạn Cân - P Linh Chiểu -TP
                Thủ Đức ⛔️Chính sách Bảo Hành : 👉🏾 Bao đổi 1 đổi 1 trong 15
                ngày sử dụng 👉🏾 Bảo hành 6 tháng PHẦN CỨNG ( Nhiều nơi đăng bảo
                hành 12 tháng nhưng chỉ BH phần mềm thôi ) 👉🏾 Hỗ trợ phần mềm
                trọn đời máy
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
                  textTransform: "capitalize",
                }}
              >
                <span className=" text-[1.3rem]">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </ResponSiveDiv>
    </Modal>
  );
}

export default ProductCartDetailModal;
