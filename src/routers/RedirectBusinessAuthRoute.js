import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const RedirectBusinessAuthRoute = ({
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
        ) : workflow === "C" ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

RedirectBusinessAuthRoute.propTypes = {
  workflow: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
