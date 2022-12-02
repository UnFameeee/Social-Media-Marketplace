import { put, takeLatest, call, fork } from "redux-saga/effects";
import api from "../../common/environment/environment";
import { axiosInStanceJWT } from "../axiosJWT";
import { notifyService } from "../../services/notifyService";
import {
  addProductToCartWithoutPagingSagaSuccess,
  changeProductFromListCartWithoutPagingQuantitySuccess,
  changeSellingProductPage,
  changeShoppingProductPage,
  createOrderStart,
  createOrderSuccess,
  createSellingProductSagaSuccess,
  deleteOrderSuccess,
  deleteSellingProductSagaSuccess,
  getListCartWithoutPaging,
  getListCartWithoutPagingSaga,
  getOrderPurchased,
  getOrderSold,
  getSellingProduct,
  getSellingProductSaga,
  getShoppingProduct,
  getShoppingProductSaga,
  getShoppingProductSagaSuccess,
  removeProductFromListCartWithoutPagingSuccess,
  updateSellingProductSagaSuccess,
} from "./productSlice";
import { removeUploadProductImages, uploadProductImages } from "../apiRequest";

export function* getAllSellingProduct() {
  yield takeLatest(
    [
      getSellingProductSaga.type,
      createSellingProductSagaSuccess.type,
      deleteSellingProductSagaSuccess.type,
      updateSellingProductSagaSuccess.type,
      changeSellingProductPage.type,
    ],
    handleGetSellingProduct
  );
}
function* handleGetSellingProduct(data) {
  try {
    const getProducts = yield call(getSellingProductSagaRequest, data);
    yield put(getSellingProduct(getProducts));
  } catch (error) {
    console.log(error);
  }
}
const getSellingProductSagaRequest = async (data) => {
  const { accessToken, refreshToken, paging } = data.payload;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.product}/selling/all`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      console.log(res.data.results);
      return res.data.results;
    } else {
      notifyService.showError("Get List Selling Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get List Selling Product Failed");
  }
};

export const createSellingProductRequest = async (
  accessToken,
  refreshToken,
  dispatch,
  product,
  uploadImages,
  paging
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(`${api.product}/create`, product, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      if (uploadImages && uploadImages.length > 0) {
        let product_id = res.data.results.product_id;
        const resImages = await uploadProductImages(
          accessToken,
          refreshToken,
          uploadImages,
          product_id
        );
        console.log(resImages);
      }
      dispatch(
        createSellingProductSagaSuccess({ accessToken, refreshToken, paging })
      );
      notifyService.showSuccess("Create Selling Product Success");
      return res;
    } else {
      notifyService.showError("Create Selling Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Create Selling Product Failed");
  }
};
export const deleteSellingProductRequest = async (
  accessToken,
  refreshToken,
  dispatch,
  product_id,
  paging
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.delete(
      `${api.product}/delete/${product_id}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        deleteSellingProductSagaSuccess({ accessToken, refreshToken, paging })
      );
      notifyService.showSuccess("Delete Selling Product Success");
      return res;
    } else {
      notifyService.showError("Delete Selling Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Delete Selling Product Failed");
  }
};
export const updateSellingProductRequest = async (
  accessToken,
  refreshToken,
  dispatch,
  product,
  product_id,
  uploadImages,
  removeImages,
  paging
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.put(
      `${api.product}/update/${product_id}`,
      product,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (removeImages.length > 0) {
        const resRemoveImage = await removeUploadProductImages(
          accessToken,
          refreshToken,
          removeImages,
          product_id
        );
        console.log("resRemoveImage", resRemoveImage);
      }
      if (uploadImages && uploadImages.length > 0) {
        const resImages = await uploadProductImages(
          accessToken,
          refreshToken,
          uploadImages,
          product_id
        );
        console.log(resImages);
      }
      dispatch(
        updateSellingProductSagaSuccess({ accessToken, refreshToken, paging })
      );
      notifyService.showSuccess("Update Selling Product Success");
      return res;
    } else {
      notifyService.showError("Update Selling Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Update Selling Product Failed");
  }
};

