import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectClientAuthRoute = ({
  workflow,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        workflow === "C" ? (
          <Redirect to="/" />
        ) : workflow === "B" ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

RedirectClientAuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
