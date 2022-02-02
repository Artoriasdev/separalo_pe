import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  MenuItem,
  IconButton,
  Box,
  ListItemText,
  Menu,
} from "@mui/material";
import { AccountCircle, MoreVert } from "@mui/icons-material";

function StyledMenu(props) {
  return (
    <Menu
      elevation={2}
      getcontentanchorel={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  );
}

export const NavbarSectionPublic = () => {
  const history = useHistory();
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

  const handleRedirectButton = (id) => {
    if (id === 1) {
      history.push("/login/C");
    } else if (id === 2) {
      history.push("/login/B");
    } else if (id === 3) {
      history.push("/register/customer");
    } else if (id === 4) {
      history.push("/register/business");
    }
    setAnchorEl(null);
    setAnchorEl2(null);
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "";
  const renderMobileMenu = (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        style={{ maxWidth: "60%", textAlign: "center" }}
        sx={{ display: { md: "none" } }}
      >
        <Button
          startIcon={<AccountCircle style={{ fontSize: "25px" }} />}
          className="font buttonHeader "
          onClick={handleClick}
          style={{
            backgroundColor: anchorEl ? "#5829dd" : "transparent",
            color: anchorEl ? "white" : "black",
            textTransform: "capitalize",
          }}
        >
          Iniciar sesión
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className="menuItem"
            onClick={() => handleRedirectButton(1)}
          >
            <ListItemText primary="Soy cliente" />
          </MenuItem>
          <MenuItem onClick={() => handleRedirectButton(2)}>
            <ListItemText primary="Soy un negocio" />
          </MenuItem>
        </StyledMenu>
        <Button
          className="font buttonHeader"
          onClick={handleClick2}
          style={{
            backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
            color: anchorEl2 ? "white" : "black",
            textTransform: "capitalize",
          }}
        >
          Regístrate
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          style={{ borderRadius: "0" }}
        >
          <MenuItem
            className="menuItem"
            onClick={() => handleRedirectButton(3)}
          >
            <ListItemText primary="Soy cliente" />
          </MenuItem>
          <MenuItem onClick={() => handleRedirectButton(4)}>
            <ListItemText primary="Soy un negocio" />
          </MenuItem>
        </StyledMenu>
      </Menu>
    </Box>
  );
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button
          startIcon={<AccountCircle style={{ fontSize: "25px" }} />}
          className="font buttonHeader "
          onClick={handleClick}
          style={{
            backgroundColor: anchorEl ? "#5829dd" : "transparent",
            color: anchorEl ? "white" : "black",
            textTransform: "capitalize",
            marginTop: "-3px",
          }}
        >
          Iniciar sesión
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            className="menuItem"
            onClick={() => handleRedirectButton(1)}
          >
            <ListItemText primary="Soy cliente" />
          </MenuItem>
          <MenuItem onClick={() => handleRedirectButton(2)}>
            <ListItemText primary="Soy un negocio" />
          </MenuItem>
        </StyledMenu>
        <Button
          className="font buttonHeader"
          onClick={handleClick2}
          style={{
            backgroundColor: anchorEl2 ? "#5829dd" : "transparent",
            color: anchorEl2 ? "white" : "black",
            textTransform: "capitalize",
            marginTop: "-3px",
          }}
        >
          Regístrate
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          style={{ borderRadius: "0" }}
        >
          <MenuItem
            className="menuItem"
            onClick={() => handleRedirectButton(3)}
          >
            <ListItemText primary="Soy cliente" />
          </MenuItem>
          <MenuItem onClick={() => handleRedirectButton(4)}>
            <ListItemText primary="Soy un negocio" />
          </MenuItem>
        </StyledMenu>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
        >
          <MoreVert />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </>
  );
};
