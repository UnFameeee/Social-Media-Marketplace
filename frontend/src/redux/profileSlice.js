import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from './resetStore';
const initialState = {
  profileDetails: {
    data: null,
    isFetching: false,
    error: false,
  },
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileDetails: {
      data: null,
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    getProfileDetailStart: (state) => {
      state.profileDetails.isFetching = true;
    },
    getProfileDetailSuccess: (state, action) => {
      state.profileDetails.isFetching = false;
      state.profileDetails.data = action.payload;
    },
    getProfileDetailFailed: (state) => {
      state.profileDetails.isFetching = false;
      state.profileDetails.error = true;
    },
  },
});

export const {
    getProfileDetailStart,
    getProfileDetailSuccess,
    getProfileDetailFailed,

} = profileSlice.actions;
export default profileSlice.reducer;
