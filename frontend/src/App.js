import { Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar/NavigationBar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import Register from "./screens/Register/Register";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
