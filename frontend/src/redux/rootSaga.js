import { all, fork } from 'redux-saga/effects';
import { commentPost, deleteCommentPost, getCommentPost } from './comment/commentSaga';
import {
  acceptFriendReq,
  addFriend,
  denyFriendReq,
  refreshAllFriend,
  refreshAllFriendForMainUser,
  refreshFriendRequest,
  refreshFriendSuggestion,
  unfriend,
} from './friend/friendSaga';
import {
  createNewPost,
  deleteOnePost,
  likeOnePost,
  reFreshPosts,
  updateOnePost,
} from './post/postSaga';
import {
    deleteAvtReq,
  deleteWallReq,
  refreshProfile,
  updateAvtReq,
  updateDetailReq,
  updateWallReq,
} from './profile/profileSaga';

export default function* rootSaga() {
  yield all([
    fork(reFreshPosts),
    fork(createNewPost),
    fork(deleteOnePost),
    fork(updateOnePost),
    fork(likeOnePost),
  ]);
  yield all([
    fork(refreshAllFriendForMainUser),
    fork(refreshAllFriend),
    fork(refreshFriendRequest),
    fork(refreshFriendSuggestion),
    fork(acceptFriendReq),
    fork(denyFriendReq),
    fork(unfriend),
    fork(addFriend),
  ]);
  yield all([
    fork(refreshProfile),
    fork(updateAvtReq),
    fork(deleteAvtReq),
    fork(updateWallReq),
    fork(deleteWallReq),
    fork(updateDetailReq),
  ]);
  yield all ([
    fork(commentPost),fork(getCommentPost),fork(deleteCommentPost)
  ])
}
