import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HomePage } from "../pages/HomePage";
import { MenuBusinessCategory } from "../pages/MenuBusinessCategory";
import { MenuServicesBusiness } from "../pages/MenuServicesBusiness";

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

          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};
