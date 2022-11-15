import axios from 'axios';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { apiUrl } from '../common/environment/environment';
import api from '../common/environment/environment';
import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  deletePostFailed,
  deletePostStart,
  deletePostSuccess,
  getPostByProfileFailed,
  getPostByProfileStart,
  getPostByProfileSuccess,
  getPostFailed,
  getPostStart,
  getPostSuccess,
  likePostFailed,
  likePostStart,
  likePostSuccess,
  updatePostFailed,
  updatePostStart,
  updatePostSuccess,
} from './post/postSlice';
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
} from './auth/authSlice';
import {
  uploadImagePostFailed,
  uploadImagePostStart,
  uploadImagePostSuccess,
} from './uploadImage/uploadImageSlice';
import {
  acceptFailed,
  acceptStart,
  acceptSuccess,
  addFriendFailed,
  addFriendStart,
  addFriendSuccess,
  denyFailed,
  denyStart,
  denySuccess,
  getAllFriendFailed,
  getAllFriendForMainUserFailed,
  getAllFriendForMainUserStart,
  getAllFriendForMainUserSuccess,
  getAllFriendStart,
  getAllFriendSuccess,
  getRequestFailed,
  getRequestStart,
  getRequestSuccess,
  getMutualFriendFailed,
  getMutualFriendStart,
  getMutualFriendSuccess,
  isFriendFailed,
  isFriendStart,
  isFriendSuccess,
  isSentRequestFailed,
  isSentRequestStart,
  isSentRequestSuccess,
  getSuggestionStart,
  getSuggestionSuccess,
  getSuggestionFailed,
} from './friend/friendSlice';
import {
  getProfileDetailStart,
  getProfileDetailSuccess,
  getProfileDetailFailed,
} from './profile/profileSlice';
import { notifyService } from '../services/notifyService';
import { axiosInStanceJWT } from './axiosJWT';

const notify = (message, type) => {
  if (type === 'info') {
    toast.info(message, {
      autoClose: 1000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      theme: 'dark',
    });
  } else if (type === 'error') {
    toast.error(message, {
      autoClose: 1000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      theme: 'dark',
    });
  }
};

export const register = async (model, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, model);
    if (res) {
      dispatch(registerSuccess(res.data));

      navigate('/login');
    } else {
      notifyService.showError("Register Failed!")
      dispatch(registerFailed());
    }
  } catch (error) {
    notifyService.showError("Register Failed!")
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
      notifyService.showError("Login Failed!")
      dispatch(loginFailed());
    }
  } catch (error) {
    notifyService.showError("Login Failed!")
    dispatch(loginFailed());
  }
};
export const logOut = async (dispatch, accessToken, refreshToken) => {
  dispatch(logOutStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/auth/logout`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(logOutSuccess());
    } else {
      dispatch(logOutFailed());
      notify(res.data.message, 'error');
    }
  } catch (err) {
    console.log(err);
    dispatch(logOutFailed());
  }
};

export const getRefreshToken = async (dispatch, refreshToken) => {
  dispatch(loginStart());
  try {
    const config = {
      headers: {
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
      notify(res.data.message, 'error');
    }
  } catch (err) {
    console.log(err);
    dispatch(loginFailed());
  }
};
export const takeRefreshToken = async (refreshToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    const res = await axios.get(`${apiUrl}/auth/refresh`, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (
  accessToken,
  refreshToken,
  post,
  dispatch
) => {
  dispatch(createPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/newPost`,
      post,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(createPostSuccess(res.data));
      notify('Post Created', 'info');
    } else {
      dispatch(createPostFailed());
      notify(res.data.message, 'error');
    }
  } catch (error) {
    console.log(error);
    dispatch(createPostFailed());
  }
};
export const updatePost = async (
  accessToken,
  refreshToken,
  updatePost,
  dispatch
) => {
  dispatch(updatePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.put(
      `${apiUrl}/post/updatePost`,
      updatePost,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(updatePostSuccess());
      notify('Post Updated', 'info');
    } else {
      dispatch(updatePostFailed());
      notify(res.data.message, 'error');
    }
  } catch (error) {
    console.log(error);
    dispatch(updatePostFailed());
  }
};
export const deletePost = async (
  accessToken,
  refreshToken,
  postId,
  dispatch
) => {
  dispatch(deletePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.delete(
      `${apiUrl}/post/delete/${postId}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(deletePostSuccess());
      notify('Post Deleted', 'info');
    } else {
      dispatch(deletePostFailed());
      notify(res.data.message, 'error');
    }
  } catch (error) {
    console.log(error);
    dispatch(deletePostFailed());
  }
};
export const likePost = async (
  accessToken,
  refreshToken,
  postId,
  dispatch
) => {
  dispatch(likePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/like/${postId}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(likePostSuccess());
    } else {
      dispatch(likePostFailed());
      notify(res.data.message, 'error');
    }
  } catch (error) {
    dispatch(likePostFailed());
  }
};
export const getAllPost = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/all`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getPostSuccess(res.data));
    } else {
      dispatch(getPostFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getPostFailed());
  }
};
export const getPostByProfile = async (
  accessToken,
  refreshToken,
  profileId,
  dispatch
) => {
  dispatch(getPostByProfileStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(
      `${api.post}/getPost/${profileId}`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getPostByProfileSuccess(res.data));
    } else {
      dispatch(getPostByProfileFailed());
    }
  } catch (error) {
    dispatch(getPostByProfileFailed());
  }
};

