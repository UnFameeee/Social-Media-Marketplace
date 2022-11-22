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
    updateDetailSaga() {},
    updateDetailSagaSuccess() {},
    getProfileSaga() {},
    getProfileSagaSuccess() {},
    
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
    getGallerySaga() {},
    getGallerySagaSuccess() {}, 

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
    deleteAvtSaga() {},
    deleteAvtSagaSuccess() {},

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
    deleteWallpaperSaga() {},
    deleteWallpaperSagaSuccess() {},

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
  },
});

export const {
    getProfileDetailStart,
    getProfileDetailSuccess,
    getProfileDetailFailed,
    getProfileSaga,
    getProfileSagaSuccess,

    getGalleryStart,
    getGallerySuccess,
    getGalleryFailed,
    getGallerySaga,
    getGallerySagaSuccess,

    updateAvtStart,
    updateAvtSuccess,
    updateAvtFailed,

    updateWallpaperStart,
    updateWallpaperSuccess,
    updateWallpaperFailed,

    updateAvtSaga,
    updateAvtSagaSuccess,
    deleteAvtSaga,
    deleteAvtSagaSuccess,
    updateWallpaperSaga,
    updateWallpaperSagaSuccess,
    deleteWallpaperSaga,
    deleteWallpaperSagaSuccess,
    updateDetailSaga,
    updateDetailSagaSuccess,

    searchProfileStart,
    searchProfileSuccess,
    searchProfileFailed,
} = profileSlice.actions;
export default profileSlice.reducer;
