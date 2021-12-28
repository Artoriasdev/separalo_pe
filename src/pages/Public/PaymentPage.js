import React, { useEffect } from "react";
import KRGlue from "@lyracom/embedded-form-glue";
import { useSelector } from "react-redux";
import axios from "axios";

export const PaymentPage = () => {
  const { token } = useSelector((state) => state.payment);

  useEffect(() => {
    const endpoint =
      "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js";
    const publicKey =
      "71537712:testpublickey_nfUiwwMyZVJPxmOAHROfrZe2smhKfOY3ltdHjSqSqvB7R";
    const formToken = token;

    KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
      .then(({ KR }) =>
        KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "en-US" /* to update initialization parameter */,
        })
      )
      .then(({ KR }) =>
        KR.validateForm()
          .then(({ KR, result }) => {
            console.log(KR, result);

            /* there is no error */
            /* result == null */
          })
          .catch(({ KR, result }) => {
            /* Get the error message */
            var code = result.errorCode;
            var message = result.errorMessage;
            var myMessage = code + ": " + message;
            console.log(myMessage);

            /* if you have defined a callback using      */
            /* result.onError(), you can trigger it calling: */
            return result.doOnError();
          })
      )
      .then(({ KR }) =>
        KR.onSubmit((paymentData) => {
          const rsp = axios
            .post(endpoint, paymentData)
            .then((response) => {
              console.log(response);
              if (response.status === 200) console.log("Pago exitoso");
              else console.log(response);
            })
            .catch((response) => {
              console.log(response);
            });
          return rsp; // Return false to prevent the redirection
        })
      ) // Custom payment callback
      .then(({ KR }) =>
        KR.addForm("#paymentForm")
      ) /* add a payment form  to myPaymentForm div*/
      .then(({ KR, result }) =>
        KR.showForm(result.formId)
      ); /* show the payment form */
  }, [token]);

  return (
    <div className="page-container">
      <div id="paymentForm" className="kr-embedded" kr-form-token={token}>
        <div className="kr-pan"></div>
        <div className="kr-expiry"></div>
        <div className="kr-security-code"></div>

        <button className="kr-payment-button"></button>

        <div className="kr-form-error"></div>
      </div>
    </div>
  );
};
