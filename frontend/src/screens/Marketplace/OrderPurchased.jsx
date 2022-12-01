import React from "react";
import OrderTableScreen from "./OrderTableScreen";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
function OrderPurchased() {
  const handleActionReceive = () => {
    console.log("receive");
  };
  const handleActionPaid = () => {
    console.log("paid");
  };
  return (
    <div className="Order-purchased pt-[4%] px-[430px] rounded-xl">
      <MarketPlaceLeftBar />
      <OrderTableScreen
        actionBtns={[
          { text: "Receive", handle: handleActionReceive },
          { text: "Paid", handle: handleActionPaid },
        ]}
      />
    </div>
  );
}

export default OrderPurchased;
