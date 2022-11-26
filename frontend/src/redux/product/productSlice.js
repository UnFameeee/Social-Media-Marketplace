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
  update: {
    product: {},
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

    updateProduct: (state, action) => {
      state.update.product = action.payload;
    },
    resetUpdateProduct: (state) => {
      state.update.product = null;
    },
  },
});
export const {
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
