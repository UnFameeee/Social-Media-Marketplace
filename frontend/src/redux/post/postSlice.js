import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../resetStore";
const initialState = {
  get: {
    posts: null,
    isFetching: false,
    error: false,
  },
  getByProfile: {
    posts: null,
    isFetching: false,
    error: false,
  },
  getById: {
    post: null,
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
  update: {
    success: false,
    isFetching: false,
    error: false,
  },
  like: {
    postLike: [],
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
    getByProfile: {
      posts: null,
      isFetching: false,
      error: false,
    },
    getById: {
      post: null,
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
    update: {
      success: false,
      isFetching: false,
      error: false,
    },
    like: {
      postLike: [],
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
    createPostSagaSuccess() {},

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

    getPostByProfileStart: (state) => {
      state.getByProfile.isFetching = true;
    },
    getPostByProfileSuccess: (state, action) => {
      state.getByProfile.isFetching = false;
      state.getByProfile.posts = action.payload;
    },
    getPostByProfileFailed: (state) => {
      state.getByProfile.isFetching = false;
      state.getByProfile.error = true;
    },

    getPostByIdStart: (state) => {
      state.getById.isFetching = true;
    },
    getPostByIdSuccess: (state, action) => {
      state.getById.isFetching = false;
      state.getById.post = action.payload;
    },
    getPostByIdFailed: (state) => {
      state.getById.isFetching = false;
      state.getById.error = true;
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
    deletePostSaga() {},
    deletePostSagaSuccess() {},

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
    updatePostSaga() {},
    updatePostSagaSuccess() {},

    likePostStart: (state, action) => {
      const preState = state.like.postLike;
      let postLikeObj = {
        post_id: action.payload,
        isFetching: true,
      };
      if (state.like.postLike?.length > 0) {
        const pos = state.like.postLike
          .map((e) => e.post_id)
          .indexOf(action.payload);
        if (pos > -1) {
          state.like.postLike[pos].isFetching = true;
        } else {
          state.like.postLike = [...preState, postLikeObj];
        }
      } else {
        state.like.postLike.push(postLikeObj);
      }
    },
    likePostSuccess: (state, action) => {
      const pos = state.like.postLike
        .map((e) => e.post_id)
        .indexOf(action.payload);
      state.like.postLike[pos].isFetching = false;
    },
    likePostFailed: (state, action) => {
      const pos = state.like.postLike
        .map((e) => e.post_id)
        .indexOf(action.payload);
      state.like.postLike[pos].isFetching = false;
    },
    likePostSaga() {},
    likePostSagaSuccess() {},
  },
});
export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  getPostStart,
  getPostSuccess,
  getPostFailed,
  getPostByProfileStart,
  getPostByProfileSuccess,
  getPostByProfileFailed,
  getPostByIdStart,
  getPostByIdSuccess,
  getPostByIdFailed,
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
