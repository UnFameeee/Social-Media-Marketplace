import { createSlice } from '@reduxjs/toolkit';
import { revertAll } from '../resetStore';
const initialState = {
  getRequests: {
    data: [],
    isFetching: false,
    error: false,
  },
  getSentRequests: {
    data: [],
    isFetching: false,
    error: false,
  },
  getAllForMainUser: {
    data: [],
    isFetching: false,
    error: false,
  },
  getAll: {
    data: [],
    isFetching: false,
    error: false,
  },
  getSuggestion: {
    data: [],
    isFetching: false,
    error: false,
  },
  getMutualFriends: {
    data: null,
    isFetching: false,
    error: false,
  },
  addFriend: {
    isFetching: false,
  },
  acceptFriend: {
    isFetching: false,
  },
  denyFriend: {
    isFetching: false,
  },
  unfriend: {
    isFetching: false,
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
    getSentRequests: {
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
      isFetching: false,
    },
    acceptFriend: {
      isFetching: false,
    },
    denyFriend: {
      isFetching: false,
    },
    unfriend: {
      isFetching: false,
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

    getSentRequestStart: (state) => {
      state.getSentRequests.isFetching = true;
    },
    getSentRequestSuccess: (state, action) => {
      state.getSentRequests.isFetching = false;
      state.getSentRequests.data = action.payload;
    },
    getSentRequestFailed: (state) => {
      state.getSentRequests.isFetching = false;
      state.getSentRequests.error = true;
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
    addFriendSagaSuccess: (state) => {
      state.addFriend.isFetching = false;
    },
    addFriendFail: (state) => {
      state.addFriend.isFetching = false;
    },

    acceptFriendStart: (state) => {
      state.acceptFriend.isFetching = true;
    },
    acceptSagaSuccess: (state) => {
      state.acceptFriend.isFetching = false;
    },
    acceptFriendFail: (state) => {
      state.acceptFriend.isFetching = false;
    },

    denyFriendStart: (state) => {
      state.denyFriend.isFetching = true;
    },
    denySagaSuccess: (state) => {
      state.denyFriend.isFetching = false;
    },
    denyFriendFail: (state) => {
      state.denyFriend.isFetching = false;
    },

    unfriendStart: (state) => {
      state.unfriend.isFetching = true;
    },
    unfriendSagaSuccess: (state) => {
      state.unfriend.isFetching = false;
    },
    unfriendFail: (state) => {
      state.unfriend.isFetching = false;
    },
  },
});

export const {
  getRequestStart,
  getRequestSuccess,
  getRequestFailed,

  getSentRequestStart,
  getSentRequestSuccess,
  getSentRequestFailed,

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
  addFriendSagaSuccess,
  addFriendFail,

  acceptFriendStart,
  acceptSagaSuccess,
  acceptFriendFail,

  denyFriendStart,
  denySagaSuccess,
  denyFriendFail,

  unfriendStart,
  unfriendSagaSuccess,
  unfriendFail
} = friendSlice.actions;
export default friendSlice.reducer;
