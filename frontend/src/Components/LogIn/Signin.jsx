import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";
import { setUser } from "../Redux/userSlice";
import { setCart } from "../Redux/cartSlice";
import axios from "axios";
const theme = createTheme();

export default function SignIn() {
  const { isAuth, token } = useSelector((state) => state.auth);
  const { userDet } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [emailResetError, setEmailResetError] = React.useState(false);
  const [emailResetSuccess, setEmailResetSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [verified, setVerified] = React.useState(true);

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEmailResetError(false);
    setEmailResetSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendResetLink = () => {
    setError(false);
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/users/forgot-password`, {
        resetEmail,
      })
      .then((res) => {
        setEmailResetSuccess(true);
      })
      .catch((e) => {
        setEmailResetError(true);
      });
    handleClose();
  };

  const handleChange = (e) => {
    setVerified(true);
    setError(false);
    setEmailResetError(false);
    setEmailResetSuccess(false);
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/users/signin`, loginData)
      .then((res) => {
        if (res.data.emailSent) {
          setVerified(false);
          setError(false);
          setLoading(false);
        } else {
          setError(false);
          setSuccess(true);
          setVerified(true);
          dispatch(setCart(res.data.cart.cartItems));
          dispatch(login(res.data.token));
          dispatch(
            setUser({ name: res.data.user.firstName, type: res.data.user.type })
          );

          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };
  if (isAuth) return <Navigate to="/" />;
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="admin" color="primary" />}
              label="Login as a seller/admin"
            />
            <br />

            {emailResetError && (
              <Alert severity="error" sx={{ marginTop: "12px" }}>
                Please enter a valid email
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ marginTop: "12px" }}>
                Please enter a valid email and password
              </Alert>
            )}
            {emailResetSuccess && (
              <Alert sx={{ marginTop: "12px" }}>
                Password reset link sent, please check your email
              </Alert>
            )}
            {!verified && (
              <Alert severity="warning" sx={{ marginTop: "12px" }}>
                Account not verified, please verify your email
              </Alert>
            )}
            {success && (
              <Alert sx={{ marginTop: "12px" }}>Login Successful</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="primaryBgColor"
              disabled={!loginData.email || !loginData.password}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={handleClickOpen}
                  href="#"
                  className="link"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" className="link" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
              <DialogContentText width={{ xs: 200, sm: 400 }}>
                Please enter your registred email id.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                onChange={(e) => setResetEmail(e.target.value)}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSendResetLink}>Send Reset Link</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
}
