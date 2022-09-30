import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import axios from "axios";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const AddUser = () => {
  const [imageSelected, setImageSelected] = React.useState("");
  const [uploadText, setUploadText] = React.useState(false);
  const handleChange = (e) => {
    setImageSelected(e.target.files[0]);
  };

  const handleUpload = () => {
    setUploadText(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "myecommerce");

    axios
      .post("https://api.cloudinary.com/v1_1/dgelxfhx7/image/upload", formData)
      .then((res) => {
        console.log(res);
        setUploadText(false);
      });
  };

  const handleSubmit = () => {};

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography component="h1" variant="h5" m={"10px 0px"}>
        Add User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={}
              label="User Type"
              // onChange={handleChange}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12} sm={8} m={"10px 0"}>
          <InputLabel id="demo-simple-select-label">Select Image</InputLabel>
          <FormControl fullWidth required>
            <Stack direction="row" alignItems="center" m={"2px 0"} spacing={1}>
              <Button
                variant="contained"
                component="label"
                id="primaryBgColor"
                onClick={handleUpload}
              >
                {uploadText ? "Uploading..." : "Upload"}
              </Button>
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
                <PhotoCamera sx={{ color: "#424874" }} />
              </IconButton>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            id="primaryBgColor"
          >
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUser;
