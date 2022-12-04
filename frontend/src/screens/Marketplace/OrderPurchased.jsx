import React from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { useEffect } from "react";
import {  getAllOrderPurchased, receiveOrderPurchasedRequest } from "../../redux/product/productSaga";
import { useDispatch, useSelector } from "react-redux";
function OrderPurchased() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const getOrderPurchased = useSelector(
    (state) => state.product.getOrderPurchased
  );
  const handleActionReceive = (order_line_id) => {
    receiveOrderPurchasedRequest(accessToken, refreshToken,order_line_id, dispatch)
  };
  
  useEffect(() => {
    getAllOrderPurchased(accessToken, refreshToken, dispatch);
  }, []);
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
      <MarketPlaceLeftBar />
      <OrderTableScreen
        orderLine={getOrderPurchased}
        actionBtns={[
          { text: "Receive", handle: handleActionReceive },
        ]}
      />
    </div>
  );
}

export default OrderPurchased;
