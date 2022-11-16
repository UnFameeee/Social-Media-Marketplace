import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';
import RequireAuth from './RequireAuth';
import Home from '../../screens/Home/Home';
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import UserProfile from '../../screens/UserProfile/UserProfile';
import Settings from '../../screens/Setting/Settings';
import Messenger from '../../screens/Messenger/Messenger';
import {
  DynamicLeftbarLayout,
  StaticLeftbarLayout,
} from '../../screens/Friends';
import {
  FriendHome,
  Birthday,
} from '../../screens/Friends/StaticLeftbar';
import {
  AllFriends,
  FriendRequests,
  FriendSuggestions,
} from '../../screens/Friends/DynamicLeftbar';
import Error from '../../screens/Error/Error';
import Marketplace from '../../screens/Marketplace/Marketplace';
import CheckOut from '../../screens/Marketplace/CheckOut';
import Search from '../../screens/Home/Search';
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
              <Route
                path="suggestions"
                element={<FriendSuggestions />}
              />
              <Route path="all" element={<AllFriends />} />
            </Route>

            {/* marketplace screens */}
            <Route path="marketplace" element={<Marketplace />} /> 
            <Route path="checkout" element={<CheckOut />} />


            <Route path="/search" element={<Search />} />


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
