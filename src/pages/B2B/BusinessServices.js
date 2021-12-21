import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { Breadcrumbs, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import Container from "../../Modal/Container/ContainerService";
import { MyModal } from "../../components/Modal";
import { serviceList } from "../../actions/serviceList";
import { ServiceListTable } from "../../components/ServiceListTable";

export const BusinessServices = () => {
  const history = useHistory();
  const { servicesList } = useSelector((state) => state.serviceList);
  const { redirect } = useSelector((state) => state.modal);
  // const { data } = useSelector((state) => state.auth);

  if (redirect) {
    history.go();
  }

  const dispatch = useDispatch();

  const handleClick = (id) => {
    switch (id) {
      case 1:
        history.push("/");
        break;
      case 2:
        history.push("/business/services");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(serviceList(3));
  }, [dispatch]);

  return (
    <>
      <MyModal />

      <div className="page-container" style={{ padding: "0" }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="medium" />}
          aria-label="breadcrumb"
          className="font"
        >
          <Link
            color="textPrimary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(1)}
          >
            Inicio
          </Link>
          <Link
            color="textSecondary"
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(2)}
          >
            Mis servicios
          </Link>
        </Breadcrumbs>
        <div
          className="form-profile"
          style={{
            width: "100%",
            marginLeft: "0",
            flexDirection: "row",
          }}
        >
          <h1>Mis servicios</h1>

          <Container triggerText={"Agregar servicio"} history={history} />
        </div>

        <hr />

        <h3>Estos son los servicios que han sido registrados</h3>
        <ServiceListTable list={servicesList} page={1} params={0} />
      </div>
    </>
  );
};
