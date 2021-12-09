import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginClient } from "../pages/Public/LoginClient";
// import { RegisterCustomer } from "../pages/RegisterCustomer";
// import { RegisterBusiness } from "../pages/RegisterBusiness";

export const ClientAuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login/:C" component={LoginClient} />

        {/* <Route exact path="/register/customer" component={RegisterCustomer} />
          <Route exact path="/register/business" component={RegisterBusiness} /> */}

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
