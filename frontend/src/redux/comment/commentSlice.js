import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../apiRequest";
import { revertAll } from "../resetStore";
const initialState = {
  
}
export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    commentPostSaga() {},
    commentPostSagaSuccess() {},
  
  },
});
export const {
    commentPostSaga,
    commentPostSagaSuccess
} = commentSlice.actions

export default commentSlice.reducer