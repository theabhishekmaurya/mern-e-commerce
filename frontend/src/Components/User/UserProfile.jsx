import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";

const theme = createTheme();

export default function SignUp() {
  const [upload, setUpload] = React.useState(false);

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
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              width: "100px",
              height: "100px",
            }}
            src="https://static.remove.bg/remove-bg-web/bf2ec228bc55da2aaa8a6978c6fe13e205c3849c/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
          ></Avatar>
          <Button

          // onClick={handleUpload}
          >
            {upload ? "Uploading..." : "Upload a new image"}
          </Button>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              //   onChange={handleChange}
              type="file"
            />
            {/* <PhotoCamera sx={{ color: "#424874" }} /> */}
          </IconButton>
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
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  name="password"
                  value="User Type: Seller"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="primaryBgColor"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
