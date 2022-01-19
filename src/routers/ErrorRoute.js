import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

export const ErrorRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => <Component {...props} />} />;
};

ErrorRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
