import React from "react";
import { Skeleton } from "@mui/material";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { useEffect } from "react";
import {
  getAllOrderPurchased,
  getAllOrderPurchasedFirstTime,
  receiveOrderPurchasedRequest,
} from "../../redux/product/productSaga";
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
  const isLoadingGetOrderPurchased = useSelector(
    (state) => state.product.getOrderPurchasedFetching.isFetching
  );
  const handleActionReceive = (order_line_id) => {
    receiveOrderPurchasedRequest(
      accessToken,
      refreshToken,
      order_line_id,
      dispatch
    );
  };

  useEffect(() => {
    getAllOrderPurchasedFirstTime(accessToken, refreshToken, dispatch);
  }, []);
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
    <MarketPlaceLeftBar />
      {isLoadingGetOrderPurchased ? (
        <div className="loadingTableSkeleton flex flex-col gap-[0.5rem]">
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="rectangle" sx={{ height: "70rem" }} />
        </div>
      ) : (
        <OrderTableScreen
          orderLine={getOrderPurchased}
          actionBtns={[{ text: "Receive", handle: handleActionReceive }]}
        />
      )}
    </div>
  );
}

export default OrderPurchased;
