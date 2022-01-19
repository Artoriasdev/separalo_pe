import React from "react";
import { ErrorNavbar } from "../components/ErrorNavbar";
import { Redirect, Route, Switch } from "react-router";
import { ErrorPage } from "../components/ErrorPage";

export const ErrorRouter = () => {
  return (
    <>
      <ErrorNavbar />
      <Switch>
        <Route exact path="/error" component={ErrorPage} />

        <Redirect to="/" />
      </Switch>
    </>
  );
};
