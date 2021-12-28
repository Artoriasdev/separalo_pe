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
import { Question } from "../pages/Public/Question";
import { CookiePolicy } from "../pages/Public/CookiePolicy";
import { PasswordRecovery } from "../pages/Public/PasswordRecovery";
import { PasswordOTP } from "../pages/Public/PasswordOTP";
import { PasswordRestore } from "../pages/Public/PasswordRestore";
import { Complains } from "../pages/Public/Complains";
import { RegisterCustomer } from "../pages/Public/RegisterCustomer";
import { RegisterBusiness } from "../pages/Public/RegisterBusiness";
import { Password } from "../pages/Public/PasswordChange";
import { ReserveDetail } from "../pages/Public/ReserveDetail";
import { ShoppingPage } from "../pages/Public/ShoppingPage";
import { ReserveCompleteShopping } from "../pages/Public/ReserveCompleteShopping";
import { PaymentPage } from "../pages/Public/PaymentPage";

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
          <Route exact path="/frequent-questions" component={Question} />
          <Route exact path="/cookie-policy" component={CookiePolicy} />
          <Route
            exact
            path="/password-recovery/:value"
            component={PasswordRecovery}
          />
          <Route
            exact
            path="/password-recovery-otp/:value"
            component={PasswordOTP}
          />
          <Route
            exact
            path="/password-restore/:value"
            component={PasswordRestore}
          />
          <Route exact path="/complains" component={Complains} />

          <Route exact path="/register/customer" component={RegisterCustomer} />

          <Route exact path="/register/business" component={RegisterBusiness} />

          <Route exact path="/password_change" component={Password} />
          <Route exact path="/reserve-detail" component={ReserveDetail} />
          <Route exact path="/shopping" component={ShoppingPage} />
          <Route
            exact
            path="/reservations-completed"
            component={ReserveCompleteShopping}
          />
          <Route exact path="/payment" component={PaymentPage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};
