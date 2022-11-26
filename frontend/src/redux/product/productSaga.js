import { put, takeLatest, call, fork } from "redux-saga/effects";
import api from "../../common/environment/environment";
import { axiosInStanceJWT } from "../axiosJWT";
import { notifyService } from "../../services/notifyService";
import {
  createSellingProductSaga,
  createSellingProductSagaSuccess,
  deleteSellingProductSaga,
  deleteSellingProductSagaSuccess,
  getSellingProduct,
  getSellingProductSaga,
  getSellingProductSagaSuccess,
  updateSellingProductSaga,
  updateSellingProductSagaSuccess,
} from "./productSlice";
import { removeUploadProductImages, uploadProductImages } from "../apiRequest";

export function* getAllSellingProduct() {
  yield takeLatest(
    [
      getSellingProductSaga.type,
      createSellingProductSagaSuccess.type,
      deleteSellingProductSagaSuccess.type,
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
  const { accessToken, refreshToken, dispatch } = data.payload;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    let pagingObj = {
      page: 0,
      pageSize: 30,
    };
    const res = await axiosInStanceJWT.post(
      `${api.product}/selling/all`,
      pagingObj,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getSellingProductSagaSuccess({ accessToken, refreshToken }));
      return res.data.results.data;
    } else {
      notifyService.showError("Get List Selling Product Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get List Selling Product Failed");
  }
};

export function* createSellingProduct() {
  yield takeLatest(createSellingProductSaga.type, handleCreateSellingProduct);
}
function* handleCreateSellingProduct(data) {
  try {
    yield call(createSellingProductRequest, data);
    // yield put(createPostSuccess(create.data));
  } catch (error) {
    console.log(error);
  }
}
const createSellingProductRequest = async (data) => {
  const { accessToken, refreshToken, dispatch, product, uploadImages } =
    data.payload;

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
        createSellingProductSagaSuccess({ accessToken, refreshToken, dispatch })
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

export function* deleteSellingProduct() {
  yield takeLatest(deleteSellingProductSaga.type, handleDeleteSellingProduct);
}
function* handleDeleteSellingProduct(data) {
  try {
    yield call(deleteSellingProductRequest, data);
  } catch (error) {
    console.log(error);
  }
}
const deleteSellingProductRequest = async (data) => {
  const { accessToken, refreshToken, dispatch, product_id } = data.payload;

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
        deleteSellingProductSagaSuccess({ accessToken, refreshToken, dispatch })
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

export function* updateSellingProduct() {
  yield takeLatest(updateSellingProductSaga.type, handleUpdateSellingProduct);
}
function* handleUpdateSellingProduct(data) {
  try {
    yield call(updateSellingProductRequest, data);
  } catch (error) {
    console.log(error);
  }
}
const updateSellingProductRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    dispatch,
    product,
    uploadImages,
    removeImages,
  } = data.payload;

  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.put(
      `${api.product}/update/${product.product_id}`,
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
          product.product_id,
        );
        console.log("resRemoveImage", resRemoveImage);
      }
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
        updateSellingProductSagaSuccess({ accessToken, refreshToken, dispatch })
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
