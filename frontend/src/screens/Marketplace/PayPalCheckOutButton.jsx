import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { notifyService } from "../../services/notifyService";
function PayPalCheckOutButton({ product, ...props }) {
  const handleApprove = (orderID) => {
    notifyService.showInfo(
      "purchase order with Id of ",
      orderID,
      " successfully"
    );
  };
  console.log("product",product)
  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        color: "silver",
        shape: "pill",
        label: "paypal",
      }}
      onClick={(data, actions) => {
        const hasAlreadyBoughtTheProduct = false;
        if (hasAlreadyBoughtTheProduct) {
          alert(" Transaction Error: You 've already purchased this product");
          return actions.reject();
        } else {
          return actions.resolve();
        }
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
        alert(" The Transaction of checkout is cancel");
      }}
      onError={(err) => {
        alert(" Transaction Error: ", err);
      }}
    />
  );
}

export default PayPalCheckOutButton;
