import React from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Shopping from "../../assets/images/ShoppingPage.svg";
import { useSelector } from "react-redux";

export const ShoppingPage = () => {
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);
  const history = useHistory();

  const handleFirstReserve = () => {
    history.push("/");
  };
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
                        id,
                        titleService,
                        tradeName,
                        state,
                        dateReservation,
                        price,
                        nameCategory,
                        timeReservation,
                      }) => (
                        <TableRow key={id}>
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
          </div>
        )}
      </div>
    </div>
  );
};
