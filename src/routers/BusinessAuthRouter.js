import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { LoginBusiness } from "../pages/Public/LoginBusiness";
// import { RegisterCustomer } from "../pages/RegisterCustomer";
// import { RegisterBusiness } from "../pages/RegisterBusiness";

export const BusinessAuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login/:B" component={LoginBusiness} />

        {/* <Route exact path="/register/customer" component={RegisterCustomer} />
          <Route exact path="/register/business" component={RegisterBusiness} /> */}

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
