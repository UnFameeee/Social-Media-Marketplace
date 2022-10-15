import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./resetStore";
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
}
export const authSlice = createSlice({
  name: "auth",
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
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
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
    logOutSuccess
} = authSlice.actions

export default authSlice.reducer