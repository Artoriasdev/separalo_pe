import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectClientRoute = ({
  workflow,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        workflow === "C" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

RedirectClientRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
