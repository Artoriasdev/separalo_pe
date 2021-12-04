import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const ConfirmLoginRedirectRouter = ({
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

ConfirmLoginRedirectRouter.propTypes = {
  workflow: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
