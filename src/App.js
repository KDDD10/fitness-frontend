import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Exercise from "./pages/Exercise";
import Cart from "./pages/Cart";
import NutritionPage from "./pages/NutritionPage";
import ShopPage from "./pages/Shop";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/Profile";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/LogIn";
import PasswordResetPage from "./pages/PasswordReset";
import CheckOut from "./pages/CheckOut";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import Subscriptions from "./pages/Subscriptions";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/exercise" element={<Exercise />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/nutrition" element={<NutritionPage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/subscriptions" element={<Subscriptions />}></Route>
        <Route path="/community" element={<CommunityPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/password-reset" element={<PasswordResetPage />}></Route>
        <Route path="/check-out" element={<CheckOut />}></Route>
        <Route path="/payment-successful" element={<PaymentSuccess />}></Route>
        <Route path="/payment-error" element={<PaymentError />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
