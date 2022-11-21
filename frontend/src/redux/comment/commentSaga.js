import {
  commentPostSaga,
  commentPostSagaSuccess,
  deleteCommentPostSaga,
  deleteCommentPostSagaSuccess,
  getCommentPostSaga,
  getCommentPostSagaSuccess,
  getCommentPostSuccess,
  updateCommentPostSaga,
  updateCommentPostSagaSuccess,
} from "./commentSlice";
import { put, takeLatest, call, fork } from "redux-saga/effects";
import api from "../../common/environment/environment";
import { axiosInStanceJWT } from "../axiosJWT";
import { notifyService } from "../../services/notifyService";

export function* getCommentPost() {
  yield takeLatest(
    [
      getCommentPostSaga.type,
      commentPostSagaSuccess.type,
      deleteCommentPostSagaSuccess.type,
      updateCommentPostSagaSuccess.type,
    ],
    handleGetCommentPost
  );
}
function* handleGetCommentPost(data) {
  try {
    const getComments = yield call(getCommentPostSagaRequest, data);
    yield put(getCommentPostSuccess(getComments));
  } catch (error) {
    console.log(error);
  }
}
const getCommentPostSagaRequest = async (data) => {
  debugger
  const { accessToken, refreshToken, dispatch, post_id, paging } = data.payload;
  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    let pagingObj;
    if (paging) pagingObj = paging;
    else {
      pagingObj = {
        page: 0,
        pageSize: 10,
      };
    }
    const res = await axiosInStanceJWT.post(
      `${api.post}/comment/${post_id}`,
      pagingObj,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getCommentPostSagaSuccess({ accessToken, refreshToken }));
      // if(paging) return { ...res, post_id,paging };
      // else return { ...res, post_id };
      return { ...res, post_id };
    } else {
      notifyService.showError("Get comment Post Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Get comment Post Failed");
  }
};

export function* commentPost() {
  yield takeLatest(commentPostSaga.type, handleCommentPost);
}
function* handleCommentPost(data) {
  try {
    yield call(commentPostSagaRequest, data);
    // yield put(createPostSuccess(create.data));
  } catch (error) {
    console.log(error);
  }
}
const commentPostSagaRequest = async (data) => {
  const {
    accessToken,
    refreshToken,
    dispatch,
    comment_text,
    parent_comment_id,
    post_id,
  } = data.payload;

  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    let commentOjb = {
      parent_comment_id: parent_comment_id,
      post_id: post_id,
      comment_text: comment_text,
    };
    const res = await axiosInStanceJWT.post(
      `${api.post}/comment/create`,
      commentOjb,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        commentPostSagaSuccess({ accessToken, refreshToken, dispatch, post_id })
      );
      notifyService.showSuccess("Comment Post Success");
      return res;
    } else {
      notifyService.showError("Comment Post Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Comment Post Failed");
  }
};

export function* deleteCommentPost() {
  yield takeLatest(deleteCommentPostSaga.type, handleDeleteCommentPost);
}
function* handleDeleteCommentPost(data) {
  try {
    yield call(deleteCommentPostSagaRequest, data);
    // yield put(createPostSuccess(create.data));
  } catch (error) {
    console.log(error);
  }
}
const deleteCommentPostSagaRequest = async (data) => {
  const { accessToken, refreshToken, dispatch, post_comment_id, post_id } =
    data.payload;

  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };

    const res = await axiosInStanceJWT.delete(
      `${api.post}/comment/delete/${post_comment_id}`,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        deleteCommentPostSagaSuccess({
          accessToken,
          refreshToken,
          dispatch,
          post_id,
        })
      );
      notifyService.showSuccess("Delete Comment Post Success");
      return res;
    } else {
      notifyService.showError("Delete Comment Post Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Delete Comment Post Failed");
  }
};

export function* updateCommentPost() {
  yield takeLatest(updateCommentPostSaga.type, handleUpdateCommentPost);
}
function* handleUpdateCommentPost(data) {
  try {
    yield call(updateCommentPostSagaRequest, data);
  } catch (error) {
    console.log(error);
  }
}
const updateCommentPostSagaRequest = async (data) => {
  debugger;
  const {
    accessToken,
    refreshToken,
    dispatch,
    comment_text,
    post_comment_id,
    post_id,
  } = data.payload;

  try {
    const config = {
      Authorization: `Bearer ${accessToken}`,
    };
    const comment_text_obj = { comment_text: comment_text };
    const res = await axiosInStanceJWT.put(
      `${api.post}/comment/update/${post_comment_id}`,
      comment_text_obj,
      {
        headers: config,
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(
        updateCommentPostSagaSuccess({
          accessToken,
          refreshToken,
          dispatch,
          post_id,
        })
      );
      notifyService.showSuccess("Update Comment Post Success");
      return res;
    } else {
      notifyService.showError("Update Comment Post Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Update Comment Post Failed");
  }
};
