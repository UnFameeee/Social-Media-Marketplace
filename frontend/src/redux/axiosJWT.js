import jwt_decode from "jwt-decode";
import axios from "axios";
import { store } from "../redux/store";
import { takeRefreshToken } from "./apiRequest";
import { refreshTokenSuccess, userDataAssign } from "./authSlice";
export let axiosInStanceJWT = axios.create();
store.subscribe(() => {
  // When state will be updated(in this case, when items will be fetched), this is how we can get updated state.
  let items = store.getState().items;
});
axiosInStanceJWT.interceptors.request.use(
  async (config) => {
    debugger;
    const auth = store.getState().auth?.login;
    var accessToken = auth?.currentUser?.access;
    var refreshToken = auth?.currentUser?.refresh;
    if (jwt_decode(accessToken).exp < Date.now() / 1000) {
      const data = await takeRefreshToken(refreshToken);
      var decoded = jwt_decode(data.access);
      store.dispatch(refreshTokenSuccess(data));
      store.dispatch(userDataAssign(decoded));
      config.headers["Authorization"] = `Bearer ${data.access}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
