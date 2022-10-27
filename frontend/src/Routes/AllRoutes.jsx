import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import SignUp from "../Components/LogIn/Signup";
import SignIn from "../Components/LogIn/Signin";
import Error from "../Components/Pages/Error";
import Dashboard from "../Components/Admin Dashboard/Dashboard";
import VerifyEmail from "../Components/LogIn/VerifyEmail";
import PasswordReset from "../Components/LogIn/PasswordReset";
import Cart from "../Components/User/Cart";
import ProductHome from "../Components/Product Page/ProductHome";
import { ProdDetails } from "../Components/Product Details/ProdDetails";
import ChooseAddress from "../Components/User/ChooseAddress";
import MyAccount from "../Components/User/MyAccount";
import PaymentSuccess from "../Components/User/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route path="/all-products" element={<ProductHome />} />
      <Route
        path="/my-account"
        element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        }
      />
      <Route
        path=":coming_from/:prodId/address"
        element={
          <PrivateRoute>
            <ChooseAddress />
          </PrivateRoute>
        }
      />
      <Route path="/product/:id" element={<ProdDetails />} />
      <Route path="/order-success/:orderId" element={<PaymentSuccess />} />
      <Route path="/users/:userId/verify/:token" element={<VerifyEmail />} />
      <Route
        path="/users/:userId/forgot-password/:token"
        element={<PasswordReset />}
      />
    </Routes>
  );
};

export default AllRoutes;
