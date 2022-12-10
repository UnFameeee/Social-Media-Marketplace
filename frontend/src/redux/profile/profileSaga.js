import { put, takeLatest, call } from 'redux-saga/effects';
import api from '../../common/environment/environment';
import { axiosInStanceJWT } from '../axiosJWT';
import { notifyService } from '../../services/notifyService';
import { galleryPaging } from '../../common/constants/apiConfig';
import {
  updateAvtSagaSuccess,
  updateDetailSagaSuccess,
  updateWallpaperSagaSuccess,
  deleteAvtSagaSuccess,
  deleteWallpaperSagaSuccess,
  getProfileDetailSuccess,
  getProfileSaga,
  getGallerySuccess,
  getProfileDetailFailed,
  getGalleryFailed,
  updateAvtStart,
  updateAvtFailed,
  updateWallStart,
  updateWallFailed,
  updateDetailStart,
  updateDetailFailed,
} from './profileSlice';
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
import { updateUserAvt, updateUserWall } from '../auth/authSlice';

export function* refreshProfile() {
  yield takeLatest(
    [
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
  dispatch(
    getProfileSaga({
      accessToken,
      refreshToken,
      id,
      callRefreshFriend,
      callRefreshPost,
      callRefreshGallery,
      dispatch,
    })
  );
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
      return res;
    } else {
      console.log(res.data.message);
      dispatch(getProfileDetailFailed());
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(getProfileDetailFailed());
    notifyService.showError(error.message);
  }
}

// #region update avatar
export async function updateAvtRequest(data) {
  const {
    accessToken,
    refreshToken,
    avatar,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data;

  var bodyFormData = new FormData();
  bodyFormData.append('file', avatar);

  dispatch(updateAvtStart());

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
          dispatch,
        })
      );
      dispatch(updateUserAvt(res.data.results));
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateAvtFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Avatar Failed!');
    dispatch(updateAvtFailed());
  }
}
// #endregion

// #region update wall paper
export async function updateWallRequest(data) {
  const {
    accessToken,
    refreshToken,
    wallpaper,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data;

  var bodyFormData = new FormData();
  bodyFormData.append('file', wallpaper);

  dispatch(updateWallStart());

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
          dispatch,
        })
      );
      dispatch(updateUserWall(res.data.results));
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateWallFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Wallpaper Failed!');
    dispatch(updateWallFailed());
  }
}
// #endregion

// #region update details
export async function updateDetailRequest(data) {
  const {
    accessToken,
    refreshToken,
    description,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data;
  dispatch(updateDetailStart());
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
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateDetailFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Profile Failed!');
    dispatch(updateDetailFailed());
  }
}
// #endregion

// #region delete avt
export async function deleteAvtRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data;
  dispatch(updateAvtStart());
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
          dispatch,
        })
      );
      dispatch(updateUserAvt(''));
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateAvtFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Remove Avatar Failed!');
    dispatch(updateAvtFailed());
  }
}
// #endregion

// #region delete wall
export async function deleteWallRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = true,
    dispatch,
  } = data;
  dispatch(updateWallStart());
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
          dispatch,
        })
      );
      dispatch(updateUserWall(''));
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(updateWallFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Remove Wallpaper Failed!');
    dispatch(updateWallFailed());
  }
}
// #endregion

// #region refresh gallery images
export function* getGalleryImageReq() {
  yield takeLatest(
    [
      getProfileSaga.type,

      createPostSagaSuccess.type,
      updatePostSagaSuccess.type,
      deletePostSagaSuccess.type,
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
    const res = await axiosInStanceJWT.post(
      `${api.profile}/galleryImage/${id}`,
      galleryPaging,
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
      console.log(res.data.mess);
      notifyService.showError(res.data.message);
      dispatch(getGalleryFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getGalleryFailed());
  }
}
// #endregion
