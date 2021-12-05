import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BusinessCategory } from "../pages/B2B/BusinessCategory";

export const BusinessRoute = () => {
  return (
    <div style={{ marginTop: "3.15rem" }}>
      <Switch>
        <Route exact path="/business/category" component={BusinessCategory} />
        <Redirect to="/business/category" />
      </Switch>
    </div>
  );
};
