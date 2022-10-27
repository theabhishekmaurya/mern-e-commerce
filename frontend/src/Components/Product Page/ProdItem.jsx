import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProdItem = ({ item }) => {
  const { image, price, title, _id } = item;
  const navigate = useNavigate();
  return (
    <Box
      height={{ xs: "300px", sm: "400px" }}
      width={{ xs: "100%", md: "100%" }}
      className="prodItem"
      p="6px"
      onClick={() => {
        navigate(`/product/${_id}`);
      }}
    >
      <img height="70%" width="100%" alt={title} src={image} />
      <Typography className="textOverflow" m="15px 5px" variant="h6" mb="5px">
        {title}
      </Typography>

      <Typography fontSize={19} m="0px 5px" className="link">
        <b>Rs.</b>{" "}
        {new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
          price
        )}
      </Typography>
    </Box>
  );
};

export default ProdItem;
