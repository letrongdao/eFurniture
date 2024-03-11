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
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import OrderList from "./pages/Order/OrderList";
import OrderStatus from "./pages/Order/OrderStatus";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import BookingPage from "./pages/Booking/BookingPage";
import AddAddressModal from './components/AddAddressModal/AddAddressModal';
import Checkout from './pages/Checkout/Checkout';
import SearchResult from './pages/Search/SearchResult';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/email" element={<EmailSignup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/category/:name" element={<CategorizedProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<OrderList />} />
      <Route path="/orderStatus" element={<OrderStatus />} />
      <Route path="/paymentForm" element={<PaymentForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/bookings/:id" element={<BookingPage />} />
      <Route path='/test-modal' element={<AddAddressModal />} />
      <Route path='test-checkout' element={<Checkout />} />
      <Route path='/search' element={<SearchResult />} />
    </Routes>
  );
}
export default App;
