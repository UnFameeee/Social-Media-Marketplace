import React, { useState, useMemo } from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AiFillHeart, } from "react-icons/ai";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import "./ProductCard.scss";
import cart_empty_image from "../../assets/cart_empty.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SellIcon from "@mui/icons-material/Sell";
import MUI from "../../components/MUI/index";
import { Helper } from "../../utils/Helper";
const ResponSiveButtonWrapper = styled.div`
  display: flex;
  height: 3/5;
  justify-content: space-around;
  gap: 1rem;
  font-size: 1.5rem;
  @media only screen and (max-width: 1600px) {
    flex-direction: column;
  }
`;
function MarketPlaceLeftBar() {
  const userData = useSelector((state) => state.auth.user.userData);
  const [value, setValue] = React.useState("2");
  const navigate = useNavigate();
  const isShoppingActive = useMemo(() =>{
    var result = Helper.checkURL("shopping", {},true);
    return result
  }) 
  const isSellingActive = useMemo(() =>{
    var result = Helper.checkURL("selling", {},true);
    return result
  }) 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNavigateToCheckOut = () => {
    navigate("/marketplace/checkout");
  };
  const handleNavigateToShopping = () => {
    if (!isShoppingActive) {
      navigate("/marketplace/shopping");
    }
  };
  const handleNavigateToSelling = () => {
    if (!isSellingActive) {
      navigate("/marketplace/selling");
    }
  };
  if (isShoppingActive) {
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <div className="navigation flex gap-[0.5rem] flex-col mb-[1rem] p-[0.5rem] bg-gray-100 rounded-3xl shadow-lg">
          <MUI.ButtonWithIcon
            onClick={handleNavigateToShopping}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
              border: isShoppingActive ? "2px solid var(--primary-color)" : 0,
            }}
          >
            <ShoppingBag
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Shopping</span>
          </MUI.ButtonWithIcon>
          <MUI.ButtonWithIcon
            onClick={handleNavigateToSelling}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
              border: isSellingActive ? "2px solid var(--primary-color)" : 0,
            }}
          >
            <SellIcon
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Selling</span>
          </MUI.ButtonWithIcon>
        </div>
        <div className="ProductSideBarDetails card-Product card-product-detail p-0 bg-white shadow-md max-h-[80vh]">
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                displayPrint: "flex",
              }}
              style={{}}
            >
              <TabList
                TabIndicatorProps={{
                  style: {
                    background: "var(--primary-color)",
                  },
                }}
                onChange={handleChange}
              >
                <Tab
                  className="brief-details flex-1"
                  label="Brief Details"
                  value="2"
                  style={{
                    color: "var(--primary-color)",
                    textTransform: "capitalize",
                  }}
                />
                <Tab
                  style={{
                    color: "var(--primary-color)",
                    textTransform: "capitalize",
                  }}
                  className="cart flex-1"
                  label="Cart"
                  value="1"
                />
              </TabList>
            </Box>
            <TabPanel value="1" className=" max-h-[60vh] overflow-y-scroll">
              {false && (
                <>
                  <img src={cart_empty_image} alt="" />
                  <div className="w-full text-center text-[2.5rem]">
                    <span>Your cart is still empty</span>
                  </div>
                </>
              )}

              {true && (
                <ul className="cart-list flex flex-col gap-[1rem]">
                  {[...Array.from({ length: 10 })].map((index) => (
                    <li
                      key={index}
                      className="cart-item relative flex gap-[1.2rem] p-[1.2rem] rounded-xl border-[0.5px] border-gray-400"
                    >
                      <img
                        src={cart_empty_image}
                        alt=""
                        className="w-[8rem] h-[8rem] rounded-xl shadow-md "
                      />
                      <div className="cart-item-info w-full overflow-hidden">
                        <span className="name line-clamp-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Nemo quam nihil modi aspernatur a odio, officia
                          qui
                        </span>
                        <div className="cart-item-info-price flex items-center">
                          <div className="flex-1 flex gap-[1.2rem] items-center">
                            <span className="text-[1.5rem] font-light">
                              999$
                            </span>
                            <span>x</span>
                            <input
                              className="border-[1px] rounded-lg outline-none border-gray-300 w-[5rem]"
                              type="number"
                              defaultValue={1}
                            />
                          </div>
                          <div
                            className="text-[2rem]"
                            style={{ color: "var(--primary-color)" }}
                          >
                            <span>$1888</span>
                          </div>
                        </div>
                      </div>
                      <RemoveCircleIcon
                        className="absolute cursor-pointer text-gray-400"
                        style={{ fontSize: "2.4rem", top: "0", right: "0" }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </TabPanel>
            <TabPanel value="2" className=" max-h-[60vh] overflow-y-scroll">
              <div className="card-image relative mb-[1rem]">
                <img
                  className="w-full h-[30rem] rounded-lg shadow-md  brief-detail-img"
                  src={`https://source.unsplash.com/random/1000x902/?macbook`}
                  alt=""
                />
               { 
                // <div className=" absolute top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-primary-color">
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
                <div className="flex flex-col">
                  <span className="font-bold line-clamp-1">Product name</span>
                  <span className=" font-light line-clamp-1">
                    @Nguyễn Hoàng Hai Dụ
                  </span>
                </div>
              </div>
              <div className="card-description text-justify mb-[1rem] ">
                <ShowMoreText
                  lines={5}
                  more="Show more"
                  less="Show less"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  width={0}
                  truncatedEndingComponent={"... "}
                >
                  olorem placeat enim consectetur expedita unde dolore similique
                  qui veritatis, earum ratione. Et quam iste accusantium sequi
                  fugit accusamus saepe doloremque itaque quas eum hic ad
                  exercitationem, mollitia ex modi deserunt similique
                  consequuntur! Earum architecto sint libero, consequuntur eaque
                  exercitationem debitis, facilis neque aspernatur mollitia
                </ShowMoreText>
              </div>
              <div className="card-price mb-[1rem]  text-[2.4rem]">
                <span className="text-[#9a6de1]">Price</span>
                <div className="flex gap-[1rem] font-bold justify-between">
                  <span>20 Sold</span>
                  <span>365 USD</span>
                </div>
              </div>
              <ResponSiveButtonWrapper>
                <Button
                  style={{
                    color: "var(--primary-color)",
                    background: "white",
                    border: "1px solid var(--primary-color)",
                    borderRadius: "8px",
                    MozBorderRadius: "8px",
                    WebkitBorderRadius: "8px",
                    flex: "1",
                    textTransform: "capitalize",
                  }}
                >
                  <span className="w-full">View details</span>
                </Button>
                <Button
                  style={{
                    color: "white",
                    background: "var(--primary-color)",
                    borderRadius: "8px",
                    MozBorderRadius: "8px",
                    WebkitBorderRadius: "8px",
                    flex: "1",
                    textTransform: "capitalize",
                  }}
                >
                  <span className="w-full">Add to cart</span>
                </Button>
              </ResponSiveButtonWrapper>
            </TabPanel>
          </TabContext>
        </div>
        <div className="wrapper-check-out w-full h-[4.5rem]">
          <Button
            className="w-full h-full"
            style={{
              color: "white",
              background: "var(--primary-color)",
              borderRadius: "0px 0px 15px 15px",
            }}
            onClick={handleNavigateToCheckOut}
          >
            Proceed Check Out
          </Button>
        </div>
      </div>
    );
  }
  else if(isSellingActive){
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <div className="navigation flex gap-[0.5rem] flex-col mb-[1rem] p-[0.5rem] bg-gray-100 rounded-3xl shadow-lg">
          <MUI.ButtonWithIcon
            onClick={handleNavigateToShopping}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
              border: isShoppingActive ? "2px solid var(--primary-color)" : 0,
            }}
          >
            <ShoppingBag
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Shopping</span>
          </MUI.ButtonWithIcon>
          <MUI.ButtonWithIcon
            onClick={handleNavigateToSelling}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
              border: isSellingActive ? "2px solid var(--primary-color)" : 0,
            }}
          >
            <SellIcon
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Selling</span>
          </MUI.ButtonWithIcon>
        </div>
        <div className="manager-selling-btn flex gap-[0.5rem] flex-col mb-[1rem] p-[0.5rem] bg-gray-100 rounded-3xl shadow-lg">
          <MUI.ButtonWithIcon
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
            }}
          >
            <AddCircleIcon
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Create Product</span>
          </MUI.ButtonWithIcon>
        </div>
      </div>
    );
  }
}

export default MarketPlaceLeftBar;
