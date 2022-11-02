import { all, fork } from "redux-saga/effects";
import { createNew, deleteOne, reFresh } from "./postSaga";

export default function* rootSaga(){
    yield all([fork(reFresh),fork(createNew),fork(deleteOne)])
}