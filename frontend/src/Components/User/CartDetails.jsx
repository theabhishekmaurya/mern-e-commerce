import { Box, Stack } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { setCartTotal } from "../Redux/cartSlice";

const CartDetails = ({ cartItems,total }) => {
  const dispatch = useDispatch();
 
  dispatch(setCartTotal(total));

  return (
    <Box
      borderRadius="5px"
      boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      width={{ xs: "100%", md: "80%", xl: "60%" }}
    >
      <h3 style={{ padding: "0 20px", paddingTop: "5px" }}>Price Details</h3>
      <Box margin="15px 0px" padding="5px 20px">
        <Stack direction="row" fontSize="18px" justifyContent="space-between">
          <p>Price ({cartItems.length} Items) : </p>
          <p>
            {" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(total)}{" "}
          </p>
        </Stack>
        <Stack direction="row" fontSize="18px" justifyContent="space-between">
          <p>Discount : </p>
          <p style={{ color: "green" }}>
            -{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(total * 0.1)}{" "}
          </p>
        </Stack>
        <Stack direction="row" fontSize="18px" justifyContent="space-between">
          <p>Delivery Charges : </p>
          <p style={{ color: "green" }}>FREE</p>
        </Stack>
        <Stack direction="row" fontSize="18px" justifyContent="space-between">
          <p>Secured Packaging Fee : </p>
          <p>
            {" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(total * 0.0015)}{" "}
          </p>
        </Stack>
        <Stack
          margin="10px 0"
          direction="row"
          fontSize="18px"
          justifyContent="space-between"
        >
          <h4>Total Amount: </h4>
          <h5>
            {
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              })
                .format(Math.round(total - total * 0.1 - total * 0.0015))
                .split(".")[0]
            }{" "}
          </h5>
        </Stack>
      </Box>
    </Box>
  );
};

export default CartDetails;
