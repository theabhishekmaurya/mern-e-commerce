import React from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Not authorized, Please login to continue
      </h1>
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
