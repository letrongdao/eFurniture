import "./App.css";
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
import PaymentForm from "./vn-pay-payment/PaymentForm";
import PaymentTransform from "./vn-pay-payment/PaymentTransform";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/category/:name" element={<CategorizedProductList />} />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/paymentForm" element={<PaymentForm />} />

    </Routes>
  );
}
export default App;
