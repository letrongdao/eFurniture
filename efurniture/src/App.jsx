import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Authentication/Signin";
import Signup from "./pages/Authentication/Signup";
import EmailSignup from "./pages/Authentication/EmailSignup";
import Forgot from "./pages/Authentication/Forgot";
import Reset from "./pages/Authentication/Reset";
import AdminPage from "./pages/Admin/Admin";
import ProductList from "./pages/Product/ProductList";
import Product from "./pages/Product/Product";
import CategorizedProductList from "./pages/Product/CategorizedProductList";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import Checkout from "./pages/Purchase/Checkout";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/category/:name" element={<CategorizedProductList />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
export default App;
