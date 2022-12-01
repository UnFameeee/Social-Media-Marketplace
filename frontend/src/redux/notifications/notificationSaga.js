import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import {
  getAllNotificationSuccess,
  getAllUnreadNotificationSuccess,
  seenNotificationSaga,
  seenNotificationSagaSuccess,
  seenNotificationSuccess,
} from './notificationSlice';

// #region get all notification
export function* refreshAllNotifications() {
  yield takeLatest(
    [seenNotificationSagaSuccess.type],
    handleRefreshAllNotificationSaga
  );
}
function* handleRefreshAllNotificationSaga(data) {
  try {
    const getAll = yield call(getAllNotificatonSaga, data);
    yield put(getAllNotificationSuccess(getAll.data.results));
  } catch (error) {
    console.log(error);
  }
}
async function getAllNotificatonSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.get(
      `${api.notification}/all`,
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
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion

// #region get all unread notification
export function* refreshAllUnreadNotifications() {
  yield takeLatest(
    [seenNotificationSagaSuccess.type],
    handleRefreshAllUnreadNotificationSaga
  );
}
function* handleRefreshAllUnreadNotificationSaga(data) {
  try {
    const getAll = yield call(getAllUnreadNotificatonSaga, data);
    yield put(getAllUnreadNotificationSuccess(getAll.data.results));
  } catch (error) {
    console.log(error);
  }
}
async function getAllUnreadNotificatonSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.get(
      `${api.notification}/all/unread`,
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
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion

// #region seen notification
export function* seenNotification() {
  yield takeLatest(
    [seenNotificationSaga.type],
    handleSeenNotificationSaga
  );
}
function* handleSeenNotificationSaga(data) {
  try {
    const seen = yield call(seenNotificatonSaga, data);
    yield put(seenNotificationSuccess(seen.data));
  } catch (error) {
    console.log(error);
  }
}
async function seenNotificatonSaga(data) {
  const { accessToken, refreshToken, notificationId, dispatch } =
    data.payload;
  try {
    const res = await axiosInStanceJWT.put(
      `${api.notification}/read/${notificationId}`,
      {},
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
        seenNotificationSagaSuccess({
          accessToken,
          refreshToken,
          dispatch,
        })
      );
      return res;
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion
