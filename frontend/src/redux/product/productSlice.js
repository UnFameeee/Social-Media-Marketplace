import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../resetStore";
const initialState = {
  getSelling: {
    data: [],
    page: {
      page: 0,
      pageSize: 30,
      totalElement: 30,
    },
  },
  createSelling: {
    isFetching: false,
    isError: false,
    isSuccess: false,
  },
  getShopping: {
    data: [],
    page: {
      page: 0,
      pageSize: 30,
      totalElement: 30,
    },
  },
  getProductDetail: {
    data: null,
  },
  getListCartWithoutPaging: {
    data: [],
    totalPrice: 0,
  },
  update: {
    product: null,
  },
  getOrderPurchased: null,
  createOrder: {
    isFetching: false,
    isError: false,
  },
  getOrderSold: null,
};
export const productSlice = createSlice({
  name: "product",
  initialState: {
    getSelling: {
      data: [],
      page: {
        page: 0,
        pageSize: 30,
        totalElement: 30,
      },
    },
    createSelling: {
      isFetching: false,
      isError: false,
      isSuccess: false,
    },
    getShopping: {
      data: [],
      page: {
        page: 0,
        pageSize: 30,
        totalElement: 30,
      },
    },
    getProductDetail: {
      data: null,
    },
    getListCartWithoutPaging: {
      data: [],
      totalPrice: 0,
    },
    update: {
      product: null,
    },
    getOrderPurchased: null,
    createOrder: {
      isFetching: false,
    },
    getOrderSold: null,
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    getSellingProductSaga() {},
    getSellingProduct: (state, action) => {
      state.getSelling = action.payload;
    },
    createSellingProductSagaSuccess() {},

    deleteSellingProductSagaSuccess() {},

    updateSellingProductSagaSuccess() {},

    changeSellingProductPage: (state, action) => {
      state.getSelling.page.page = action.payload.paging.page;
    },

    getShoppingProductSaga() {},
    getShoppingProductSagaSuccess() {},
    getShoppingProduct: (state, action) => {
      state.getShopping = action.payload;
    },
    changeShoppingProductPage: (state, action) => {
      state.getShopping.page.page = action.payload.paging.page;
    },

    getListCartWithoutPagingSaga() {},
    getListCartWithoutPaging: (state, action) => {
      let totalPrice = 0;
      action.payload?.map((item) => {
        totalPrice += item.price * item.quantity;
      });
      state.getListCartWithoutPaging.totalPrice = totalPrice;
      state.getListCartWithoutPaging.data = action.payload;
    },
    resetListCartWithoutPaging: (state) => {
      let initialState = {
        data: [],
        totalPrice: 0,
      };
      state.getListCartWithoutPaging = initialState;
    },
    addProductToCartWithoutPagingSagaSuccess() {},
    removeProductFromListCartWithoutPagingSuccess() {},
    changeProductFromListCartWithoutPagingQuantitySuccess() {},

    getProductDetail: (state, action) => {
      state.getProductDetail.data = action.payload;
    },
    updateProduct: (state, action) => {
      state.update.product = action.payload;
    },
    resetUpdateProduct: (state) => {
      state.update.product = null;
    },

    getOrderPurchased: (state, action) => {
      state.getOrderPurchased = action.payload;
    },
    createOrderStart: (state) => {
      state.createOrder.isFetching = true;
    },
    createOrderSuccess: (state) => {
      state.createOrder.isFetching = false;
    },
    deleteOrderSuccess() {},

    getOrderSold: (state, action) => {
      state.getOrderSold = action.payload;
    },
  },
});
export const {
  getProductDetail,
  getOrderSold,

  getOrderPurchased,
  createOrderStart,
  createOrderSuccess,
  deleteOrderSuccess,

  getListCartWithoutPaging,
  getListCartWithoutPagingSaga,
  resetListCartWithoutPaging,
  addProductToCartWithoutPagingSagaSuccess,
  removeProductFromListCartWithoutPagingSuccess,
  changeProductFromListCartWithoutPagingQuantitySuccess,

  getShoppingProductSaga,
  getShoppingProduct,
  getShoppingProductSagaSuccess,
  changeShoppingProductPage,

  getSellingProductSaga,
  getSellingProduct,
  createSellingProductSagaSuccess,
  deleteSellingProductSagaSuccess,
  updateSellingProductSagaSuccess,
  changeSellingProductPage,

  updateProduct,
  resetUpdateProduct,
} = productSlice.actions;

export default productSlice.reducer;
