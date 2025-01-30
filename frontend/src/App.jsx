import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import 'leaflet/dist/leaflet.css';
import store from "./store/store";
import HomePage from "./pages/HomePage";
import UserDashboard from "./components/dashboard/UserDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ShopDashboard from "./components/dashboard/ShopDashboard";
import SingleProduct from "./pages/SingleProduct";
import UserRegister from "./pages/UserRegister";
import HelpCenter from "./components/Footers/HelpCenter";
import ContactUs from "./components/Footers/ContactUs";
import UserLogin from "./pages/UserLogin";
import { UserProvider } from "./components/context/UserContext"; 
import RegisterStore from "./pages/RegisterStore";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Forgetpassword from "./pages/Forgetpassword";
import PriceRangeFilterProducts from "./pages/PriceRangeFilterProducts";
import StoreLogin from "./pages/StoreLogin";
import UploadDocuments from "./pages/UploadDocuments";
import PackageSubscription from "./pages/PackageSubscription";
import AddtoCart from "./components/cart/AddtoCart";

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/shopdashboard" element={<ShopDashboard />} />
            <Route path="/single-product/:id" element={<SingleProduct />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="//password/forgot" element={<Forgetpassword />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/register-store" element={<RegisterStore />} />
            <Route path="/login-store" element={<StoreLogin />} />
            <Route path="/upload-documents" element={<UploadDocuments />} />
            <Route path="/upload-documents/choose-plans" element={<PackageSubscription />} />
            <Route path="/priceRange/products/:id" element={<PriceRangeFilterProducts />} />
            <Route path="/AddToCart/:id" element={<AddtoCart />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}
