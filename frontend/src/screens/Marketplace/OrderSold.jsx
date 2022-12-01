import React from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
function OrderSold() {
  const handleActionShipping = () => {
    console.log("shipping");
  };
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
      <MarketPlaceLeftBar />
      <OrderTableScreen
        actionBtns={[{ text: "Shipping", handle: handleActionShipping }]}
      />
    </div>
  );
}

export default OrderSold;
