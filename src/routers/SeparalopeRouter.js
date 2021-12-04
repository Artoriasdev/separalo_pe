import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  // Route,
} from "react-router-dom";

import { checkAuth } from "../actions/auth";
import { loadCategorys } from "../actions/category";
import { BusinessAuthRouter } from "./BusinessAuthRouter";
import { BusinessRoute } from "./BusinessRouter";
import { ClientAuthRouter } from "./ClientAuthRouter";
import { ConfirmLoginRedirectRoute } from "./ConfirmLoginRedirectRoute";
import { ConfirmLoginRedirectRouter } from "./ConfirmLoginRedirectRouter";
import { PublicRouter } from "./PublicRouter";
import { RedirectBusinessAuthRoute } from "./RedirectBusinessAuthRoute";
import { RedirectBusinessRoute } from "./RedirectBusinessRoute";
import { RedirectClientAuthRoute } from "./RedirectClientAuthRoute";
import { RedirectPublicRoute } from "./RedirectPublicRoute";
// import FullPageLoader from "./components/FullPageLoader";

export const SeparalopeRouter = () => {
  const dispatch = useDispatch();
  const { workflow } = useSelector((state) => state.auth);
  const { check } = useSelector((state) => state.checking);
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadCategorys());
  }, [dispatch]);

  if (check) {
    return <h1>Espere...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <FullPageLoader /> */}
          <RedirectClientAuthRoute
            exact
            path="/login/C"
            workflow={workflow}
            component={ClientAuthRouter}
          />
          <RedirectBusinessAuthRoute
            exact
            path="/login/B"
            workflow={workflow}
            component={BusinessAuthRouter}
          />
          <ConfirmLoginRedirectRouter
            exact
            path="/confirm/:title/:id"
            workflow={workflow}
            component={ConfirmLoginRedirectRoute}
          />
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
          {/* <Route exact path="/" component={PublicRouter} /> */}

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
