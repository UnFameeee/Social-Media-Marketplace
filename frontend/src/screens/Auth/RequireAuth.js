import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getRefreshToken } from "../../redux/apiRequest";
const RequireAuth = () => {
  const auth = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  var accessToken = auth.currentUser?.access ?? "";
  var refreshToken = auth.currentUser?.refresh ?? "";
  var reFreshIsExpired = false;
  if (refreshToken !== "" && jwt_decode(refreshToken).exp < Date.now() / 1000) {
    console.log("reFreshToken is expired");
    reFreshIsExpired = true;
  } else {
    console.log("reFreshToken still valid");
  }
  const location = useLocation();
  return auth?.currentUser && !reFreshIsExpired ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
