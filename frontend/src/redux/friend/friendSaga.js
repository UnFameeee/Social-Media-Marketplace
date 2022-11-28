import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import { leftBarPaging } from '../../common/constants/apiConfig';
import {
  acceptSagaSuccess,
  addFriendSagaSuccess,
  denySagaSuccess,
  getAllFriendSuccess,
  unfriendSagaSuccess,
} from './friendSlice';
import { notifyService } from '../../services/notifyService';
import { getProfileSagaSuccess } from '../profile/profileSlice';

// #region get all friends
export function* refreshAllFriend() {
  yield takeLatest(
    [getProfileSagaSuccess.type, unfriendSagaSuccess.type],
    handleRefreshAllSaga
  );
}
function* handleRefreshAllSaga(data) {
  try {
    if (data?.payload?.callRefreshFriend) {
      const getAll = yield call(getAllSaga, data);
      yield put(getAllFriendSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getAllSaga(data) {
  const { accessToken, refreshToken, id } = data.payload;
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
      return res;
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion

// #region accept
export async function acceptFriendRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = false,
    dispatch,
  } = data;

  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/acceptFriendRequest/${id}`,
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
      notifyService.showSuccess(
        'Accept Friend Request Successfully!'
      );
      dispatch(
        acceptSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
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
    notifyService.showError('Accept Friend Request Failed!');
  }
}
// #endregion

// #region deny
export async function denyFriendRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = false,
    dispatch,
  } = data;

  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/denyFriendRequest/${id}`,
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
      notifyService.showSuccess('Deny Friend Request Successfully!');
      dispatch(
        denySagaSuccess({
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
    notifyService.showError('Deny Failed!');
  }
}
// #endregion

// #region unfriend
export async function unfriendRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile,
    dispatch,
  } = data;

  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/unfriend/${id}`,
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
      notifyService.showSuccess('Unfriend Successfully!');
      dispatch(
        unfriendSagaSuccess({
          accessToken,
          refreshToken,
          id,
          callRefreshProfile,
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
    notifyService.showError('Unfriend Failed!');
  }
}
// #endregion

// #region add friend
export async function addFriendRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = false,
    dispatch,
  } = data;

  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/sendFriendRequest/${id}`,
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
      if (res.data.results) {
        notifyService.showSuccess('Add Friend Successfully!');
      } else {
        notifyService.showSuccess(
          'Cancel Friend Request Successfully!'
        );
      }
      dispatch(
        addFriendSagaSuccess({
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
    notifyService.showError('Add Friend Failed!');
  }
}
// #endregion
