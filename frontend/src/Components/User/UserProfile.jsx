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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { login } from "../Redux/authSlice";

const theme = createTheme();

export default function SignUp() {
  const [upload, setUpload] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageSelected, setImageSelected] = React.useState("");
  const [data, setData] = React.useState({});
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdate(true);
    axios
      .patch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/user`, data, {
        headers: { token },
      })
      .then((response) => {
        dispatch(login(response.data.token));
        setData(response.data.user);
        setUpdate(false);
      });
  };

  const handleChange = (e) => {
    let type = e.target.type;
    if (type == "file") {
      setImageSelected(e.target.files[0]);
    }
  };

  const handleChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!imageSelected) return;
    setUpload(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "myecommerce");

    axios
      .post("https://api.cloudinary.com/v1_1/dgelxfhx7/image/upload", formData)
      .then((res) => {
        axios
          .patch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/users/user`,
            { profilePic: res.data.url },
            {
              headers: { token },
            }
          )
          .then((response) => {
            dispatch(login(response.data.token));
            setUpload(false);
          });
      });
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/users/user`, {
        headers: { token },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [token]);
  if (loading) {
    return <h2>Loading Profile ...</h2>;
  }
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
              width: "150px",
              height: "150px",
            }}
            src={data?.profilePic}
          ></Avatar>
          <Box>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                onChange={handleChange}
                type="file"
              />
              <AddAPhotoIcon sx={{ color: "#424874" }} />
            </IconButton>
            <Button onClick={handleUpload}>
              {upload && imageSelected ? "Uploading..." : "Upload Image"}
            </Button>
          </Box>
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
                  onChange={handleChangeData}
                  value={data?.firstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  value={data?.lastName}
                  onChange={handleChangeData}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  value={data?.email}
                  name="email"
                  onChange={handleChangeData}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="mobile"
                  onChange={handleChangeData}
                  type="Number"
                  value={data?.mobile}
                  label={!data?.mobile && "Mobile"}
                  name="mobile"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  name="type"
                  value={`User Type: ${data.type}`}
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
              {update ? "Updating..." : "Update profile"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
