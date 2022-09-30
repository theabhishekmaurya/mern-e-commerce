import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
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

import axios from "axios";
const theme = createTheme();

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [emailResetError, setEmailResetError] = React.useState(false);
  const [emailResetSuccess, setEmailResetSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setEmailResetError(false);
    setEmailResetSuccess(false);
  };

  const handleClose = () => {
    console.log(resetEmail)
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
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="admin" color="primary" />}
              label="Login as a seller/admin"
            />
            <br />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {emailResetError && (
              <Alert severity="error" sx={{ marginTop: "12px" }}>
                Please enter a valid email
              </Alert>
            )}
            {emailResetSuccess && (
              <Alert sx={{ marginTop: "12px" }}>
                Password reset link sent, please check your email
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="primaryBgColor"
            >
              Sign In
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
              <Button onClick={handleClose}>Send Reset Link</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </ThemeProvider>
  );
}
