import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  profileDetails: {
    data: null,
    isFetching: false,
    error: false,
  },
  updateAvt: {
    data: null,
    isFetching: false,
    error: false,
  },
  updateWallpaper: {
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
    updateAvt: {
      data: null,
      isFetching: false,
      error: false,
    },
    updateWallpaper: {
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
    updateDetailSaga() {},
    updateDetailSagaSuccess() {},      

    updateAvtStart: (state) => {
      state.updateAvt.isFetching = true;
    },
    updateAvtSuccess: (state, action) => {
      state.updateAvt.isFetching = false;
      state.updateAvt.data = action.payload;
    },
    updateAvtFailed: (state) => {
      state.updateAvt.isFetching = false;
      state.updateAvt.error = true;
    },
    updateAvtSaga() {},
    updateAvtSagaSuccess() {},

    updateWallpaperStart: (state) => {
      state.updateWallpaper.isFetching = true;
    },
    updateWallpaperSuccess: (state, action) => {
      state.updateWallpaper.isFetching = false;
      state.updateWallpaper.data = action.payload;
    },
    updateWallpaperFailed: (state) => {
      state.updateWallpaper.isFetching = false;
      state.updateWallpaper.error = true;
    },
    updateWallpaperSaga() {},
    updateWallpaperSagaSuccess() {},
  },
});

export const {
    getProfileDetailStart,
    getProfileDetailSuccess,
    getProfileDetailFailed,

    updateAvtStart,
    updateAvtSuccess,
    updateAvtFailed,

    updateWallpaperStart,
    updateWallpaperSuccess,
    updateWallpaperFailed,

    updateAvtSaga,
    updateAvtSagaSuccess,
    updateWallpaperSaga,
    updateWallpaperSagaSuccess,
    updateDetailSaga,
    updateDetailSagaSuccess,
} = profileSlice.actions;
export default profileSlice.reducer;
