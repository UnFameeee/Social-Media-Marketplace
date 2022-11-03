import { all, fork } from "redux-saga/effects";
import { createNewPost, deleteOnePost, likeOnePost, reFreshPosts, updateOnePost } from "./post/postSaga";

export default function* rootSaga(){
    yield all([fork(reFreshPosts),fork(createNewPost),fork(deleteOnePost),fork(updateOnePost),fork(likeOnePost)])
}