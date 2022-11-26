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
  searchProfileStart,
  searchProfileSuccess,
  searchProfileFailed,
} from './profile/profileSlice';
import { notifyService } from '../services/notifyService';
import { axiosInStanceJWT } from './axiosJWT';
import { getProduct, getSellingProduct } from './product/productSlice';

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
      notifyService.showError('Register Failed!');
      dispatch(registerFailed());
    }
  } catch (error) {
    notifyService.showError('Register Failed!');
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
      notifyService.showError('Login Failed!');
      dispatch(loginFailed());
    }
  } catch (error) {
    notifyService.showError('Login Failed!');
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

export const searchProfile = async (
  accessToken,
  refreshToken,
  value,
  dispatch
) => {
  dispatch(searchProfileStart());
  try {
    const paging = {
      page: 0,
      pageSize: 7,
    };
    const res = await axiosInStanceJWT.post(
      `${api.profile}/search?name=${value}`,
      paging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(searchProfileSuccess(res.data.results));
    } else {
      dispatch(searchProfileFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(searchProfileFailed());
  }
};
export const getAllSellingProduct = async (
  accessToken,
  refreshToken,
  dispatch
) => {

  try {
    const paging ={
      page:0,
      pageSize:30,
    }
    const res = await axiosInStanceJWT.post(
      `${api.product}/selling/all`,
      paging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getSellingProduct(res.data.results.data))
    } else {
     
    }
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (
  accessToken,
  refreshToken,
  product,
  uploadImages
) => {

  try {

    const res = await axiosInStanceJWT.post(
      `${api.product}/create`,
      product,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (uploadImages && uploadImages.length > 0) {
        let product_id = res.data.results.product_id;
        const resImages = await uploadProductImages(
          accessToken,
          refreshToken,
          uploadImages,
          product_id,
        );
        console.log(resImages);
      }
    } else {
     
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadProductImages = async (
  accessToken,
  refreshToken,
  uploadImages,
  product_id,
) => {

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
      `${api.image}/product_image/${product_id}/upload`,
      formData,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
     
    } else {
     
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeUploadProductImages = async (
  accessToken,
  refreshToken,
  removeUploadImages,
  product_id,
) => {

  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.image}/product_image/${product_id}/delete`,
      removeUploadImages,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
     
    } else {
     
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (
  accessToken,
  refreshToken,
  product_id,
) => {

  try {

    const res = await axiosInStanceJWT.delete(
      `${api.product}/delete/${product_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
    } else {
     
    }
  } catch (error) {
    console.log(error);
  }
};