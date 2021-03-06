import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import KRGlue from "@lyracom/embedded-form-glue";

import Shopping from "../../assets/images/ShoppingPage.svg";
import {
  shoppingCarCompleted,
  shoppingCarInvitedCompleted,
} from "../../actions/shoppingCarDone";

export const PaymentPage = () => {
  const [error, setError] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.reservationEmailInvited);
  const { formToken: token, orderId } = useSelector(
    (state) => state.payment.data
  );
  const { token: tk } = useSelector((state) => state.auth.data);
  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token === undefined || token === null) {
      history.push("/");
    }
  }, [token, history]);

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
              dispatch(shoppingCarInvitedCompleted(orderId, email));
            }
            // setTimeout(() => {

            // }, 1000);

            // history.go();
          }
          return false;
        });
        KR.onError((event) => {
          var code = event.errorCode;
          var myMessage = "";

          switch (code) {
            case "PSP_108":
              myMessage =
                "Su token a excedido los 15 minutos, favor de generar uno nuevo";
              console.log(event.errorCode);
              console.log(event.errorMessage, "mensaje error");
              break;

            case "CLIENT_300":
              myMessage =
                "M??s de uno de los campos registrados son incorrectos. Reg??stralo nuevamente";
              break;

            case "CLIENT_301":
              myMessage =
                "El n??mero de tarjeta ingresado es incorrecto. Reg??stralo nuevamente";
              break;

            case "CLIENT_302":
              myMessage =
                "La fecha de vencimiento ingresada es incorrecta. Reg??stralo nuevamente";
              break;

            case "CLIENT_303":
              myMessage =
                "El c??digo de seguridad registrado es incorrecto. Reg??stralo nuevamente";
              console.log(event.errorCode, "codigo error");
              break;

            case "CLIENT_304":
              myMessage =
                "No has registrado todos los campos requeridos. Reg??stralo nuevamente";
              break;

            case "CLIENT_998":
              myMessage =
                "Estamos teniendo problemas con la pasarela de pagos. Intenta nuevamente en unos minutos";
              break;
            case "PSP_641":
              myMessage =
                "La transacci??n ha sido rechazada. Error en autenticaci??n. Intenta nuevamente en unos minutos";
              break;

            default:
              myMessage =
                event.detailedErrorMessage ||
                "Ha ocurrido un error. Intenta nuevamente en unos minutos";
              console.log(event.errorCode);
              console.log(event.errorMessage, "mensaje error");
              break;
          }

          setError(true);

          // console.log(event);
          document.getElementsByClassName("customerror")[0].innerText =
            myMessage;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [token, history, dispatch, logged, orderId, tk]);

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
              esta operaci??n.
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
