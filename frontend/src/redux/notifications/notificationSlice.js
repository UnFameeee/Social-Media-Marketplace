import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  getAll: {
    data: [],
    isFetching: false,
    error: false,
  },
  getAllUnread: {
    data: [],
    isFetching: false,
    error: false,
  },
  getAllFriend: {
    data: [],
    isFetching: false,
    error: false,
  },
  seen: {
    isFetching: false,
    error: false,
  },
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    getAll: {
      data: [],
      isFetching: false,
      error: false,
    },
    getAllUnread: {
      data: [],
      isFetching: false,
      error: false,
    },
    getAllFriend: {
      data: [],
      isFetching: false,
      error: false,
    },
    seen: {
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    getAllNotificationStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllNotificationSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.data = action.payload;
    },
    getAllNotificationFailed: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },

    getAllUnreadNotificationStart: (state) => {
      state.getAllUnread.isFetching = true;
    },
    getAllUnreadNotificationSuccess: (state, action) => {
      state.getAllUnread.isFetching = false;
      state.getAllUnread.data = action.payload;
    },
    getAllUnreadNotificationFailed: (state) => {
      state.getAllUnread.isFetching = false;
      state.getAllUnread.error = true;
    },

    getAllFriendNotificationStart: (state) => {
      state.getAllFriend.isFetching = true;
    },
    getAllFriendNotificationSuccess: (state, action) => {
      state.getAllFriend.isFetching = false;
      state.getAllFriend.data = action.payload;
    },
    getAllFriendNotificationFailed: (state) => {
      state.getAllFriend.isFetching = false;
      state.getAllFriend.error = true;
    },

    seenNotificationStart: (state) => {
      state.seen.isFetching = true;
    },
    seenNotificationSuccess: (state) => {
      state.seen.isFetching = false;
    },
    seenNotificationFailed: (state) => {
      state.seen.isFetching = false;
      state.seen.error = true;
    },
    seenNotificationSaga() {},
    seenNotificationSagaSuccess() {},
  },
});
export const {
    getAllNotificationStart,
    getAllNotificationSuccess,
    getAllNotificationFailed,

    getAllUnreadNotificationStart,
    getAllUnreadNotificationSuccess,
    getAllUnreadNotificationFailed,

    getAllFriendNotificationStart,
    getAllFriendNotificationSuccess,
    getAllFriendNotificationFailed,

    seenNotificationStart,
    seenNotificationSuccess,
    seenNotificationFailed,
    seenNotificationSaga,
    seenNotificationSagaSuccess,

} = notificationSlice.actions;

export default notificationSlice.reducer;
