import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import SignUp from "../Components/LogIn/Signup";
import SignIn from "../Components/LogIn/Signin";
import Error from "../Components/Pages/Error";
import Dashboard from "../Components/Admin Dashboard/Dashboard";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error/>} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AllRoutes;
