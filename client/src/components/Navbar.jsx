import { useState } from "react";
//library components
import { Link } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  SvgIcon,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//local components
import Search from "./Search";
//library icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//local icons
import { ReactComponent as EcoMotionNavIcon } from "../assets/Ecomotion.svg";
//styles

const navItems = new Map();
navItems.set("Home", "/");
// add switch case for public, customer, staff
navItems.set("Login", "/login");
navItems.set("Sign Up", "/register");
navItems.set("Invoice", "/invoice");
navItems.set("Reports", [
  { text: "Submit Report", link: "/submitreport" },
  { text: "View Past Reports", link: "/viewpastreports" },
]);
navItems.set("Wallet", "/wallet");
navItems.set("accounts", "/accounts");
navItems.set("Invoices", "/invoiceTable");
navItems.set("Customer's Wallets", "/walletTable");
navItems.set("Waller Form","/walletForm");


const navStyling = { color: "white", backgroundColor: "black" };

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="appBar" sx={navStyling}>
      <Toolbar variant="dense">
        <Button component={Link} to="/" mr={1} color="inherit">
          <SvgIcon
            component={EcoMotionNavIcon}
            sx={{ height: "1.25em", width: "auto" }}
            inheritViewBox
          />
          <Box flexGrow={1} sx={{ display: { xs: "none", md: "flex" } }}></Box>
          <Typography
            variant="h6"
            noWrap
            ml={2}
            fontFamily="monospace"
            fontWeight={700}
            letterSpacing=".3rem"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            ECOMOTION
          </Typography>
        </Button>
        <Box flexGrow={1} sx={{ display: { xs: "none", md: "flex" } }}>
          {Array.from(navItems, ([text, link]) => {
            if (text !== "Reports" && text !== "Wallet" && text !== "Invoice") {
              return (
                <Button
                  component={Link}
                  to={link}
                  key={text}
                  onClick={handleCloseNavMenu}
                  my={2}
                  color="inherit"
                >
                  {text}
                </Button>
              );
            }
            return null;
          })}
          <Button
            component={Link}
            to={navItems.get("Invoice")}
            onClick={handleCloseNavMenu}
            my={2}
            color="inherit"
          >
            Invoice
          </Button>
          <Button
            component={Link}
            to={navItems.get("Wallet")}
            onClick={handleCloseNavMenu}
            my={2}
            color="inherit"
          >
            Wallet
          </Button>
          <Button
            onClick={handleOpenNavMenu}
            my={2}
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Reports
          </Button>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {Array.isArray(navItems.get("Reports")) &&
            navItems.get("Reports").map(({ text, link }) => (
              <MenuItem
                key={text}
                component={Link}
                to={link}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{text}</Typography>
              </MenuItem>
            ))}
        </Menu>
        <Box
          flexGrow={1}
          justifyContent="end"
          whiteSpace="nowrap"
          display="flex"
        >
          <Search Icon={SearchIcon} placeholder="Search" />
          <IconButton
            sx={{ display: { md: "none" } }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            edge="end"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

