import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./Components/Footer";
import HomeTabs from "./Components/Home/HomeTabs";
import Navbar from "./Components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Navbar />
      <HomeTabs />
      <App />
      <Footer />
    </BrowserRouter>
  </>
);
