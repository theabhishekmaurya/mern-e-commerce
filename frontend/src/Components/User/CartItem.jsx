import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import axios from "axios";
import { setCart } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ prod, qty }) => {
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { title, price, seller, image, _id } = prod;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/${_id}`, {
        headers: { token },
      })
      .then((res) => {
        let updated = cartItems.filter(({ product }) => product._id != _id);
        dispatch(setCart(updated));
      });
  };
  return (
    <Stack
      height="250px"
      // border="1px solid"
      p="10px"
      direction="row"
      spacing={5}
    >
      <Box
        height="100%"
        // width="150px"
        onClick={() => {
          navigate(`/product/${_id}`);
        }}
      >
        <img height="100%" width="150px" src={image} />
      </Box>
      <Stack>
        <Box>
          <h4
            onClick={() => {
              navigate(`/product/${_id}`);
            }}
            style={{
              fontSize: { xs: "100px" },
              cursor: "pointer",
            }}
            className="textOverflow"
          >
            {title}
          </h4>
          <p style={{ fontSize: "12px", margin: "0px" }} className="link">
            Seller : {seller}
          </p>
          <p style={{ fontSize: "12px" }} className="link">
            Quantity : {qty}
          </p>
        </Box>
        <Box>
          <h5>
            {" "}
            {
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              })
                .format(price)
                .split(".")[0]
            }{" "}
          </h5>
          <Button size="small" onClick={handleRemove}>
            Remove
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CartItem;
