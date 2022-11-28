import { all, fork } from 'redux-saga/effects';
import {
  commentPost,
  deleteCommentPost,
  getCommentPost,
  likeCommentPost,
  updateCommentPost,
} from './comment/commentSaga';
import { refreshAllFriend } from './friend/friendSaga';
import {
  createNewPost,
  deleteOnePost,
  likeOnePost,
  reFreshPosts,
  updateOnePost,
} from './post/postSaga';
import {
  addProductToListCartWithoutPaging,
  createSellingProduct,
  deleteSellingProduct,
  getAllSellingProduct,
  getAllShoppingProduct,
  getListCartWithoutPagingSG,
  updateSellingProduct,
} from './product/productSaga';
import {
  getGalleryImageReq,
  refreshProfile,
} from './profile/profileSaga';

export default function* rootSaga() {
  yield all([
    fork(reFreshPosts),
    fork(createNewPost),
    fork(deleteOnePost),
    fork(updateOnePost),
    fork(likeOnePost),
  ]);
  yield all([fork(refreshAllFriend)]);
  yield all([fork(refreshProfile), fork(getGalleryImageReq)]);
  yield all([
    fork(commentPost),
    fork(getCommentPost),
    fork(deleteCommentPost),
    fork(updateCommentPost),
    fork(likeCommentPost),
  ]);
  yield all([
    fork(getAllSellingProduct),
    fork(getAllShoppingProduct),
    fork(getListCartWithoutPagingSG),
  ]);
}
