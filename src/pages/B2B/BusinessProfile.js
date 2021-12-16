import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { AppBar, Breadcrumbs, Link, Tabs } from "@mui/material";
import { ImageOutlined, NavigateNext, PhotoCamera } from "@mui/icons-material";

import { businessData } from "../../actions/businessData";
// import BusinessDataBank from "./BusinessDataBank.js";
// import BusinessData from "./BusinessData.js";
import { LinkTab } from "../../helpers/LinkTab.js";
import { TabPanel } from "../../helpers/TabPanel.js";
import { modalOpen } from "../../actions/modal";
import { bannerUpload, logoUpload } from "../../actions/imageUpload";
import { MyModal } from "../../components/Modal";
import { BusinessData } from "./BusinessData";
import { BusinessDataBank } from "./BusinessDataBank";

export const BusinessProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth.data);
  const { data } = useSelector((state) => state.businessData);

  const [value, setValue] = useState(0);

  const wMessage = "La foto debe pesar menos de 1mb";
  const fMessage = "El archivo debe ser formato .jpg o .png";

  useEffect(() => {
    dispatch(businessData(token));
  }, [dispatch, token]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAttach = (e) => {
    try {
      let file = e.target.files[0];
      let ext = file.name.split(".").pop();

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          dispatch(logoUpload(file, token));
        } else {
          dispatch(modalOpen(wMessage));
        }
      } else {
        dispatch(modalOpen(fMessage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachBanner = (e) => {
    try {
      let file = e.target.files[0];
      let ext = file.name.split(".").pop();

      if (ext === "jpg" || ext === "png" || ext === "jpeg") {
        const sizeFile = file.size;
        if (sizeFile < 1048576) {
          dispatch(bannerUpload(file, token));
        } else {
          dispatch(modalOpen(wMessage));
        }
      } else {
        dispatch(modalOpen(fMessage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachClick = () => {
    document.querySelector("#foto").click();
  };

  const handleAttachBannerClick = () => {
    document.querySelector("#banner").click();
  };

  const handleClick = (id) => {
    switch (id) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push("/business/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-container" style={{ padding: "0", width: "100%" }}>
      <MyModal />
      <Breadcrumbs
        separator={<NavigateNext fontSize="medium" />}
        aria-label="breadcrumb"
        className="font"
        style={{ margin: "30px" }}
      >
        <Link
          color="textSecondary"
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(1)}
        >
          Inicio
        </Link>
        <Link
          color="textPrimary"
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(2)}
        >
          Mi Perfil
        </Link>
      </Breadcrumbs>
      <div className="profile-container">
        <div className="form-profile">
          <h1>Datos de negocio</h1>
        </div>
        <hr />
        <div className="business-profile-container">
          <div className="picture-container">
            <div
              className="banner-container-profile"
              onClick={handleAttachBannerClick}
              style={{
                backgroundColor:
                  data[0] && data[0].imageBig === undefined ? "gray" : "",
              }}
            >
              <input
                id="banner"
                type="file"
                name="foto"
                style={{ display: "none" }}
                onChange={handleAttachBanner}
              />
              {data[0] && data[0].imageBig !== undefined ? (
                <img src={data[0].imageBig} alt="banner" title="banner" />
              ) : null}

              <div className="banner-background-hover" />
              <div className="banner-hover">
                <ImageOutlined fontSize="large" style={{ fontSize: "40px" }} />
                {data[0] && data[0].imageBig !== undefined ? (
                  <p>Editar imagen de banner</p>
                ) : (
                  <p>Subir imagen de banner</p>
                )}
              </div>
            </div>
            <p>
              *Tamaño recomendado para las imágenes: Logotipo: 300 x 250px.
              Banner 1024 x 580px. *Formato en JPG o PNG. *Debe pesar menos de
              1mb
            </p>
            <div
              className="logo-container-profile"
              onClick={handleAttachClick}
              style={{
                backgroundColor:
                  data[0] && data[0].logo === undefined ? "gray" : "",
              }}
            >
              <input
                id="foto"
                type="file"
                name="foto"
                style={{ display: "none" }}
                onChange={handleAttach}
              />
              {data[0] && data[0].logo !== undefined ? (
                <img src={data[0].logo} alt="logo" title="logo" />
              ) : null}
              <div className="logo-background-hover" />
              <div className="logo-hover">
                <PhotoCamera fontSize="large" style={{ fontSize: "40px" }} />
                {data[0] && data[0].imageBig !== undefined ? (
                  <p>Editar logo</p>
                ) : (
                  <p>Subir logo</p>
                )}
              </div>
            </div>
          </div>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              borderBottom: "1px solid gray",
            }}
            elevation={0}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              TabIndicatorProps={{ style: { background: "black" } }}
              style={{ color: "black" }}
            >
              <LinkTab
                label="Datos de la empresa"
                href="/data"
                className="font-p"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "black",
                }}
              />
              <LinkTab
                label="Datos bancarios"
                href="/bank"
                className="font-p"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "black",
                }}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <BusinessData />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BusinessDataBank />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};
