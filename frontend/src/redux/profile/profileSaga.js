import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import {
  getProfileDetailSuccess,
  updateAvtFailed,
  updateAvtSaga,
  updateAvtSagaSuccess,
  updateAvtSuccess,
  updateWallpaperFailed,
  updateWallpaperSaga,
  updateWallpaperSagaSuccess,
  updateWallpaperSuccess,
} from './profileSlice';
import { notifyService } from '../../services/notifyService';
import { paging } from '../../common/constants/apiConfig';

export function* refreshProfile() {
  yield takeLatest(
    [updateAvtSagaSuccess.type, updateWallpaperSagaSuccess.type],
    handleRefreshProfileSaga
  );
}
function* handleRefreshProfileSaga(data) {
  try {
    const getAll = yield call(getProfileDetailsSaga, data);
    yield put(getProfileDetailSuccess(getAll.data.results));
  } catch (error) {
    console.log(error);
  }
}
async function getProfileDetailsSaga(data) {
  const { accessToken, refreshToken, id } = data.payload;
  try {
    const res = await axiosInStanceJWT.post(
      `${api.profile}/getProfileDetailById/${id}`,
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
      return res;
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateAvtReq() {
  yield takeLatest(updateAvtSaga.type, handleUpdateAvt);
}
function* handleUpdateAvt(data) {
  try {
    const accept = yield call(updateAvtSagaRequest, data);
    yield put(updateAvtSuccess(accept.data));
  } catch (error) {
    console.log(error);
  }
}
async function updateAvtSagaRequest(data) {
  const { accessToken, refreshToken, avatar, id, dispatch } =
    data.payload;
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
        updateAvtSagaSuccess({ accessToken, refreshToken, id })
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
    const accept = yield call(updateWallSagaRequest, data);
    yield put(updateWallpaperSuccess(accept.data));
  } catch (error) {
    console.log(error);
  }
}
async function updateWallSagaRequest(data) {
  const { accessToken, refreshToken, avatar, id, dispatch } =
    data.payload;

  try {
    const res = await axiosInStanceJWT.post(
      `${api.image}/profile_wallpaper/upload`,
      avatar,
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
        updateWallpaperSagaSuccess({ accessToken, refreshToken, id })
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
