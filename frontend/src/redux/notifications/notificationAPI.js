import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import { leftBarPaging } from '../../common/constants/apiConfig';
import { notifyService } from '../../services/notifyService';
import {
  getAllFriendNotificationFailed,
  getAllFriendNotificationStart,
  getAllFriendNotificationSuccess,
  getAllNotificationFailed,
  getAllNotificationStart,
  getAllNotificationSuccess,
  getAllUnreadNotificationFailed,
  getAllUnreadNotificationStart,
  getAllUnreadNotificationSuccess,
  seenNotificationFailed,
  seenNotificationStart,
  seenNotificationSuccess,
} from './notificationSlice';

// #region get all notifications
export const getAllNotification = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getAllNotificationStart());
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
      dispatch(getAllNotificationSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getAllNotificationFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getAllNotificationFailed());
  }
};
// #endregion

// #region get all unread notifications
export const getAllUnreadNotification = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getAllUnreadNotificationStart());
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
      dispatch(getAllUnreadNotificationSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getAllUnreadNotificationFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getAllUnreadNotificationFailed());
  }
};
// #endregion

// #region get all friends notifications
export const getAllFriendNotification = async (
  accessToken,
  refreshToken,
  dispatch
) => {
  dispatch(getAllFriendNotificationStart());
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
      dispatch(getAllFriendNotificationSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getAllFriendNotificationFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getAllFriendNotificationFailed());
  }
};
// #endregion

// #region seen notification
export const seenNotification = async (
  accessToken,
  refreshToken,
  id,
  dispatch
) => {
  dispatch(seenNotificationStart());
  try {
    const res = await axiosInStanceJWT.put(
      `${api.notification}/read/${id}`,
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
      dispatch(seenNotificationSuccess());
    } else {
      notifyService.showError(res.data.message);
      dispatch(seenNotificationFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(seenNotificationFailed());
  }
};
// #endregion
