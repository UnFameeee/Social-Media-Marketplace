import jwt_decode from "jwt-decode";
import axios from "axios";
import { store } from "../redux/store";
import { takeRefreshToken } from "./apiRequest";
import { refreshTokenSuccess, userDataAssign } from "./auth/authSlice";
import { useNavigate } from "react-router-dom";
import { revertAll } from "./resetStore";
export let axiosInStanceJWT = axios.create();
axiosInStanceJWT.interceptors.request.use(
  async (config) => {
    if (jwt_decode(config.ACCESS_PARAM).exp < Date.now() / 1000) {
      const data = await takeRefreshToken(config.REFRESH_PARAM);
      if (data) {
        var decoded = jwt_decode(data.access);
        store.dispatch(refreshTokenSuccess(data));
        store.dispatch(userDataAssign(decoded));
        config.headers["Authorization"] = `Bearer ${data.access}`;
      } else {
        store.dispatch(revertAll());
        window.location.replace("/login");
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
