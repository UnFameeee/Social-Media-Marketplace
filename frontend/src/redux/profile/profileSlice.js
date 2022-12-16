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
  updateAvt: {
    isFetching: false,
  },
  updateWall: {
    isFetching: false,
  },
  updateDetail: {
    isFetching: false,
  },
  updateProfile: {
    isFetching: false,
  }
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
    updateAvt: {
      isFetching: false,
    },
    updateWall: {
      isFetching: false,
    },
    updateDetail: {
      isFetching: false,
    },
    updateProfile: {
      isFetching: false,
    }
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    getProfileSaga() {},

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

    updateDetailStart: (state) => {
      state.updateDetail.isFetching = true;
    },
    updateDetailSagaSuccess: (state) => {
      state.updateDetail.isFetching = false;
    },
    updateDetailFailed: (state) => {
      state.updateDetail.isFetching = false;
    },

    updateAvtStart: (state) => {
      state.updateAvt.isFetching = true;
    },
    updateAvtSagaSuccess: (state) => {
      state.updateAvt.isFetching = false;
    },
    deleteAvtSagaSuccess: (state) => {
      state.updateAvt.isFetching = false;
    },
    updateAvtFailed: (state) => {
      state.updateAvt.isFetching = false;
    },

    updateWallStart: (state) => {
      state.updateWall.isFetching = true;
    },
    updateWallpaperSagaSuccess: (state) => {
      state.updateWall.isFetching = false;
    },
    deleteWallpaperSagaSuccess: (state) => {
      state.updateWall.isFetching = false;
    },
    updateWallFailed: (state) => {
      state.updateWall.isFetching = false;
    },

    updateProfileStart: (state) => {
      state.updateProfile.isFetching = true;
    },
    updateProfileSagaSuccess: (state) => {
      state.updateProfile.isFetching = false;
    },
    updateProfileFailed: (state) => {
      state.updateProfile.isFetching = false;
    },
  },
});

export const {
  getProfileSaga,
  getProfileDetailStart,
  getProfileDetailSuccess,
  getProfileDetailFailed,

  searchProfileStart,
  searchProfileSuccess,
  searchProfileFailed,

  getGalleryStart,
  getGallerySuccess,
  getGalleryFailed,

  updateAvtStart,
  updateAvtSagaSuccess,
  deleteAvtSagaSuccess,
  updateAvtFailed,

  updateWallStart,
  updateWallpaperSagaSuccess,
  deleteWallpaperSagaSuccess,
  updateWallFailed,

  updateDetailStart,
  updateDetailSagaSuccess,
  updateDetailFailed,

  updateProfileStart,
  updateProfileSagaSuccess,
  updateProfileFailed,
} = profileSlice.actions;
export default profileSlice.reducer;
