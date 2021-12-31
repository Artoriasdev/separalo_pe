import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
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
  checkShoppingItems,
  cuponClear,
  shoppingCarDeleteItems,
  shoppingDiscount,
} from "../../actions/shoppingCar";
// import { shoppingCarDone } from "../../actions/shoppingCarDone";
import { payment } from "../../actions/payment";
import { finishChecking, startChecking } from "../../actions/checking";
import Delete from "../../assets/images/Delete.svg";
import CustomizedTooltips from "../../components/ToolTip";

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
  const { token } = useSelector((state) => state.auth.data);
  const { logged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pricing, setPricing] = useState(0);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (logged) {
      dispatch(checkShoppingItems(token));
    }
  }, [dispatch, logged, token]);

  var values;
  var total = 0;

  const handleDeleteModal = (id) => {
    setSelected(id);
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
    // dispatch(shoppingCarDone(shoppingCarItems));
    if (logged) {
      dispatch(payment(token));
      dispatch(startChecking());
    }
    setTimeout(() => {
      dispatch(finishChecking());
      history.push("/payment");
    }, 2000);
  };

  function handlePricing() {
    if (shoppingCarItems.length > 0) {
      for (let i = 0; i < shoppingCarItems.length; i++) {
        var element = shoppingCarItems[i].priceUnformatted;
        total = total + element;
      }
      setPricing(total.toFixed(2));
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
                      (
                        {
                          titleService,
                          tradeNameBusiness,
                          state,
                          dateReservation,
                          price,
                          nameCategory,
                          timeReservation,
                        },
                        index
                      ) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <IconButton
                                className=""
                                onClick={() => handleDeleteModal(index)}
                                style={{ margin: "0" }}
                              >
                                <img src={Delete} alt="logo" />
                              </IconButton>
                            </TableCell>
                            <TableCell className="font">
                              {nameCategory}
                            </TableCell>
                            <TableCell className="font">
                              {tradeNameBusiness}
                            </TableCell>
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
                              -S/ {"0.00"}
                            </TableCell>
                            <TableCell className="font">
                              {state === "Caducado" ? (
                                <>
                                  {state} <CustomizedTooltips />
                                </>
                              ) : (
                                state
                              )}
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
                <div className="totals">
                  <p>Subtotal </p>
                  <p>S/ {pricing}</p>
                </div>
                <div className="totals">
                  <p>Descuento </p>
                  <p>-S/ {"0.00"}</p>
                </div>
                <div className="totals" style={{ color: "#5950A2" }}>
                  <p style={{ fontWeight: "bold" }}>Total a pagar </p>
                  <p style={{ lineHeight: "18px", fontWeight: "900" }}>
                    S/ {pricing}
                  </p>
                </div>
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
