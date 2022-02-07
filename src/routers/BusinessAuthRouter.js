import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginBusiness } from "../pages/Public/LoginBusiness";

export const BusinessAuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login/:B" component={LoginBusiness} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
