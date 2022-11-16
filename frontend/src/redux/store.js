import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import postReducer from "./post/postSlice";
import authReducer from "./auth/authSlice";
import friendReducer from "./friend/friendSlice";
import profileReducer from "./profile/profileSlice";
import uploadImageReducer from "./uploadImage/uploadImageSlice";
import commentReducer from "./comment/commentSlice"
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  friends: friendReducer,
  profile: profileReducer,
  uploadImage: uploadImageReducer,
  comment: commentReducer,
  
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
export let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
