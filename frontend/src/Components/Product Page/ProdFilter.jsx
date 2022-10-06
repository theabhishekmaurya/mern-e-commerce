import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ProdFilter = () => {
  return (
    <Box
      width="100%"
      margin="20px 0 40px 0"
      display="flex"
      justifyContent="space-between"
    >
      <Box width={{xs:"35%", md:"20%"}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={userDet.type}
            label="User Type"
            //   onChange={handleChange}
            name="type"
          >
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="shirts">Shirts & T-Shirts</MenuItem>
            <MenuItem value="footwears">Footwears</MenuItem>
            <MenuItem value="cosmetics">Cosmetics</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box width={{xs:"35%", md:"20%"}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //   value={userDet.type}
            label="User Type"
            //   onChange={handleChange}
            name="type"
          >
            <MenuItem value="name-asc">Name (asc)</MenuItem>
            <MenuItem value="name-desc">Name (desc)</MenuItem>
            <MenuItem value="price-lth">Price (low to high)</MenuItem>
            <MenuItem value="price-htl">Price (high to low)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ProdFilter;
