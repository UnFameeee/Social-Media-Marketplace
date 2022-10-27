import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
const RequireAuth = () => {
  const auth = useSelector((state) => state.auth.login);
  var token = auth.currentUser?.access ?? "";
  let isExpired = false;
  if (token !== "" && jwt_decode(token).exp < Date.now() / 1000) {
    console.log("token expire");
    isExpired = true;
  } else {
    console.log("token still valid");
  }
  const location = useLocation();
  return auth?.currentUser && !isExpired ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
