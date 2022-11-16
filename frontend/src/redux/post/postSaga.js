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
import { commentPostSagaSuccess } from '../comment/commentSlice';

//#region reFreshPosts
export function* reFreshPosts() {
  yield takeLatest(
    [
      createPostSagaSuccess.type,
      deletePostSagaSuccess.type,
      updatePostSagaSuccess.type,
      likePostSagaSuccess.type,
      getProfileSagaSuccess.type,
      commentPostSagaSuccess.type,
    ],
    handleReFreshPostSaga
  );
}
function* handleReFreshPostSaga(data) {
  try {
    const getAll = yield call(getAllPostSagaRequest, data);
    if (data.payload?.id || data.payload?.mainId) {
      yield put(getPostByProfileSuccess(getAll.data));
    } else {
      yield put(getPostSuccess(getAll.data));
    }
  } catch (error) {
    console.log(error);
  }
}
const getAllPostSagaRequest = async (data) => {
  const { accessToken, refreshToken, id, mainId, dispatch } =
    data.payload;
  // dispatch(getPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    var url =
      id || mainId
        ? `${api.post}/getPost/${id ?? mainId}`
        : `${api.post}/all`;

    const res = await axiosInStanceJWT.post(url, paging, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
    if (!res.data.message) {
      // dispatch(getPostSuccess(res.data));
      return res;
    } else {
      //  dispatch(getPostFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(getPostFailed());
  }
};
//#endregion

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
      if (uploadImage.length > 0) {
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
      dispatch(createPostSagaSuccess({ accessToken, refreshToken }));
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
  const { accessToken, refreshToken, postId, dispatch } =
    data.payload;
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
      dispatch(deletePostSagaSuccess({ accessToken, refreshToken }));
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
      dispatch(updatePostSagaSuccess({ accessToken, refreshToken }));
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
  const { accessToken, refreshToken, postId, dispatch } =
    data.payload;
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
      dispatch(likePostSagaSuccess({ accessToken, refreshToken }));
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
