import { createSlice } from '@reduxjs/toolkit';
import { refreshToken } from '../apiRequest';
import { revertAll } from '../resetStore';
const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
  logout: {
    isFetching: false,
    error: false,
  },
  user: {
    userData: null,
  },
};
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
    user: {
      userData: null,
    },
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logOutStart: (state) => {
      state.logout.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.currentUser = null;
      state.logout.error = false;
    },
    logOutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
    },
    userDataAssign: (state, action) => {
      state.user.userData = action.payload;
    },
    updateUserAvt: (state, action) => {
      state.user.userData.profile.avatar = action.payload;
    },
    updateUserWall: (state, action) => {
      state.user.userData.profile.wallpaper = action.payload;
    },
    refreshTokenSuccess: (state, action) => {
      state.login.currentUser = action.payload;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerFailed,
  registerSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  userDataAssign,
  refreshTokenSuccess,
  updateUserAvt,
  updateUserWall,
} = authSlice.actions;

export default authSlice.reducer;
