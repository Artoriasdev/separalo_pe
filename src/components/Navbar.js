import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppBar, Button, Tab, Toolbar, Tabs, Box } from "@mui/material";

import LogoSVG from "../assets/images/logo01.svg";
import { NavbarSectionPublic } from "./NavbarSectionPublic";
import { NavbarSectionClient } from "./NavbarSectionClient";

const Navbar = () => {
  const { categorys } = useSelector((state) => state.category);
  const { logged, workflow } = useSelector((state) => state.auth);
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleRedirect = (id) => {
    history.push(`/services-menu/${id}`);
  };

  return (
    <header className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="header" position="static">
          <Toolbar className="bar" variant="dense">
            <Button
              className="font buttonHeader "
              onClick={handleRedirectHome}
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
            {logged && workflow === "C" ? (
              <NavbarSectionClient />
            ) : (
              <NavbarSectionPublic />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="botHeader">
        <div className="botHeader2">
          <nav className="botHeader2__nav">
            <div>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                aria-label="scrollable auto tabs categories"
                TabIndicatorProps={{ style: { background: "transparent" } }}
                TabScrollButtonProps={{
                  minheight: "2.75rem",
                }}
              >
                {categorys &&
                  categorys.map(({ id, name }) => (
                    <Tab
                      onClick={() => handleRedirect(id)}
                      style={{
                        minHeight: "2.75rem",
                        color: "white",
                        textTransform: "none",
                        padding: "6px 8px",
                        opacity: 1,
                        minWidth: "100px",
                        marginRight: 25,
                      }}
                      label={name}
                      key={id}
                      className="font-p"
                    />
                  ))}
              </Tabs>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
