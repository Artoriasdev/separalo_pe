import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConfirmLogin } from "../pages/Public/ConfirmLogin";

export const ConfirmLoginRedirectRoute = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/confirm/:title/:id" component={ConfirmLogin} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
