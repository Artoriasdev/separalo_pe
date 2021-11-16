import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BusinessCategory } from "../pages/BusinessCategory";

export const BusinessRoute = () => {
  return (
    <Switch>
      <Route exact path="/business/category" component={BusinessCategory} />
      <Redirect to="/business/category" />
    </Switch>
  );
};
