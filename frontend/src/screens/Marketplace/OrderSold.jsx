import React, { useEffect } from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { getAllOrderSold } from "../../redux/product/productSaga";
import { useDispatch, useSelector } from "react-redux";
function OrderSold() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const getOrderSold = useSelector((state) => state.product.getOrderSold);
  const handleActionShipping = () => {
    console.log("shipping");
  };
  useEffect(() => {
    getAllOrderSold(accessToken, refreshToken,dispatch);
  }, []);
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
      <MarketPlaceLeftBar />
      <OrderTableScreen
        orderLine={getOrderSold}
        actionBtns={[{ text: "Shipping", handle: handleActionShipping }]}
      />
    </div>
  );
}

export default OrderSold;
