import axios from "axios";
import {
  createFailed,
  createStart,
  createSuccess,
  getFailed,
  getStart,
  getSuccess,
} from "./postSlice";
import { apiUrl } from "../common/environment/environment";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
export const register = async (model, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, model);
    if (res.data) {
      dispatch(registerSuccess(res.data));
      navigate("/login");
    }
  } catch (error) {
    dispatch(registerFailed());
  }
};
export const login = async (model, dispatch, navigate) => {
  debugger
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, model);
    if (res.data) {
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const logOut = async (dispatch) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(logOutFailed());
  }
};
export const createPost = async (accessToken,post, dispatch) => {
  dispatch(createStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.post(`${apiUrl}/post/newPost`, post, config);
    dispatch(createSuccess(res.data));
  } catch (error) {
    dispatch(createFailed());
  }
};

export const getAllPost = async (accessToken,dispatch) => {
  dispatch(getStart());
  try {
    debugger
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const paging = {
      page: 1,
      pageSize: 5,
    };
    const res = await axios.post(`${apiUrl}/post/all`, paging,config);
    dispatch(getSuccess(res.data));
  } catch (error) {
    dispatch(getFailed());
  }
};
