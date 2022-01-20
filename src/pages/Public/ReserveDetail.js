import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "@mui/material";

export const ReserveDetail = () => {
  const history = useHistory();
  const { reservationUser } = useSelector((state) => state.reservation);

  const handleReserveMore = () => {
    history.push("/");
  };

  const handleReservePayment = () => {
    history.push("/shopping");
  };

  useEffect(() => {
    if (reservationUser.length < 1) history.push("/");
  }, [history, reservationUser.length]);
  return (
    <div className="page-container" style={{ padding: "20px 0" }}>
      <div className="reserve-detail-container">
        <div className="reserve-details">
          <div className="reserve-detail-title">
            <h1>Has reservado el servicio</h1>
          </div>
          <div className="reserve-detail-service">
            <h3>
              {reservationUser[0] &&
                reservationUser[0].tradeName +
                  " - " +
                  reservationUser[0].titleService}
            </h3>
          </div>
          <div className="reserve-detail-address">
            <p>{reservationUser[0] && reservationUser[0].addressBusiness}</p>
          </div>
          <div className="reserve-detail-details">
            <div className="reserve-table">
              <div className="detail-left">Fecha de tu reserva</div>
              <div className="detail-right">
                {reservationUser[0] && reservationUser[0].dateReservation}
              </div>
            </div>
            <div className="reserve-table">
              <div className="detail-left">Horario de tu reserva</div>
              <div className="detail-right">
                {reservationUser[0] && reservationUser[0].timeReservation}
              </div>
            </div>
            <div className="reserve-table">
              <div className="detail-left">Precio</div>
              <div className="detail-right">
                {reservationUser[0] && reservationUser[0].price}
              </div>
            </div>
          </div>
          <div className="reserve-disclaimer">
            <p>
              Para confirmar la reserva es necesario continuar con el pago,
              recuerda que tienes 120 minutos para realizar tu pago.
            </p>
          </div>
        </div>
        <div className="reserve-accions">
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="btn-primary_reserva"
            onClick={handleReserveMore}
          >
            Realizar otra reserva
          </Button>
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="btn-primary"
            onClick={handleReservePayment}
          >
            Continuar con el pago
          </Button>
        </div>
      </div>
    </div>
  );
};
