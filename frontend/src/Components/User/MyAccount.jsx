import { Tab, Tabs } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import UserAddresses from "./UserAddresses";
import UserOrders from "./UserOrders";
import UserProfile from "./UserProfile";

const MyAccount = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box padding="5px 20px" mb={5}>
      <Stack>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="My Profile" />
            <Tab label="My Orders" />
            <Tab label="My Addresses" />
          </Tabs>
        </Box>
        <Box display="flex" justifyContent="center" padding={2}>
          {value === 0 ? (
            <UserProfile />
          ) : value === 1 ? (
            <UserOrders />
          ) : (
            <UserAddresses />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default MyAccount;
