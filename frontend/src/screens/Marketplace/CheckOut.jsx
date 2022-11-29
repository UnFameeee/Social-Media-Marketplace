import React from "react";
import { Box, Typography, Pagination } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import macbook_example from "../../assets/macbook.jpeg";
import notFoundImage from "../../assets/noimage_1.png";
import cart_empty_image from "../../assets/cart_empty.png";
import NothingToSee from "./NothingToSee";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import MUI from "../../components/MUI";
import {
  changeProductFromListCartWithoutPagingQuantityRequest,
  removeProductFromListCartWithoutPagingRequest,
} from "../../redux/product/productSaga";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
function CheckOut() {
  const [value, setValue] = useState("1");
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(-1);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const getShoppingCartList = useSelector(
    (state) => state.product.getListCartWithoutPaging.data
  );
  const totalPrice = useSelector(
    (state) => state.product.getListCartWithoutPaging.totalPrice
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleRemoveItem = (product_id) => {
    setOpenConfirmRemove(true);
    setDeleteItemId(product_id);
  };
  const handleConfirmDeleteItem = () => {
    if (deleteItemId != -1) {
      removeProductFromListCartWithoutPagingRequest(
        accessToken,
        refreshToken,
        deleteItemId,
        dispatch
      );
      setDeleteItemId(-1);
    }
    setOpenConfirmRemove(false);
  };
  const handleOnChangeQuantity = (e) => {
    let product_id = e.target.name;
    let quantity = e.target.value;
    changeProductFromListCartWithoutPagingQuantityRequest(
      accessToken,
      refreshToken,
      product_id,
      quantity,
      dispatch
    );
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChangeQuantity, 300),
    []
  );
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);
  return (
    <div className="CheckOut pt-[4%] px-[425px]  ">
      <MarketPlaceLeftBar />
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            displayPrint: "flex",
          }}
        >
          <div className="header flex items-center bg-white px-[2rem] mb-[1rem] rounded-md">
            <div className="header-title flex-1">
              <span className=" text-[2.5rem] font-bold">Order Overview</span>
            </div>
            <TabList
              TabIndicatorProps={{
                style: {
                  background: "var(--primary-color)",
                  flex: "1",
                },
              }}
              onChange={handleChange}
            >
              <Tab
                className="brief-details flex-1"
                label="Information"
                value="1"
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                  flex: "1",
                }}
              />
              <Tab
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                }}
                className="cart flex-1"
                label="Payment Details"
                value="2"
              />
              <Tab
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                }}
                className="cart flex-1"
                label="Complete Order"
                value="3"
              />
            </TabList>
          </div>
        </Box>
        <div className=" shadow-lg">
          <TabPanel value="1" sx={{ padding: "1.2rem", background: "white" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "1.8rem" }}>Item</TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Description
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Price
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <MUI.ConfirmDialog
                    modalProps={[openConfirmRemove, setOpenConfirmRemove]}
                    title="Remove Cart Item"
                    actionName="remove this item"
                    confirmAction={handleConfirmDeleteItem}
                  />
                  {getShoppingCartList?.map((item) => (
                    <TableRow
                      key={item.product_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="item"
                        style={{ fontSize: "1.5rem" }}
                      >
                        <div className="flex gap-[1rem]">
                          <div className="card-image mb-[1rem]">
                            {item.product_image?.length > 0 ? (
                              <img
                                className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                                src={item.product_image[0]?.link}
                                alt=""
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = notFoundImage;
                                }}
                              />
                            ) : (
                              <img
                                className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                                src={notFoundImage}
                                alt=""
                              />
                            )}
                          </div>
                          <span className="font-bold line-clamp-2">
                            {item.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
                      >
                        <span className=" line-clamp-3">
                          {item.description}
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "10rem" }}
                      >
                        <div className="w-full">
                          <input
                            defaultValue={item.quantity}
                            min={0}
                            max={9999}
                            name={item.product_id}
                            onChange={debouncedChangeHandler}
                            type="number"
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                      >
                        <span className=" line-clamp-2">{item.price}</span>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                      >
                        <MUI.BetterIconButton
                          onClick={() => handleRemoveItem(item.product_id)}
                        >
                          <DeleteForeverIcon style={{ fontSize: "3rem" }} />
                        </MUI.BetterIconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="total flex flex-col justify-end text-end font-semibold text-[2.2rem] mr-[2rem] ">
              <span>Total</span>
              <span>{totalPrice}$</span>
            </div>
            {
              //   <div className="Pagination mt-[1rem] flex justify-end">
              //   <Typography>Page: {page}</Typography>
              //   <Pagination
              //     page={page}
              //     onChange={handleChangePage}
              //     count={11}
              //     defaultPage={1}
              //     siblingCount={0}
              //     variant="outlined"
              //     size="large"
              //   />
              // </div>
            }
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "1.2rem", background: "white" }}>
            <div className="payment-details-wrapper flex py-[1rem]">
              <div className="summary-order flex-1 px-[2rem]">
                <span className="title-text font-bold text-[2.5rem]">
                  Summary Order
                </span>
                <p className=" max-w-[35rem]">
                  Check your item and select your shipping for better experience
                  order item.
                </p>
                <ul className="flex gap-[1rem] flex-col max-h-[30rem] shadow-md overflow-y-scroll mt-[1rem] list-item-order border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl">
                  {getShoppingCartList?.map((item) => (
                    <li
                      key={item.product_id}
                      className="item-orders flex gap-[1rem] items-center "
                    >
                      <div className="card-image mb-[1rem] rounded-[2rem]">
                        {item.product_image.length > 0 ? (
                          <img
                            className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-md "
                            src={item.product_image[0]?.link}
                            alt=""
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = notFoundImage;
                            }}
                          />
                        ) : (
                          <img
                            className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-md "
                            src={notFoundImage}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="cart-item-info w-full overflow-hidden">
                        <span className="name line-clamp-2 font-semibold">
                          {item.name}
                        </span>
                        <div className="cart-item-info-price flex items-center">
                          <ul className="flex flex-col flex-1">
                            {Object.entries(item.Variation).map(
                              (props, index) => (
                                <li
                                  key={index}
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
                          <div className="cart-item-info-price flex items-center gap-[1rem]">
                            <div className=" flex gap-[1.2rem] items-center">
                              <span className="text-[1.7rem] font-light">
                                ${item.price}
                              </span>
                              <span>x</span>
                              <input
                                className="border-[1px] rounded-lg outline-none border-gray-300 w-[5rem]"
                                type="number"
                                defaultValue={item.quantity}
                                readOnly={true}
                              />
                            </div>
                            <div
                              className="flex-1 text-[2rem]"
                              style={{ color: "var(--primary-color)" }}
                            >
                              <span>${item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <NothingToSee imgH='10rem' imgSrc={cart_empty_image} textSize='1.8rem' text="Your cart is still empty" />
                </ul>
                <ul className="shipping-types mt-[1rem] flex flex-col gap-[1rem]">
                  {[...Array(2)].map((index) => (
                    <li key={index} className="shipping-type ">
                      <span className="shipping-title capitalize font-semibold text-[2rem]">
                        Available shipping methods!
                      </span>
                      <div className="shipping-check-btn flex gap-[1rem] items-center border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl  ">
                        <div className="card-image mb-[1rem] rounded-[2rem]">
                          <img
                            className="w-[10rem] max-h-[7rem] rounded-lg shadow-md object-cover"
                            src={macbook_example}
                            alt=""
                          />
                        </div>
                        <div className="cart-item-info w-full flex gap-[1rem]">
                          <div className="flex flex-col">
                            <span className="name line-clamp-1 font-semibold">
                              Fedex Delivery
                            </span>
                            <span className="text-[1.5rem] line-clamp-1 font-light">
                              Delivery 2-3 days work
                            </span>
                          </div>
                          <div className="cart-item-info-price flex justify-center items-center gap-[1rem]">
                            <div className="flex gap-[1rem]">
                              <span className="font-semibold">Free</span>
                              <input type="radio" name="shipping" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="payment-details flex-1 px-[2rem]">
                <span className="title-payment-details font-bold text-[2.5rem]">
                  Payment Details
                </span>
                <p className=" max-w-[35rem]">
                  Complete your purchase item by providing your payment detail
                  order
                </p>
                <span className="title-payment-details font-bold text-primaryColor text-[2.5rem]">
                  Total: {totalPrice}$
                </span>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: "1.2rem", background: "white" }}>
            <img
              src={`https://source.unsplash.com/random/1920x1200/?congratulations `}
              alt=""
              className="w-full max-h-[60vh] object-cover"
            />
          </TabPanel>
        </div>
      </TabContext>
    </div>
  );
}

export default CheckOut;
