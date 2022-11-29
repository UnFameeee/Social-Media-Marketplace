import React from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import { Tooltip, Pagination, Typography, Fab } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import HeadSlider from "./HeadSlider";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ShoppingBag } from "@mui/icons-material";
import SellIcon from "@mui/icons-material/Sell";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ManagerProductModal from "./ManagerProductModa";
import MUI from "../../components/MUI";
import NothingToSee from "./NothingToSee";
import { getAllSellingProduct } from "../../redux/apiRequest";
import { useEffect } from "react";
import {
  changeSellingProductPage,
  resetUpdateProduct,
  updateProduct,
} from "../../redux/product/productSlice";
import {
  createSellingProductRequest,
  deleteSellingProductRequest,
  updateSellingProductRequest,
} from "../../redux/product/productSaga";

//#region media responsive
const ResponSiveDiv = styled.div`
  .btn-product-action {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    font-size: 1.5rem;
  }
  .fab-btn-check-out,
  .fab-btn-shopping {
    display: none;
  }
  .product-container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    display: grid;
    gap: 10px;
  }
  .productCartDetailModal {
    display: none;
  }
  @media only screen and (max-width: 1780px) {
    .product-container {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media only screen and (max-width: 1510px) {
    .product-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media only screen and (max-width: 1402px) {
    .btn-product-action {
      flex-direction: column;
    }
  }
  @media only screen and (max-height: 600px) {
  }
  @media only screen and (max-width: 1252px) {
    .product-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-content: center;
    }
  }
  @media only screen and (max-width: 958px) {
    .product-container {
      grid-template-columns: repeat(1, minmax(0, 0.8fr));
      justify-content: center;
    }
  }
  @media only screen and (max-width: 820px) {
    .product-container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-content: center;
    }
    .marketPlaceHomeLeftBar {
      display: none;
    }
    .fab-btn-check-out,
    .fab-btn-shopping {
      display: block;
    }
    .ThreeColumns {
      padding-left: 1%;
      padding-right: 1%;
    }
  }
  @media only screen and (max-width: 508px) {
    .product-container {
      grid-template-columns: repeat(1, minmax(0, 0.8fr));
      justify-content: center;
    }
  }
`;
function Selling() {
  //#region declare variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showManagerModal, setShowManagerModal] = useState({
    isShow: false,
    action: 0,
  });
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(-1);

  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const productList = useSelector(
    (state) => state.product?.getSelling?.data,
    shallowEqual
  );
  const sellingProductPaging = useSelector(
    (state) => state.product?.getSelling?.page
  );
  const { totalElement, pageSize, page } = sellingProductPaging;
  // #endregion
  //#region declare function
  const handleUpdate = (productObj) => {
    dispatch(updateProduct(productObj));
    setShowManagerModal({ isShow: true, action: 2 });
  };
  const handleOpenModalCreate = () => {
    setShowManagerModal({ isShow: true, action: 1 });
    dispatch(resetUpdateProduct());
  };
  const handleNavigateToCheckOut = () => {
    navigate("/checkout");
  };
  const handleNavigateToShopping = () => {
    navigate("/shopping");
  };
  const handleDelete = (productObj) => {
    setOpenConfirmRemove(true);
    let product_id = productObj.product_id;
    setDeleteItemId(product_id);
  };
  const handleConfirmDeleteProduct = () => {
    let paging = { page, pageSize };
    if (deleteItemId != -1) {
      deleteSellingProductRequest(
        accessToken,
        refreshToken,
        dispatch,
        deleteItemId,
        paging
      );
      setDeleteItemId(-1);
    }
    setOpenConfirmRemove(false);
  };
  const handleSubmitCreateProduct = (product, uploadImages) => {
    let paging = { page, pageSize };
    createSellingProductRequest(
      accessToken,
      refreshToken,
      dispatch,
      product,
      uploadImages,
      paging
    );
  };
  const handleSaveUpdateProduct = (
    product,
    uploadImages,
    removeUploadImages,
    productId
  ) => {
    let removeImages = removeUploadImages;
    let product_id = productId;
    let paging = { page, pageSize };
    updateSellingProductRequest(
      accessToken,
      refreshToken,
      dispatch,
      product,
      product_id,
      uploadImages,
      removeImages,
      paging
    );
  };
  const handleChange = (event, value) => {
    let sellingPage = value - 1;
    let paging = { page: sellingPage, pageSize };
    dispatch(changeSellingProductPage({ accessToken, refreshToken, paging }));
  };
  useEffect(() => {
    let paging;
    if (sellingProductPaging) {
      paging = { page, pageSize };
    } else {
      paging = { page: 0, pageSize: 30 };
    }
    getAllSellingProduct(accessToken, refreshToken, paging, dispatch);
  }, []);
  return (
    <>
      <ManagerProductModal
        showManagerModal={showManagerModal}
        handleSaveUpdateProduct={handleSaveUpdateProduct}
        handleSubmitCreateProduct={handleSubmitCreateProduct}
        setShowModal={setShowManagerModal}
      />
      <ResponSiveDiv>
        <ThreeColumns className="ThreeColumns pr-[2%] pl-[430px] pt-6">
          <MarketPlaceLeftBar handleOpenModalCreate={handleOpenModalCreate} />
          <div className="main-market-place mb-[2rem] rounded-xl h-full p-[1.5rem] shadow-2xl ">
            <Fab
              onClick={handleNavigateToCheckOut}
              className="fab-btn-check-out"
              color="primary"
              aria-label="add"
              style={{
                background: "var(--primary-color)",
                top: "50%",
                position: "fixed",
              }}
            >
              <ShoppingCartCheckoutIcon style={{ fontSize: "2.5rem" }} />
            </Fab>
            <Fab
              onClick={handleNavigateToShopping}
              className="fab-btn-shopping"
              color="primary"
              aria-label="add"
              style={{
                background: "var(--primary-color)",
                top: "57%",
                position: "fixed",
              }}
            >
              <ShoppingBag style={{ fontSize: "2.5rem" }} />
            </Fab>
            <HeadSlider />
            {productList?.length > 0 ? (
              <>
                <div className="product-container mb-[1rem]">
                  <MUI.ConfirmDialog
                    modalProps={[openConfirmRemove, setOpenConfirmRemove]}
                    title="Remove Selling Product"
                    actionName="remove this product"
                    confirmAction={handleConfirmDeleteProduct}
                  />
                  {productList &&
                    productList?.map((product) => (
                      <ProductCard
                        key={product.product_id}
                        productObj={product}
                        arrayBtn={[
                          { pos: 0, text: "update", handle: handleUpdate },
                          { pos: 1, text: "delete", handle: handleDelete },
                        ]}
                      />
                    ))}
                </div>
                <div className="Pagination float-right">
                  <Typography>Page: {page + 1}</Typography>
                  <Pagination
                    page={page + 1}
                    onChange={handleChange}
                    count={Math.round(totalElement / pageSize)}
                    defaultPage={1}
                    siblingCount={0}
                    variant="outlined"
                    size="large"
                  />
                </div>
              </>
            ) : (
              <NothingToSee text="You don't have any product yet" />
            )}
          </div>
        </ThreeColumns>
      </ResponSiveDiv>
      <Outlet />
    </>
  );
}

export default Selling;
