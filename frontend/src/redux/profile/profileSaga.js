import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import {
  updateAvtSagaSuccess,
  updateDetailSagaSuccess,
  updateWallpaperSagaSuccess,
  deleteAvtSagaSuccess,
  deleteWallpaperSagaSuccess,

  getProfileDetailSuccess,
  getProfileSaga,
  getProfileSagaSuccess,
  getGallerySuccess,
} from './profileSlice';
import { notifyService } from '../../services/notifyService';
import {
  acceptSagaSuccess,
  addFriendSagaSuccess,
  denySagaSuccess,
  unfriendSagaSuccess,
} from '../friend/friendSlice';
import { galleryPaging } from '../../common/constants/apiConfig';
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
      return res;
    } else {
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Avatar Failed!');
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
      return res;
    } else {
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Wallpaper Failed!');
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
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Update Profile Failed!');
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
      return res;
    } else {
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Remove Avatar Failed!');
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
      return res;
    } else {
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Remove Wallpaper Failed!');
  }
}
// #endregion

// #region refresh gallery images
export function* getGalleryImageReq() {
  yield takeLatest(
    [
      getProfileSagaSuccess.type,

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
  const { accessToken, refreshToken, id } = data.payload;

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
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion
