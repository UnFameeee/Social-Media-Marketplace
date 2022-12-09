import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import { leftBarPaging } from '../../common/constants/apiConfig';
import {
  acceptFriendFail,
  acceptFriendStart,
  acceptSagaSuccess,
  addFriendFail,
  addFriendSagaSuccess,
  addFriendStart,
  denyFriendFail,
  denyFriendStart,
  denySagaSuccess,
  getAllFriendFailed,
  getAllFriendStart,
  getAllFriendSuccess,
  unfriendFail,
  unfriendSagaSuccess,
  unfriendStart,
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
  const { accessToken, refreshToken, id, dispatch } = data.payload;
  dispatch(getAllFriendStart());
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
      notifyService.showError(res.data.message);
      dispatch(getAllFriendFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getAllFriendFailed());
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
  dispatch(acceptFriendStart());
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
      dispatch(acceptFriendFail());
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(acceptFriendFail());
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
  dispatch(denyFriendStart());
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
      dispatch(denyFriendFail());
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(denyFriendFail());
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
  dispatch(unfriendStart());
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
      dispatch(unfriendFail());
      notifyService.showError(res.data.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(unfriendFail());
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
  dispatch(addFriendStart());
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
      dispatch(addFriendFail());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Add Friend Failed!');
    dispatch(addFriendFail());
  }
}
// #endregion
