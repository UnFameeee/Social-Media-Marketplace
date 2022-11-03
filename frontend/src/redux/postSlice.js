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
  delete: {
    success: false,
    isFetching: false,
    error: false,
  },
  update:{
    success: false,
    isFetching: false,
    error: false,
  },
  like:{
    success: false,
    isFetching: false,
    error: false,
  },
};
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
    delete: {
      success: false,
      isFetching: false,
      error: false,
    },
    update:{
      success: false,
      isFetching: false,
      error: false,
    },
    like:{
      success: false,
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    createPostStart: (state) => {
      state.create.isFetching = true;
    },
    createPostSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.post = action.payload;
    },
    createPostFailed: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    createPostSaga() {},
    createPostSagaSuccess(){},
    getPostStart: (state) => {
      state.get.isFetching = true;
    },
    getPostSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.posts = action.payload;
    },
    getPostFailed: (state) => {
      state.get.isFetching = false;
      state.get.error = true;
    },

    deletePostStart: (state) => {
      state.delete.isFetching = true;
    },
    deletePostSuccess: (state) => {
      state.delete.isFetching = false;
      state.delete.success = true;
    },
    deletePostFailed: (state) => {
      state.delete.isFetching = false;
      state.delete.success = false;
      state.delete.error = true;
    },
    deletePostSaga(){},
    deletePostSagaSuccess(){},
    updatePostStart: (state) => {
      state.update.isFetching = true;
    },
    updatePostSuccess: (state) => {
      state.update.isFetching = false;
      state.update.success = true;
    },
    updatePostFailed: (state) => {
      state.update.isFetching = false;
      state.update.success = false;
      state.update.error = true;
    },
    updatePostSaga(){},
    updatePostSagaSuccess(){},

    likePostStart: (state) => {
      state.like.isFetching = true;
    },
    likePostSuccess: (state) => {
      state.like.isFetching = false;
      state.like.success = true;
    },
    likePostFailed: (state) => {
      state.like.isFetching = false;
      state.like.success = false;
      state.like.error = true;
    },
    likePostSaga(){},
    likePostSagaSuccess(){},
  },
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  getPostStart,
  getPostSuccess,
  getPostFailed,
  deletePostStart,
  deletePostSuccess,
  deletePostFailed,
  updatePostStart,
  updatePostSuccess,
  updatePostFailed,
  likePostStart,
  likePostSuccess,
  likePostFailed,

  createPostSaga,
  createPostSagaSuccess,
  deletePostSaga,
  deletePostSagaSuccess,
  updatePostSaga,
  updatePostSagaSuccess,
  likePostSaga,
  likePostSagaSuccess,
} = postSlice.actions;
export default postSlice.reducer;
