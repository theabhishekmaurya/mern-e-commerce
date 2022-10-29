import { Box } from "@mui/system";
import React from "react";

const ProdImage = ({ image }) => {
  return (
    <Box
      width={{ xs: "100%", sm: "50%" }}
      display="flex"
      justifyContent="center"
    >
      <img
        style={{ width: "20rem", objectFit: "cover" }}
        height="100%"
        src={image}
      />
    </Box>
  );
};

export default ProdImage;