export const uploadImages = async (
  accessToken,
  refreshToken,
  uploadImages,
  post_id,
  dispatch
) => {
  dispatch(uploadImagePostStart());
  try {
    const config = {
      'content-type': 'multipart/form-data;',
      Authorization: `Bearer ${accessToken}`,
    };
    let formData = new FormData();
    uploadImages.forEach((file) => {
      formData.append('files', file.files);
    });
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/image/profile_post/${post_id}/upload`,
      formData,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (res.data.message) {
      notify(res.data.message, 'error');
    } else {
      dispatch(uploadImagePostSuccess(res.data.results));
    }
  } catch (error) {
    console.log(error);
    dispatch(uploadImagePostFailed());
  }
};

export const removeUploadImages = async (
  accessToken,
  refreshToken,
  uploadImagesLink,
  post_id,
  dispatch
) => {
  debugger;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/image/profile_post/${post_id}/delete`,
      uploadImagesLink,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (res.data.message) {
      notify(res.data.message, 'error');
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

// #region Friend API
export const getAllFriendRequests = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getRequestStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(
      `${api.friend}/request/all`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getRequestSuccess(res.data.results));
    } else {
      dispatch(getRequestFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getRequestFailed());
  }
};
export const getAllFriends = async (
  accessToken,
  refreshToken,
  profileId,
  dispatch,
  forMainUser = true
) => {
  if (forMainUser) {
    dispatch(getAllFriendForMainUserStart());
  } else {
    dispatch(getAllFriendStart());
  }
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(
      `${api.friend}/all/${profileId}`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (forMainUser) {
        dispatch(getAllFriendForMainUserSuccess(res.data.results));
      } else {
        dispatch(getAllFriendSuccess(res.data.results));
      }
    } else {
      if (forMainUser) {
        dispatch(getAllFriendForMainUserFailed());
      } else {
        dispatch(getAllFriendFailed());
      }
    }
  } catch (error) {
    console.log(error);
    if (forMainUser) {
      dispatch(getAllFriendForMainUserFailed());
    } else {
      dispatch(getAllFriendFailed());
    }
  }
};
export const getMutualFriends = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(getMutualFriendStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/getMutualFriend/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getMutualFriendSuccess(res.data.results));
    } else {
      dispatch(getMutualFriendFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getMutualFriendFailed());
  }
};
export const addFriend = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(addFriendStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/sendFriendRequest/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(addFriendSuccess(res.data.results));
    } else {
      dispatch(addFriendFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(addFriendFailed());
  }
};
export const acceptFriendRequest = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(acceptStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/acceptFriendRequest/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(acceptSuccess(res.data.results));
    } else {
      dispatch(acceptFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(acceptFailed());
  }
};
export const denyFriendRequest = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(denyStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/denyFriendRequest/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(denySuccess(res.data.results));
    } else {
      dispatch(denyFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(denyFailed());
  }
};
export const isFriend = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(isFriendStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/isFriend/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(isFriendSuccess(res.data.results));
    } else {
      dispatch(isFriendFailed());
    }
  } catch (error) {
    dispatch(isFriendFailed());
  }
};
export const isSentFriendReq = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(isSentRequestStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.friend}/isSentFriendRequest/${id}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(isSentRequestSuccess(res.data.results));
    } else {
      dispatch(isSentRequestFailed());
    }
  } catch (error) {
    dispatch(isSentRequestFailed());
  }
};
// #endregion

export const getProfile = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(getProfileDetailStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.get(
      `${api.profile}/getProfileDetailById/${id}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (res.data.message) {
      notify(res.data.message, 'error');
    } else {
      dispatch(getProfileDetailSuccess(res.data.results));
    }
  } catch (error) {
    console.log(error);
    dispatch(getProfileDetailFailed());
  }
};
export const getFriendSuggestion = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getSuggestionStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 7,
    };
    const res = await axiosInStanceJWT.post(
      `${api.profile}/friendSuggestion`,
      paging,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getSuggestionSuccess(res.data.results));
    } else {
      dispatch(getSuggestionFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getSuggestionFailed());
  }
};
