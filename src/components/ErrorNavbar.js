import React from "react";
import { useHistory } from "react-router-dom";

import { AppBar, Button, Tab, Toolbar, Tabs, Box } from "@mui/material";

import LogoSVG from "../assets/images/Separalo_Logo_navbar.svg";

export const ErrorNavbar = () => {
  const history = useHistory();

  const handleRedirectHome = () => {
    history.push("/");
    history.go();
  };

  return (
    <header className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="header" position="static">
          <Toolbar className="bar" variant="dense">
            <Button
              className="font buttonHeader__figure"
              onClick={handleRedirectHome}
              style={{
                textTransform: "none",
                marginTop: "-5px",
                borderRadius: "0",
              }}
            >
              <img
                src={LogoSVG}
                alt="logo"
                style={{ width: "190px", height: "55px" }}
              />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};
