import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { HomePage } from "../pages/HomePage";
import { MenuBusinessCategory } from "../pages/MenuBusinessCategory";

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

          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};
