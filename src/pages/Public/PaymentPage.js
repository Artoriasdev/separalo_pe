import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import KRGlue from "@lyracom/embedded-form-glue";

import postscribe from "postscribe";

import Shopping from "../../assets/images/ShoppingPage.svg";

export const PaymentPage = () => {
  useEffect(() => {
    postscribe(
      "#script",
      '<script language="javascript" src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js" kr-public-key="71537712:testpublickey_nfUiwwMyZVJPxmOAHROfrZe2smhKfOY3ltdHjSqSqvB7R"></script>'
    );
  }, []);

  const { formToken: token } = useSelector((state) => state.payment.data);
  const history = useHistory();

  useEffect(() => {
    const endpoint =
      "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
    const publicKey =
      "71537712:testpublickey_nfUiwwMyZVJPxmOAHROfrZe2smhKfOY3ltdHjSqSqvB7R";
    const formToken = token;

    KRGlue.loadLibrary(endpoint, publicKey).then(({ KR }) => {
      try {
        KR.setFormConfig({
          formToken: formToken,
          "kr-language": "es-ES",
        });
        KR.onSubmit((paymentData) => {
          console.log(paymentData, "payment");
          if (paymentData.clientAnswer.orderStatus === "PAID") {
            alert("Se hizo el pago correctamente");
            history.push("/");
            history.go();
          }
          return false;
        });
        KR.onError((event) => {
          var code = event.detailedErrorCode;
          var message = event.errorMessage;
          var myMessage = code + ": " + message;

          console.log(event);
          document.getElementsByClassName("customerror")[0].innerText =
            myMessage;
        });
      } catch (error) {
        console.log(error);
      }
    });
    // .then(({ KR, result }) => {
    // });
  }, [token, history]);

  return (
    <div className="page-container">
      <h1>
        <img src={Shopping} alt="logo" style={{ marginRight: "8px" }} />
        Proceso de pago de reservas
      </h1>
      <h3>
        Por favor complete el formulario de pago para proceder con el pago de
        sus reservas
      </h3>
      <div className="shopping-container">
        <div className="empty-container">
          <div id="paymentForm" className="kr-embedded" kr-form-token={token}>
            <div className="kr-pan"></div>
            <div className="kr-expiry"></div>
            <div className="kr-security-code"></div>

            <button disabled={true} className="kr-payment-button"></button>
            {/* <div className="kr-form-error"></div> */}
          </div>
          <div className="customerror"></div>
        </div>
      </div>
    </div>
  );
};