export function* getAllShoppingProduct() {
  yield takeLatest(
    [getShoppingProductSaga.type, changeShoppingProductPage.type],
    handleGetShoppingProduct
  );
}
function* handleGetShoppingProduct(data) {
  try {
    const getProducts = yield call(getShoppingProductSagaRequest, data);
    yield put(getShoppingProduct(getProducts));
  } catch (error) {
    console.log(error);
  }
}
const getShoppingProductSagaRequest = async (data) => {
  const { accessToken, refreshToken, paging } = data.payload;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.product}/shopping/all`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      return res.data.results;
    } else {
      notifyService.showError("Get List Shopping Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get List Shopping Product Failed");
  }
};

export function* getListCartWithoutPagingSG() {
  yield takeLatest(
    [
      getListCartWithoutPagingSaga.type,
      addProductToCartWithoutPagingSagaSuccess.type,
      removeProductFromListCartWithoutPagingSuccess.type,
      changeProductFromListCartWithoutPagingQuantitySuccess.type,
    ],
    handleGetListCartWithoutPaging
  );
}
function* handleGetListCartWithoutPaging(data) {
  try {
    const getListCart = yield call(getListCartWithoutPagingRequest, data);
    yield put(getListCartWithoutPaging(getListCart));
  } catch (error) {
    console.log(error);
  }
}
const getListCartWithoutPagingRequest = async (data) => {
  const { accessToken, refreshToken, dispatch } = data.payload;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.get(
      `${api.shoppingCart}/getCartWithoutPaging`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      return res.data.results;
    } else {
      notifyService.showError("Get List Cart Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get List Cart Product Failed");
  }
};

export const addProductToListCartWithoutPagingRequest = async (
  accessToken,
  refreshToken,
  product_id,
  dispatch
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.shoppingCart}/addToCart/${product_id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        addProductToCartWithoutPagingSagaSuccess({
          accessToken,
          refreshToken,
          dispatch,
        })
      );
      return res.data.results.data;
    } else {
      notifyService.showError("Add Product To List Cart Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Add Product To List Cart Failed");
  }
};
export const removeProductFromListCartWithoutPagingRequest = async (
  accessToken,
  refreshToken,
  product_id,
  dispatch
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.shoppingCart}/removeFromCart/${product_id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        removeProductFromListCartWithoutPagingSuccess({
          accessToken,
          refreshToken,
          dispatch,
        })
      );
      return res.data.results.data;
    } else {
      notifyService.showError("Remove Product From List Cart Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Remove Product To List Cart Failed");
  }
};
export const changeProductFromListCartWithoutPagingQuantityRequest = async (
  accessToken,
  refreshToken,
  product_id,
  quantity,
  dispatch
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    let quantityObj = {
      quantity: quantity,
    };
    const res = await axiosInStanceJWT.put(
      `${api.shoppingCart}/changeQuantityProductInCart/${product_id}`,
      quantityObj,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        changeProductFromListCartWithoutPagingQuantitySuccess({
          accessToken,
          refreshToken,
          dispatch,
        })
      );
      return res.data.results.data;
    } else {
      notifyService.showError("Change Product From List Cart Quantity Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Change Product To List Cart Quantity Failed");
  }
};
export function* getAllOrderPurchasedSaga() {
  yield takeLatest([deleteOrderSuccess.type], handleGetOrderPurchased);
}
function* handleGetOrderPurchased(data) {
  try {
    const getOrderPurchasedSG = yield call(getAllOrderPurchased, data);
    yield put(getOrderPurchased(getOrderPurchasedSG));
  } catch (error) {
    console.log(error);
  }
}
export const createOrder = async (
  accessToken,
  refreshToken,
  dispatch,
  navigate,
  paymentObj
) => {
  dispatch(createOrderStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(`${api.order}`, paymentObj, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      console.log(res.data.results.data);
      dispatch(createOrderSuccess());
      navigate("/orderpurchased");
      return res.data.results.data;
    } else {
      notifyService.showError("Create Order Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Create Order Failed");
  }
};
export const deleteOrder = async (accessToken, refreshToken, oderLine_id) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.delete(
      `${api.order}/item/${oderLine_id}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      console.log(res.data.results.data);
      put(deleteOrderSuccess);
      return res.data.results.data;
    } else {
      notifyService.showError("Delete Order Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Delete Order Failed");
  }
};
export const getAllOrderPurchased = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 1000,
    };
    const res = await axiosInStanceJWT.post(`${api.order}/purchased`, paging, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      console.log(res.data.results.data);
      dispatch(getOrderPurchased(res.data.results.data));
      return res.data.results.data;
    } else {
      notifyService.showError("Get Order Purchased Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get Order Purchased Failed");
  }
};

export const getAllOrderSold = async (accessToken, refreshToken, dispatch) => {
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 1000,
    };
    const res = await axiosInStanceJWT.post(`${api.order}/sold`, paging, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      console.log(res.data.results.data);
      dispatch(getOrderSold(res.data.results.data));
      return res.data.results.data;
    } else {
      notifyService.showError("Get Order Sold Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get Order Sold Failed");
  }
};
