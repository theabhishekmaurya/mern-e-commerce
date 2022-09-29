import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let { pathname } = useLocation();

  return (
    <Box
      display={pathname == "/signin" || pathname == "/signup" ? "none" : "flex"}
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
        <Tab label="Buy Shirts" />
        <Tab label="Buy Jeans" />
        <Tab label="Buy Shoes" />
        <Tab label="See all products" />
      </Tabs>
    </Box>
  );
}
