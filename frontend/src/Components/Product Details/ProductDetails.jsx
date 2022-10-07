import { Box, Typography } from "@mui/material";
import React from "react";

const ProductDetails = ({ prod }) => {
  const { price, seller, title, category } = prod;

  return (
    <Box border="1px solid" width="50%">
      <Typography>Sold by: {seller}</Typography>
      <Typography fontWeight={500} variant="h4">
        {title}
      </Typography>
      <Typography paragraph>Category : {category?.toUpperCase()}</Typography>
      <Typography>
        Price :{" "}
        {new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
          price
        )}{" "}
        INR
      </Typography>
    </Box>
  );
};

export default ProductDetails;
