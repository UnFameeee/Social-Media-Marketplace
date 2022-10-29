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
    removeSingleUploadImagePost: (state, action) => {
      let preState = state.uploadImagePost.data
      preState = preState.filter(item => item != action.payload)
      state.uploadImagePost.data = [...preState]
    }
  }
});

export const {
  uploadImagePostFailed,
  uploadImagePostStart,
  uploadImagePostSuccess,
  resetUploadImagePostState,
  removeSingleUploadImagePost
} = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
