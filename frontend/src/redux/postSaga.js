import { put, takeLatest, call, fork } from "redux-saga/effects";
import { apiUrl } from "../common/environment/environment";
import { axiosInStanceJWT } from "./axiosJWT";
import {
  createPostSaga,
  createPostSagaSuccess,
  createPostSuccess,
  deletePostSaga,
  deletePostSagaSuccess,
  deletePostSuccess,
  getPostSuccess,
  likePostSaga,
  likePostSagaSuccess,
  likePostSuccess,
  updatePostSaga,
  updatePostSagaSuccess,
  updatePostSuccess,
} from "./postSlice";

export function* reFresh() {
  yield takeLatest([createPostSagaSuccess.type,deletePostSagaSuccess.type,updatePostSagaSuccess.type,likePostSagaSuccess.type], handleReFreshPostSaga);
}
function* handleReFreshPostSaga(data) {
  try {
    const getAll = yield call(getAllPostSagaRequest, data);
    yield put(getPostSuccess(getAll.data));
  } catch (error) {
    console.log(error);
  }
}
const getAllPostSagaRequest = async (data) => {
  const { accessToken, refreshToken, dispatch } = data.payload;
  // dispatch(getPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const paging = {
      page: 0,
      pageSize: 5,
    };
    const res = await axiosInStanceJWT.post(`${apiUrl}/post/all`, paging, {
      headers: config,
      ACCESS_PARAM: accessToken,
      REFRESH_PARAM: refreshToken,
    });
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

export function* createNew() {
  yield takeLatest(createPostSaga.type, handleCreatePost);
}
function* handleCreatePost(data) {
  try {
    const create = yield call(createPostSagaRequest, data);
    yield put(createPostSuccess(create.data));
  } catch (error) {
    console.log(error);
  }
}
const createPostSagaRequest = async (data) => {
  const { accessToken, refreshToken, postData, dispatch } = data.payload;
  // dispatch(createPostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/newPost`,
      postData,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(createPostSagaSuccess({ accessToken, refreshToken }));
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

export function* deleteOne() {
  yield takeLatest(deletePostSaga.type, handleDeletePost);
}
function* handleDeletePost(data) {
  try {
    const deleteOne = yield call(deletePostSagaRequest, data);
    yield put(deletePostSuccess(deleteOne.data));
  } catch (error) {
    console.log(error);
  }
}
export const deletePostSagaRequest = async (
  data
) => {
  const { accessToken, refreshToken, postId, dispatch } = data.payload;
  // dispatch(deletePostStart());
  try {
    const config = {
        Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.delete(
      `${apiUrl}/post/delete/${postId}`,
      { headers:config, ACCESS_PARAM: accessToken, REFRESH_PARAM: refreshToken }
    );
    if (!res.data.message) {
      dispatch(deletePostSagaSuccess({ accessToken, refreshToken }));
      return res;
      // dispatch(deletePostSuccess());
      // notify("Post Deleted", "info");
    } else {
      // dispatch(deletePostFailed());
      // notify(res.data.message, "error");
    }
  } catch (error) {
    console.log(error);
    // dispatch(deletePostFailed());
  }
};

export function* updateOne(){
  yield takeLatest(updatePostSaga.type,handleUpdatePost)
}
function* handleUpdatePost(data){
  try {
    const updateOne = yield call(updatePostSagaRequest, data);
    yield put(updatePostSuccess(updateOne.data));
  } catch (error) {
    console.log(error);
  }
}
const updatePostSagaRequest = async (
  data
) => {
  const { accessToken, refreshToken, updatePost, dispatch } = data.payload;
  // dispatch(updatePostStart());
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.put(
      `${apiUrl}/post/updatePost`,
      updatePost,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(updatePostSagaSuccess(({ accessToken, refreshToken })))
      return res
      // dispatch(updatePostSuccess());
      // notify("Post Updated", "info");
    } else {
      // dispatch(updatePostFailed());
      // notify(res.data.message, "error");
    }
  } catch (error) {
    console.log(error);
    // dispatch(updatePostFailed());
  }
};

export function* likePost(){
  yield takeLatest(likePostSaga.type,handleLikePost)
}
function* handleLikePost(data){
  try {
    const likePost = yield call(likePostSagaRequest,data);
    yield put(likePostSuccess(likePost.data))
  } catch (error) {
    console.log(error);
  }
}
const likePostSagaRequest = async (data) => {
  const { accessToken, refreshToken, postId, dispatch } = data.payload;
  // dispatch(likePostStart());
  try {
    const config = {
        Authorization: `Bearer ${accessToken}`,
    };
    const res = await axiosInStanceJWT.post(
      `${apiUrl}/post/like/${postId}`,
      {},
      { headers:config, ACCESS_PARAM: accessToken, REFRESH_PARAM: refreshToken }
    );
    if (!res.data.message) {
      // dispatch(likePostSuccess());
      dispatch(likePostSagaSuccess({accessToken,refreshToken}))
      return res
    } else {
      // dispatch(likePostFailed());
      // notify(res.data.message, "error");
    }
  } catch (error) {
    console.log(error);
    // dispatch(likePostFailed());
  }
};