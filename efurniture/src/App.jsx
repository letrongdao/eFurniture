import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"
import Product from "./pages/Product";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/product" element={<Product />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
export default App;
