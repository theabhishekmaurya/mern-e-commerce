import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartTotal } from "../Redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ prod, exists }) => {
  const { token, isAuth } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { price, seller, title, category, _id } = prod;

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const buttons = [
    <Button
      disabled={quantity == 1}
      onClick={() => setQuantity((prev) => prev - 1)}
      key="one"
    >
      -
    </Button>,
    <Button key="two">{quantity}</Button>,
    <Button onClick={() => setQuantity((prev) => prev + 1)} key="three">
      +
    </Button>,
  ];

  const handleAddToCart = () => {
    if (exists) {
      navigate("/cart");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/cart/${_id}`,
        { quantity },
        {
          headers: { token },
        }
      )
      .then((res) => {
        dispatch(setCart([...cartItems, { product: prod, quantity }]));
      });
  };

  const handleBuyNow = () => {
    dispatch(setCartTotal(prod.price * quantity));
    navigate(`/product/${_id}_${quantity}/address`);
  };
  return (
    <Stack
      alignItems={{ xs: "center", sm: "flex-start" }}
      width={{ xs: "100%", sm: "50%" }}
      spacing={3}
    >
      <Box>
        <Typography fontSize={{ xs: 35, sm: 42 }} fontWeight={500} variant="h4">
          {title}
        </Typography>
        <Box>
          <Typography color="#A6B1E1">
            <b>Category :</b> {category?.toUpperCase()}
          </Typography>
          <Typography color="#A6B1E1">
            <b>Sold by:</b> {seller}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row">
        <Typography fontSize={20} color="#424874" mr={2}>
          <b>Qty :</b>
        </Typography>
        <ButtonGroup size="small" aria-label="small button group">
          {buttons}
        </ButtonGroup>
      </Stack>
      <Typography color="#424874" fontSize={{ xs: 20, sm: 30 }} variant="h6">
        Price :{" "}
        {new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
          price
        )}{" "}
        INR
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          size="large"
          disabled={!isAuth}
          variant="outlined"
          onClick={handleAddToCart}
        >
          {!exists ? "Add to Cart" : "Go to cart "}{" "}
          <span style={{ marginLeft: "5px" }}>
            <ShoppingCartRounded fontSize="small" />
          </span>
        </Button>
        <Button
          size="large"
          id="primaryBgColor"
          variant="contained"
          disabled={!isAuth}
          onClick={handleBuyNow}
        >
          {isAuth ? "Buy Now" : "log in to continue"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductDetails;
