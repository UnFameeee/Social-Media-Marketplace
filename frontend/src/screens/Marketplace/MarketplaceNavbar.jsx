import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "@mui/icons-material";
import SellIcon from "@mui/icons-material/Sell";
import InventoryIcon from "@mui/icons-material/Inventory";
import ViewListIcon from "@mui/icons-material/ViewList";
import MUI from "../../components/MUI/index";
import { Helper } from "../../utils/Helper";
function MarketplaceNavbar() {
  const navigate = useNavigate();
  const isShoppingActive = useMemo(() => {
    var result = Helper.checkURL("shopping", {}, true);
    return result;
  });
  const isSellingActive = useMemo(() => {
    var result = Helper.checkURL("selling", {}, true);
    return result;
  });
  const isOrderPurchasedActive = useMemo(() => {
    var result = Helper.checkURL("orderpurchased", {}, true);
    return result;
  });
  const isOrderSoldActive = useMemo(() => {
    var result = Helper.checkURL("ordersold", {}, true);
    return result;
  });

  const handleNavigateToShopping = () => {
    if (!isShoppingActive) {
      navigate("/shopping");
    }
  };
  const handleNavigateToSelling = () => {
    if (!isSellingActive) {
      navigate("/selling");
    }
  };
  const handleNavigateToOrderPurchased = () => {
    if (!isOrderPurchasedActive) {
      navigate("/orderpurchased");
    }
  };
  const handleNavigateToOrderSold = () => {
    if (!isOrderSoldActive) {
      navigate("/ordersold");
    }
  };

  return (
    <div className="navigation flex gap-[0.5rem] flex-col mb-[1rem] p-[0.5rem] bg-gray-100 rounded-3xl shadow-lg">
      <MUI.ButtonWithIcon
        onClick={handleNavigateToShopping}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "start",
          border: isShoppingActive ? "2px solid var(--primary-color)" : 0,
        }}
      >
        <ShoppingBag
          style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
        />
        <span className=" text-[2rem]">Shopping</span>
      </MUI.ButtonWithIcon>
      <MUI.ButtonWithIcon
        onClick={handleNavigateToSelling}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "start",
          border: isSellingActive ? "2px solid var(--primary-color)" : 0,
        }}
      >
        <SellIcon
          style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
        />
        <span className=" text-[2rem]">Selling</span>
      </MUI.ButtonWithIcon>
      <MUI.ButtonWithIcon
        onClick={handleNavigateToOrderPurchased}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "start",
          border: isOrderPurchasedActive ? "2px solid var(--primary-color)" : 0,
        }}
      >
        <InventoryIcon
          style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
        />
        <span className=" text-[2rem]">Order Purchased</span>
      </MUI.ButtonWithIcon>
      <MUI.ButtonWithIcon
        onClick={handleNavigateToOrderSold}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "start",
          border: isOrderSoldActive ? "2px solid var(--primary-color)" : 0,
        }}
      >
        <ViewListIcon
          style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
        />
        <span className=" text-[2rem]">Order Sold</span>
      </MUI.ButtonWithIcon>
    </div>
  );
}

export default MarketplaceNavbar;
