import api from '../../common/environment/environment';
import { axiosInStanceJWT } from '../axiosJWT';
import { leftBarPaging } from '../../common/constants/apiConfig';
import { notifyService } from '../../services/notifyService';
import {
  getAllFriendForMainUserFailed,
  getAllFriendForMainUserStart,
  getAllFriendForMainUserSuccess,
  getRequestFailed,
  getRequestStart,
  getRequestSuccess,
  getSentRequestFailed,
  getSentRequestStart,
  getSentRequestSuccess,
  getSuggestionFailed,
  getSuggestionStart,
  getSuggestionSuccess,
} from './friendSlice';

// #region requests
export async function getAllRequest(
  accessToken,
  refreshToken,
  dispatch
) {
  dispatch(getRequestStart());
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/request/all`,
      leftBarPaging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getRequestSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getRequestFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getRequestFailed());
  }
}
// #endregion

// #region sent requests
export async function getAllSentRequest(
  accessToken,
  refreshToken,
  dispatch
) {
  dispatch(getSentRequestStart());
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/getAllSentFriendRequest`,
      leftBarPaging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getSentRequestSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getSentRequestFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getSentRequestFailed());
  }
}
// #endregion

// #region suggestions
export async function getAllSuggestions(
  accessToken,
  refreshToken,
  dispatch
) {
  dispatch(getSuggestionStart());
  try {
    const res = await axiosInStanceJWT.post(
      `${api.profile}/friendSuggestion`,
      leftBarPaging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getSuggestionSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getSuggestionFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getSuggestionFailed());
  }
}
// #endregion

// #region get all friends
export async function getAllFriendForMainUser(
  accessToken,
  refreshToken,
  id,
  dispatch
) {
  dispatch(getAllFriendForMainUserStart());
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/all/${id}`,
      leftBarPaging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getAllFriendForMainUserSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getAllFriendForMainUserFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getAllFriendForMainUserFailed());
  }
}
// #endregion
