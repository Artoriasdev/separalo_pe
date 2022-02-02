import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import KRGlue from "@lyracom/embedded-form-glue";

import postscribe from "postscribe";

import Shopping from "../../assets/images/ShoppingPage.svg";
import {
  shoppingCarCompleted,
  shoppingCarInvitedCompleted,
} from "../../actions/shoppingCarDone";
import { paymentDone } from "../../actions/payment";

export const PaymentPage = () => {
  const [error, setError] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { formToken: token, orderId } = useSelector(
    (state) => state.payment.data
  );
  const { token: tk } = useSelector((state) => state.auth.data);
  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token === undefined || token === null) {
      history.push("/");
    }
  }, [token]);

  useEffect(() => {
    const endpoint =
      "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
    const publicKey =
      "71537712:testpublickey_nfUiwwMyZVJPxmOAHROfrZe2smhKfOY3ltdHjSqSqvB7R";
    const formToken = token;

    try {
      KRGlue.loadLibrary(endpoint, publicKey).then(({ KR }) => {
        KR.setFormConfig({
          formToken: formToken,
          "kr-language": "es-ES",
        });
        KR.onSubmit((paymentData) => {
          console.log(paymentData, "payment");
          if (paymentData.clientAnswer.orderStatus === "PAID") {
            setError(false);
            if (logged) {
              dispatch(shoppingCarCompleted(orderId, tk));
            } else {
              dispatch(shoppingCarInvitedCompleted(orderId));
            }
            setTimeout(() => {
              history.push("/reservations-completed");
              dispatch(paymentDone());
            }, 1000);

            // history.go();
          }
          return false;
        });
        KR.onError((event) => {
          var code = event.errorCode;
          var message = event.errorMessage;
          var myMessage = code + ": " + message;

          setError(true);

          console.log(event);
          document.getElementsByClassName("customerror")[0].innerText =
            myMessage;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [token, history]);

  return (
    <section>
      <div className="page-container">
        <h1>
          <img src={Shopping} alt="logo" style={{ marginRight: "8px" }} />
          Finaliza tu pago
        </h1>
        <h3>Completa el formulario para finalizar el pago de tus reservas</h3>
        <div className="shopping-container">
          <div className="empty-container">
            <p
              style={{
                color: "#594FA1",
                lineHeight: "20px",
                fontSize: "16px",
              }}
            >
              Recuerda que tienes{" "}
              <span style={{ fontWeight: "bold" }}>15 minutos</span> para hacer
              esta operación.
            </p>
            <div id="paymentForm" className="kr-embedded" kr-form-token={token}>
              <div className="kr-pan"></div>
              <div className="kr-expiry"></div>
              <div className="kr-security-code"></div>

              <button className="kr-payment-button"></button>
              {/* <div className="kr-form-error"></div> */}
            </div>
            <div
              className="customerror"
              style={{ display: error ? "flex" : "none" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
