import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import { AppBar, Breadcrumbs, Link, Tabs } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

import { FutureAppointments } from "./FutureAppointments";
import { PastAppointments } from "./PastAppointments";

import { MyModal } from "../../components/Modal";
import { LinkTab } from "../../helpers/LinkTab";
import { TabPanel } from "../../helpers/TabPanel";

export const ServiceAppointment = () => {
  const history = useHistory();
  const params = useParams();
  const [value, setValue] = useState(0);

  const { servicesList } = useSelector((state) => state.serviceList);

  const service = servicesList.find(
    (Item) => Item.id === JSON.parse(params.id)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (id) => {
    if (id === 1) {
      history.push("/");
    } else if (id === 2 && params.value === "1") {
      history.push("/business/services");
    } else if (id === 2 && params.value === "2") {
      history.push(`/business/services-category/${params.category}`);
    }
  };

  return (
    <div className="page-container" style={{ padding: "0", width: "100%" }}>
      <MyModal />
      <Breadcrumbs
        separator={<NavigateNext fontSize="medium" />}
        aria-label="breadcrumb"
        className="font"
        style={{ marginLeft: "50px" }}
      >
        <Link
          color="textPrimary"
          onClick={() => handleClick(1)}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          Inicio
        </Link>
        <Link
          color="textPrimary"
          onClick={() => handleClick(2)}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          Mis Servicios
        </Link>
        <Link color="textSecondary" style={{ textDecoration: "none" }}>
          {service && service.title}
        </Link>
      </Breadcrumbs>

      <div className="appointment-service-container">
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
            indicatorColor="primary"
            TabIndicatorProps={{ style: { background: "black" } }}
          >
            <LinkTab
              label="Citas confirmadas"
              href="/appointments"
              className="font-p"
              style={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1.4rem",
                color: "black",
              }}
            />
            <LinkTab
              label="Historial de citas"
              href="past"
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
          <FutureAppointments id={params.id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PastAppointments id={params.id} />
        </TabPanel>
      </div>
    </div>
  );
};
