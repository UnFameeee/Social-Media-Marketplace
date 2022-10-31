import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getRefreshToken } from "../../redux/apiRequest";
const RequireAuth = () => {
  const auth = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  var accessToken = auth.currentUser?.access ?? "";
  var refreshToken = auth.currentUser?.refresh ?? "";
  if (accessToken !== "" && jwt_decode(accessToken).exp < Date.now() / 1000) {
     console.log("accessToken expire");
    // if (refreshToken !== "") {
    //   getRefreshToken(dispatch, refreshToken);
    // }
  } else {
    console.log("accessToken still valid");
  }
  const location = useLocation();
  return auth?.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
