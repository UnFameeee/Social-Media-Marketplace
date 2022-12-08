import { TurnSharpLeftRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../apiRequest";
import { revertAll } from "../resetStore";
const initialState = {
  get: {
    data: [],
    isFetching: [],
  },
  create: {
    isFetching: false,
    isError: false,
    isSuccess: false,
  },
};
export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    get: {
      data: [],
      isFetching: [],
    },
    create: {
      isFetching: false,
      isError: false,
      isSuccess: false,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    commentPostSaga(state) {
      state.create.isFetching = true;
    },
    commentPostSagaSuccess(state) {
      state.create.isSuccess = true;
    },
    commentPostSagaFailed(state) {
      state.create.isError = true;
    },

    deleteCommentPostSaga() {},
    deleteCommentPostSagaSuccess() {},

    updateCommentPostSaga() {},
    updateCommentPostSagaSuccess() {},

    likeCommentPostSaga() {},
    likeCommentPostSagaSuccess() {},

    getCommentPostSaga: (state,action) => {
      const preState = state.get.isFetching;
      let isFetchingObj ={
        post_id:action.payload.post_id,
        isFetching:true
      }
      if (state.get.isFetching?.length > 0) {
        const pos = state.get.isFetching
          .map((e) => e.post_id)
          .indexOf(action.payload.post_id);
        if (pos > -1) {
          state.get.isFetching[pos].isFetching = true;
        } else {
          state.get.isFetching = [...preState, isFetchingObj];
        }
      } else {
        state.get.isFetching.push(isFetchingObj);
      }
    },
    getCommentPostSagaSuccess(state) {
      state.create.isFetching = false;
    },
    getCommentPostSuccess: (state, action) => {
      if (action.payload.data.results.data.length > 0) {
        const post_id = action.payload.data.results.data[0].post_id;
        const totalComment = action.payload.data.results.page;
        let totalCurrentShowComment = action.payload.data.results.data.length;
        action.payload.data.results.data.map((item) => {
          if (item?.all_child_comment?.length > 0) {
            totalCurrentShowComment += item?.all_child_comment.length;
          }
        });
        const group_comment = {
          post_id: post_id,
          list_comment: [...action.payload.data.results.data],
          page: {
            ...totalComment,
            totalCurrentShowComment: totalCurrentShowComment,
          },
        };
        const preState = state.get.data;
        if (state.get.data.length > 0) {
          const pos = state.get.data.map((e) => e.post_id).indexOf(post_id);
          if (pos > -1 && !action.payload.paging) {
            state.get.data[pos].list_comment = action.payload.data.results.data;
            state.get.data[pos].page = {
              ...state.get.data[pos].page,
              ...action.payload.data.results.page,
              totalCurrentShowComment: totalCurrentShowComment,
            };
          } else if (pos > -1 && action.payload.paging) {
            state.get.data[pos].list_comment = [
              ...state.get.data[pos].list_comment,
              ...action.payload.data.results.data,
            ];
            state.get.data[pos].page.totalCurrentShowComment +=
              action.payload.data.results.data.length;
          } else {
            state.get.data = [...preState, group_comment];
          }
        } else {
          state.get.data = [...preState, group_comment];
        }
      } else {
        
        const post_id = action.payload.post_id;
        if (state.get.data.length > 0) {
          const pos = state.get.data.map((e) => e.post_id).indexOf(post_id);
          if (pos > -1) {
            state.get.data[pos].list_comment = [];
            state.get.data[pos].page = null;
          }
        }
      }
      const pos = state.get.isFetching
          .map((e) => e.post_id)
          .indexOf(action.payload.post_id);
      state.get.isFetching[pos].isFetching = false;
    },
    getCommentPostFail: (state,action) => {
      const pos = state.get.isFetching
          .map((e) => e.post_id)
          .indexOf(action.payload.post_id);
      state.get.isFetching[pos].isFetching = false;
    },
  },
});
export const {
  likeCommentPostSaga,
  likeCommentPostSagaSuccess,
  updateCommentPostSaga,
  updateCommentPostSagaSuccess,
  deleteCommentPostSaga,
  deleteCommentPostSagaSuccess,
  commentPostSaga,
  commentPostSagaSuccess,
  getCommentPostSaga,
  getCommentPostSagaSuccess,
  getCommentPostSuccess,
  getCommentPostFail,
} = commentSlice.actions;

export default commentSlice.reducer;
