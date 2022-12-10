import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import {
  getAllFriendNotificationSuccess,
  getAllNotificationSuccess,
  getAllUnreadNotificationSuccess,
  seenNotificationFailed,
  seenNotificationSagaSuccess,
  seenNotificationStart,
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

// #region get all unread notification
export function* refreshAllFriendNotifications() {
  yield takeLatest(
    [seenNotificationSagaSuccess.type],
    handleRefreshAllFriendNotificationSaga
  );
}
function* handleRefreshAllFriendNotificationSaga(data) {
  try {
    const getAll = yield call(getAllFriendNotificatonSaga, data);
    yield put(getAllFriendNotificationSuccess(getAll.data.results));
  } catch (error) {
    console.log(error);
  }
}
async function getAllFriendNotificatonSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.get(
      `${api.notification}/all/friend_request`,
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
export async function seenNotificaton(
  accessToken,
  refreshToken,
  notificationId,
  dispatch
) {
  dispatch(seenNotificationStart());
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
      dispatch(seenNotificationFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(seenNotificationFailed());
  }
}
// #endregion
