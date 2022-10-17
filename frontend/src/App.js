import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import NotFoundPage from './screens/NotFoundPage/NotFoundPage';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import WithNav from '../src/components/Layout/Navbar/WithNav';
import WithoutNav from '../src/components/Layout/Navbar/WithoutNav';
import UserProfile from './screens/UserProfile/UserProfile';
import Settings from './screens/Setting/Settings';
import RequireAuth from './screens/Auth/RequireAuth';
import Error from './screens/NotFoundPage/Error';

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/forbidden" element={<Error status="403" />} />
      </Routes>
    </>
  );
}

export default App;
