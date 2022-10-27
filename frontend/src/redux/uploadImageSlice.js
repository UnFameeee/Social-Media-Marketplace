import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./resetStore";
const initialState = {
  uploadImagePost: {
    data: [],
    isFetching: false,
    error: false,
  },
};
export const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState: {
    uploadImagePost: {
      data: [],
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    resetUploadImagePostState: () =>{
      return initialState;
    },
    uploadImagePostStart: (state) => {
      state.uploadImagePost.isFetching = true;
    },
    uploadImagePostSuccess: (state, action) => {
      state.uploadImagePost.isFetching = false;
      const preState = state.uploadImagePost.data;
      state.uploadImagePost.data = [...preState, ...action.payload];
    },
    uploadImagePostFailed: (state) => {
      state.uploadImagePost.isFetching = false;
      state.uploadImagePost.error = true;
    },
    
  },
});

export const {
  uploadImagePostFailed,
  uploadImagePostStart,
  uploadImagePostSuccess,
  resetUploadImagePostState,
} = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
