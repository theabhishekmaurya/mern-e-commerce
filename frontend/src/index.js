import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Footer from "./Components/Footer";
import HomeTabs from "./Components/Home/HomeTabs";
import Navbar from "./Components/Navbar";

import { Provider } from "react-redux";
import { store } from "./Components/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <HomeTabs />
          <App />
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);
