import { all, fork } from 'redux-saga/effects';
import { commentPost } from './comment/commentSaga';
import {
  acceptFriendReq,
  addFriend,
  denyFriendReq,
  isFriend,
  refreshAllFriend,
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
  getGalleryImageReq,
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
    fork(refreshAllFriend),
    fork(acceptFriendReq),
    fork(denyFriendReq),
    fork(unfriend),
    fork(addFriend),
    // fork(isFriend),
  ]);
  yield all([
    fork(refreshProfile),
    fork(getGalleryImageReq),
    fork(updateAvtReq),
    fork(deleteAvtReq),
    fork(updateWallReq),
    fork(deleteWallReq),
    fork(updateDetailReq),
  ]);
  yield all([fork(commentPost)]);
}
