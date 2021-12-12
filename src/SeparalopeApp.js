import React from "react";
import { Provider } from "react-redux";
import "animate.css";

import "./sass/styles.scss";
import { store } from "./store/store";
import { SeparalopeRouter } from "./routers/SeparalopeRouter";

export const SeparalopeApp = () => {
  return (
    <Provider store={store}>
      <SeparalopeRouter />
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}> */
      /* </MuiPickersUtilsProvider> */}
      {/* <StyledRoot> */}
      {/* <StyledGlobal /> */}
      {/* <BrowserRouter> */}
      {/* {logged ? <NavBarLogged /> : <Navbar />} */}
      {/* <ScrollToTop /> */}
      {/* <CookiesBanner /> */}
      {/* <StyledMain */}{" "}
      {/* f="1 0 auto"
//           // mt={negocio === null ? "5.9rem" : "3.15rem"}
//           bg={"#fff"}
//         > */}
      {/* <Route exact path="/" component={HomePage} />
//           <Route exact path="/login/:value" component={Login} /> */}
      {/* 
//               <Route
//                 exact
//                 path="/business/services/details/:id/:value/:category"
//                 component={ServiceDetail}
//               />
//               <Route exact path="/password_change" component={Password} />
//               
//               <Route
//                 exact
//                 path="/register/business"
//                 component={RegisterBusiness}
//               />
//               <Route exact path="/frequent-questions" component={Question} />
//              

//               <Route
//                 exact
//                 path="/register/customer"
//                 component={RegisterCustomer}
//               />

//               
//               
//               <Route exact path="/reserve/:id" component={ReserveAppointment} />
//               
//               <Route
//                 exact
//                 path="/password-recovery/:value"
//                 component={PasswordRecovery}
//               />
//               <Route
//                 exact
//                 path="/password-recovery-otp/:value"
//                 component={PasswordOTP}
//               />
//               <Route
//                 exact
//                 path="/password-restore/:value"
//                 component={PasswordRestore}
//               />
//               <Route
//                 exact
//                 path="/quejas-y-reclamaciones"
//                 component={Complains}
//               />
//               <Route exact path="/cookie-policy" component={CookiePolicy} /> */}
    </Provider>
  );
};

// export default SeparalopeApp;
