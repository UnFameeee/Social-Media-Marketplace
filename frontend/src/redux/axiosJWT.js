import jwt_decode from "jwt-decode";
import axios from "axios";
import { store } from "../redux/store";
import { takeRefreshToken } from "./apiRequest";
import { refreshTokenSuccess, userDataAssign } from "./auth/authSlice";
export let axiosInStanceJWT = axios.create();
axiosInStanceJWT.interceptors.request.use(
  async (config) => {
    if (jwt_decode(config.ACCESS_PARAM).exp < Date.now() / 1000) {
      const data = await takeRefreshToken(config.REFRESH_PARAM);
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
