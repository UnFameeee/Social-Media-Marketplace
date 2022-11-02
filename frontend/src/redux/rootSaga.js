import { all, fork } from "redux-saga/effects";
import { postSaga, updateCreatePostSaga } from "./postSaga";

export default function* rootSaga(){
    yield all([fork(postSaga),fork(updateCreatePostSaga)])
}