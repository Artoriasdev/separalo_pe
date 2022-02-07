import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Grid,
  Container,
  Toolbar,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  createTheme,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import Facebook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instagram.svg";
// import Twitter from "../assets/images/Twitter.svg";
import LinkedIn from "../assets/images/LikedIn.svg";
import { termsLoad } from "../actions/termsLoad";

const tema = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 2,
  },
  sectionDesktop: {
    display: "none",
    [tema.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    [tema.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "700px",
    },
  },
}));

export const Footer = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [term, setTerm] = useState(false);
  const [open, setOpen] = useState(false);
  const { terms } = useSelector((state) => state.terms);
  const { workflow } = useSelector((state) => state.auth);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRedirect = (id) => {
    if (id === 1) {
      if (workflow === "C" || workflow === "") {
        history.push("/frequent-questions");
      } else if (workflow === "B") {
        history.push("/business/questions");
      }
    } else if (id === 2) {
      if (workflow === "C" || workflow === "") {
        history.push("/complains");
      } else if (workflow === "B") {
        history.push("/business/complains");
      }
    }
  };

  const handleModalTerm = (id) => {
    setTerm(true);
    dispatch(termsLoad(id));
  };

  const handleClose = () => {
    setTerm(false);
  };

  const renderMobileMenu = (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary="Nuestras políticas"
          style={{ textAlign: "center" }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <button className="font-p" onClick={() => handleModalTerm(1)}>
              Términos y condiciones
            </button>
          </ListItem>
          <ListItem>
            <button className="font-p" onClick={() => handleRedirect(1)}>
              Preguntas frecuentes
            </button>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );

  const renderMobileHeader = (
    <>
      <Grid item>
        <p className="font-tittle">Contáctanos</p>
        <p className="text">Celular : +51 978 731 556</p>
        <p className="text" style={{ marginTop: "5px" }}>
          Correo: contacto@separalo.pe
        </p>
      </Grid>

      <Grid item>
        <p className="font-tittle title" style={{ textAlign: "center" }}>
          Búscanos en
        </p>
        <span>
          <IconButton
            aria-label="facebook"
            color="inherit"
            style={{ marginRight: "10px" }}
            href="https://www.facebook.com/Separalo-pe-114080404377277"
            target="_blank"
          >
            <img
              src={Facebook}
              alt="Facebook"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <IconButton
            aria-label="instagram"
            color="inherit"
            style={{ marginRight: "10px" }}
            href="https://www.instagram.com/separalope/"
            target="_blank"
          >
            <img
              src={Instagram}
              alt="Instagram"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <IconButton
            size="small"
            aria-label="LinkedIn"
            color="inherit"
            href="https://www.linkedin.com/company/separalo-pe/?viewAsMember=true"
            target="_blank"
          >
            <img
              src={LinkedIn}
              alt="LinkedIn"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </span>
      </Grid>
    </>
  );

  return (
    <div className="footer-container">
      <Dialog
        open={term}
        onClose={handleClose}
        scroll="paper"
        className={classes.dialog}
      >
        {terms &&
          terms.map(({ key, value }) => (
            <DialogContent key={key}>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </DialogContent>
          ))}
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            className="font-p btn-primary"
            color="primary"
            onClick={handleClose}
            variant="contained"
            style={{
              margin: "5px 0 3px 0",
              width: "30%",
              textTransform: "capitalize",
            }}
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="static" className="footer">
        <Container maxWidth="lg">
          <Toolbar className="footer">
            <div className={classes.sectionDesktop}>
              <Grid item>
                <p className="font-tittle">Contáctanos</p>
                <p className="text">Celular : +51 978 731 556</p>
                <p className="text" style={{ marginTop: "5px" }}>
                  Correo: contacto@separalo.pe
                </p>
              </Grid>
            </div>
            <div className={classes.grow} />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Grid item>
                <p
                  className="font-tittle title"
                  style={{ textAlign: "center" }}
                >
                  Búscanos en
                </p>
                <span>
                  <IconButton
                    size="small"
                    aria-label="facebook"
                    color="inherit"
                    style={{ marginRight: "15px" }}
                    href="https://www.facebook.com/Separalo-pe-114080404377277"
                    target="_blank"
                  >
                    <img
                      src={Facebook}
                      alt="Facebook"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="instagram"
                    color="inherit"
                    style={{ marginRight: "15px" }}
                    href="https://www.instagram.com/separalope/"
                    target="_blank"
                  >
                    <img
                      src={Instagram}
                      alt="Instagram"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="twitter"
                    color="inherit"
                    href="https://www.linkedin.com/company/separalo-pe/?viewAsMember=true"
                    target="_blank"
                  >
                    <img
                      src={LinkedIn}
                      alt="LinkedIn"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </span>
              </Grid>
            </div>
            <div className={classes.sectionMobile}>{renderMobileHeader}</div>
          </Toolbar>
        </Container>
      </AppBar>
      <hr className="hr" />
      <AppBar
        position="static"
        className="footer"
        style={{
          marginTop: "-1px",
          padding: "0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar className="footer">
            <div className={classes.sectionDesktop}>
              <p className="p">Copyright © 2021 separalo.pe</p>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleModalTerm(1)}>
                Términos y condiciones
              </button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleRedirect(1)}>
                Preguntas frecuentes
              </button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <hr />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <button className="font-p" onClick={() => handleRedirect(2)}>
                Libro de reclamaciones
              </button>
            </div>

            <div className={classes.sectionMobile}>
              <p className="p">Copyright © 2021 Separalope</p>
              <button
                className="font-p"
                onClick={() => handleRedirect(2)}
                style={{ marginTop: "20px" }}
              >
                Libro de reclamaciones
              </button>
              {renderMobileMenu}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
