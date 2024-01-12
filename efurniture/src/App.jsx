import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"
import Product from "./pages/Product";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/product" element={<Product />} />
    </Routes>
  )
}
export default App;
