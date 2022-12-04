import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { notifyService } from "../../services/notifyService";
import { createOrder } from "../../redux/product/productSaga";
function PayPalCheckOutButton({
  handlePayPalApprove,
  handleCheckFormIsValid,
  product,
  disable,
  ...props
}) {
  const handleApprove = () => {
    handlePayPalApprove("PAYPAL");
  };
  return (
    <PayPalButtons
      disabled={disable}
      style={{
        layout: "horizontal",
        color: "silver",
        shape: "pill",
        label: "paypal",
      }}
      onClick={(data, actions) => {
        // if (handleCheckFormIsValid()) {
        //   return actions.resolve();
        // } else {
        //   return actions.reject();
        // }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              reference_id: product.profile_id.value,
              amount: {
                value: product.totalPrice,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);
        handleApprove(data.orderID);
      }}
      onCancel={() => {
        alert("The transaction of checkout is cancel");
      }}
      onError={(err) => {
        alert("Transaction Error: ", err);
      }}
    />
  );
}

export default PayPalCheckOutButton;
