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
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/system";
import React from "react";
import axios from "axios";
import SimpleSnackbar from "../Pages/Snackbar";

const AddProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const [sellers, setSellers] = React.useState([]);
  const [imageSelected, setImageSelected] = React.useState("");
  const [uploadText, setUploadText] = React.useState(false);
  const [success, setSuccess]=React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/get-sellers`, {
        headers: { token },
      })
      .then((res) => {
        setSellers(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const [prodDet, setProdDet] = React.useState({
    title: "",
    image: "",
    price: "",
    category: "",
    seller: "",
  });

  const handleChange = (e) => {
    let type = e.target.type;
    if (type == "file") {
      setImageSelected(e.target.files[0]);
    } else {
      setProdDet({ ...prodDet, [e.target.name]: e.target.value });
    }
  };

  const handleUpload = () => {
    setUploadText(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "myecommerce");

    axios
      .post("https://api.cloudinary.com/v1_1/dgelxfhx7/image/upload", formData)
      .then((res) => {
        setUploadText(false);
        setProdDet({ ...prodDet, ["image"]: res.data.url });
      });
  };

  const handleSubmit = () => {
    setLoading(true);
    
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/admin/add-product`,
        prodDet
      )
      .then((res) => {
        setSuccess(true)
        setProdDet({
          title: "",
          image: "",
          price: "",
          category: "",
          seller: "",
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <Container>
      <Typography component="h1" variant="h5" m={"10px 0px"}>
        Add Product
      </Typography>
      {success && <SimpleSnackbar
      open={success}
      setOpen={setSuccess}
      message="Product added"
      />}
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
              value={prodDet.title}
              onChange={handleChange}
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={8} md={6}>
            <TextField
              required={!uploadText}
              fullWidth
              id="image"
              onChange={handleChange}
              label="Image Link"
              value={prodDet.image}
              name="image"
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
                  disabled={!imageSelected}
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
              value={prodDet.price}
              onChange={handleChange}
              label="Price"
              id="price"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={prodDet.category}
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
                name="seller"
                value={prodDet.seller}
                label="Seller"
                onChange={handleChange}
              >
                {/* if user is seller this should be his name only */}
                {sellers.map(({ name }, index) => (
                  <MenuItem key={name + index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              id="primaryBgColor"
              fullWidth
              disabled={
                prodDet.title === "" ||
                prodDet.image === "" ||
                prodDet.category === "" ||
                prodDet.price === "" ||
                prodDet.seller === ""
              }
              variant="contained"
              onClick={handleSubmit}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddProduct;
