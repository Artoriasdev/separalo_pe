import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Redirect } from "react-router-dom";

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
import history from "../helpers/history";
import { ErrorRouter } from "./ErrorRouter";
import { ErrorRoute } from "./ErrorRoute";
import { checkShoppingItems } from "../actions/shoppingCar";
import { checkEmailReservation } from "../actions/reservationEmailInvited";

export const SeparalopeRouter = () => {
  const dispatch = useDispatch();

  const data = localStorage.getItem("data");

  const { workflow } = useSelector((state) => state.auth);
  const { check } = useSelector((state) => state.checking);
  const { logged } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadCategorys());
    if (logged) {
      dispatch(checkShoppingItems(token));
    } else if (data === null) {
      dispatch(checkEmailReservation());
    }
  }, [dispatch, logged, token, data]);

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
