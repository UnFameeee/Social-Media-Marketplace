import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./resetStore";
const initialState = {
  get: {
    posts: null,
    isFetching: false,
    error: false,
  },
  create: {
    post: null,
    isFetching: false,
    error: false,
  },
}
export const postSlice = createSlice({
  name: "post",
  initialState: {
    get: {
      posts: null,
      isFetching: false,
      error: false,
    },
    create: {
      post: null,
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    createStart: (state) => {
      state.create.isFetching = true;
    },
    createSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.post = action.payload;
    },
    createFailed: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },

    getStart: (state) => {
      state.get.isFetching = true;
    },
    getSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.posts = action.payload;
    },
    getFailed: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },
  },
});

export const {
  createStart,
  createSuccess,
  createFailed,
  getStart,
  getSuccess,
  getFailed,
} = postSlice.actions;
export default postSlice.reducer;
