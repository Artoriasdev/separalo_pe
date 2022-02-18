import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@mui/material";

export const ReserveCompleteShopping = () => {
  const history = useHistory();

  const { shoppingDetails } = useSelector((state) => state.shoppingDone);
  const { logged } = useSelector((state) => state.auth);

  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", function (event) {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  useEffect(() => {
    if (shoppingDetails.length < 1) history.push("/");
  }, [shoppingDetails, history]);

  const handleRedirect = () => {
    if (logged) {
      history.push("/customer-appointment");
      // history.go();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="page-container" style={{ padding: "0" }}>
      <div className="confirm-page">
        <div className="content-container" style={{ maxWidth: "700px" }}>
          <img
            src="https://elasticbeanstalk-us-east-2-257249679707.s3.us-east-2.amazonaws.com/internal-api/branding/separalo-logo-for-email.png"
            alt="¡logo separalo.pe!"
            style={{ maxHeight: "1000000px" }}
          />
          <h1 style={{ color: "#594FA1" }}>¡Gracias por realizar tu pago!</h1>
          <p className="info-text">
            Has realizado tu pago de forma exitosa, el día de tu reserva
            recuerda estar 10 minutos antes.
          </p>

          <div className="reserve-info-container">
            <p className="reserve-info">Información de tu reserva:</p>

            {shoppingDetails &&
              shoppingDetails.map(
                ({
                  tradeName,
                  addressBusiness,
                  codeReservation,
                  titleService,
                  nameCategory,
                  dateReservation,
                  timeReservation,
                  durationReservation,
                  price,
                }) => (
                  <div
                    key={codeReservation}
                    className="reserve-details-container"
                  >
                    <div>
                      <p className="reserve-place">{tradeName.toUpperCase()}</p>
                    </div>
                    <div className="reserve-subtitle">
                      <p style={{ fontWeight: "bold" }}>{addressBusiness}</p>
                      <p>
                        Código de reserva:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {codeReservation}
                        </span>
                      </p>
                    </div>
                    <div className="reserve-rows">
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>
                            Nombre del servicio:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                              }}
                            >
                              {titleService}
                            </span>
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {titleService}
                          </p>
                        </div>
                        <div className="reserve-row-element">
                          <p>
                            Categoría:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                              }}
                            >
                              {nameCategory}
                            </span>
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {nameCategory}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>
                            Fecha de tu reserva:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                              }}
                            >
                              {dateReservation}
                            </span>
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {dateReservation}
                          </p>
                        </div>
                        <div className="reserve-row-element">
                          <p>
                            Hora de tu reserva:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                              }}
                            >
                              {timeReservation}
                            </span>
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {" "}
                            {timeReservation}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>
                            Duración de tu reserva:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                              }}
                            >
                              {durationReservation}
                            </span>{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {durationReservation}
                          </p>
                        </div>
                        <div className="reserve-row-element">
                          <p>
                            Costo por reserva:{" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                display: windowWith > 768 ? "none" : "",
                                color: "#5829dd",
                              }}
                            >
                              {price}
                            </span>{" "}
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "#5829dd",
                              display: windowWith <= 768 ? "none" : "",
                            }}
                          >
                            {price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          <span
            className="mensaje"
            style={{
              width: windowWith <= 768 ? "90%" : "",
              textAlign: windowWith <= 768 ? "center" : "",
            }}
          >
            Notificaremos al negocio el pago de tu reserva, recibirás un
            recordatorio por correo electrónico 1 hora antes de tu cita.
          </span>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            className="btn-primary"
            style={{ width: windowWith <= 768 ? "90%" : "" }}
            fullWidth
            onClick={handleRedirect}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
};
