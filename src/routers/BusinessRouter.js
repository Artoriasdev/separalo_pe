import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { NavbarBusines } from "../components/NavbarBusiness";
import { BusinessCategory } from "../pages/B2B/BusinessCategory";
import { BusinessServices } from "../pages/B2B/BusinessServices";
import { BusinessServicesCategory } from "../pages/B2B/BusinessServicesCategory";
import { ServiceAppointment } from "../pages/B2B/ServiceAppointments";

export const BusinessRoute = () => {
  return (
    <>
      <NavbarBusines />
      <div style={{ marginTop: "3.15rem", padding: "0.1px 0" }}>
        <Switch>
          <Route exact path="/business/category" component={BusinessCategory} />
          <Route exact path="/business/services" component={BusinessServices} />
          <Route
            exact
            path="/business/services-category/:value"
            component={BusinessServicesCategory}
          />
          <Route
            exact
            path="/business/services/appointment/:id/:value/:category"
            component={ServiceAppointment}
          />
          <Redirect to="/business/category" />
        </Switch>
      </div>
    </>
  );
};
