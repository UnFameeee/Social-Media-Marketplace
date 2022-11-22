import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import { leftBarPaging } from '../../common/constants/apiConfig';
import {
  acceptFailed,
  acceptSaga,
  acceptSagaSuccess,
  acceptStart,
  acceptSuccess,
  addFriendFailed,
  addFriendSaga,
  addFriendSagaSuccess,
  addFriendStart,
  addFriendSuccess,
  denyFailed,
  denySaga,
  denySagaSuccess,
  denyStart,
  denySuccess,
  getAllFriendSaga,
  getAllFriendSuccess,
  isFriendFailed,
  isFriendSuccess,
  unfriendFailed,
  unfriendSaga,
  unfriendSagaSuccess,
  unfriendStart,
  unfriendSuccess,
} from './friendSlice';
import { notifyService } from '../../services/notifyService';
import { getProfileSagaSuccess } from '../profile/profileSlice';

// #region get all friends
export function* refreshAllFriend() {
  yield takeLatest(
    [getProfileSagaSuccess.type, getAllFriendSaga.type],
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
    }
  } catch (error) {
    console.log(error);
  }
}
// #endregion

// #region accept
export function* acceptFriendReq() {
  yield takeLatest(acceptSaga.type, handleAcceptFriend);
}
function* handleAcceptFriend(data) {
  try {
    const accept = yield call(acceptSagaRequest, data);
    yield put(acceptSuccess(accept.data));
  } catch (error) {
    console.log(error);
  }
}
async function acceptSagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = false,
    dispatch,
  } = data.payload;
  //   dispatch(acceptStart());
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
      dispatch(acceptFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Accept Friend Request Failed!');
    dispatch(acceptFailed());
  }
}
// #endregion

// #region deny
export function* denyFriendReq() {
  yield takeLatest(denySaga.type, handleDenyFriend);
}
function* handleDenyFriend(data) {
  try {
    const deny = yield call(denySagaRequest, data);
    yield put(denySuccess(deny.data));
  } catch (error) {
    console.log(error);
  }
}
async function denySagaRequest(data) {
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshProfile = false,
    dispatch,
  } = data.payload;
  // dispatch(denyStart());
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
      dispatch(denyFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Deny Failed!');
    dispatch(denyFailed());
  }
}
// #endregion

// #region unfriend
export function* unfriend() {
  yield takeLatest(unfriendSaga.type, handleUnfriend);
}
function* handleUnfriend(data) {
  try {
    const unf = yield call(unfriendSagaRequest, data);
    yield put(unfriendSuccess(unf.data));
  } catch (error) {
    console.log(error);
  }
}
async function unfriendSagaRequest(data) {
  const { accessToken, refreshToken, id, dispatch } = data.payload;
  //   dispatch(unfriendStart());
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
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(unfriendFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Unfriend Failed!');
    dispatch(unfriendFailed());
  }
}
// #endregion

// #region add friend
export function* addFriend() {
  yield takeLatest(addFriendSaga.type, handleAddFriend);
}
function* handleAddFriend(data) {
  try {
    const unf = yield call(addFriendSagaRequest, data);
    yield put(addFriendSuccess(unf.data));
  } catch (error) {
    console.log(error);
  }
}
async function addFriendSagaRequest(data) {
  const { accessToken, refreshToken, id, dispatch } = data.payload;
  // dispatch(addFriendStart());
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
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(addFriendFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError('Add Friend Failed!');
    dispatch(addFriendFailed());
  }
}
// #endregion

// #region isFriend
export function* isFriend() {
  yield takeLatest(
    // [acceptSagaSuccess.type, denySagaSuccess.type],
    handleCheckFriend
  );
}
function* handleCheckFriend(data) {
  try {
    const isFriend = yield call(isFriendSagaRequest, data);
    yield put(isFriendSuccess(isFriend.data));
  } catch (error) {
    console.log(error);
  }
}
async function isFriendSagaRequest(data) {
  const { accessToken, refreshToken, id, dispatch } = data.payload;
  // dispatch(addFriendStart());
  try {
    const res = await axiosInStanceJWT.get(
      `${api.friend}/isFriend/${id}`,
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
      notifyService.showError(res.data.message);
      dispatch(isFriendFailed());
    }
  } catch (error) {
    console.log(error);
    dispatch(isFriendFailed());
  }
}
// #endregion
