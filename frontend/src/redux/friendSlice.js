import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from './resetStore';
const initialState = {
  getFriendRequests: {
    data: null,
    isFetching: false,
    error: false,
  },
  getAll: {
    data: null,
    isFetching: false,
    error: false,
  },
  getMutualFriends: {
    data: null,
    isFetching: false,
    error: false,
  },
  addFriend: {
    data: false,
    isFetching: false,
    error: false,
  },
  acceptFriendRequest: {
    data: false,
    isFetching: false,
    error: false,
  },
  isFriend: {
    data: false,
    isFetching: false,
    error: false,
  },
};
export const friendSlice = createSlice({
  name: 'friends',
  initialState: {
    getFriendRequests: {
      data: null,
      isFetching: false,
      error: false,
    },
    getAll: {
      data: null,
      isFetching: false,
      error: false,
    },
    getMutualFriends: {
      data: null,
      isFetching: false,
      error: false,
    },
    addFriend: {
      data: false,
      isFetching: false,
      error: false,
    },
    acceptFriendRequest: {
      data: false,
      isFetching: false,
      error: false,
    },
    isFriend: {
      data: false,
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    getFriendRequestStart: (state) => {
      state.getFriendRequests.isFetching = true;
    },
    getFriendRequestSuccess: (state, action) => {
      state.getFriendRequests.isFetching = false;
      state.getFriendRequests.data = action.payload;
    },
    getFriendRequestFailed: (state) => {
      state.getFriendRequests.isFetching = false;
      state.getFriendRequests.error = true;
    },

    getAllFriendStart: (state) => {
      state.getAll.isFetching = true;
    },
    getAllFriendSuccess: (state, action) => {
      state.getAll.isFetching = false;
      state.getAll.data = action.payload;
    },
    getAllFriendFailed: (state) => {
      state.getAll.isFetching = false;
      state.getAll.error = true;
    },

    getMutualFriendStart: (state) => {
      state.getMutualFriends.isFetching = true;
    },
    getMutualFriendSuccess: (state, action) => {
      state.getMutualFriends.isFetching = false;
      state.getMutualFriends.data = action.payload;
    },
    getMutualFriendFailed: (state) => {
      state.getMutualFriends.isFetching = false;
      state.getMutualFriends.error = true;
    },

    addFiendStart: (state) => {
      state.addFriend.isFetching = true;
    },
    addFiendSuccess: (state, action) => {
      state.addFriend.isFetching = false;
      state.addFriend.data = action.payload;
    },
    addFiendFailed: (state) => {
      state.addFriend.isFetching = false;
      state.addFriend.error = true;
    },

    acceptFiendRequestStart: (state) => {
      state.acceptFriendRequest.isFetching = true;
    },
    acceptFriendRequestSuccess: (state, action) => {
      state.acceptFriendRequest.isFetching = false;
      state.acceptFriendRequest.data = action.payload;
    },
    acceptFriendRequestFailed: (state) => {
      state.acceptFriendRequest.isFetching = false;
      state.acceptFriendRequest.error = true;
    },

    isFriendStart: (state) => {
      state.isFriend.isFetching = true;
    },
    isFriendSuccess: (state, action) => {
      state.isFriend.isFetching = false;
      state.isFriend.data = action.payload;
    },
    isFriendFailed: (state) => {
      state.isFriend.isFetching = false;
      state.isFriend.error = true;
    },
  },
});

export const {
    getFriendRequestStart,
    getFriendRequestSuccess,
    getFriendRequestFailed,

    getAllFriendStart,
    getAllFriendSuccess,
    getAllFriendFailed,

    getMutualFriendStart,
    getMutualFriendSuccess,
    getMutualFriendFailed,

    addFriendStart,
    addFriendSuccess,
    addFriendFailed,

    acceptFriendRequestStart,
    acceptFriendRequestSuccess,
    acceptFriendRequestFailed,

    isFriendStart,
    isFriendSuccess,
    isFriendFailed,

} = friendSlice.actions;
export default friendSlice.reducer;
