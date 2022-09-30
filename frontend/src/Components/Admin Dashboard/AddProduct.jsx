import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import axios from "axios";

const AddProduct = () => {
  const [sellers, setSellers] = React.useState([
    { name: "Abhishek" },
    { name: "Aman" },
  ]);
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

  return (
    <Container>
      <Typography component="h1" variant="h5" m={"10px 0px"}>
        Add Product
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              autoComplete="given-name"
              name="title"
              required
              fullWidth
              id="title"
              label="Product Title"
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6}>
            <TextField
              required={!uploadText}
              fullWidth
              id="image"
              label="Image Link"
              name="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <Stack
                direction="row"
                alignItems="center"
                m={"5px 0"}
                spacing={1}
              >
                <Typography>OR</Typography>
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
            <TextField
              required
              type="number"
              fullWidth
              name="price"
              label="Price"
              id="password"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value="shirts">Shirts & T-Shirts</MenuItem>
                <MenuItem value="jeans">Jeans & Trousers</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="footwears">Footwears</MenuItem>
                <MenuItem value="cosmetics">Cosmetics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Seller</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label="Seller"
                onChange={handleChange}
              >
                {/* if user is seller this should be his name only */}
                {sellers.map(({ name }, index) => (
                  <MenuItem key={name + index} value="shirts">
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button id="primaryBgColor" fullWidth variant="contained">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;
