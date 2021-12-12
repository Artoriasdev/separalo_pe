import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { HomePage } from "../pages/Public/HomePage";
import { MenuBusinessCategory } from "../pages/Public/MenuBusinessCategory";
import { MenuServicesBusiness } from "../pages/Public/MenuServicesBusiness";
import { ReserveAppointmentInvited } from "../pages/Public/ReserveAppointmentInvited";
import { ReserveComplete } from "../pages/Public/ReserveComplete";
import { BusinessAuthRouter } from "./BusinessAuthRouter";
import { ClientAuthRouter } from "./ClientAuthRouter";
import { ConfirmLoginRedirectRoute } from "./ConfirmLoginRedirectRoute";
import { ConfirmLoginRedirectRouter } from "./ConfirmLoginRedirectRouter";
import { RedirectBusinessAuthRoute } from "./RedirectBusinessAuthRoute";
import { RedirectClientAuthRoute } from "./RedirectClientAuthRoute";
import { RedirectClientRoute } from "./RedirectClientRoute";
import { ClientRoute } from "./ClientRouter";

export const PublicRouter = () => {
  const { workflow } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "5.9rem" }}>
        <Switch>
          <RedirectClientRoute
            path="/customer/"
            workflow={workflow}
            component={ClientRoute}
          />
          <Route
            exact
            path="/services-menu/:value"
            component={MenuBusinessCategory}
          />

          <Route
            exact
            path="/services-menu-category/:id/:category"
            component={MenuServicesBusiness}
          />

          <Route
            exact
            path="/reserve/invited/:id"
            component={ReserveAppointmentInvited}
          />

          <Route exact path="/reserve-complete" component={ReserveComplete} />

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
          <Route exact path="/" component={HomePage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};
