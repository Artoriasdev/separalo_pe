import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import Shopping from "../../assets/images/ShoppingPage.svg";

export const ShoppingPage = () => {
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);
  const history = useHistory();
  const [pricing, setPricing] = useState(0);

  var values;
  var total = 0;

  const handleInputChange = ({ target }) => {
    const val = target.value;
    values = val;
    console.log(values);
  };

  const handleReserveMore = () => {
    history.push("/");
  };

  const handleReservePayment = () => {
    history.push("/reserve-complete");
  };

  function handlePricing() {
    if (shoppingCarItems.length > 0) {
      for (let i = 0; i < shoppingCarItems.length; i++) {
        var element = JSON.parse(shoppingCarItems[i].price.split("/").pop());
        total = total + element;
      }
      setPricing(total);
    }
  }

  useEffect(() => {
    handlePricing();
  }, []);

  const handleFirstReserve = () => {
    history.push("/");
  };
  // console.log(JSON.parse(shoppingCarItems[0].price.split("/").pop()));

  return (
    <div className="page-container">
      <h1>
        <img src={Shopping} alt="logo" style={{ marginRight: "8px" }} />
        Carrito de compras
      </h1>
      <h3>Estos son los servicios que han sido registrados en tu carrito</h3>

      <div className="shopping-container">
        {shoppingCarItems.length < 1 ? (
          <div className="empty-container">
            <div className="empty-text">
              <p style={{ fontSize: "15px", color: "#23232399" }}>
                Tu carrito de reservas esta vacio
              </p>
            </div>
            <div className="empty-accion">
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleFirstReserve}
              >
                Realizar una reserva
              </Button>
            </div>
          </div>
        ) : (
          <div className="table-container">
            <TableContainer className="table">
              <Table sx={{ minWidth: 650 }}>
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell className="font-tittle">Categoría</TableCell>
                    <TableCell className="font-tittle">Negocio</TableCell>
                    <TableCell className="font-tittle">Servicio</TableCell>
                    <TableCell className="font-tittle">Fecha</TableCell>
                    <TableCell className="font-tittle">Hora</TableCell>
                    <TableCell className="font-tittle" align="center">
                      Precio
                    </TableCell>
                    <TableCell className="font-tittle" align="center">
                      Dsctos.
                    </TableCell>
                    <TableCell className="font-tittle" align="center">
                      Estado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shoppingCarItems &&
                    shoppingCarItems.map(
                      ({
                        codeReservation,
                        titleService,
                        tradeName,
                        state,
                        dateReservation,
                        price,
                        nameCategory,
                        timeReservation,
                      }) => (
                        <TableRow key={codeReservation}>
                          <TableCell className="font">{nameCategory}</TableCell>
                          <TableCell className="font">{tradeName}</TableCell>
                          <TableCell className="font">{titleService}</TableCell>
                          <TableCell className="font">
                            {dateReservation}
                          </TableCell>
                          <TableCell className="font">
                            {timeReservation}
                          </TableCell>
                          <TableCell className="font" align="center">
                            {price}
                          </TableCell>
                          <TableCell
                            className="font"
                            align="center"
                          ></TableCell>
                          <TableCell className="font" align="center">
                            {state}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="inputs-shopping-container">
              <div className="discount-container">
                <p style={{ marginRight: "10px" }}>Agregar cupón de dcto.</p>
                <TextField
                  style={{ marginRight: "10px", marginTop: "0" }}
                  variant="outlined"
                  onChange={handleInputChange}
                />
                <button className="text-button" style={{ color: "#5950A2" }}>
                  Aplicar cupón
                </button>
              </div>
              <div className="payment-container">
                <p style={{ marginRight: "10px" }}>Total a pagar S/</p>
                <TextField
                  value={pricing}
                  style={{ marginRight: "10px" }}
                  variant="outlined"
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="reserve-accions">
                <div className="reserve-accions-shopping">
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
            <div className="disclaimer-container">
              <p>
                *Si tu estado está caducado, puedes generar una nueva reserva,
                recuerda que tu reserva se mantiene activa solo por{" "}
                <span style={{ fontWeight: "bold" }}>120 minutos</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
