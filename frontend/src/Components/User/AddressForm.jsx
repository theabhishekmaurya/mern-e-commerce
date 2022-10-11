import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddressForm({ setOpenForm, openForm, setAddresses }) {
  const { token } = useSelector((state) => state.auth);
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    addLine1: "",
    addLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSave = () => {
    setOpenForm(!openForm);
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/address`, address, {
        headers: { token },
      })
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/address`, {
            headers: { token },
          })
          .then((res) => {
            setAddresses(res.data);
          });
      });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            onChange={handleChange}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            onChange={handleChange}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="addLine1"
            label="Address line 1"
            onChange={handleChange}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="addLine2"
            label="Address line 2"
            onChange={handleChange}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            onChange={handleChange}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            required
            onChange={handleChange}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            onChange={handleChange}
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            onChange={handleChange}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={
              !address.firstName ||
              !address.addLine1 ||
              !address.city ||
              !address.state ||
              !address.zip ||
              !address.country
            }
            id="primaryBgColor"
            fullWidth
            variant="contained"
            onClick={handleSave}
          >
            Save address
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
