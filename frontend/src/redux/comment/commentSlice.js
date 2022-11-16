import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../apiRequest";
import { revertAll } from "../resetStore";
const initialState = {
  get: {
    data: null,
  },
}
export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    get: {
      comments: null,
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    commentPostSaga() {},
    commentPostSagaSuccess() {},
    getCommentPostSaga(){},
    getCommentPostSagaSuccess(){},
    getCommentPostSuccess: (state, action) => {
      state.get.data = action.payload;
    },
  },
});
export const {
    commentPostSaga,
    commentPostSagaSuccess,
    getCommentPostSaga,
    getCommentPostSagaSuccess,
    getCommentPostSuccess
} = commentSlice.actions

export default commentSlice.reducer