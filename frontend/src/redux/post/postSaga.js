import { put, takeLatest, call, fork } from 'redux-saga/effects';
import api from '../../common/environment/environment';
import { axiosInStanceJWT } from '../axiosJWT';
import {
  createPostFailed,
  createPostSaga,
  createPostSagaSuccess,
  createPostStart,
  createPostSuccess,
  deletePostFailed,
  deletePostSaga,
  deletePostSagaSuccess,
  deletePostStart,
  deletePostSuccess,
  getPostByIdFailed,
  getPostByIdSuccess,
  getPostByProfileFailed,
  getPostByProfileStart,
  getPostByProfileSuccess,
  getPostFailed,
  getPostStart,
  getPostSuccess,
  likePostFailed,
  likePostSaga,
  likePostSagaSuccess,
  likePostStart,
  likePostSuccess,
  updatePostFailed,
  updatePostSaga,
  updatePostSagaSuccess,
  updatePostStart,
  updatePostSuccess,
} from './postSlice';
import { notifyService } from '../../services/notifyService';
import { removeUploadImages, uploadImages } from '../apiRequest';
import { getProfileSagaSuccess } from '../profile/profileSlice';
import {
  commentPostSagaSuccess,
  getCommentPostSagaSuccess,
} from '../comment/commentSlice';
import { postPaging } from '../../common/constants/apiConfig';

//#region reFreshPosts
export function* reFreshPosts() {
  yield takeLatest(
    [
      getProfileSagaSuccess.type,

      createPostSagaSuccess.type,
      deletePostSagaSuccess.type,
      updatePostSagaSuccess.type,
      likePostSagaSuccess.type,
      getCommentPostSagaSuccess.type,
    ],
    handleReFreshPostSaga
  );
}
function* handleReFreshPostSaga(data) {
  try {
    if (data.payload?.callRefreshPost) {
      const getAll = yield call(getAllPostSagaRequest, data);
      if (data.payload?.id) {
        yield put(getPostByProfileSuccess(getAll.data));
      } else {
        yield put(getPostSuccess(getAll.data));
      }
    }
  } catch (error) {
    console.log(error);
  }
}
const getAllPostSagaRequest = async (data) => {
  const { accessToken, refreshToken, id, dispatch } = data.payload;
  if (data.payload?.id) {
    dispatch(getPostByProfileStart());
  } else {
    // dispatch(getPostStart());
  }
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    var url = id ? `${api.post}/getPost/${id}` : `${api.post}/all`;

    const res = await axiosInStanceJWT.post(url, postPaging, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      // dispatch(getPostSuccess(res.data));
      return res;
    } else {
      if (data.payload?.id) {
        dispatch(getPostByProfileFailed());
      } else {
        //  dispatch(getPostFailed());
      }
    }
  } catch (error) {
    console.log(error);

    if (data.payload?.id) {
      dispatch(getPostByProfileFailed());
    } else {
      dispatch(getPostFailed());
    }
  }
};
//#endregion

