import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { setActiveProd } from "../Redux/activeProdSlice";
import { useDispatch, useSelector } from "react-redux";

const ProdFilter = ({ sort, setSort }) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.activeProd);

  return (
    <Box
      width="100%"
      margin="20px 0 40px 0"
      display="flex"
      justifyContent="space-between"
    >
      <Box width={{ xs: "35%", md: "20%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={active}
            label="User Type"
            onChange={(e) => {
              let str = e.target.value;
              dispatch(setActiveProd(str));
            }}
            name="type"
          >
            <MenuItem value="all">None</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="footwears">Footwears</MenuItem>
            <MenuItem value="shirts">Shirts & T-Shirts</MenuItem>
            <MenuItem value="cosmetics">Cosmetics</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box width={{ xs: "35%", md: "20%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="User Type"
            onChange={(e) => setSort(e.target.value)}
            name="type"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="title">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ProdFilter;
