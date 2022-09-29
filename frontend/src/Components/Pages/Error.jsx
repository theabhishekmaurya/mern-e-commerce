import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate=useNavigate()
  return (
    <Container>
      <Box gap={1} display="flex" alignItems="center" flexDirection="column">
        <img
          width="60%"
          src="https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?size=626&ext=jpg"
        />
        <Typography variant="h2">Error 404</Typography>
        <Typography variant="h6">Page not found</Typography>
        <Button 
        variant="contained" 
        id="primaryBgColor"
        onClick={()=>{
            navigate("/")
        }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Error;
