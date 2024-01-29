import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Authentication from "./pages/Authentication/Authentication";
import AdminPage from "./pages/Admin/Admin";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
export default App;
