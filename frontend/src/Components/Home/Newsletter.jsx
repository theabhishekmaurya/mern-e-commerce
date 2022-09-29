import { Box, Input, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Newsletter = () => {
  return (
    <Box
      padding={"10px 45px"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
      //   backgroundColor="#F4EEFF"
    >
      <Box justifyContent="center" gap={5}>
        <Typography
          sx={{ fontSize: { xs: "60px", sm: "70px", md: "90px" } }}
          fontWeight={500}
          align="center"
        >
          Newsletter
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "18px", sm: "25px", md: "30px" } }}
          paragraph
          align="center"
          color="#424874"
        >
          Get timely updates from your favorite products
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={{ xs: "390px", sm: "600px", md: "900px" }}
          height="57px"
        >
          <TextField
            id="outlined-basic"
            label="Your email"
            variant="filled"
            sx={{ width: { xs: "80%", sm: "90%" } }}
          />
          <Box
            backgroundColor="#424874"
            width={{ xs: "20%", sm: "10%" }}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SendRoundedIcon fontSize="large" sx={{ color: "white" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
