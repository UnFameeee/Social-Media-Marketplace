import axios from "axios";
import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  deletePostFailed,
  deletePostStart,
  deletePostSuccess,
  getPostFailed,
  getPostStart,
  getPostSuccess,
  updatePostFailed,
  updatePostStart,
  updatePostSuccess,
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
export const login = async (model, dispatch, navigate, from) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, model);
    if (res.data) {
      dispatch(loginSuccess(res.data));
      navigate(from, { replace: true });
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
export const createPost = async (accessToken, post, dispatch) => {
  dispatch(createPostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.post(`${apiUrl}/post/newPost`, post, config);
    dispatch(createPostSuccess(res.data));
  } catch (error) {
    dispatch(createPostFailed());
  }
};
export const updatePost = async (accessToken, updatePost, dispatch) => {
  dispatch(updatePostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.put(
      `${apiUrl}/post/updatePost`,
      updatePost,
      config
    );
    if (res) {
      dispatch(updatePostSuccess());
    }
  } catch (error) {
    dispatch(updatePostFailed());
  }
};
export const deletePost = async (accessToken, postId, dispatch) => {
  dispatch(deletePostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.delete(`${apiUrl}/post/delete/${postId}`, config);
    if (res.result) {
      dispatch(deletePostSuccess());
    }
  } catch (error) {
    dispatch(deletePostFailed());
  }
};
export const getAllPost = async (accessToken, dispatch) => {
  dispatch(getPostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axios.post(`${apiUrl}/post/all`, paging, config);
    dispatch(getPostSuccess(res.data));
  } catch (error) {
    dispatch(getPostFailed());
  }
};
