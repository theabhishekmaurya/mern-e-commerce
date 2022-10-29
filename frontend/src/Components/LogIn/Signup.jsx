import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import AlertDialogSlide from "../AlertDialog";
import { useSelector } from "react-redux";

const theme = createTheme();

export default function SignUp() {
  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { isAuth } = useSelector((state) => state.auth);

  const [handleError, setHandleError] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [emailMsg, setEmailMsg] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState("");

  const handleChange = (e) => {
    setEmailMsg("");
    const { name, value } = e.target;
    setSuccess(false);
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const { firstName, email, password } = userData;
  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailMsg("");
    setLoading(true);
    if (!firstName || !email || !password) {
      alert("Please fill in the required details");
      setLoading(false);
    } else {
      setSuccess(false);
      axios
        .post(`${process.env.REACT_APP_SERVER_BASE_URL}/users/signup`, userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.emailExists) {
            setEmailMsg(res.data.emailExists);
            setLoading(false);
            return;
          }
          if (res.data.errors) {
            setErrors(res.data.errors);
            setHandleError(true);
            setLoading(false);
            return;
          }

          setLoading(false);
          setSuccess(true);
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  if (isAuth) return <Navigate to="/" />;
  return (
    <ThemeProvider theme={theme}>
      {handleError ? (
        <AlertDialogSlide
          setHandleError={setHandleError}
          errors={errors}
          title={"Error while signing up!"}
        />
      ) : (
        ""
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={userData.firstName}
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={userData.lastName}
                  name="lastName"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {emailMsg && <Alert severity="warning">{emailMsg}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {success && (
                  <Alert>
                    Verification link sent, please verify your email
                  </Alert>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="primaryBgColor"
              disabled={!firstName || !email || !password}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" className="link" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
