import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./Redux/authSlice";
import BecomeSeller from "./User/BecomeSeller";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { isAuth } = useSelector((state) => state.auth);
  const { userDet } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [becomeSeller, setBecomeSeller] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    if (!isAuth) {
      navigate("/signin");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleBecomeSeller = () => {
    if (userDet.type === "seller" || userDet.type === "admin") {
      setAnchorEl(null);
      navigate("/dashboard");
    } else {
      setBecomeSeller(true);
    }
  };

  const handleRightMenu = (menu) => {
    if (!isAuth) return;

    navigate(menu === "cart" ? "/cart" : "/wishlist");
  };

  const redirectToHome = () => {
    navigate("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "30px" }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleBecomeSeller}>
        {userDet.type === "seller" || userDet.type === "admin"
          ? "Admin Dashboard"
          : "Become a seller"}
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const { pathname } = useLocation();
  return (
    <Box
      sx={{ flexGrow: 1 }}
      display={
        pathname.startsWith("/dashboard") || pathname.startsWith("/users")
          ? "none"
          : "block"
      }
    >
      <AppBar
        position="static"
        color="secondary"
        sx={{ backgroundColor: "#424874" }}
      >
        <Toolbar>
          <IconButton
            onClick={redirectToHome}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <AddBusinessIcon />
          </IconButton>
          <Typography
            onClick={redirectToHome}
            variant="h6"
            noWrap
            component="div"
            className="storeName"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            My Store
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }} gap={1}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography>{!isAuth ? "Login" : userDet.name}</Typography>
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => handleRightMenu("wishlist")}
            >
              <Badge badgeContent={4} color="secondary">
                <FavoriteRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => handleRightMenu("cart")}
            >
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <BecomeSeller />
      {becomeSeller && (
        <BecomeSeller open={becomeSeller} setBecomeSeller={setBecomeSeller} />
      )}
      {renderMenu}
    </Box>
  );
}
