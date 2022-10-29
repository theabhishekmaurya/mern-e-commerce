import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const VerifyEmail = () => {
  const { token, userId } = useParams();
  const [validUrl, setValidUrl] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}/verifyuser/${token}`
      )
      .then((res) => {
        console.log(res);
        setValidUrl(true);
      })
      .catch((e) => {
        console.log(e.message);
        setValidUrl(false);
      });
  }, [token, userId]);

  return (
    <>
      {validUrl ? (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <img
            width="20%"
            src="https://c.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
          />
          <Typography textAlign="center" variant="h4">
            Email Verified Successfully
          </Typography>

          <Link className="link" to="/signin">
            <Button variant="contained" id="primaryBgColor">
              Go to login
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

          <Link className="link" to="/signin">
            <Button variant="contained" id="primaryBgColor">
              Go to login
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};
export default VerifyEmail;
