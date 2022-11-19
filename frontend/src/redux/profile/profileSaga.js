import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import {
  deleteAvtSaga,
  deleteAvtSagaSuccess,
  deleteWallpaperSaga,
  deleteWallpaperSagaSuccess,
  getGalleryFailed,
  getGallerySaga,
  getGallerySuccess,
  getProfileDetailSuccess,
  getProfileSaga,
  getProfileSagaSuccess,
  searchProfileSuccess,
  updateAvtFailed,
  updateAvtSaga,
  updateAvtSagaSuccess,
  updateAvtSuccess,
  updateDetailSaga,
  updateDetailSagaSuccess,
  updateWallpaperFailed,
  updateWallpaperSaga,
  updateWallpaperSagaSuccess,
  updateWallpaperSuccess,
} from './profileSlice';
import { notifyService } from '../../services/notifyService';
import {
  acceptSagaSuccess,
  addFriendSagaSuccess,
  denySagaSuccess,
  unfriendSagaSuccess,
} from '../friend/friendSlice';
import {
  createPostSagaSuccess,
  deletePostSagaSuccess,
  updatePostSagaSuccess,
} from '../post/postSlice';

export function* refreshProfile() {
  yield takeLatest(
    [
      getProfileSaga.type,
      updateAvtSagaSuccess.type,
      updateWallpaperSagaSuccess.type,
      updateDetailSagaSuccess.type,
      deleteAvtSagaSuccess.type,
      deleteWallpaperSagaSuccess.type,

      addFriendSagaSuccess.type,
      unfriendSagaSuccess.type,
      acceptSagaSuccess.type,
      denySagaSuccess.type,
    ],
    handleRefreshProfileSaga
  );
}
function* handleRefreshProfileSaga(data) {
  try {
    if (data?.payload?.callRefreshProfile) {
      const getAll = yield call(getProfileDetailSaga, data);
      yield put(getProfileDetailSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getProfileDetailSaga(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshFriend = true,
    callRefreshPost = true,
    callRefreshGallery = true,
    dispatch,
  } = data.payload;
  try {
    const res = await axiosInStanceJWT.get(
      `${api.profile}/getProfileDetailById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        getProfileSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshFriend,
          callRefreshPost,
          callRefreshGallery,
          dispatch,
        })
      );
      return res;
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

// #region update profile
export function* updateAvtReq() {
  yield takeLatest(updateAvtSaga.type, handleUpdateAvt);
}
function* handleUpdateAvt(data) {
  try {
    const avt = yield call(updateAvtSagaRequest, data);
    yield put(updateAvtSuccess(avt.data));
  } catch (error) {
    console.log(error);
  }
}
async function updateAvtSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    avatar,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data.payload;
  var bodyFormData = new FormData();
  bodyFormData.append('file', avatar);

  try {
    const res = await axiosInStanceJWT.post(
      `${api.image}/profile_avatar/upload`,
      bodyFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      notifyService.showSuccess('Update Avatar Successfully!');
      dispatch(
        updateAvtSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
          callRefreshFriend: false,
          callRefreshPost: false,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateAvtFailed());
    }
  } catch (error) {
    notifyService.showError('Update Avatar Failed!');
    dispatch(updateAvtFailed());
  }
}

export function* updateWallReq() {
  yield takeLatest(updateWallpaperSaga.type, handleUpdateWall);
}
function* handleUpdateWall(data) {
  try {
    const wall = yield call(updateWallSagaRequest, data);
    yield put(updateWallpaperSuccess(wall.data));
  } catch (error) {
    console.log(error);
  }
}
async function updateWallSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    wallpaper,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data.payload;

  var bodyFormData = new FormData();
  bodyFormData.append('file', wallpaper);

  try {
    const res = await axiosInStanceJWT.post(
      `${api.image}/profile_wallpaper/upload`,
      bodyFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      notifyService.showSuccess('Update Wallpaper Successfully!');
      dispatch(
        updateWallpaperSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
          callRefreshFriend: false,
          callRefreshPost: false,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateWallpaperFailed());
    }
  } catch (error) {
    notifyService.showError('Update Wallpaper Failed!');
    dispatch(updateWallpaperFailed());
  }
}

export function* updateDetailReq() {
  yield takeLatest(updateDetailSaga.type, handleUpdateDetail);
}
function* handleUpdateDetail(data) {
  try {
    const detail = yield call(updateDetailSagaRequest, data);
    // yield put(updateDetailSuccess(detail.data));
  } catch (error) {
    console.log(error);
  }
}
async function updateDetailSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    description,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data.payload;

  try {
    const res = await axiosInStanceJWT.put(
      `${api.profile}/description`,
      description,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      notifyService.showSuccess('Update Profile Successfully!');
      dispatch(
        updateDetailSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
          callRefreshFriend: false,
          callRefreshPost: false,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      // dispatch(updateWallpaperFailed());
    }
  } catch (error) {
    notifyService.showError('Update Profile Failed!');
    // dispatch(updateWallpaperFailed());
  }
}
// #endregion

// #region delete images
export function* deleteAvtReq() {
  yield takeLatest(deleteAvtSaga.type, handleDeleteAvt);
}
function* handleDeleteAvt(data) {
  try {
    const delAvt = yield call(deleteAvtSagaRequest, data);
    // yield put(deleteAvtSuccess(delAvt.data));
  } catch (error) {
    console.log(error);
  }
}
async function deleteAvtSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data.payload;

  try {
    const res = await axiosInStanceJWT.delete(
      `${api.image}/profile_avatar/delete`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      notifyService.showSuccess('Remove Avatar Successfully!');
      dispatch(
        deleteAvtSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
          callRefreshFriend: false,
          callRefreshPost: false,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      // dispatch(deleteAvtFailed());
    }
  } catch (error) {
    notifyService.showError('Remove Avatar Failed!');
    // dispatch(deleteAvtFailed());
  }
}

export function* deleteWallReq() {
  yield takeLatest(deleteWallpaperSaga.type, handleDeleteWall);
}
function* handleDeleteWall(data) {
  try {
    const deleteWall = yield call(deleteWallSagaRequest, data);
    // yield put(deleteWallpaperSuccess(deleteWall.data));
  } catch (error) {
    console.log(error);
  }
}
async function deleteWallSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data.payload;

  try {
    const res = await axiosInStanceJWT.delete(
      `${api.image}/profile_wallpaper/delete`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      notifyService.showSuccess('Remove Wallpaper Successfully!');
      dispatch(
        deleteWallpaperSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
          callRefreshFriend: false,
          callRefreshPost: false,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      // dispatch(deleteWallpaperFailed());
    }
  } catch (error) {
    notifyService.showError('Remove Wallpaper Failed!');
    // dispatch(deleteWallpaperFailed());
  }
}
// #endregion

export function* getGalleryImageReq() {
  yield takeLatest(
    [
      getGallerySaga.type,

      getProfileSagaSuccess.type,
      createPostSagaSuccess.type,
      deletePostSagaSuccess.type,
      updatePostSagaSuccess.type,
    ],
    handleGetGallery
  );
}
function* handleGetGallery(data) {
  try {
    if (data.payload?.callRefreshGallery) {
      const galleryImg = yield call(getGallerySagaRequest, data);
      yield put(getGallerySuccess(galleryImg.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getGallerySagaRequest(data) {
  const { accessToken, refreshToken, id, dispatch } = data.payload;

  try {
    const res = await axiosInStanceJWT.get(
      `${api.profile}/galleryImage/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      return res;
    } else {
      dispatch(getGalleryFailed());
    }
  } catch (error) {
    dispatch(getGalleryFailed());
  }
}
