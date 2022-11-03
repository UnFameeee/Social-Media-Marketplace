import { all, fork } from "redux-saga/effects";
import { createNew, deleteOne, likePost, reFresh, updateOne } from "./postSaga";

export default function* rootSaga(){
    yield all([fork(reFresh),fork(createNew),fork(deleteOne),fork(updateOne),fork(likePost)])
}