import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom"
import Product from "./pages/Product";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch('http://localhost:8081/users')
    .then (res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  )
}
export default App;
