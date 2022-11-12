import React from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import { Tooltip, Pagination, Typography, Fab } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductCard from "./ProductCard";
import styled from "styled-components";
const ResponSiveDiv = styled.div`
  .fab-btn-check-out{
    display:none;
  }
  .product-container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    display: grid;
    gap: 10px;
  }
  @media only screen and (max-width: 1780px) {
    .product-container {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media only screen and (max-width: 1510px) {
    .product-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media only screen and (max-width: 1252px) {
    .product-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-content: center;
    }
  }
  @media only screen and (max-width: 958px) {
    .product-container {
      grid-template-columns: repeat(1, minmax(0, 0.8fr));
      justify-content: center;
    }
  }
  @media only screen and (max-width: 820px) {
    .product-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-content: center;
    }
    .ProductSideBarDetails {
      display: none;
    }
    .fab-btn-check-out{
      display:block;
    }
    .ThreeColumns {
      padding-left: 1%;
      padding-right: 1%;
    }
  }
  @media only screen and (max-width: 508px) {
    .product-container {
      grid-template-columns: repeat(1, minmax(0, 0.8fr));
      justify-content: center;
    }
  }
`;
function Marketplace() {
  const userData = useSelector((state) => state.auth.user.userData);
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = randomNumberInRange(1400, 1050);
  return (
    <ResponSiveDiv>
      <ThreeColumns
        className="ThreeColumns pr-[1%] pl-[430px] pt-6"
        rightBarConfig={{
          marketplace: true,
        }}
      >
        <div className="main-market-place mb-[2rem] rounded-xl h-full p-[1.5rem] shadow-2xl ">
          <Fab className="fab-btn-check-out" color="primary" aria-label="add" style={{background:'var(--primary-color)',top:'50%',position:'fixed'}} >
            <ShoppingCartCheckoutIcon style={{fontSize:'2.5rem'}} />
          </Fab>
          <div className="slide-show">
            <Slider {...settings} className="">
              {[
                ...Array.from({ length: 5 }, () =>
                  randomNumberInRange(1400, 1050)
                ),
              ].map((index) => (
                <div key={index}>
                  <img
                    className="h-[300px] w-full object-cover rounded-xl"
                    src={`https://source.unsplash.com/random/1000x${
                      randomNum * index
                    }/?3D Renders`}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="product-container mb-[1rem]">
            {[...Array(15)].map((index) => (
              <ProductCard key={index} />
            ))}
          </div>
          <div className="Pagination float-right">
            <Typography>Page: {page}</Typography>
            <Pagination
              page={page}
              onChange={handleChange}
              count={11}
              defaultPage={1}
              siblingCount={0}
              variant="outlined"
              size="large"
            />
          </div>
        </div>
      </ThreeColumns>
    </ResponSiveDiv>
  );
}

export default Marketplace;
