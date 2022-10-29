import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const PaymentSuccess = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { orderId } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/order/success/${orderId}`)
      .then((res) => {
        console.log(res);
        setValidUrl(true);
      })
      .catch((e) => {
        console.log(e.message);
        setValidUrl(false);
      });
  }, []);

  return (
    <>
      {validUrl ? (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <img
            width="20%"
            src="https://c.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
          />
          <Typography textAlign="center" variant="h4">
            Order placed successfully
          </Typography>

          <Link className="link" to="/all-products">
            <Button variant="contained" id="primaryBgColor">
              Shop More
            </Button>
          </Link>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <img
            width="40%"
            src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif"
          />
          <Typography textAlign="center" variant="h4">
            Error 404! Page Not Found
          </Typography>

          <Link className="link" to="/">
            <Button variant="contained" id="primaryBgColor">
              Go to Home
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};
export default PaymentSuccess;
