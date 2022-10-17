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
  likePostFailed,
  likePostStart,
  likePostSuccess,
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
  userDataAssign,
} from "./authSlice";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const notify = (message, type) => {
  if (type === "info") {
    toast.info(message, {
      autoClose: 1000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      theme: "dark",
    });
  } else if (type === "error") {
    toast.error(message, {
      autoClose: 1000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      theme: "dark",
    });
  }
};
export const register = async (model, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, model);
    if (res) {
      dispatch(registerSuccess(res.data));

      navigate("/login");
    } else {
      dispatch(registerFailed());
    }
  } catch (error) {
    dispatch(registerFailed());
  }
};
export const login = async (model, dispatch, navigate, from) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, model);
    if (res) {
      var token = res.data.access;
      var decoded = jwt_decode(token);
      dispatch(loginSuccess(res.data));
      dispatch(userDataAssign(decoded));
      navigate(from, { replace: true });
    } else {
      dispatch(loginFailed());
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
    if (!res.data.message) {
      dispatch(createPostSuccess(res.data));
      notify("Post Created", "info");
    } else {
      dispatch(createPostFailed());
      notify(res.data.message, "error");
    }
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
    if (!res.data.message) {
      dispatch(updatePostSuccess());
      notify("Post Updated", "info");
    } else {
      dispatch(updatePostFailed());
      notify(res.data.message, "error");
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
    if (!res.data.message) {
      dispatch(deletePostSuccess());
      notify("Post Deleted", "info");
    } else {
      dispatch(deletePostFailed());
      notify(res.data.message, "error");
    }
  } catch (error) {
    dispatch(deletePostFailed());
  }
};
export const likePost = async (accessToken, postId, dispatch) => {
  dispatch(likePostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.post(`${apiUrl}/post/like/${postId}`, {}, config);
    if (!res.data.message) {
      dispatch(likePostSuccess());
    } else {
      dispatch(likePostFailed());
      notify(res.data.message, "error");
    }
  } catch (error) {
    dispatch(likePostFailed());
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
    if (!res.data.message) {
      dispatch(getPostSuccess(res.data));
    } else {
      dispatch(getPostFailed());
    }
  } catch (error) {
    dispatch(getPostFailed());
  }
};
