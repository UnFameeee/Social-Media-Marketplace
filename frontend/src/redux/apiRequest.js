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
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InByb2ZpbGVfaWQiOjEsInByb2ZpbGVfbmFtZSI6IlRlc3RQcm9maWxlMTIzIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGtSZXR3ZHJQaDJmdnF1ek9BaUhJRWVXWHgydFlUdzVhWEpIcmtrbUdMMzBHTUg1eUxhenk2IiwiYmlydGgiOiJ0ZXN0IGJpcnRoIiwiY3VycmVudEhhc2hlZFJlZnJlc2hUb2tlbiI6bnVsbCwiaXNBY3RpdmF0ZSI6dHJ1ZSwicm9sZSI6IlVzZXIiLCJwZXJtaXNzaW9uIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE2NjQ4OTg2NzIsImV4cCI6MTY2NDkwMjI3Mn0.-ACXXQ5wqoCxwc7aawymlvYDex6JROuOWI77yU0XD_M"
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
