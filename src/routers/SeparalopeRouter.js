import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import { checkAuth } from "../actions/auth";
import { loadCategorys } from "../actions/category";
import { CookiesBanner } from "../components/CookiesBanner";
import { ErrorPage } from "../components/ErrorPage";
import { Footer } from "../components/Footer";
import FullPageLoader from "../components/FullPageLoader";
import ScrollToTop from "../components/ScrollToTop";
import { BusinessRoute } from "./BusinessRouter";
import { PublicRouter } from "./PublicRouter";
import { RedirectBusinessRoute } from "./RedirectBusinessRoute";
import { RedirectPublicRoute } from "./RedirectPublicRoute";
import history from "../helpers/history";
import { ErrorRouter } from "./ErrorRouter";
import { ErrorRoute } from "./ErrorRoute";

export const SeparalopeRouter = () => {
  const dispatch = useDispatch();

  const { workflow } = useSelector((state) => state.auth);
  const { check } = useSelector((state) => state.checking);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadCategorys());
  }, [dispatch]);

  return (
    <Router history={history}>
      <FullPageLoader isLoading={check} />
      <div style={{ minHeight: "80vh" }}>
        <ScrollToTop />
        <Switch>
          <ErrorRoute path="/error" component={ErrorRouter} />
          <RedirectBusinessRoute
            path="/business/"
            workflow={workflow}
            component={BusinessRoute}
          />

          <RedirectPublicRoute
            path="/"
            workflow={workflow}
            component={PublicRouter}
          />

          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
      <CookiesBanner />
    </Router>
  );
};
