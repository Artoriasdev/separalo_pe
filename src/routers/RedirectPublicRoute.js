import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectPublicRoute = ({
  workflow,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        workflow === "B" ? (
          <Redirect to="/business/category" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

RedirectPublicRoute.propTypes = {
  workflow: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