// #region refresh one post
export function* reFreshOnePost() {
  yield takeLatest(
    [updatePostSagaSuccess.type, likePostSagaSuccess.type],
    handleRefreshOnePostSaga
  );
}
function* handleRefreshOnePostSaga(data) {
  try {
    if (data.payload?.callRefreshOnePost) {
      const getAll = yield call(getOnePostSagaRequest, data);
      yield put(getPostByIdSuccess(getAll.data));
    }
  } catch (error) {
    console.log(error);
  }
}
const getOnePostSagaRequest = async (data) => {
  const { accessToken, refreshToken, postId, dispatch } =
    data.payload;
  // dispatch(getPostStart());
  try {
    const res = await axiosInStanceJWT.get(`${api.post}/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      return res;
    } else {
      console.log(res.data.message);
      dispatch(getPostByIdFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getPostByIdFailed());
  }
};
// #endregion

//#region createNewPost
export function* createNewPost() {
  yield takeLatest(createPostSaga.type, handleCreatePost);
}
function* handleCreatePost(data) {
  try {
    const create = yield call(createPostSagaRequest, data);
    yield put(createPostSuccess(create.data));
  } catch (error) {
    console.log(error);
  }
}
const createPostSagaRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    postData_written_text,
    uploadImage,
    callRefreshPost = true,
    callRefreshGallery = false,
    id,
    dispatch,
  } = data.payload;
  dispatch(createPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${api.post}/newPost`,
      postData_written_text,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (uploadImage && uploadImage.length > 0) {
        let post_id = res.data.results.post_id;
        const resImages = await uploadImages(
          accessToken,
          refreshToken,
          uploadImage,
          post_id,
          dispatch
        );
        console.log(resImages);
      }
      dispatch(
        createPostSagaSuccess({
          accessToken,
          refreshToken,
          callRefreshPost,
          callRefreshGallery,
          id,
          dispatch,
        })
      );
      notifyService.showSuccess('Create Post Successfully');
      return res;
    } else {
      dispatch(createPostFailed());
      notifyService.showError('Create Post Failed');
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Create Post Failed');
    dispatch(createPostFailed());
  }
};
//#endregion

//#region deleteOnePost
export function* deleteOnePost() {
  yield takeLatest(deletePostSaga.type, handleDeletePost);
}
function* handleDeletePost(data) {
  try {
    const deleteOne = yield call(deletePostSagaRequest, data);
    yield put(deletePostSuccess(deleteOne.data));
  } catch (error) {
    console.log(error);
  }
}
export const deletePostSagaRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    postId,
    callRefreshPost = true,
    callRefreshGallery = false,
    id,
    dispatch,
    navigate,
    postUrl,
  } = data.payload;
  dispatch(deletePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.delete(
      `${api.post}/delete/${postId}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (postUrl) {
        navigate('/', { replace: true });
      } else {
        dispatch(
          deletePostSagaSuccess({
            accessToken,
            refreshToken,
            callRefreshPost,
            callRefreshGallery,
            postId,
            id,
            dispatch,
          })
        );
      }
      notifyService.showSuccess('Delete Post Successfully');
      return res;
    } else {
      dispatch(deletePostFailed());
      notifyService.showError('Delete Post Failed');
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Delete Post Failed');
    dispatch(deletePostFailed());
  }
};
//#endregion

//#region updateOnePost
export function* updateOnePost() {
  yield takeLatest(updatePostSaga.type, handleUpdatePost);
}
function* handleUpdatePost(data) {
  try {
    const updateOne = yield call(updatePostSagaRequest, data);
    yield put(updatePostSuccess(updateOne.data));
  } catch (error) {
    console.log(error);
  }
}
const updatePostSagaRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    updatePost,
    uploadImage,
    removeImages,
    callRefreshPost = true,
    callRefreshOnePost = false,
    callRefreshGallery = false,
    id,
    dispatch,
  } = data.payload;
  dispatch(updatePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.put(
      `${api.post}/updatePost`,
      updatePost,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      if (removeImages.length > 0) {
        const resRemoveImage = await removeUploadImages(
          accessToken,
          refreshToken,
          removeImages,
          updatePost.post_id,
          dispatch
        );
        console.log('resRemoveImage', resRemoveImage);
      }
      if (uploadImage.length > 0) {
        const resImages = await uploadImages(
          accessToken,
          refreshToken,
          uploadImage,
          updatePost.post_id,
          dispatch
        );
        console.log(resImages);
      }
      dispatch(
        updatePostSagaSuccess({
          accessToken,
          refreshToken,
          callRefreshPost,
          callRefreshOnePost,
          callRefreshGallery,
          postId: updatePost.post_id,
          id,
          dispatch,
        })
      );
      notifyService.showSuccess('Update Post Successfully');
      return res;
    } else {
      dispatch(updatePostFailed());
      notifyService.showError('Update Post Failed');
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Post Failed');
    dispatch(updatePostFailed());
  }
};
//#endregion

//#region likeOnePost
export function* likeOnePost() {
  yield takeLatest(likePostSaga.type, handleLikePost);
}
function* handleLikePost(data) {
  try {
    const likePost = yield call(likePostSagaRequest, data);
    yield put(likePostSuccess(likePost.data));
  } catch (error) {
    console.log(error);
  }
}
const likePostSagaRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    postId,
    callRefreshPost = true,
    callRefreshOnePost = false,
    id,
    dispatch,
  } = data.payload;
  dispatch(likePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${api.post}/like/${postId}`,
      {},
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      // dispatch(likePostSuccess());
      dispatch(
        likePostSagaSuccess({
          accessToken,
          refreshToken,
          callRefreshPost,
          callRefreshOnePost,
          postId,
          id,
          dispatch,
        })
      );
      return res;
    } else {
      dispatch(likePostFailed());
      // notify(res.data.message, "error");
    }
  } catch (error) {
    console.log(error);
    dispatch(likePostFailed());
  }
};
//#endregion
