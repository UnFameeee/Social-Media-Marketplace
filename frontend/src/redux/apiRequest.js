import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../common/environment/environment";
import api from "../common/environment/environment";
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
import {
  uploadImagePostFailed,
  uploadImagePostStart,
  uploadImagePostSuccess,
} from "./uploadImageSlice";
import {
  acceptFriendRequestFailed,
  acceptFriendRequestStart,
  acceptFriendRequestSuccess,
  addFriendFailed,
  addFriendStart,
  addFriendSuccess,
  denyFriendRequestFailed,
  denyFriendRequestStart,
  denyFriendRequestSuccess,
  getAllFriendFailed,
  getAllFriendStart,
  getAllFriendSuccess,
  getFriendRequestFailed,
  getFriendRequestStart,
  getFriendRequestSuccess,
  getMutualFriendFailed,
  getMutualFriendStart,
  getMutualFriendSuccess,
} from "./friendSlice";
import {
  getProfileDetailStart,
  getProfileDetailSuccess,
  getProfileDetailFailed,
  getFriendSuggestionFailed,
  getFriendSuggestionStart,
  getFriendSuggestionSuccess,
} from "./profileSlice";
import { axiosInStanceJWT } from "./axiosJWT";

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
export const logOut = async (dispatch, accessToken) => {
  dispatch(logOutStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axiosInStanceJWT.post(`${apiUrl}/auth/logout`, {}, config);
    if (!res.data.message) {
      dispatch(logOutSuccess());
    } else {
      dispatch(logOutFailed());
      notify(res.data.message, "error");
    }
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const getRefreshToken = async (dispatch, refreshToken) => {
  dispatch(loginStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const res = await axios.get(`${apiUrl}/auth/refresh`, config);
    if (!res.data.message) {
      var token = res.data.access;
      var decoded = jwt_decode(token);
      dispatch(loginSuccess(res.data));
      dispatch(userDataAssign(decoded));
    } else {
      dispatch(loginFailed());
      notify(res.data.message, "error");
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const takeRefreshToken = async (refreshToken) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const res = await axios.get(`${apiUrl}/auth/refresh`, config);
    return res.data;
  } catch (error) {
    console.log(error);
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
   
    const res = await axiosInStanceJWT.post(`${apiUrl}/post/newPost`, post, config);
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
    const res = await axiosInStanceJWT.put(
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
    const res = await axiosInStanceJWT.delete(`${apiUrl}/post/delete/${postId}`, config);
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
    const res = await axiosInStanceJWT.post(`${apiUrl}/post/like/${postId}`, {}, config);
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
    const res = await axiosInStanceJWT.post(`${apiUrl}/post/all`, paging, config);
    if (!res.data.message) {
      dispatch(getPostSuccess(res.data));
    } else {
      dispatch(getPostFailed());
    }
  } catch (error) {
    dispatch(getPostFailed());
  }
};

export const uploadImages = async (accessToken, uploadImages, dispatch) => {
  dispatch(uploadImagePostStart());
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data;",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let formData = new FormData();
    uploadImages.forEach((file) => {
      formData.append("files", file.files);
    });
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/image/post/upload`,
      formData,
      config
    );
    if (res.data.message) {
      notify(res.data.message, "error");
    } else {
      dispatch(uploadImagePostSuccess(res.data.results));
    }
  } catch (error) {
    console.log(error);
    dispatch(uploadImagePostFailed());
  }
};

// #region Friend API
export const getAllFriendRequests = async (accessToken, dispatch) => {
  dispatch(getFriendRequestStart());
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
    const res = await axiosInStanceJWT.post(`${api.friend}/request/all`, paging, config);
    if (!res.data.message) {
      dispatch(getFriendRequestSuccess(res.data.results));
    } else {
      dispatch(getFriendRequestFailed());
    }
  } catch (error) {
    dispatch(getFriendRequestFailed());
  }
};
export const getAllFriends = async (accessToken, dispatch) => {
  dispatch(getAllFriendStart());
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
    const res = await axiosInStanceJWT.post(`${api.friend}/all`, paging, config);
    if (!res.data.message) {
      dispatch(getAllFriendSuccess(res.data.results));
    } else {
      dispatch(getAllFriendFailed());
    }
  } catch (error) {
    dispatch(getAllFriendFailed());
  }
};
export const getMutualFriends = async (accessToken, id, dispatch) => {
  dispatch(getMutualFriendStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/getMutualFriend/${id}`,
      {},
      config
    );
    if (!res.data.message) {
      dispatch(getMutualFriendSuccess(res.data.results));
    } else {
      dispatch(getMutualFriendFailed());
    }
  } catch (error) {
    dispatch(getMutualFriendFailed());
  }
};
export const addFriend = async (accessToken, id, dispatch) => {
  dispatch(addFriendStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/sendFriendRequest/${id}`,
      {},
      config
    );
    if (!res.data.message) {
      dispatch(addFriendSuccess(res.data.results));
    } else {
      dispatch(addFriendFailed());
    }
  } catch (error) {
    dispatch(addFriendFailed());
  }
};
export const acceptFriendRequest = async (accessToken, id, dispatch) => {
  dispatch(acceptFriendRequestStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/acceptFriendRequest/${id}`,
      {},
      config
    );
    if (!res.data.message) {
      dispatch(acceptFriendRequestSuccess(res.data.results));
    } else {
      dispatch(acceptFriendRequestFailed());
    }
  } catch (error) {
    dispatch(acceptFriendRequestFailed());
  }
};
export const denyFriendRequest = async (accessToken, id, dispatch) => {
  dispatch(denyFriendRequestStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/denyFriendRequest/${id}`,
      {},
      config
    );
    if (!res.data.message) {
      dispatch(denyFriendRequestSuccess(res.data.results));
    } else {
      dispatch(denyFriendRequestFailed());
    }
  } catch (error) {
    dispatch(denyFriendRequestFailed());
  }
};
export const isFriend = async (accessToken, id, dispatch) => {
  dispatch(acceptFriendRequestStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(`${api.friend}/isFriend/${id}`, {}, config);
    if (!res.data.message) {
      dispatch(acceptFriendRequestSuccess(res.data.results));
    } else {
      dispatch(acceptFriendRequestFailed());
    }
  } catch (error) {
    dispatch(acceptFriendRequestFailed());
  }
};
// #endregion

export const getProfile = async (accessToken, id, dispatch) => {
  dispatch(getProfileDetailStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axiosInStanceJWT.get(
      `${api.profile}/getProfileDetailById/${id}`,
      config
    );
    if (res.data.message) {
      notify(res.data.message, "error");
    } else {
      dispatch(getProfileDetailSuccess(res.data.results));
    }
  } catch (error) {
    console.log(error);
    dispatch(getProfileDetailFailed());
  }
};
export const getFriendSuggestion = async (accessToken, dispatch) => {
  dispatch(getFriendSuggestionStart());
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
    const res = await axiosInStanceJWT.post(
      `${api.profile}/friendSuggestion`,
      paging,
      config
    );
    if (!res.data.message) {
      dispatch(getFriendSuggestionSuccess(res.data.results));
    } else {
      dispatch(getFriendSuggestionFailed());
    }
  } catch (error) {
    dispatch(getFriendSuggestionFailed());
  }
};
