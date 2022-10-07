import { Box } from "@mui/system";
import React from "react";

const ProdImage = ({ image }) => {
  return (
    <Box width="50%" border="1px solid" display="flex" justifyContent="center">
      <img width="50%" src={image} />
    </Box>
  );
};

export default ProdImage;
