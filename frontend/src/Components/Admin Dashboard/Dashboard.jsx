import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddProduct from "./AddProduct";
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import AllOrders from "./AllOrders";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const { token } = useSelector((state) => state.auth);
  const { userDet } = useSelector((state) => state.user);
  const { type } = userDet;
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/verify`, {
        headers: { token },
      })
      .then((res) => {
        if (res.data === "customer") {
          navigate("/");
        }
      });
  }, []);

  const [activeMenu, setActiveMenu] = React.useState("Add Product");
  const setOption = (text) => {
    setActiveMenu(text);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#424874",
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            m={"0px 20px"}
            noWrap
            component="div"
          >
            Go Back
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Add Product", "Add User"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setOption(text)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["All Users", "All Products", "All Orders"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setOption(text)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {activeMenu == "Add Product" ? (
          <AddProduct />
        ) : activeMenu == "Add User" && type === "admin" ? (
          <AddUser />
        ) : activeMenu == "All Users" && type === "admin" ? (
          <AllUsers />
        ) : activeMenu == "All Products" && type === "admin" ? (
          <AllProducts />
        ) : activeMenu == "All Orders" && type === "admin" ? (
          <AllOrders />
        ) : (
          <Unauthorized/>
        )}
      </Box>
    </Box>
  );
}
