import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ProdItem = ({ item }) => {
  const { image, price, title } = item;
  return (
    <Box height={{xs:"350px",sm:"400px"}} 
    width={{xs:"100%", md:"100%"}} 
    border="1px solid"
    >
      <img height="70%" width="100%" src={image} />
      <Typography className="textOverflow" m="15px 5px" variant="h6" mb="5px">
        {title}
      </Typography>

      <Typography fontSize={19} m="0px 5px" className="link">
        <b>Rs.</b> {price}
      </Typography>
    </Box>
  );
};

export default ProdItem;
