import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectBusinessRoute = ({
  workflow,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        workflow === "B" ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

RedirectBusinessRoute.propTypes = {
  workflow: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
