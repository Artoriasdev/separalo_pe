import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Backdrop,
  Box,
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
  createTheme,
  ThemeProvider,
} from "@mui/material";

import {
  cuponClear,
  shoppingCarDelete,
  shoppingCarDeleteInvited,
  shoppingDiscount,
} from "../actions/shoppingCar";
import { payment, paymentInvited } from "../actions/payment";
import { finishChecking, startChecking } from "../actions/checking";
import Delete from "../assets/images/Delete.svg";
import { CustomizedTooltips, TriggersTooltips } from "../components/ToolTip";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

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

export const ShoppingList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth.data);
  const { logged } = useSelector((state) => state.auth);
  const { shoppingCarItems } = useSelector((state) => state.shoppingCar);
  const { show, valid, message } = useSelector((state) => state.cupon);
  const { email } = useSelector((state) => state.reservationEmailInvited);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState();

  var values;

  const handleClose = () => {
    setOpened(false);
  };

  const handleReserveDelete = () => {
    if (logged) {
      dispatch(shoppingCarDelete(selected, token));
    } else {
      dispatch(shoppingCarDeleteInvited(email, selected));
    }
    setOpened(false);
  };

  const handleDeleteModal = (id) => {
    setSelected(id);
    setOpened(true);
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
    } else {
      dispatch(paymentInvited(email));
      dispatch(startChecking());
    }
    setTimeout(() => {
      dispatch(finishChecking());
      history.push("/payment");
    }, 2500);
  };

  return (
    <>
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
              style={{
                fontWeight: "500",
                marginBottom: "20px",
                fontSize: "18",
                lineHeight: "21px",
              }}
            >
              {"¿Estás seguro que deseas eliminar esta reserva?"}
            </Typography>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className="btn-primary_reserva"
                onClick={handleClose}
                style={{ width: "45%" }}
              >
                Cancelar
              </Button>
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
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="table-container">
        <ThemeProvider theme={theme}>
          <TableContainer
            className="table"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle"></TableCell>
                  <TableCell className="font-tittle">Categoría</TableCell>
                  <TableCell className="font-tittle">Negocio</TableCell>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Fecha</TableCell>
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle" align="left">
                    Precio
                  </TableCell>
                  <TableCell className="font-tittle" align="left">
                    Dsctos.
                  </TableCell>
                  <TableCell className="font-tittle" align="left">
                    Estado*
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shoppingCarItems &&
                  shoppingCarItems.map(
                    ({
                      preCodeReservation,
                      titleService,
                      tradeNameBusiness,
                      state,
                      dateReservation,
                      price,
                      nameCategory,
                      timeReservation,
                    }) => {
                      return (
                        <TableRow key={preCodeReservation}>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                handleDeleteModal(preCodeReservation)
                              }
                              style={{ margin: "0" }}
                            >
                              <img src={Delete} alt="logo" />
                            </IconButton>
                          </TableCell>
                          <TableCell className="font">{nameCategory}</TableCell>
                          <TableCell className="font">
                            {tradeNameBusiness}
                          </TableCell>
                          <TableCell className="font">{titleService}</TableCell>
                          <TableCell className="font">
                            {dateReservation}
                          </TableCell>
                          <TableCell className="font">
                            {timeReservation}
                          </TableCell>
                          <TableCell
                            className="font"
                            align="left"
                            style={{
                              textDecoration:
                                state === "Caducado" ? "line-through" : "",
                            }}
                          >
                            {price}
                          </TableCell>
                          <TableCell
                            className="font"
                            align="left"
                            style={{ color: "#5950A2", fontWeight: "bold" }}
                          >
                            -S/ {"0.00"}
                          </TableCell>
                          <TableCell className="font">
                            {state === "Caducado" ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                {state} <CustomizedTooltips />
                              </div>
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
          <Box sx={{ display: { sm: "none", xs: "flex" } }}>
            <div className="shop-card-container">
              {shoppingCarItems &&
                shoppingCarItems.map(
                  ({
                    titleService,
                    tradeNameBusiness,
                    state,
                    dateReservation,
                    price,
                    nameCategory,
                    timeReservation,
                    preCodeReservation,
                  }) => {
                    return (
                      <div className="shop-card" key={preCodeReservation}>
                        <div className="shop-card-title">
                          <p>{tradeNameBusiness} </p>
                          <IconButton
                            onClick={() =>
                              handleDeleteModal(preCodeReservation)
                            }
                            style={{
                              fontSize: "1.5rem",
                              lineHeight: "normal",
                              fontWeight: "normal",
                            }}
                          >
                            <img src={Delete} alt="logo" />
                          </IconButton>
                        </div>
                        <div className="shop-card-content">
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Servicio:</p>
                            <p>{titleService} </p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Categoría:</p>
                            <p>{nameCategory} </p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Precio:</p>
                            <p
                              style={{
                                textDecoration:
                                  state === "Caducado" ? "line-through" : "",
                              }}
                            >
                              {price}
                            </p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Dsctos.</p>
                            <p style={{ color: "#5950A2", fontWeight: "bold" }}>
                              {"-S/ 0.00"}{" "}
                            </p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Fecha:</p>
                            <p>{dateReservation}</p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Hora:</p>
                            <p>{timeReservation} </p>
                          </div>
                          <div className="shop-card-text">
                            <p className="shop-card-bold">Estado*:</p>
                            <p>
                              {state === "Caducado" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  {state} <TriggersTooltips />
                                </div>
                              ) : (
                                state
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </Box>
        </ThemeProvider>
        <div className="inputs-shopping-container">
          <div className="discount-container">
            <p style={{ marginRight: "10px" }}>Agregar cupón de dscto.</p>
            <div className="cupon-field">
              <TextField
                value={values}
                style={{ marginTop: "0" }}
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
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
              <p>{shoppingCarItems[0] && shoppingCarItems[0].sumPrice}</p>
            </div>
            <div className="totals">
              <p>Descuento </p>
              <p>-S/ {"0.00"}</p>
            </div>
            <div className="totals" style={{ color: "#5950A2" }}>
              <p style={{ fontWeight: "bold" }}>Total a pagar </p>
              <p style={{ lineHeight: "18px", fontWeight: "900" }}>
                {shoppingCarItems[0] && shoppingCarItems[0].sumPrice}
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
                style={{
                  display:
                    shoppingCarItems[0] &&
                    shoppingCarItems[0].sumPrice === "S/ 0.00"
                      ? "none"
                      : "",
                }}
                disabled={
                  shoppingCarItems[0] &&
                  shoppingCarItems[0].sumPrice === "S/ 0.00"
                    ? true
                    : false
                }
              >
                Continuar con el pago
              </Button>
            </div>
          </div>
        </div>
        <div className="disclaimer-container">
          <p>
            *La reserva tiene una vigencia de{" "}
            <span style={{ fontWeight: "bold" }}>1 hora</span>, realiza el pago
            en este plazo, de lo contrario tendrás que reservar nuevamente.
          </p>
        </div>
      </div>
    </>
  );
};
