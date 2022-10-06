import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProdGrid from "./ProdGrid";
import { Box } from "@mui/system";
import ProdFilter from "./ProdFilter";

const ProductHome = () => {
  const { active } = useSelector((state) => state.activeProd);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/show-products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <Box
      display="flex"
      padding="0px 10px"
      flexDirection="column"
      alignItems="center"
    >
      <ProdGrid prod={products} />
    </Box>
  );
};

export default ProductHome;
