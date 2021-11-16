import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectClientRoute = ({
  isAuthenticated,
  workflow,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && workflow === "C" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

RedirectClientRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  workflow: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
