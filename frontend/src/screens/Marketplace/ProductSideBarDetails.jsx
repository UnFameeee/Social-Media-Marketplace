import React, { useState } from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import "./ProductCard.scss";
import { useEffect } from "react";
import cart_empty_image from "../../assets/cart_empty.png";
import styled from "styled-components";
const ResponSiveDiv = styled.div`
  @media screen and (max-width: 1401px) {
    display: none;
  }
`;
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
function ProductSideBarDetails() {
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1401x)").matches
  );
  const userData = useSelector((state) => state.auth.user.userData);
  console.log(matches);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomNum = randomNumberInRange(200, 350);
  return (
    <>
      <ResponSiveDiv>
        <div className="card-Product card-product-detail bg-white shadow-md p-[0.5rem]">
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                displayPrint: "flex",
              }}
              style={{}}
            >
              <TabList onChange={handleChange}>
                <Tab className="cart flex-1" label="Cart" value="1" />
                <Tab
                  className="brief-details flex-1 uppercase"
                  label="Brief Details"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
             { 
              // <img src={cart_empty_image} alt="" />
              // <div className="w-full text-center text-[2.5rem]">
              //   <span>Your cart is still empty</span>
              // </div>
            }
             { true && <ul className="cart-list flex flex-col gap-[1rem] h-[50rem] overflow-y-scroll ">
                {[
                  ...Array.from({ length: 5 }, () =>
                    randomNumberInRange(100, 250)
                  ),
                ].map((index) => (
                  <li
                    key={index}
                    className="cart-item relative flex gap-[1.2rem] p-[1rem] rounded-xl border-[0.5px] border-gray-400"
                  >
                    <img
                      src={`https://source.unsplash.com/random/300x${
                        randomNum * index
                      }/?macbook`}
                      alt=""
                      className="w-[8rem] h-[8rem] rounded-xl"
                    />
                    <div className="cart-item-info w-full overflow-hidden">
                      <span className="name line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo quam nihil modi aspernatur a odio, officia qui
                      </span>
                      <div className="cart-item-info-price flex items-center">
                        <div className="flex-1 flex gap-[1.2rem] items-center">
                          <span className="text-[1.5rem] font-light">999$</span>
                          <span>x</span>
                          <input
                            className="border-[1px] rounded-lg outline-none border-gray-300 w-[5rem]"
                            type="number"
                            defaultValue={1}
                          />
                        </div>
                        <div className="text-[2rem]">
                          <span>$1888</span>
                        </div>
                      </div>
                    </div>
                    <RemoveCircleIcon className="absolute cursor-pointer text-red-600" style={{ fontSize:'2.4rem', top:'0',right:'0'}} />
                  </li>
                ))}
              </ul>}
            </TabPanel>
            <TabPanel value="2">
              <div className="card-image relative mb-[1rem]">
                <img
                  className="w-full h-[30rem] rounded-lg brief-detail-img"
                  src={`https://source.unsplash.com/random/1000x902/?macbook`}
                  alt=""
                />
                <div className=" absolute  top-[1rem] right-[1rem] p-[0.5rem] rounded-md bg-primary-color">
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
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat doloribus illo quia, nemo aut eius suscipit accusamus.
                  Laudantium perspiciatis ipsa fuga ab minima labore accusamus
                  totam, officia reprehenderit provident dolore magni, quisquam
                  a cumque distinctio saepe vero nam laborum facilis ut
                  laboriosam beatae. Quidem impedit a obcaecati minus rem
                  quibusdam? Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Officia odit doloribus ut, molestiae nisi voluptatem
                  voluptas architecto debitis eligendi! Officiis dolore eveniet
                  ea itaque molestias odit reiciendis veritatis possimus nobis
                  quidem doloremque, atque nesciunt expedita quod illo numquam
                  fugiat sunt amet laboriosam ad. Sapiente cumque, rem quisquam
                  reiciendis exercitationem sed ut, beatae quae reprehenderit
                  perferendis architecto natus magnam numquam voluptatibus! Quos
                  odit facere exercitationem nostrum illum, delectus velit sed,
                  et libero fugit deleniti odio quaerat? Libero, expedita. Optio
                  dolor corporis ut qui dolorem harum pariatur officia,
                  provident quasi molestiae tempora adipisci fugit modi amet
                  ipsam! Beatae porro repellendus, suscipit esse eveniet minima
                  vitae nisi officia obcaecati sit vero nemo commodi aspernatur
                  reprehenderit eum, autem voluptas fuga quae iure accusantium
                  cumque aut quisquam atque nulla. Quas ullam, veniam optio
                  delectus soluta temporibus quos officia quidem autem, quia
                  nobis error. Neque accusantium reiciendis facere tenetur
                  provident? Veniam corrupti, in libero officiis soluta minus
                  molestias exercitationem commodi odit similique porro
                  assumenda consequuntur repellendus odio nihil ex esse qui
                  rerum, ut doloremque? Excepturi provident adipisci expedita,
                  delectus aliquam pariatur unde, ipsa, enim nostrum ab
                  temporibus vero! Porro, fugiat voluptatem voluptas minima
                  quidem magni pariatur aperiam odio amet dignissimos eos
                  perferendis quas adipisci facilis nisi rerum repellendus
                  temporibus tempora nihil, quasi ullam delectus. Itaque et
                  omnis optio natus labore temporibus pariatur incidunt, animi
                  eos. Cum ad odit magnam, fugiat praesentium ex adipisci quis
                  perferendis, ut, suscipit qui! Dicta nam molestias quasi ab,
                  corrupti in animi, nesciunt iusto quibusdam necessitatibus vel
                  numquam voluptatem, perspiciatis cupiditate quam officia
                  dolorum vitae eveniet odio adipisci cum itaque dolores
                  quaerat! Esse, beatae. Autem unde odit, animi earum quia nihil
                  distinctio dolore commodi eveniet eum placeat nesciunt. Nam
                  error praesentium repellendus dolores sed laboriosam nostrum
                  qui in eum nobis laudantium, atque sit quos id magni animi
                  dicta placeat sunt incidunt nulla libero labore! Inventore
                  rerum asperiores, eos minus quae ratione dolore nulla
                  blanditiis molestias eum assumenda corrupti tempora quas est
                  explicabo laborum cum, suscipit fuga quos! Assumenda
                  temporibus voluptates, ad, consequuntur nobis veritatis
                  quaerat necessitatibus, et nesciunt dolorum veniam ex
                  consequatur. Repellat, voluptatibus ad. Neque incidunt unde
                  quidem numquam autem inventore obcaecati itaque! Molestiae
                  asperiores esse ex exercitationem cum consectetur, ut omnis
                  dolorum temporibus doloribus vero sequi dolores repellendus
                  minima. Facere, commodi totam accusantium quis modi dolorum?
                  Consequatur voluptatem minus, eaque sit voluptatibus
                  dignissimos totam obcaecati vitae, voluptates quis distinctio!
                  Ex maxime fugit, facere mollitia dolorem placeat enim
                  consectetur expedita unde dolore similique qui veritatis,
                  earum ratione. Et quam iste accusantium sequi fugit accusamus
                  saepe doloremque itaque quas eum hic ad exercitationem,
                  mollitia ex modi deserunt similique consequuntur! Earum
                  architecto sint libero, consequuntur eaque exercitationem
                  debitis, facilis neque aspernatur mollitia asperiores vero
                  magni ullam totam! Eum nobis quo vel tempora nulla dolor
                  temporibus pariatur obcaecati corrupti. Dolorem, nostrum
                  nulla! Commodi tempore neque, cumque ipsum laborum fugiat
                  perferendis esse quia maxime! Molestias error, numquam nobis
                  cupiditate ratione iste veniam accusamus nemo eaque, ipsum
                  pariatur culpa cumque, repellat deleniti deserunt cum neque
                  similique sint nam illo assumenda minima nisi tempora.
                  Consectetur, ab eaque?
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
                    color: "black",
                    background: "white",
                    border: "1px solid var(--primary-color)",
                    borderRadius: "0px 8px 0px 8px",
                    MozBorderRadius: "0px 8px 0px 8px",
                    WebkitBorderRadius: "0px 8px 0px 8px",
                    flex: "1",
                  }}
                >
                  <span className="w-full">View details</span>
                </Button>
                <Button
                  style={{
                    color: "white",
                    background: "var(--primary-color)",
                    borderRadius: "0px 8px 0px 8px",
                    MozBorderRadius: "0px 8px 0px 8px",
                    WebkitBorderRadius: "0px 8px 0px 8px",
                    flex: "1",
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
          >
            Proceed Check Out
          </Button>
        </div>
      </ResponSiveDiv>
    </>
  );
}

export default ProductSideBarDetails;
