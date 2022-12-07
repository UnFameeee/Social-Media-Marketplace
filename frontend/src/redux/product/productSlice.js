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
  getSellingFetching:{
    isFetching:false,
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
  getShoppingFetching:{
    isFetching:false,
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
  getOrderPurchasedFetching:{
    isFetching:false,
  },
  createOrder: {
    isFetching: false,
    isError: false,
  },
  getOrderSold: null,
  getOrderSoldFetching:{
    isFetching:false,
  },
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
    getSellingFetching:{
      isFetching:false,
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
    getShoppingFetching:{
      isFetching:false,
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
    getOrderPurchasedFetching:{
      isFetching:false,
    },
    createOrder: {
      isFetching: false,
    },
    getOrderSold: null,
    getOrderSoldFetching:{
      isFetching:false,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    getSellingProductSaga() {},
    getSellingProduct: (state, action) => {
      state.getSelling = action.payload;
      state.getSellingFetching.isFetching = false;
    },
    getSellingProductStart: (state) => {
      state.getSellingFetching.isFetching = true;
    },
    getSellingProductFailed: (state) => {
      state.getSellingFetching.isFetching = false;
    },
    createSellingProductSagaSuccess() {},

    deleteSellingProductSagaSuccess() {},

    updateSellingProductSagaSuccess() {},

    changeSellingProductPage: (state, action) => {
      state.getSelling.page.page = action.payload.paging.page;
    },
    getShoppingProductStart:(state)=>{
      state.getShoppingFetching.isFetching = true;
    },
    getShoppingProductSaga() {},
    getShoppingProductSagaSuccess() {},
    getShoppingProduct: (state, action) => {
      state.getShopping = action.payload;
      state.getShoppingFetching.isFetching = false;
    },
    getShoppingProductFailed:(state)=>{
      state.getShoppingFetching.isFetching = false;
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
    getOrderPurchasedStart:(state)=>{
      state.getOrderPurchasedFetching.isFetching = true;
    },
    getOrderPurchased: (state, action) => {
      state.getOrderPurchased = action.payload;
      state.getOrderPurchasedFetching.isFetching = false;
    },
    getOrderPurchasedFailed:(state)=>{
      state.getOrderPurchasedFetching.isFetching = false;
    },
    receiveOrderPurchasedSuccess() {},

    createOrderStart: (state) => {
      state.createOrder.isFetching = true;
    },
    createOrderSuccess: (state) => {
      state.createOrder.isFetching = false;
    },
    createOrderFail: (state) => {
      state.createOrder.isFetching = false;
    },
    getOrderSoldStart:(state)=>{
      state.getOrderSoldFetching.isFetching = true;
    },
    getOrderSold: (state, action) => {
      state.getOrderSold = action.payload;
      state.getOrderSoldFetching.isFetching = false;
    },
    getOrderSoldFailed:(state)=>{
      state.getOrderSoldFetching.isFetching = false;
    },
    deleteOrderSoldSuccess() {},
    shippingOrderSoldSuccess() {},
    paidOrderSoldSuccess() {},
  },
});
export const {
  getProductDetail,

  getOrderSold,
  getOrderSoldStart,
  getOrderSoldFailed,
  deleteOrderSoldSuccess,
  shippingOrderSoldSuccess,
  paidOrderSoldSuccess,

  getOrderPurchased,
  receiveOrderPurchasedSuccess,
  getOrderPurchasedStart,
  getOrderPurchasedFailed,

  createOrderStart,
  createOrderSuccess,
  createOrderFail,

  getListCartWithoutPaging,
  getListCartWithoutPagingSaga,
  addProductToCartWithoutPagingSagaSuccess,
  removeProductFromListCartWithoutPagingSuccess,
  changeProductFromListCartWithoutPagingQuantitySuccess,
  resetListCartWithoutPaging,

  getShoppingProductSaga,
  getShoppingProduct,
  getShoppingProductSagaSuccess,
  changeShoppingProductPage,
  getShoppingProductStart,
  getShoppingProductFailed,

  getSellingProductSaga,
  getSellingProduct,
  getSellingProductStart,
  getSellingProductFailed,
  createSellingProductSagaSuccess,
  deleteSellingProductSagaSuccess,
  updateSellingProductSagaSuccess,
  changeSellingProductPage,

  updateProduct,
  resetUpdateProduct,
} = productSlice.actions;

export default productSlice.reducer;
