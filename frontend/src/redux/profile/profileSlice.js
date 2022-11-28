import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  profileDetails: {
    data: null,
    isFetching: false,
    error: false,
  },
  galleryImg: {
    data: null,
    isFetching: false,
    error: false,
  },
  profileSearch: {
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
    galleryImg: {
      data: null,
      isFetching: false,
      error: false,
    },
    profileSearch: {
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

    getGalleryStart: (state) => {
      state.galleryImg.isFetching = true;
    },
    getGallerySuccess: (state, action) => {
      state.galleryImg.isFetching = false;
      state.galleryImg.data = action.payload;
    },
    getGalleryFailed: (state) => {
      state.galleryImg.isFetching = false;
      state.galleryImg.error = true;
    },

    searchProfileStart: (state) => {
      state.profileSearch.isFetching = true;
    },
    searchProfileSuccess: (state, action) => {
      state.profileSearch.isFetching = false;
      state.profileSearch.data = action.payload;
    },
    searchProfileFailed: (state) => {
      state.profileSearch.isFetching = false;
      state.profileSearch.error = true;
    },

    getProfileSaga() {},
    getProfileSagaSuccess() {},

    updateDetailSagaSuccess() {},
    updateAvtSagaSuccess() {},
    deleteAvtSagaSuccess() {},
    updateWallpaperSagaSuccess() {},
    deleteWallpaperSagaSuccess() {},
  },
});

export const {
  getProfileDetailStart,
  getProfileDetailSuccess,
  getProfileDetailFailed,

  searchProfileStart,
  searchProfileSuccess,
  searchProfileFailed,

  getGalleryStart,
  getGallerySuccess,
  getGalleryFailed,

  getProfileSaga,
  getProfileSagaSuccess,

  updateAvtSagaSuccess,
  deleteAvtSagaSuccess,
  updateWallpaperSagaSuccess,
  deleteWallpaperSagaSuccess,
  updateDetailSagaSuccess,
  
} = profileSlice.actions;
export default profileSlice.reducer;
