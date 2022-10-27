import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ProdImage from "./ProdImage";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { useSelector } from "react-redux";

export const ProdDetails = () => {
  const [prod, setProd] = useState({});
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [prodExists, setProdExists] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/product/${id}`)
      .then((res) => {
        setProd(res.data[0]);
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/${id}`, {
            headers: { token },
          })
          .then((res) => {
            setProdExists(res.data.exists);
          });
      });
  }, [cartItems, id]);

  return (
    <Stack
      p={{ xs: "15px", sm: "10px 35px" }}
      mb="100px"
      direction="row"
      justifyContent="center"
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        className="prodDet"
        width="95%"
        p={5}
        mb={2}
      >
        <ProdImage image={prod.image} />
        <ProductDetails prod={prod} exists={prodExists} />
      </Stack>
    </Stack>
  );
};
