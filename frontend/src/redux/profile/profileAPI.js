import api from '../../common/environment/environment';
import { axiosInStanceJWT } from '../axiosJWT';
import { notifyService } from '../../services/notifyService';
import { galleryPaging } from '../../common/constants/apiConfig';

import {
  getGalleryFailed,
  getGalleryStart,
  getGallerySuccess,
  getProfileDetailFailed,
  getProfileDetailStart,
  getProfileDetailSuccess,
} from './profileSlice';

// #region get profile details
export async function getProfileDetail(
  accessToken,
  refreshToken,
  id,
  dispatch
) {
  dispatch(getProfileDetailStart());
  try {
    const res = await axiosInStanceJWT.get(
      `${api.profile}/getProfileDetailById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getProfileDetailSuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getProfileDetailFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getProfileDetailFailed());
  }
}
// #endregion

// #region get gallery img
export async function getGalleryImg(
  accessToken,
  refreshToken,
  id,
  dispatch
) {
  dispatch(getGalleryStart());
  try {
    const res = await axiosInStanceJWT.post(
      `${api.profile}/galleryImage/${id}`,
      galleryPaging,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        ACCESS_PARAM: accessToken,
        REFRESH_PARAM: refreshToken,
      }
    );
    if (!res.data.message) {
      dispatch(getGallerySuccess(res.data.results));
    } else {
      notifyService.showError(res.data.message);
      dispatch(getGalleryFailed());
    }
  } catch (error) {
    console.log(error);
    notifyService.showError(error.message);
    dispatch(getGalleryFailed());
  }
}
// #endregion
