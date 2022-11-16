import { commentPostSaga, commentPostSagaSuccess } from "./commentSlice";
import { put, takeLatest, call, fork } from 'redux-saga/effects';
import api from '../../common/environment/environment';
import { axiosInStanceJWT } from '../axiosJWT';
import { notifyService } from '../../services/notifyService';

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

    let commentOjb= {
        parent_comment_id:parent_comment_id,
        post_id:post_id,
        comment_text:comment_text
    }
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
      dispatch(commentPostSagaSuccess({ accessToken, refreshToken }));
      return res;
    } else {
      notifyService.showError("Comment Post Failed");
    }
  } catch (error) {
    console.log(error);
    notifyService.showError("Comment Post Failed");
  }
};
