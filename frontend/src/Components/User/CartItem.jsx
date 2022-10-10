import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

const CartItem = ({ prod, qty }) => {
  console.log(prod);
  const { title, price, seller, image } = prod;
  return (
    <Stack
      height="250px"
      // border="1px solid"
      p="10px"
      direction="row"
      spacing={5}
    >
      <Box height="100%" width="150px">
        <img height="100%" width="100%" src={image} />
      </Box>
      <Stack>
        <Box>
          <h4 style={{fontSize:{xs:"100px"}}}>{title}</h4>
          <p style={{ fontSize: "12px", margin: "0px" }} className="link">
            Seller : {seller}
          </p>
          <p style={{ fontSize: "12px" }} className="link">
            Quantity : {qty}
          </p>
        </Box>
        <Box>
          <h5>
            ₹{" "}
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(price * qty)}{" "}
          </h5>
          <Button size="small">Remove</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItem;
