import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import RequireAuth from "./RequireAuth";
import Home from "../../screens/Home/Home";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import UserProfile from "../../screens/UserProfile/UserProfile";
import Settings from "../../screens/Setting/Settings";
import Messenger from "../../screens/Messenger/Messenger";
import {
  DynamicLeftbarLayout,
  StaticLeftbarLayout,
} from "../../screens/Friends";
import { FriendHome, Birthday } from "../../screens/Friends/StaticLeftbar";
import {
  AllFriends,
  FriendRequests,
  FriendSuggestions,
  YourSentRequests,
} from "../../screens/Friends/DynamicLeftbar";
import Error from "../../screens/Error/Error";
import Marketplace from "../../screens/Marketplace/Marketplace";
import CheckOut from "../../screens/Marketplace/CheckOut";
import SearchPage from "../../screens/Home/SearchPage";
import Shopping from "../../screens/Marketplace/Shopping";
import Selling from "../../screens/Marketplace/Selling";
import PostView from "../../screens/Home/PostView";

export default function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />

            {/* friend screens */}
            <Route path="friends" element={<StaticLeftbarLayout />}>
              <Route path="" element={<FriendHome />} />
              <Route path="birthdays" element={<Birthday />} />
            </Route>
            <Route path="friends" element={<DynamicLeftbarLayout />}>
              <Route path="requests" element={<FriendRequests />} />
              <Route path="sent" element={<YourSentRequests />} />
              <Route path="suggestions" element={<FriendSuggestions />} />
              <Route path="all" element={<AllFriends />} />
            </Route>

            {/* marketplace screens */}
            <Route path="shopping" element={<Shopping />} />
            <Route path="selling" element={<Selling />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="marketplace" element={<Marketplace />}></Route>

            <Route path="/search" element={<SearchPage />} />
            <Route path="/post" element={<PostView />} />

            <Route path="/messenger" element={<Messenger />} />
          </Route>
        </Route>

        {/* error screens */}
        <Route path="*" element={<Error />} />
        <Route path="forbidden" element={<Error status="403" />} />
      </Routes>
    </BrowserRouter>
  );
}
