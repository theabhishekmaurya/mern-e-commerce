import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";
import { setActiveProd } from "../Redux/activeProdSlice";
import { useDispatch } from "react-redux";

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setActiveProd(newValue));
    navigate("/all-products");
  };

  const handleClick = () => {
    navigate("/all-products");
  };

  let { pathname } = useLocation();

  return (
    <Box
      display={
        pathname == "/signin" ||
        pathname.startsWith("/users") ||
        pathname == "/signup"
          ? "none"
          : "flex"
      }
      justifyContent="center"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      padding={{ xs: "5px 0", sm: "10px 0" }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ color: "#424874" }}
        aria-label="scrollable auto tabs example"
      >
        <Tab onClick={handleClick} label="Electronics" />
        <Tab onClick={handleClick} label="Footwears" />
        <Tab onClick={handleClick} label="Shirts" />
        <Tab onClick={handleClick} label="all products" />
      </Tabs>
    </Box>
  );
}
