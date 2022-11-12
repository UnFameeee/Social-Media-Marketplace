import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  getRequests: {
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
  getSuggestion: {
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
  accept: {
    data: false,
    isFetching: false,
    error: false,
  },
  deny: {
    data: false,
    isFetching: false,
    error: false,
  },
  isFriend: {
    data: false,
    isFetching: false,
    error: false,
  },
  unfriend: {
    data: false,
    isFetching: false,
    error: false,
  },
  isSentRequest: {
    data: false,
    isFetching: false,
    error: false,
  },
};
export const friendSlice = createSlice({
  name: 'friends',
  initialState: {
    getRequests: {
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
    getSuggestion: {
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
    accept: {
      data: false,
      isFetching: false,
      error: false,
    },
    deny: {
      data: false,
      isFetching: false,
      error: false,
    },
    isFriend: {
      data: false,
      isFetching: false,
      error: false,
    },
    unfriend: {
      data: false,
      isFetching: false,
      error: false,
    },
    isSentRequest: {
      data: false,
      isFetching: false,
      error: false,
    },
  },
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => initialState),
  reducers: {
    getRequestStart: (state) => {
      state.getRequests.isFetching = true;
    },
    getRequestSuccess: (state, action) => {
      state.getRequests.isFetching = false;
      state.getRequests.data = action.payload;
    },
    getRequestFailed: (state) => {
      state.getRequests.isFetching = false;
      state.getRequests.error = true;
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

    getSuggestionStart: (state) => {
      state.getSuggestion.isFetching = true;
    },
    getSuggestionSuccess: (state, action) => {
      state.getSuggestion.isFetching = false;
      state.getSuggestion.data = action.payload;
    },
    getSuggestionFailed: (state) => {
      state.getSuggestion.isFetching = false;
      state.getSuggestion.error = true;
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
    addFriendSaga() {},
    addFriendSagaSuccess() {},

    acceptStart: (state) => {
      state.accept.isFetching = true;
    },
    acceptSuccess: (state, action) => {
      state.accept.isFetching = false;
      state.accept.data = action.payload;
    },
    acceptFailed: (state) => {
      state.accept.isFetching = false;
      state.accept.error = true;
    },
    acceptSaga() {},
    acceptSagaSuccess() {},

    denyStart: (state) => {
      state.deny.isFetching = true;
    },
    denySuccess: (state, action) => {
      state.deny.isFetching = false;
      state.deny.data = action.payload;
    },
    denyFailed: (state) => {
      state.deny.isFetching = false;
      state.deny.error = true;
    },
    denySaga() {},
    denySagaSuccess() {},

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

    unfriendStart: (state) => {
      state.unfriend.isFetching = true;
    },
    unfriendSuccess: (state, action) => {
      state.unfriend.isFetching = false;
      state.unfriend.data = action.payload;
    },
    unfriendFailed: (state) => {
      state.unfriend.isFetching = false;
      state.unfriend.error = true;
    },
    unfriendSaga() {},
    unfriendSagaSuccess() {},

    isSentRequestStart: (state) => {
      state.isSentRequest.isFetching = true;
    },
    isSentRequestSuccess: (state, action) => {
      state.isSentRequest.isFetching = false;
      state.isSentRequest.data = action.payload;
    },
    isSentRequestFailed: (state) => {
      state.isSentRequest.isFetching = false;
      state.isSentRequest.error = true;
    },
  },
});

export const {
  getRequestStart,
  getRequestSuccess,
  getRequestFailed,

  getAllFriendStart,
  getAllFriendSuccess,
  getAllFriendFailed,

  getAllFriendForMainUserStart,
  getAllFriendForMainUserSuccess,
  getAllFriendForMainUserFailed,

  getSuggestionStart,
  getSuggestionSuccess,
  getSuggestionFailed,

  getMutualFriendStart,
  getMutualFriendSuccess,
  getMutualFriendFailed,

  addFriendStart,
  addFriendSuccess,
  addFriendFailed,

  acceptStart,
  acceptSuccess,
  acceptFailed,

  denyStart,
  denySuccess,
  denyFailed,

  isFriendStart,
  isFriendSuccess,
  isFriendFailed,

  unfriendStart,
  unfriendSuccess,
  unfriendFailed,

  isSentRequestStart,
  isSentRequestSuccess,
  isSentRequestFailed,

  addFriendSaga,
  addFriendSagaSuccess,
  acceptSaga,
  acceptSagaSuccess,
  denySaga,
  denySagaSuccess,
  unfriendSaga,
  unfriendSagaSuccess
} = friendSlice.actions;
export default friendSlice.reducer;
