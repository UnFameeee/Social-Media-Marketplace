import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Table,
  Box,
  Tab,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import MUI from "../../components/MUI";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import ClipLoader from "react-spinners/ClipLoader";
import {
  changeProductFromListCartWithoutPagingQuantityRequest,
  createOrder,
  removeProductFromListCartWithoutPagingRequest,
} from "../../redux/product/productSaga";
import { cities } from "../../common/constants/listConstants.js";
import macbook_example from "../../assets/macbook.jpeg";
import notFoundImage from "../../assets/noimage_1.png";
import cart_empty_image from "../../assets/cart_empty.png";
import GHN_Shipping from "../../assets/GHN-shipping-method-En.png";
import GHTK_Shipping from "../../assets/GHTK-shipping-method.jpg";
import NothingToSee from "./NothingToSee";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import PayPalCheckOutButton from "./PayPalCheckOutButton";
import { useNavigate } from "react-router-dom";
function CheckOut() {
  // #region declare variables
  const [value, setValue] = useState("1");
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const userData = useSelector((state) => state.auth.user.userData.profile);

  const [shopAddress, setShopAddress] = useState({
    city: "",
    district: "",
    ward: "",
    detail_address: "",
  });
  const { city, district, ward, detail_address } = shopAddress;
  const shippingMethods = [
    {
      name: "GHN Delivery",
      imageSrc: GHN_Shipping,
    },
    {
      name: "GHTK Delivery",
      imageSrc: GHTK_Shipping,
    },
  ];
  const [shippingMethod, setShippingMethod] = useState(shippingMethods[0].name);
  const isLoadingCreateOrder = useSelector(
    (state) => state.product.createOrder.isFetching
  );
  const [isFormValid, setIsFormValid] = useState(true);
  const [addressValidation, setAddressValidation] = useState({
    city: true,
    district: true,
    ward: true,
    detail_address: true,
  });
  //#endregion
  //#region declare function
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleOnChangeShopAddress = (event) => {
    setShopAddress({ ...shopAddress, [event.target.name]: event.target.value });
    setAddressValidation({...addressValidation,[event.target.name]: event.target.value !=='' ? true: false})
  };
  const handleRemoveItem = (product_id, isReduceQuantityToZero) => {
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
    if (e.target.value == 0) {
      handleRemoveItem(product_id, true);
    } else {
      changeProductFromListCartWithoutPagingQuantityRequest(
        accessToken,
        refreshToken,
        product_id,
        quantity,
        dispatch
      );
    }
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(handleOnChangeQuantity, 300),
    []
  );
  const handleChoseShippingMethod = (newValue) => {
    setShippingMethod(newValue);
  };
  const handlePayment = (method) => {
    if (handleCheckFormIsValid()) {
      setIsFormValid(true);
      let orderLine = [];
      getShoppingCartList.map((item) => {
        orderLine.push({
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
        });
      });
      let paymentObj = {
        total_price: totalPrice,
        order_status: "WAITING FOR PAYMENT",
        PaymentMethod: {
          payment_type: method,
        },
        ShippingAddress: shopAddress,
        OrderLine: orderLine,
      };
      createOrder(accessToken, refreshToken, dispatch, navigate, paymentObj);
    }
  };
  const handleCheckFormIsValid = () => {
    debugger
    if (city === "" || district === "" || ward == "" || detail_address == "") {
      setAddressValidation({
        city: city !== "" ? true : false,
        district: district !== "" ? true : false,
        ward: ward !== "" ? true : false,
        detail_address: detail_address !== "" ? true : false,
      });
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };
  //#endregion
  //#region declare useEffect

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);
  //#endregion
  return (
    <>
      {isLoadingCreateOrder ? (
        <div className="sweet-loading absolute z-30 h-screen w-screen inset-0 items-center flex justify-center">
          <ClipLoader
            color="#9a6de1"
            loading={isLoadingCreateOrder}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : null}
      <div className="CheckOut pt-[4%] px-[430px] rounded-xl   ">
        <MarketPlaceLeftBar />
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              displayPrint: "flex",
            }}
          >
            <div className="min-w-[1060px] header flex items-center bg-white px-[2rem] mb-[1rem] rounded-md">
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
                onChange={handleChangeTab}
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
          <div className=" shadow-lg min-w-[1060px]">
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
                              min={1}
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
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "1.2rem", background: "white" }}>
              <div className="payment-details-wrapper flex py-[1rem]">
                <div className="summary-order flex-1 px-[2rem]">
                  <span className="title-text font-bold text-[2.5rem]">
                    Summary Order
                  </span>
                  <p>
                    Check your item and select your shipping for better
                    experience order item.
                  </p>
                  <ul className="flex gap-[1rem] flex-col max-h-[30rem] shadow-md overflow-y-scroll mt-[1rem] list-item-order border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl">
                    {getShoppingCartList?.length > 0 ? (
                      getShoppingCartList?.map((item) => (
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
                      ))
                    ) : (
                      <NothingToSee
                        imgH="10rem"
                        imgSrc={cart_empty_image}
                        textSize="1.8rem"
                        text="Your cart is still empty"
                      />
                    )}
                  </ul>
                  <ul className="shipping-types mt-[1rem] flex flex-col gap-[1rem]">
                    <span className="shipping-title capitalize font-semibold text-[2rem]">
                      Available shipping methods!
                    </span>
                    {shippingMethods.map((ship, index) => (
                      <li key={index} className="shipping-type ">
                        <div className="shipping-check-btn flex gap-[1rem] items-center border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl  ">
                          <div className="card-image mb-[1rem] rounded-[2rem]">
                            <img
                              className="w-[10rem] h-[5rem] rounded-lg shadow-md object-contain"
                              src={ship.imageSrc}
                              alt=""
                            />
                          </div>
                          <div className="cart-item-info w-full flex gap-[1rem]">
                            <div className="flex flex-col">
                              <span className="name line-clamp-1 font-semibold">
                                {ship.name}
                              </span>
                              <span className="text-[1.5rem] line-clamp-1 font-light">
                                Delivery 2-3 days work
                              </span>
                            </div>
                            <div className="cart-item-info-price flex justify-center items-center gap-[1rem]">
                              <div className="flex gap-[1rem]">
                                <span className="font-semibold">Free</span>
                                <input
                                  type="radio"
                                  name="shipping"
                                  checked={ship.name === shippingMethod}
                                  onChange={() =>
                                    handleChoseShippingMethod(ship.name)
                                  }
                                />
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
                  <p>
                    Complete your purchase item by providing your payment detail
                    order
                  </p>
                  <div className="fourth-col-info flex flex-col gap-[2rem] flex-1">
                    <TextField
                      variant="standard"
                      defaultValue="Shipping Address for Pay With Cash"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <FormControl className="City">
                      <InputLabel id="select-label-city">City</InputLabel>
                      <Select
                        error={!addressValidation.city}
                        value={city}
                        name="city"
                        labelId="select-label-city"
                        label="City"
                        onChange={handleOnChangeShopAddress}
                      >
                        {cities &&
                          cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              <span className="capitalize">{city}</span>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl className="District">
                      <InputLabel id="select-label-district">
                        District
                      </InputLabel>
                      <Select
                        error={!addressValidation.district}
                        value={district}
                        name="district"
                        labelId="select-label-district"
                        label="District"
                        onChange={handleOnChangeShopAddress}
                      >
                        {cities &&
                          cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              <span className="capitalize">{city}</span>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl className="Ward">
                      <InputLabel id="select-label-ward">Ward</InputLabel>
                      <Select
                        error={!addressValidation.ward}
                        value={ward}
                        name="ward"
                        labelId="select-label-ward"
                        label="Ward"
                        onChange={handleOnChangeShopAddress}
                      >
                        {cities &&
                          cities.map((city) => (
                            <MenuItem key={city} value={city}>
                              <span className="capitalize">{city}</span>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl className="Detail Address">
                      <TextField
                        error={!addressValidation.detail_address}
                        helperText={
                          !isFormValid ? "This field is required" : ""
                        }
                        value={detail_address}
                        label="Detail Address"
                        name="detail_address"
                        multiline
                        rows={2}
                        variant="outlined"
                        onChange={handleOnChangeShopAddress}
                      />
                    </FormControl>
                  </div>
                  <div className="payment-calc flex flex-col gap-[0.5rem] my-[0.5rem]">
                    <span className="title-payment-details font-bold text-primaryColor text-[1.7rem]">
                      Merchandise Subtotal: {totalPrice}$
                    </span>
                    <span className="title-payment-details font-bold text-primaryColor text-[1.7rem]">
                      Shipping Subtotal: 0$ ({shippingMethod})
                    </span>
                    <span className="title-payment-details font-bold text-primaryColor text-[1.7rem]">
                      Total Payment: {totalPrice}$
                    </span>{" "}
                  </div>
                  <div className="flex flex-col gap-[1rem]">
                    <MUI.Button
                      style={{ borderRadius: "20px" }}
                      disabled={getShoppingCartList?.length == 0}
                      onClick={() => handlePayment("CASH")}
                    >
                      Pay With Cash
                    </MUI.Button>
                    <PayPalCheckOutButton
                      handlePayPalApprove={handlePayment}
                      disable={getShoppingCartList?.length == 0}
                      product={{
                        profile_id: userData.profile_id,
                        totalPrice: totalPrice,
                      }}
                      // handleCheckFormIsValid= {handleCheckFormIsValid}
                    />
                  </div>
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
    </>
  );
}

export default CheckOut;
