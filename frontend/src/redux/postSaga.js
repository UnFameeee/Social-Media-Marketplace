import { put, takeLatest, call, fork } from "redux-saga/effects";
import { apiUrl } from "../common/environment/environment";
import { axiosInStanceJWT } from "./axiosJWT";
import {
  createPostSaga,
  createPostSagaSuccess,
  createPostSuccess,
  getPostSuccess,
} from "./postSlice";
export function* postSaga() {
  yield takeLatest(createPostSaga.type, handleCreatePost);
}
export function* updateCreatePostSaga() {
  yield takeLatest(
    createPostSagaSuccess.type,
    handleUpdateAllPostAfterCreatePost
  );
}
function* handleCreatePost(data) {
  try {
    const create = yield call(createPostSagaRequest, data);
    yield put(createPostSuccess(create.data));
  } catch (error) {}
}
function* handleUpdateAllPostAfterCreatePost(data) {
  try {
    const getAll = yield call(getAllPostSagaRequest, data);
    yield put(getPostSuccess(getAll.data));
  } catch (error) {}
}
const createPostSagaRequest = async (data) => {
  const { accessToken, postData, dispatch } = data.payload;
  // dispatch(createPostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/newPost`,
      postData,
      config
    );
    if (!res.data.message) {
      dispatch(createPostSagaSuccess({ accessToken }));
      return res;
      // notify("Post Created", "info");
    } else {
      // dispatch(createPostFailed());
      // notify(res.data.message, "error");
    }
  } catch (error) {
    //   dispatch(createPostFailed());
  }
};

const getAllPostSagaRequest = async (data) => {
  const { accessToken, postData, dispatch } = data.payload;
  // dispatch(getPostStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/all`,
      paging,
      config
    );
    if (!res.data.message) {
      // dispatch(getPostSuccess(res.data));
      return res;
    } else {
      // dispatch(getPostFailed());
    }
  } catch (error) {
    //   dispatch(getPostFailed());
  }
};
