import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  getFriendRequests: {
    data: null,
    isFetching: false,
    error: false,
  },
  getAllForMainUser: {
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
  denyFriendRequest: {
      data: false,
      isFetching: false,
      error: false,
    },
  isFriend: {
    data: false,
    isFetching: false,
    error: false,
  },
  isSentFriendRequest: {
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
    getAllForMainUser: {
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
    denyFriendRequest: {
      data: false,
      isFetching: false,
      error: false,
    },
    isFriend: {
      data: false,
      isFetching: false,
      error: false,
    },
    isSentFriendRequest: {
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

    getAllFriendForMainUserStart: (state) => {
      state.getAllForMainUser.isFetching = true;
    },
    getAllFriendForMainUserSuccess: (state, action) => {
      state.getAllForMainUser.isFetching = false;
      state.getAllForMainUser.data = action.payload;
    },
    getAllFriendForMainUserFailed: (state) => {
      state.getAllForMainUser.isFetching = false;
      state.getAllForMainUser.error = true;
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

    addFriendStart: (state) => {
      state.addFriend.isFetching = true;
    },
    addFriendSuccess: (state, action) => {
      state.addFriend.isFetching = false;
      state.addFriend.data = action.payload;
    },
    addFriendFailed: (state) => {
      state.addFriend.isFetching = false;
      state.addFriend.error = true;
    },

    acceptFriendRequestStart: (state) => {
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

    denyFriendRequestStart: (state) => {
      state.denyFriendRequest.isFetching = true;
    },
    denyFriendRequestSuccess: (state, action) => {
      state.denyFriendRequest.isFetching = false;
      state.denyFriendRequest.data = action.payload;
    },
    denyFriendRequestFailed: (state) => {
      state.denyFriendRequest.isFetching = false;
      state.denyFriendRequest.error = true;
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

    isSentFriendRequestStart: (state) => {
      state.isSentFriendRequest.isFetching = true;
    },
    isSentFriendRequestSuccess: (state, action) => {
      state.isSentFriendRequest.isFetching = false;
      state.isSentFriendRequest.data = action.payload;
    },
    isSentFriendRequestFailed: (state) => {
      state.isSentFriendRequest.isFetching = false;
      state.isSentFriendRequest.error = true;
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

    getAllFriendForMainUserStart,
    getAllFriendForMainUserSuccess,
    getAllFriendForMainUserFailed,

    getMutualFriendStart,
    getMutualFriendSuccess,
    getMutualFriendFailed,

    addFriendStart,
    addFriendSuccess,
    addFriendFailed,

    acceptFriendRequestStart,
    acceptFriendRequestSuccess,
    acceptFriendRequestFailed,

    denyFriendRequestStart,
    denyFriendRequestSuccess,
    denyFriendRequestFailed,

    isFriendStart,
    isFriendSuccess,
    isFriendFailed,

    isSentFriendRequestStart,
    isSentFriendRequestSuccess,
    isSentFriendRequestFailed,
    

} = friendSlice.actions;
export default friendSlice.reducer;
