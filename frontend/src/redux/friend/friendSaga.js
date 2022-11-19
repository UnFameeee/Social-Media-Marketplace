import { put, takeLatest, call } from 'redux-saga/effects';
import { axiosInStanceJWT } from '../axiosJWT';
import api from '../../common/environment/environment';
import { paging } from '../../common/constants/apiConfig';
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
  getAllFriendForMainUserSaga,
  getAllFriendForMainUserSuccess,
  getAllFriendSaga,
  getAllFriendSuccess,
  getFriendRequestSaga,
  getFriendSuggestionSaga,
  getRequestSuccess,
  getSentRequestSaga,
  getSentRequestSuccess,
  getSuggestionSuccess,
  unfriendFailed,
  unfriendSaga,
  unfriendSagaSuccess,
  unfriendStart,
  unfriendSuccess,
} from './friendSlice';
import { notifyService } from '../../services/notifyService';
import { getProfileSagaSuccess } from '../profile/profileSlice';

// #region friend requests
export function* refreshFriendRequest() {
  yield takeLatest(
    [
      acceptSagaSuccess.type,
      denySagaSuccess.type,
      getFriendRequestSaga.type,
    ],
    handleRefreshRequestSaga
  );
}
function* handleRefreshRequestSaga(data) {
  try {
    if (data?.payload?.callRefreshFriend) {
      const getAll = yield call(getAllRequestSaga, data);
      yield put(getRequestSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getAllRequestSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/request/all`,
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
    callRefreshFriend = true,
    callRefreshProfile = false,
    callRefreshPost = false,
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
          callRefreshFriend,
          callRefreshProfile,
          callRefreshPost,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(acceptFailed());
    }
  } catch (error) {
    notifyService.showError('Accept Friend Request Failed!');
    dispatch(acceptFailed());
  }
}

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
    callRefreshFriend = true,
    callRefreshFriendSuggestion = false,
    callRefreshProfile = false,
    callRefreshPost = false,
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
          callRefreshFriend,
          callRefreshFriendSuggestion,
          callRefreshProfile,
          callRefreshPost,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(denyFailed());
    }
  } catch (error) {
    notifyService.showError('Deny Failed!');
    dispatch(denyFailed());
  }
}
// #endregion

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
export function* refreshAllFriendForMainUser() {
  yield takeLatest(
    [unfriendSagaSuccess.type, getAllFriendForMainUserSaga.type],
    handleRefreshAllForMainUserSaga
  );
}
function* handleRefreshAllForMainUserSaga(data) {
  try {
    if (data?.payload?.callRefreshFriend) {
      const getAll = yield call(getAllForMainUserSaga, data);
      yield put(getAllFriendForMainUserSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getAllForMainUserSaga(data) {
  const { accessToken, refreshToken, mainId } = data.payload;
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/all/${mainId}`,
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
  const {
    accessToken,
    refreshToken,
    id = '',
    mainId = '',
    callRefreshFriend = true,
    callRefreshProfile = false,
    callRefreshPost = false,
    dispatch,
  } = data.payload;
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
          mainId,
          callRefreshFriend,
          callRefreshProfile,
          callRefreshPost,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(unfriendFailed());
    }
  } catch (error) {
    notifyService.showError('Unfriend Failed!');
    dispatch(unfriendFailed());
  }
}
// #endregion

// #region friend suggestions
export function* refreshFriendSuggestion() {
  yield takeLatest(
    [
      addFriendSagaSuccess.type,
      denySagaSuccess.type,
      getFriendSuggestionSaga.type,
    ],
    handleRefreshSuggestionSaga
  );
}
function* handleRefreshSuggestionSaga(data) {
  try {
    if (data?.payload?.callRefreshFriendSuggestion) {
      const getAll = yield call(getAllSuggestionSaga, data);
      yield put(getSuggestionSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getAllSuggestionSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.post(
      `${api.profile}/friendSuggestion`,
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
  const {
    accessToken,
    refreshToken,
    id,
    callRefreshFriendSuggestion = true,
    callRefreshSentRequest = false,
    callRefreshFriend = false,
    callRefreshProfile = false,
    callRefreshPost = false,
    dispatch,
  } = data.payload;
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
          callRefreshFriendSuggestion,
          callRefreshFriend,
          callRefreshSentRequest,
          callRefreshProfile,
          callRefreshPost,
          callRefreshGallery: false,
          dispatch,
        })
      );
      return res;
    } else {
      notifyService.showError(res.data.message);
      dispatch(addFriendFailed());
    }
  } catch (error) {
    notifyService.showError('Add Friend Failed!');
    dispatch(addFriendFailed());
  }
}
// #endregion

// #region sent requests
export function* refreshSentRequests() {
  yield takeLatest(
    [getSentRequestSaga.type, addFriendSagaSuccess.type],
    handleRefreshSentRequestSaga
  );
}
function* handleRefreshSentRequestSaga(data) {
  try {
    if (data?.payload?.callRefreshSentRequest) {
      const getAll = yield call(getAllSentRequestSaga, data);
      yield put(getSentRequestSuccess(getAll.data.results));
    }
  } catch (error) {
    console.log(error);
  }
}
async function getAllSentRequestSaga(data) {
  const { accessToken, refreshToken } = data.payload;
  try {
    const res = await axiosInStanceJWT.post(
      `${api.friend}/getAllSentFriendRequest`,
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
// #endregion
