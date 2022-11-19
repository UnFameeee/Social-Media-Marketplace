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
    getCommentPostSaga() {},
    getCommentPostSagaSuccess() {},
    getCommentPostSuccess: (state, action) => {
      debugger;
      const post_id = action.payload.results.data[0].post_id;
      const group_comment = {
        post_id: post_id,
        list_comment: [...action.payload.results.data],
      };
      const preState = state.get.data;

      if (state.get.data.length > 0) {
        const pos = state.get.data.map((e) => e.post_id).indexOf(post_id);
        if (pos > -1) {
          state.get.data[pos].list_comment = action.payload.results.data;
        } else {
          state.get.data = [...preState, group_comment];
        }
      } else {
        state.get.data = [...preState, group_comment];
      }
    },
  },
});
export const {
  commentPostSaga,
  commentPostSagaSuccess,
  getCommentPostSaga,
  getCommentPostSagaSuccess,
  getCommentPostSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;
