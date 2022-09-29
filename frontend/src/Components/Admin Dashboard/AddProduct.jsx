import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const AddProduct = () => {
  const [sellers, setSellers] = React.useState([
    { name: "Abhishek" },
    { name: "Aman" },
  ]);
  const handleChange = () => {};
  return (
    <Container>
      <Typography component="h1" variant="h5" m={"10px 0px"}>
        Add Product
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
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

          <Grid item xs={12} md={8}>
            <TextField
              required
              fullWidth
              id="image"
              label="Image Link"
              name="email"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              required
              type="number"
              fullWidth
              name="price"
              label="Price"
              id="password"
            />
          </Grid>
          <Grid item xs={12} md={8}>
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
          <Grid item xs={12} md={8}>
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
          <Grid item xs={12}>
            <Button id="primaryBgColor" variant="contained">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;
