import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { checkAuth } from "../actions/auth";
import { loadCategorys } from "../actions/category";
import { CookiesBanner } from "../components/CookiesBanner";
import { Footer } from "../components/Footer";
import FullPageLoader from "../components/FullPageLoader";
import ScrollToTop from "../components/ScrollToTop";
import { BusinessRoute } from "./BusinessRouter";
import { PublicRouter } from "./PublicRouter";
import { RedirectBusinessRoute } from "./RedirectBusinessRoute";
import { RedirectPublicRoute } from "./RedirectPublicRoute";

export const SeparalopeRouter = () => {
  const dispatch = useDispatch();

  const { workflow } = useSelector((state) => state.auth);
  const { check } = useSelector((state) => state.checking);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadCategorys());
  }, [dispatch]);

  return (
    <Router>
      <FullPageLoader isLoading={check} />
      <div style={{ minHeight: "80vh" }}>
        <ScrollToTop />
        <Switch>
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
