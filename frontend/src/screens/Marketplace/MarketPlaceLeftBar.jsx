import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MUI from "../../components/MUI/index";
import { Helper } from "../../utils/Helper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllShoppingCartList } from "../../redux/apiRequest";
import { useEffect } from "react";
import MarketplaceNavbar from "./MarketplaceNavbar";
import MarketPlaceLeftBarTab from "./MarketPlaceLeftBarTab";
import { removeProductFromListCartWithoutPagingRequest } from "../../redux/product/productSaga";
import { useNavigate } from "react-router-dom";
function MarketPlaceLeftBar({ handleOpenModalCreate, ...props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const isShoppingActive = useMemo(() => {
    var result = Helper.checkURL("shopping", {}, true);
    return result;
  });
  const isSellingActive = useMemo(() => {
    var result = Helper.checkURL("selling", {}, true);
    return result;
  });
  const isCheckOutActive = useMemo(() => {
    var result = Helper.checkURL("checkout", {}, true);
    return result;
  });
  if (isCheckOutActive) {
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <MarketplaceNavbar />
      </div>
    );
  }
  if (isShoppingActive) {
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <MarketplaceNavbar />
        <MarketPlaceLeftBarTab />
      </div>
    );
  } else if (isSellingActive) {
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <MarketplaceNavbar />
        <div className="manager-selling-btn flex gap-[0.5rem] flex-col mb-[1rem] p-[0.5rem] bg-gray-100 rounded-3xl shadow-lg">
          <MUI.ButtonWithIcon
            onClick={(e) => handleOpenModalCreate()}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "start",
            }}
          >
            <AddCircleIcon
              style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}
            />
            <span className=" text-[2rem]">Create Product</span>
          </MUI.ButtonWithIcon>
        </div>
      </div>
    );
  } else {
    return (
      <div className="marketPlaceHomeLeftBar fixed top-[76px] left-[1%] w-[400px]">
        <MarketplaceNavbar />
      </div>
    );
  }
}
export default MarketPlaceLeftBar;
