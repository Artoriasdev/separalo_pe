import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@mui/material";

export const ReserveCompleteShopping = () => {
  const history = useHistory();

  const { shoppingDetails } = useSelector((state) => state.shoppingDone);
  const { logged } = useSelector((state) => state.auth);

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
                      <p className="reserve-place">{tradeName}</p>
                    </div>
                    <div className="reserve-subtitle">
                      <p>Dirección: {addressBusiness}</p>
                      <p>Código de reserva: {codeReservation}</p>
                    </div>
                    <div className="reserve-rows">
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>Nombre del servicio:</p>
                          <p style={{ fontWeight: "bold" }}>{titleService}</p>
                        </div>
                        <div className="reserve-row-element">
                          <p>Categoría:</p>
                          <p style={{ fontWeight: "bold" }}>{nameCategory}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>Fecha de su cita:</p>
                          <p style={{ fontWeight: "bold" }}>
                            {dateReservation}
                          </p>
                        </div>
                        <div className="reserve-row-element">
                          <p>Hora de su cita:</p>
                          <p style={{ fontWeight: "bold" }}>
                            {timeReservation}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="reserve-row">
                        <div className="reserve-row-element">
                          <p>Duración de su cita:</p>
                          <p style={{ fontWeight: "bold" }}>
                            {durationReservation}
                          </p>
                        </div>
                        <div className="reserve-row-element">
                          <p>Costo por la cita:</p>
                          <p style={{ fontWeight: "bold", color: "#5829dd" }}>
                            {price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          <span className="mensaje">
            Notificaremos al negocio el pago de tu reserva, recibirás un
            recordatorio por correo electrónico 1 hora antes de tu cita.
          </span>
          <Button
            size="large"
            color="inherit"
            variant="contained"
            className="btn-primary_reserva"
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
