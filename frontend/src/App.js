import { Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import Register from "./screens/Register/Register";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
