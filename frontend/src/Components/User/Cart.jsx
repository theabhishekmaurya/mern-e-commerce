import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import CartDetails from "./CartDetails";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].product.price * cartItems[i].quantity;
  }

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/cart/all/address");
  };
  return (
    <Stack
      margin={{ xs: "20px ", md: "20px 40px", xl: "20px 100px" }}
      direction={{ xs: "coloumn", md: "row" }}
      spacing={2}
    >
      <Stack
        width={{ xs: "100%", md: "120%", xl: "60%" }}
        margin={{ xs: "none", xl: "0 30px" }}
        height="450px"
        overflow="scroll"
        borderRadius="5px"
        justifyContent={cartItems.length == 0 ? "center" : ""}
        alignItems={cartItems.length == 0 ? "center" : ""}
        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      >
        {cartItems.map((prod) => (
          <CartItem prod={prod.product} qty={prod.quantity} />
        ))}
        {cartItems.length === 0 && (
          <img
            width="50%"
            src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?size=338&ext=jpg"
          />
        )}
      </Stack>
      <Box width={{ xs: "100%", xl: "50%" }}>
        <CartDetails total={total} cartItems={cartItems} />
        <Box
          width={{ xs: "100%", md: "80%", xl: "60%" }}
          display="flex"
          justifyContent="center"
        >
          <Button
            fullWidth
            size="large"
            variant="contained"
            id="primaryBgColor"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Cart;
