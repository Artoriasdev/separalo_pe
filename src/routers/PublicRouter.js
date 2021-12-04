import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HomePage } from "../pages/Public/HomePage";
import { MenuBusinessCategory } from "../pages/Public/MenuBusinessCategory";
import { MenuServicesBusiness } from "../pages/Public/MenuServicesBusiness";
import { ReserveAppointmentInvited } from "../pages/Public/ReserveAppointmentInvited";
import { ReserveComplete } from "../pages/Public/ReserveComplete";

export const PublicRouter = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/services-menu/:value"
            component={MenuBusinessCategory}
          />

          <Route
            exact
            path="/services-menu-category/:id/:category"
            component={MenuServicesBusiness}
          />

          <Route
            exact
            path="/reserve/invited/:id"
            component={ReserveAppointmentInvited}
          />

          <Route exact path="/reserve-complete" component={ReserveComplete} />

          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};
