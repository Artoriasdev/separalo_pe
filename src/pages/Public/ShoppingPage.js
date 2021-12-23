import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import Shopping from "../../assets/images/ShoppingPage.svg";
import {
  cuponClear,
  shoppingCarDeleteItems,
  shoppingDiscount,
} from "../../actions/shoppingCar";
import { shoppingCarDone } from "../../actions/shoppingCarDone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 10,
  p: 4,
};

export const ShoppingPage = () => {
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);
  const { show, valid, message } = useSelector((state) => state.cupon);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pricing, setPricing] = useState(0);
  const [selected, setSelected] = React.useState([]);
  const [opened, setOpened] = useState(false);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  var values;
  var total = 0;

  const handleDeleteModal = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleReserveDelete = () => {
    dispatch(shoppingCarDeleteItems(selected));
    setOpened(false);
  };

  const handleInputChange = ({ target }) => {
    const val = target.value;
    values = val;
    if (val === "") {
      dispatch(cuponClear());
    }
  };

  const handleDiscount = () => {
    dispatch(shoppingDiscount(values));
  };

  const handleReserveMore = () => {
    history.push("/");
  };

  const handleReservePayment = () => {
    dispatch(shoppingCarDone(shoppingCarItems));
    history.push("/reservations-completed");
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  function handlePricing() {
    if (shoppingCarItems.length > 0) {
      for (let i = 0; i < shoppingCarItems.length; i++) {
        var element = JSON.parse(shoppingCarItems[i].price.split("/").pop());
        total = total + element - shoppingCarItems[i].discount;
      }
      setPricing(total);
    }
  }

  useEffect(() => {
    handlePricing();
  }, [shoppingCarItems]);

  const handleFirstReserve = () => {
    history.push("/");
  };
  return (
    <div className="page-container">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal-container"
      >
        <Fade in={opened}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h8"
              component="p"
              style={{ fontWeight: "unset", marginBottom: "10px" }}
            >
              {"¿Desea borrar los servicios seleccionados?"}
            </Typography>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleReserveDelete}
                style={{ width: "45%" }}
              >
                Aceptar
              </Button>

              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary"
                onClick={handleClose}
                style={{ width: "45%" }}
              >
                Rechazar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
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
                    <TableCell className="font-tittle"></TableCell>
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
                        discount,
                      }) => {
                        const isItemSelected = isSelected(codeReservation);
                        return (
                          <TableRow key={codeReservation}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="default"
                                checked={isItemSelected}
                                onClick={(event) =>
                                  handleClick(event, codeReservation)
                                }
                              />
                            </TableCell>
                            <TableCell className="font">
                              {nameCategory}
                            </TableCell>
                            <TableCell className="font">{tradeName}</TableCell>
                            <TableCell className="font">
                              {titleService}
                            </TableCell>
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
                              style={{ color: "#5950A2" }}
                            >
                              -S/ {discount}
                            </TableCell>
                            <TableCell className="font" align="center">
                              {state}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="inputs-shopping-container">
              <div className="discount-container">
                <p style={{ marginRight: "10px" }}>Agregar cupón de dcto.</p>
                <div className="cupon-field">
                  <TextField
                    value={values}
                    style={{ marginTop: "0" }}
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  {show ? (
                    <div
                      className={valid ? "success" : "error"}
                      style={{ textAlign: "center", marginTop: "5px" }}
                    >
                      {message}
                    </div>
                  ) : null}
                </div>
                <button
                  className="text-button"
                  style={{ color: "#5950A2", marginLeft: "10px" }}
                  onClick={handleDiscount}
                >
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
                <div className="reserve-accions-delete">
                  <button
                    className="text-button_delete"
                    style={{ color: "#23232399" }}
                    onClick={handleDeleteModal}
                  >
                    Eliminar reserva
                  </button>
                </div>
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
