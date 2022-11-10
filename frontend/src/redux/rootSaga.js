import { all, fork } from "redux-saga/effects";
import { acceptFriendReq, addFriend, denyFriendReq, refreshAllFriend, refreshFriendRequest, refreshFriendSuggestion, unfriend } from "./friend/friendSaga";
import { createNewPost, deleteOnePost, likeOnePost, reFreshPosts, updateOnePost } from "./post/postSaga";
import { refreshProfile, updateAvtReq, updateWallReq } from "./profile/profileSaga";

export default function* rootSaga(){
    yield all([fork(reFreshPosts),fork(createNewPost),fork(deleteOnePost),fork(updateOnePost),fork(likeOnePost)])
    yield all([fork(refreshAllFriend),fork(refreshFriendRequest),fork(refreshFriendSuggestion),fork(acceptFriendReq),fork(denyFriendReq),fork(unfriend),fork(addFriend)])
    yield all([fork(refreshProfile),fork(updateAvtReq),fork(updateWallReq),])
}