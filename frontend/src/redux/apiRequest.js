import axios from "axios";
import {
  createFailed,
  createStart,
  createSuccess,
  getFailed,
  getStart,
  getSuccess,
} from "./postSlice";
import { apiUrl } from "../common/environment/environment";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InByb2ZpbGVfaWQiOjEsInByb2ZpbGVfbmFtZSI6IlRlc3RQcm9maWxlMTIzIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGtSZXR3ZHJQaDJmdnF1ek9BaUhJRWVXWHgydFlUdzVhWEpIcmtrbUdMMzBHTUg1eUxhenk2IiwiYmlydGgiOiJ0ZXN0IGJpcnRoIiwiY3VycmVudEhhc2hlZFJlZnJlc2hUb2tlbiI6bnVsbCwiaXNBY3RpdmF0ZSI6dHJ1ZSwicm9sZSI6IlVzZXIiLCJwZXJtaXNzaW9uIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTAyVDA4OjU1OjA2LjAwMFoiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE2NjQ3NjE5MzYsImV4cCI6MTY2NDc2NTUzNn0.lPIQIf-fyV17V6G59liAu62CYl2zpnnuMJ6i5wOnvLk";
export const createPost = async (post, dispatch) => {
  dispatch(createStart());
  try {
    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.post(`${apiUrl}/post/newPost`, post, config);
    dispatch(createSuccess(res.data));
  } catch (err) {
    dispatch(createFailed());
  }
};

export const getAllPost = async (dispatch) => {
  dispatch(getStart());
  try {
    const paging = {
      page: 1,
      pageSize: 5,
    };
    const res = await axios.get(
      `${apiUrl}/post/all`,
      { params: { paging } },
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    dispatch(getSuccess(res.data));
  } catch (err) {
    dispatch(getFailed());
  }
};
