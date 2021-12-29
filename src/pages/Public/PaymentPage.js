import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import KRGlue from "@lyracom/embedded-form-glue";
import { useSelector } from "react-redux";

export const PaymentPage = () => {
  const { formToken: token } = useSelector((state) => state.payment.data);
  const history = useHistory();

  useEffect(() => {
    const endpoint =
      "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
    const publicKey =
      "71537712:testpublickey_nfUiwwMyZVJPxmOAHROfrZe2smhKfOY3ltdHjSqSqvB7R";
    const formToken = token;

    KRGlue.loadLibrary(endpoint, publicKey)
      .then(({ KR }) =>
        KR.setFormConfig({
          formToken: formToken,
        })
      )
      .then(({ KR, result }) => {
        KR.onSubmit((paymentData) => {
          console.log(paymentData, "payment");
          if (paymentData.clientAnswer.orderStatus === "PAID") {
            alert("Se hizo el pago correctamente");
            history.push("/");
          }
          return false;
        });
      });
  }, [token]);

  return (
    <div className="page-container">
      <div id="paymentForm" className="kr-embedded" kr-form-token={token}>
        <div className="kr-pan"></div>
        <div className="kr-expiry"></div>
        <div className="kr-security-code"></div>

        <div className="kr-form-error"></div>
        <button className="kr-payment-button"></button>
      </div>
    </div>
  );
};
