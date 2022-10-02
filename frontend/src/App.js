import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import WithNav from "../src/components/Layout/Navbar/WithNav"
import WithoutNav from "../src/components/Layout/Navbar/WithoutNav";
import UserProfile from "./screens/UserProfile/UserProfile";
import Settings from "./screens/Setting/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithoutNav/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<WithNav/>}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
