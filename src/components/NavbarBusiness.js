import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import { Settings, MoreVert } from "@mui/icons-material";

import LogoSVG from "../assets/images/Separalo_Logo_navbar.svg";
import { logout } from "../actions/auth";

function StyledMenuSettings(props) {
  return (
    <Menu
      elevation={2}
      getcontentanchorel={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ marginLeft: "12px", maxWidth: "210px" }}
      {...props}
    />
  );
}

export const NavbarBusines = () => {
  const history = useHistory();
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (id) => {
    switch (id) {
      case 1:
        history.push("/business/profile");
        break;
      case 4:
        history.push("/business/category");
        break;
      case 5:
        history.push("/business/services");
        break;
      case 6:
        history.push("/business/reports");
        break;
      case 7:
        history.push("/business/password_change");
        break;
      default:
        break;
    }
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleRedirectHomeBusiness = () => {
    history.push("/business/category");
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const mobileMenuId = "";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      className="list"
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{
        maxWidth: "210px",
        textAlign: "center",
        marginLeft: "12px",
      }}
    >
      <Button
        className="font  buttonHeader"
        onClick={() => handleRedirect(data.listMenu[1].idMenu)}
        style={{
          textTransform: "capitalize",
          color: "black",
        }}
      >
        {data.listMenu[1].nameMenu}
      </Button>
      <Button
        className="font buttonHeader"
        onClick={() => handleRedirect(data.listMenu[2].idMenu)}
        style={{
          textTransform: "capitalize",
          color: "black",
        }}
      >
        {data.listMenu[2].nameMenu}
      </Button>
      <Button
        className="font buttonHeader"
        onClick={() => handleRedirect(data.listMenu[3].idMenu)}
        style={{
          textTransform: "capitalize",
          color: "black",
        }}
      >
        {data.listMenu[3].nameMenu}
      </Button>
      <Button
        className="font buttonHeader"
        onClick={() => handleRedirect(data.listMenu[0].idMenu)}
        style={{
          textTransform: "capitalize",
          color: "black",
        }}
      >
        {data.listMenu[0].nameMenu}
      </Button>

      <Button
        className="font"
        onClick={handleClick}
        style={{
          backgroundColor: anchorEl ? "#5829dd" : "transparent",
          color: anchorEl ? "white" : "black",
          textTransform: "capitalize",
          width: "150px",
        }}
      >
        <Settings />
      </Button>
      <StyledMenuSettings
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{ marginRight: "10px" }}
          onClick={() => handleRedirect(7)}
        >
          <ListItemText primary="Cambiar contraseña" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemText primary="Cerrar sesión" />
        </MenuItem>
      </StyledMenuSettings>
    </Menu>
  );

  return (
    <header className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className="header"
          position="static"
          style={{ padding: "0 20px" }}
        >
          <Toolbar className="bar" variant="dense">
            <Button
              className="font  buttonHeader"
              onClick={handleRedirectHomeBusiness}
              style={{
                textTransform: "none",
              }}
            >
              <img
                src={LogoSVG}
                alt="logo"
                style={{ width: "190px", height: "55px" }}
              />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                className="font  buttonHeader"
                onClick={() => handleRedirect(data.listMenu[1].idMenu)}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                {data.listMenu[1].nameMenu}
              </Button>
              <Button
                className="font buttonHeader"
                onClick={() => handleRedirect(data.listMenu[2].idMenu)}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                {data.listMenu[2].nameMenu}
              </Button>
              <Button
                className="font buttonHeader"
                onClick={() => handleRedirect(data.listMenu[3].idMenu)}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                {data.listMenu[3].nameMenu}
              </Button>
              <Button
                className="font buttonHeader"
                onClick={() => handleRedirect(data.listMenu[0].idMenu)}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                {data.listMenu[0].nameMenu}
              </Button>

              <Button
                className="font buttonHeader"
                onClick={handleClick}
                style={{
                  backgroundColor: anchorEl ? "#5829dd" : "transparent",
                  color: anchorEl ? "white" : "black",
                  textTransform: "capitalize",
                  width: "0",
                }}
              >
                <Settings style={{ marginTop: "-3px" }} />
              </Button>
              <StyledMenuSettings
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleRedirect(7)}>
                  <ListItemText primary="Cambiar contraseña" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemText primary="Cerrar sesión" />
                </MenuItem>
              </StyledMenuSettings>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                style={{
                  marginLeft: "20px",
                  marginRight: "-20px",
                  paddingLeft: "0",
                  paddingRight: "0",
                  color: "black",
                }}
              >
                <MoreVert color="black" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {renderMobileMenu}
    </header>
  );
};
