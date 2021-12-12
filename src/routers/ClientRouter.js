import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ClientProfile } from "../pages/B2C/ClientProfile";
import { CustomerAppointment } from "../pages/B2C/CustomerAppointment";
import { CustomerHistory } from "../pages/B2C/CustomerHistory";

export const ClientRoute = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/customer/profile" component={ClientProfile} />

        <Route
          exact
          path="/customer/appointment"
          component={CustomerAppointment}
        />

        <Route exact path="/customer/history" component={CustomerHistory} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
