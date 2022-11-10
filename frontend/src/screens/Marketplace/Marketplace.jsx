import React from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import { homeLeftbar } from "../../common/layout/homeLeftbar";
import { Avatar, Pagination, Typography } from "@mui/material";
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
      rightBarConfig={{
        marketplace: true,
      }}
    >
      <div className="main-market-place mb-[2rem] rounded-xl h-full p-[1.5rem] shadow-2xl ">
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
          <ResponSiveGrid>
            {[...Array(15)].map((index) => (
              <ProductCard key={index} />
            ))}
          </ResponSiveGrid>
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
  );
}

export default Marketplace;
