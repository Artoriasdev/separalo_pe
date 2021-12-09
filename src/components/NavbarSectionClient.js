import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Button,
  MenuItem,
  IconButton,
  Box,
  ListItemText,
  Menu,
} from "@mui/material";
import { ArrowDropDown, MoreVert, Settings } from "@mui/icons-material";

import { logout } from "../actions/auth";

function StyledMenu(props) {
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
      style={{
        maxWidth: window.innerWidth < 960 ? "210px" : "250px",
        marginLeft: window.innerWidth < 960 ? "12px" : "0",
      }}
      {...props}
    />
  );
}
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

export const NavbarSectionClient = () => {
  const { data } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

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
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const handleRedirect = (id) => {
    if (id === 1) {
      history.push("/customer/profile");
    }
    if (id === 2) {
      history.push("/customer-appointment");
    }
    if (id === 3) {
      history.push("/customer-history");
    }
    if (id === 6) {
      history.push("/business/reports");
    }
    if (id === 7) {
      history.push("/password_change");
    }
    if (id === 8) {
      history.push("/frequent-questions");
    }
    setAnchorEl(null);
    setAnchorEl2(null);
    setMobileMoreAnchorEl(null);
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
        endIcon={
          <ArrowDropDown
            style={{
              fontSize: "18px",
              marginTop: "-5px",
              marginLeft: "-10px",
            }}
          />
        }
        className="font-p"
        onClick={handleClick}
        style={{
          backgroundColor: anchorEl ? "#5829dd" : "transparent",
          color: anchorEl ? "white" : "black",
          width: "210px",
          borderRadius: "0",
          marginLeft: "-15px",
          fontSize: "12px",
        }}
      >
        {data && data.firstName}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {data.listMenu &&
          data.listMenu.map(({ idMenu, nameMenu }) => (
            <MenuItem
              key={idMenu}
              className="menuItemClient"
              onClick={() => handleRedirect(idMenu)}
            >
              <ListItemText primary={nameMenu} />
            </MenuItem>
          ))}
      </StyledMenu>
      <Button
        className="font-p"
        onClick={handleClick2}
        style={{
          backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
          color: anchorEl2 ? "white" : "black",
          textTransform: "capitalize",
          width: "100%",
          borderRadius: "0",
          fontSize: "12px",
          margin: "0",
        }}
      >
        <Settings style={{ fontSize: "18px" }} />
      </Button>
      <StyledMenuSettings
        id="customized-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
      >
        <MenuItem className="menuItemClient" onClick={() => handleRedirect(7)}>
          <ListItemText primary="Cambiar contraseña" />
        </MenuItem>
        <MenuItem onClick={() => handleRedirect(8)}>
          <ListItemText primary="Preguntas frecuentes" />
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <ListItemText primary="Cerrar sesión" />
        </MenuItem>
      </StyledMenuSettings>
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button
          endIcon={<ArrowDropDown style={{ fontSize: "25px" }} />}
          className="font buttonHeader "
          onClick={handleClick}
          style={{
            backgroundColor: anchorEl ? "#5829dd" : "transparent",
            color: anchorEl ? "white" : "black",
            textTransform: "capitalize",
            width: "200px",
          }}
        >
          {data && data.firstName}
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {data.listMenu &&
            data.listMenu.map(({ idMenu, nameMenu }) => (
              <MenuItem
                key={idMenu}
                className="menuItemClient"
                onClick={() => handleRedirect(idMenu)}
              >
                <ListItemText primary={nameMenu} />
              </MenuItem>
            ))}
        </StyledMenu>
        <Button
          className="font  buttonHeader"
          onClick={handleClick2}
          style={{
            backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
            color: anchorEl2 ? "white" : "black",
            textTransform: "capitalize",
            width: "0",
          }}
        >
          <Settings />
        </Button>
        <StyledMenuSettings
          id="customized-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
        >
          <MenuItem className="menuItem" onClick={() => handleRedirect(7)}>
            <ListItemText primary="Cambiar contraseña" />
          </MenuItem>
          <MenuItem onClick={() => handleRedirect(8)}>
            <ListItemText primary="Preguntas frecuentes" />
          </MenuItem>
          <MenuItem onClick={() => handleLogout()}>
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
          <p style={{ fontSize: "16px", color: "black" }}>
            {data && data.firstName}
          </p>
          <MoreVert style={{ marginTop: "-3px" }} />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </>
  );
};
