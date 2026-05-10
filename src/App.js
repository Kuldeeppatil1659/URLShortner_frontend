import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Components/Landing Pages/Home";
import Login from "./Components/Landing Pages/Login";
import Register from "./Components/Landing Pages/Register";
import Navbar from "./Components/Navbar";
import Main from "./Components/Functionality/Main";
import Link from "./Components/Functionality/Link";
import QrCode from "./Components/Functionality/QrCode";
import Footer from "./Components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/link" element={<Link />} />
          <Route path="/qrcode" element={<QrCode />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
