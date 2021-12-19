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
          <h1 style={{ color: "#594FA1" }}>¡Gracias por reservar tu cita!</h1>
          <p
            style={{
              width: "100%",
              margin: "auto",
              paddingBottom: "1rem",
              textAlign: "center",
            }}
          >
            Has realizado tu pago de forma exitosa, el día de tu reserva
            recuerda estar 10 minutos antes.
          </p>

          <div style={{ margin: "20px 0" }}>
            <p
              style={{
                color: "#594FA1",
                textAlign: "left",
                fontSize: "19.5px",
                fontWeight: "bold",
                lineHeight: "23px",
              }}
            >
              Información de tu reserva:
            </p>

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
                  <div key={codeReservation} style={{ marginBottom: "30px" }}>
                    <div>
                      <p style={{ textAlign: "left", margin: "5px 0" }}>
                        Lugar : {tradeName}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: "10px 0", textAlign: "left" }}>
                        {addressBusiness}
                      </p>
                      <p style={{ margin: "10px 0", textAlign: "left" }}>
                        Código de reserva: {codeReservation}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <p>Nombre del servicio</p>
                          <p style={{ fontWeight: "bold" }}>{titleService}</p>
                        </div>
                        <div>
                          <p>Categoría</p>
                          <p style={{ fontWeight: "bold" }}>{nameCategory}</p>
                        </div>
                      </div>
                      <hr
                        style={{
                          color: "#ffdd00",
                          width: "0",
                          borderLeft: "1px solid #ffdd00",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <p>Fecha de su cita</p>
                          <p style={{ fontWeight: "bold" }}>
                            {dateReservation}
                          </p>
                        </div>
                        <div>
                          <p>Hora de su cita</p>
                          <p style={{ fontWeight: "bold" }}>
                            {timeReservation}
                          </p>
                        </div>
                      </div>
                      <hr
                        style={{
                          color: "#ffdd00",
                          width: "0",
                          borderLeft: "1px solid #ffdd00",
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <p>Duración de su cita</p>
                          <p style={{ fontWeight: "bold" }}>
                            {durationReservation}
                          </p>
                        </div>
                        <div>
                          <p>Costo por la cita</p>
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
            recordatorio por correo electrónico 24 horas antes de tu cita.
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
