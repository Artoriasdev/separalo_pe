import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppBar, Button, Tab, Toolbar, Tabs, Box } from "@mui/material";

import LogoSVG from "../assets/images/Separalo_Logo_navbar.svg";
import LogoSVGMOBILE from "../assets/images/icono_separalo_mobile.svg";
import Shopping from "../assets/images/Carrito_compras.svg";
import ShoppingItems from "../assets/images/Carrito_compras_1.svg";
import { NavbarSectionPublic } from "./NavbarSectionPublic";
import { NavbarSectionClient } from "./NavbarSectionClient";

let value = 0;

const Navbar = () => {
  const { categorys } = useSelector((state) => state.category);
  const { logged, workflow } = useSelector((state) => state.auth);
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);
  const history = useHistory();

  const handleRedirectHome = () => {
    history.push("/");
  };

  const handleRedirectShopping = () => {
    history.push("/shopping");
  };

  const handleChange = (event, newValue) => {
    value = newValue;
    console.log(value);
  };
  const handleRedirect = (id) => {
    history.push(`/services-menu/${id}`);
  };

  return (
    <header className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="header" position="static">
          <Toolbar
            className="bar"
            variant="dense"
            // style={{ padding: "0", margin: "0" }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                className="font buttonHeader"
                onClick={handleRedirectHome}
                style={{
                  textTransform: "none",
                  marginTop: "-5px",
                  borderRadius: "0",
                  width: "50px",
                }}
              >
                <img
                  src={LogoSVGMOBILE}
                  alt="logo"
                  style={{ height: "40px" }}
                />
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            {logged && workflow === "C" ? (
              <NavbarSectionClient />
            ) : (
              <NavbarSectionPublic />
            )}
            <Button
              className=""
              onClick={handleRedirectShopping}
              style={{
                textTransform: "none",
                backgroundColor: "#232323",
                marginTop: "-5px",
                height: "46px",
                borderRadius: "0",
              }}
            >
              {shoppingCarItems.length > 0 ? (
                <img
                  src={ShoppingItems}
                  alt="logo"
                  style={{ height: "26px" }}
                />
              ) : (
                <img src={Shopping} alt="logo" style={{ height: "23px" }} />
              )}
            </Button>
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
