import React, { useEffect } from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { Skeleton } from "@mui/material";
import {
  deleteOrderSoldRequest,
  getAllOrderPurchasedFirstTime,
  getAllOrderSold,
  getAllOrderSoldFirstTime,
  paidOrderSoldRequest,
  shippingOrderSoldRequest,
} from "../../redux/product/productSaga";
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
  const isLoadingGetOrderSold = useSelector(
    (state) => state.product.getOrderSoldFetching.isFetching
  );
  const handleActionShipping = (order_line_id) => {
    shippingOrderSoldRequest(
      accessToken,
      refreshToken,
      order_line_id,
      dispatch
    );
  };
  const handleActionPaid = (order_line_id) => {
    paidOrderSoldRequest(accessToken, refreshToken, order_line_id, dispatch);
  };
  const handleActionDelete = (order_line_id) => {
    deleteOrderSoldRequest(accessToken, refreshToken, order_line_id, dispatch);
  };
  useEffect(() => {
    getAllOrderSoldFirstTime(accessToken, refreshToken, dispatch);
  }, []);
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
      <MarketPlaceLeftBar />
      {isLoadingGetOrderSold ? (
        <div className="loadingTableSkeleton flex flex-col gap-[0.5rem]">
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="rectangle" sx={{ height: "70rem" }} />
        </div>
      ) : (
        <OrderTableScreen
          orderLine={getOrderSold}
          actionBtns={[
            { text: "Shipping", handle: handleActionShipping },
            { text: "Paid", handle: handleActionPaid },
            { text: "Delete", handle: handleActionDelete },
          ]}
        />
      )}
    </div>
  );
}

export default OrderSold;
