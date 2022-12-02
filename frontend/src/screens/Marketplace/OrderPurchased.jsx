import React from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { useEffect } from "react";
import { deleteOrder, getAllOrderPurchased } from "../../redux/product/productSaga";
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
  const handleActionReceive = () => {
    console.log("receive");
  };
  const handleActionPaid = () => {
    console.log("paid");
  };
  const handleActionDelete = (order_line_id) =>{
    deleteOrder(accessToken,refreshToken,order_line_id)
  }
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
          { text: "Pay", handle: handleActionPaid },
          { text: "Delete", handle: handleActionDelete },
        ]}
      />
    </div>
  );
}

export default OrderPurchased;
