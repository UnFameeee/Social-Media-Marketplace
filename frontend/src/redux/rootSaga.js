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
  refreshAllFriendNotifications,
  refreshAllNotifications,
  refreshAllUnreadNotifications,
} from './notifications/notificationSaga';
import {
  createNewPost,
  deleteOnePost,
  likeOnePost,
  reFreshPosts,
  updateOnePost,
  reFreshOnePost,
} from './post/postSaga';
import {
  addProductToListCartWithoutPaging,
  createSellingProduct,
  deleteSellingProduct,
  getAllOrderPurchasedSaga,
  getAllOrderSoldSaga,
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
    fork(reFreshOnePost),
  ]);
  yield all([
    fork(getAllSellingProduct),
    fork(getAllShoppingProduct),
    fork(getListCartWithoutPagingSG),
    fork(getAllOrderPurchasedSaga),
    fork(getAllOrderSoldSaga),
  ]);
  yield all([
    fork(refreshAllNotifications),
    fork(refreshAllUnreadNotifications),
    fork(refreshAllFriendNotifications),
  ]);
}
