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
import postReducer from "./postSlice";
import authReducer from "./authSlice";
import friendReducer from "./friendSlice";
import profileReducer from "./profileSlice";
import uploadImageReducer from "./uploadImageSlice";
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
