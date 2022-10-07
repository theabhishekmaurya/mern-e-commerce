import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ProdImage from "./ProdImage";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import ProductDetails from "./ProductDetails";

export const ProdDetails = () => {
  const [prod, setProd] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/product/${id}`)
      .then((res) => setProd(res.data[0]));
  }, []);

  return (
    <Box p="10px 45px">
      <Stack direction="row">
        <ProdImage image={prod.image} />
        <ProductDetails prod={prod} />
      </Stack>
    </Box>
  );
};
