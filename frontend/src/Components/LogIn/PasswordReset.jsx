import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Alert } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

const PasswordReset = () => {
  const { token, userId } = useParams();
  const [updateFail, setUpdateFail] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const [validLink, setValidLink] = React.useState(true);

  const [password, setPassword] = React.useState({
    newPass: "",
    confirmNewPass: "",
  });

  const navigate = useNavigate();
console.log(token, userId)
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/update-password/${userId}/${token}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
        setValidLink(false);
      });
  }, [token, userId]);

  const handleChange = (e) => {
    setUpdateFail(false);
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/update-password/${userId}`,
        password
      )
      .then((res) => {
        console.log(res);
        setUpdateSuccess(true);
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      })
      .catch((e) => {
        setUpdateFail(true);
      });
  };
  if (!validLink)
    return (
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <img
          width="40%"
          src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif"
        />
        <Typography variant="h4">Error 404! Page Not Found</Typography>

        <Link className="link" to="/signin">
          <Button variant="contained" id="primaryBgColor">
            Go to login
          </Button>
        </Link>
      </Box>
    );
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleUpdate}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPass"
              type="password"
              label="Enter new password"
              name="newPass"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmNewPass"
              label="Confirm password"
              type="password"
              id="confirmNewPass"
              onChange={handleChange}
              autoComplete="current-password"
            />
            {password.newPass != password.confirmNewPass && (
              <Alert severity="warning">Passwords do not match</Alert>
            )}
            {updateFail && (
              <Alert severity="warning">
                Password must be 5 chars long and include a number
              </Alert>
            )}
            {updateSuccess && (
              <Alert>Password updated, Going back to login page ...</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="primaryBgColor"
              disabled={password.newPass != password.confirmNewPass}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordReset;
