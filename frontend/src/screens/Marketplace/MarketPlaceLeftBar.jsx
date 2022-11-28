import React, { useState, useMemo } from "react";
import { Avatar, Button, Box, Typography, TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AiFillHeart } from "react-icons/ai";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch, useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import "./ProductCard.scss";
import cart_empty_image from "../../assets/cart_empty.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SellIcon from "@mui/icons-material/Sell";
import MUI from "../../components/MUI/index";
import { Helper } from "../../utils/Helper";
import notFoundImage from "../../assets/noimage_1.png";
import nothingsToSeedImage from "../../assets/nothing--to-see-here.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllShoppingCartList } from "../../redux/apiRequest";
import { useEffect } from "react";
import { removeProductFromListCartWithoutPagingRequest } from "../../redux/product/productSaga";
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
function MarketPlaceLeftBar({ handleOpenModalCreate, ...props }) {
  const [value, setValue] = React.useState("2");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const settings = useMemo(() => {
    var result = {
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
    return result;
  });
  const isShoppingActive = useMemo(() => {
    var result = Helper.checkURL("shopping", {}, true);
    return result;
  });
  const isSellingActive = useMemo(() => {
    var result = Helper.checkURL("selling", {}, true);
    return result;
  });
  const getProductDetail = useSelector(
    (state) => state.product.getProductDetail.data
  );
  const getShoppingCartList = useSelector(
    (state) => state.product.getListCartWithoutPaging.data
  );
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
  const removeProductFromCart = (product_id) => {
    removeProductFromListCartWithoutPagingRequest(
      accessToken,
      refreshToken,
      product_id,
      dispatch
    );
  };
  useEffect(() => {
    getAllShoppingCartList(accessToken, refreshToken, dispatch);
  }, []);
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
              {getShoppingCartList && getShoppingCartList.length > 0 ? (
                <ul className="cart-list flex flex-col gap-[1rem]">
                  {getShoppingCartList &&
                    getShoppingCartList.map((cartItem) => (
                      <li
                        key={cartItem.product_id}
                        className="cart-item relative flex items-center gap-[1.2rem] p-[1.2rem] rounded-xl border-[0.5px] border-gray-400"
                      >
                        <img
                          src={cartItem.product_image[0]}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = notFoundImage;
                          }}
                          alt="not found"
                          className="w-[8rem] rounded-xl shadow-md "
                        />
                        <div className="cart-item-info w-full overflow-hidden">
                          <span className="name line-clamp-2 font-semibold">
                            {cartItem.name}
                          </span>
                          <div className="cart-item-info-price flex items-center">
                            <ul className="flex flex-col flex-1">
                              {Object.entries(cartItem.Variation).map(
                                (props) => (
                                  <li
                                    key={props[0]}
                                    className="flex-1 flex gap-[0.5rem] items-center"
                                  >
                                    <span className="text-[1.5rem] capitalize font-bold">
                                      {props[0]}:
                                    </span>
                                    <span
                                      className={` ${
                                        props[0] == "brand"
                                          ? "uppercase"
                                          : "capitalize"
                                      }`}
                                    >
                                      {props[1]}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>

                            <div className="flex flex-col">
                              <span className=" text-primaryColor text-[2rem]">
                                ${cartItem.price}
                              </span>
                              <span>Qty: {cartItem.quantity}</span>
                            </div>
                          </div>
                        </div>
                        <RemoveCircleIcon
                          onClick={(e) =>
                            removeProductFromCart(cartItem.product_id)
                          }
                          className="absolute cursor-pointer text-gray-400"
                          style={{ fontSize: "2.4rem", top: "0", right: "0" }}
                        />
                      </li>
                    ))}
                </ul>
              ) : (
                <>
                  <img src={cart_empty_image} alt="" />
                  <div className="w-full text-center text-[2.5rem]">
                    <span>Your cart is still empty</span>
                  </div>
                </>
              )}
            </TabPanel>
            <TabPanel value="2" className=" max-h-[60vh] overflow-y-scroll">
              {getProductDetail ? (
                <>
                  <div className="slide-show rounded-lg shadow-lg mb-[1rem]">
                    <Slider {...settings}>
                      {getProductDetail?.product_image &&
                        getProductDetail?.product_image.map((image) => (
                          <img
                            key={image.link}
                            alt="not found"
                            className="w-full object-cover rounded-lg h-[250px]"
                            src={image.link}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = notFoundImage;
                            }}
                          />
                        ))}
                      {getProductDetail?.product_image.length == 0 ||
                        (!getProductDetail && (
                          <img
                            alt="not found"
                            className="w-full object-cover rounded-lg h-[250px]"
                            src={notFoundImage}
                          />
                        ))}
                    </Slider>
                  </div>
                  <div className="card-info flex items-center gap-[0.5rem] mb-[1rem]">
                    <Avatar
                      style={{
                        fontSize: "2rem",
                      }}
                      alt={getProductDetail?.Profile.profile_name}
                      src={
                        getProductDetail?.Profile?.avatar
                          ? getProductDetail?.Profile?.avatar
                          : null
                      }
                    >
                      {getProductDetail?.Profile.profile_name.at(0)}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold line-clamp-1">
                        {getProductDetail?.name}
                      </span>
                      <span className=" font-light line-clamp-1">
                        @ {getProductDetail?.Profile.profile_name}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#9a6de1] text-[2.4rem] font-bold">
                    Description
                  </span>
                  <div className="card-description text-justify text-[1.8rem] ">
                    <ShowMoreText
                      lines={5}
                      more="Show more"
                      less="Show less"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      width={0}
                      truncatedEndingComponent={"... "}
                    >
                      {getProductDetail?.description}
                    </ShowMoreText>
                  </div>
                  <span className="text-[#9a6de1] text-[2.4rem] font-bold">
                    Information
                  </span>
                  <ul className="list-variation-info">
                    {getProductDetail?.Variation &&
                      Object.entries(getProductDetail?.Variation).map(
                        (info) => {
                          if (info[0] == "variation_id") return;
                          else
                            return (
                              <li className=" flex gap-[1rem] items-baseline">
                                <span className="font-bold text-[1.9rem] capitalize">
                                  {info[0]}:
                                </span>
                                <span
                                  className={` ${
                                    info[0] == "brand"
                                      ? "uppercase"
                                      : "capitalize"
                                  } text-[1.8rem]`}
                                >
                                  {info[1]}
                                </span>
                              </li>
                            );
                        }
                      )}
                  </ul>
                  <span className="text-[#9a6de1] text-[2.4rem] font-bold">
                    Address
                  </span>
                  <ul className="list-address-info">
                    {getProductDetail?.ShopAddress &&
                      Object.entries(getProductDetail?.ShopAddress).map(
                        (info) => {
                          if (info[0] == "shop_address_id") return;
                          else
                            return (
                              <li className=" flex gap-[1rem] items-baseline">
                                <span className="font-bold text-[1.9rem] capitalize">
                                  {info[0]}:
                                </span>
                                <span
                                  className={` ${
                                    info[0] == "brand"
                                      ? "uppercase"
                                      : "capitalize"
                                  } text-[1.8rem]`}
                                >
                                  {info[1]}
                                </span>
                              </li>
                            );
                        }
                      )}
                  </ul>
                  <div className="card-price mb-[1rem]  text-[2.4rem]">
                    <span className="text-[#9a6de1] font-bold">Price</span>
                    <div className="flex gap-[1rem] font-bold justify-between">
                      <span>20 Sold</span>
                      <span>{getProductDetail?.price} USD</span>
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
                      <span className="w-full">Add to cart</span>
                    </Button>
                  </ResponSiveButtonWrapper>
                </>
              ) : (
                <>
                  <img
                    alt="not found"
                    className="w-full object-cover rounded-lg h-[250px]"
                    src={nothingsToSeedImage}
                  />
                  <span className=" text-center text-[2.2rem]">
                    Please select the product that you want to view
                  </span>
                </>
              )}
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
              textTransform: "capitalize",
              fontSize: "2.4rem",
            }}
            onClick={handleNavigateToCheckOut}
          >
            Proceed Check Out
          </Button>
        </div>
      </div>
    );
  } else if (isSellingActive) {
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
            onClick={(e) => handleOpenModalCreate()}
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
