import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../resetStore";
const initialState = {
  getSelling: {
    data: [],
  },
  createSelling: {
    isFetching: false,
    isError: false,
    isSuccess: false,
  },
  getShopping:{
    data:[],
  },
  getProductDetail:{
    data:null
  },
  update: {
    product: null,
  },
};
export const productSlice = createSlice({
  name: "product",
  initialState: {
    getSelling: {
      data: [],
    },
    createSelling: {
      isFetching: false,
      isError: false,
      isSuccess: false,
    },
    getShopping:{
      data:[],
    },
    getProductDetail:{
      data:null
    },
    update: {
      product: null,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    getSellingProductSaga() {},
    getSellingProductSagaSuccess() {},
    getSellingProduct: (state, action) => {
      state.getSelling.data = action.payload;
    },
    createSellingProductSaga() {},
    createSellingProductSagaSuccess() {},

    deleteSellingProductSaga() {},
    deleteSellingProductSagaSuccess() {},

    updateSellingProductSaga() {},
    updateSellingProductSagaSuccess() {},

    getShoppingProductSaga() {},
    getShoppingProductSagaSuccess() {},
    getShoppingProduct: (state, action) => {
      state.getShopping.data = action.payload;
    },
    getProductDetail: (state,action) =>{
      state.getProductDetail.data = action.payload;
    },
    updateProduct: (state, action) => {
      state.update.product = action.payload;
    },
    resetUpdateProduct: (state) => {
      state.update.product = null;
    },
  },
});
export const {
  getProductDetail,
  
  getShoppingProductSaga,
  getShoppingProduct,
  getShoppingProductSagaSuccess,

  getSellingProductSaga,
  getSellingProduct,
  getSellingProductSagaSuccess,
  createSellingProductSaga,
  createSellingProductSagaSuccess,
  deleteSellingProductSaga,
  deleteSellingProductSagaSuccess,
  updateSellingProductSaga,
  updateSellingProductSagaSuccess,
  updateProduct,
  resetUpdateProduct,
} = productSlice.actions;

export default productSlice.reducer;
