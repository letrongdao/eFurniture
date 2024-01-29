import { useEffect, useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import LoginPage from "./pages/Login/Login";
import AdminPage from "./pages/Admin/Admin";
import DetailPage from "./pages/Detail/DetailPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/detail" element={<DetailPage />} />
    </Routes>
  );
}
export default App;
