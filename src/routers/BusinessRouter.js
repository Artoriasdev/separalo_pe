import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { NavbarBusines } from "../components/NavbarBusiness";
import { BusinessCategory } from "../pages/B2B/BusinessCategory";
import { BusinessProfile } from "../pages/B2B/BusinessProfile";
import { BusinessReports } from "../pages/B2B/BusinessReports";
import { BusinessReserveAppointment } from "../pages/B2B/BusinessReserveAppointment";
import { BusinessReserveDetail } from "../pages/B2B/BusinessReserveDetail";
import { BusinessServices } from "../pages/B2B/BusinessServices";
import { BusinessServicesCategory } from "../pages/B2B/BusinessServicesCategory";
import { ServiceAppointment } from "../pages/B2B/ServiceAppointments";
import { ServiceDetail } from "../pages/B2B/ServiceDetail";
import { Complains } from "../pages/Public/Complains";
import { CookiePolicy } from "../pages/Public/CookiePolicy";
import { Password } from "../pages/Public/PasswordChange";
import { Question } from "../pages/Public/Question";

export const BusinessRoute = () => {
  return (
    <>
      <NavbarBusines />
      <div style={{ marginTop: "3.15rem", padding: "0.1px 0" }}>
        <Switch>
          <Route exact path="/business/category" component={BusinessCategory} />
          <Route exact path="/business/services" component={BusinessServices} />
          <Route
            exact
            path="/business/services-category/:value"
            component={BusinessServicesCategory}
          />
          <Route
            exact
            path="/business/services/appointment/:id/:value/:category"
            component={ServiceAppointment}
          />
          <Route
            exact
            path="/business/services/details/:id/:value/:category"
            component={ServiceDetail}
          />
          <Route exact path="/business/reports" component={BusinessReports} />
          <Route exact path="/business/profile" component={BusinessProfile} />
          <Route exact path="/business/questions" component={Question} />
          <Route
            exact
            path="/business/cookie-policy"
            component={CookiePolicy}
          />
          <Route exact path="/business/password_change" component={Password} />
          <Route exact path="/business/complains" component={Complains} />
          <Route
            exact
            path="/business/reservation/:id/:value/:category"
            component={BusinessReserveAppointment}
          />
          <Route
            exact
            path="/business/reserve-detail/:id/:value/:category"
            component={BusinessReserveDetail}
          />

          <Redirect to="/business/category" />
        </Switch>
      </div>
    </>
  );
};
