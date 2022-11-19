import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../apiRequest";
import { revertAll } from "../resetStore";
const initialState = {
  get: {
    data: [],
  },
};
export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    get: {
      data: [],
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    commentPostSaga() {},
    commentPostSagaSuccess() {},

    deleteCommentPostSaga() {},
    deleteCommentPostSagaSuccess() {},

    getCommentPostSaga() {},
    getCommentPostSagaSuccess() {},
    getCommentPostSuccess: (state, action) => {
      debugger
      if(action.payload.data.results.data.length >0){
        const post_id = action.payload.data.results.data[0].post_id;
        const group_comment = {
          post_id: post_id,
          list_comment: [...action.payload.data.results.data],
        };
        const preState = state.get.data;
  
        if (state.get.data.length > 0) {
          const pos = state.get.data.map((e) => e.post_id).indexOf(post_id);
          if (pos > -1) {
            state.get.data[pos].list_comment = action.payload.data.results.data;
          } else {
            state.get.data = [...preState, group_comment];
          }
        } else {
          state.get.data = [...preState, group_comment];
        }
      }
      else{
        const post_id = action.payload.post_id;
        if (state.get.data.length > 0) {
          const pos = state.get.data.map((e) => e.post_id).indexOf(post_id);
          if (pos > -1) {
            state.get.data[pos].list_comment = [];
          }
        }
      }
    },
  },
});
export const {
  deleteCommentPostSaga,
  deleteCommentPostSagaSuccess,
  commentPostSaga,
  commentPostSagaSuccess,
  getCommentPostSaga,
  getCommentPostSagaSuccess,
  getCommentPostSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;
