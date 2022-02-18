import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { Event } from "@mui/icons-material";

import { MyModal } from "../../components/Modal";
import { clientAppointment } from "../../actions/clientAppointment";
import {
  AppointmentTooltip,
  AppointmentTriggersTooltips,
} from "../../components/ToolTip";
// import FullPageLoader from "./FullPageLoader";

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

export const CustomerAppointment = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clientAppointment);
  const { token } = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(clientAppointment(token));
  }, [dispatch, token]);

  return (
    <>
      <MyModal />
      <div className="page-container" style={{ padding: "0" }}>
        <div className="appointment-container">
          <Event fontSize="large" style={{ margin: "0 5px 0 0" }} />
          <h1>Mis citas programadas</h1>
        </div>
        <ThemeProvider theme={theme}>
          <TableContainer
            className="table"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Negocio</TableCell>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Categoría</TableCell>
                  <TableCell className="font-tittle">Precio</TableCell>
                  <TableCell className="font-tittle">Fecha</TableCell>
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle">Duración</TableCell>
                  <TableCell className="font-tittle">Código</TableCell>
                  <TableCell className="font-tittle">Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map(
                    ({
                      titleService,
                      nameCategory,
                      tradeName,
                      addressBusiness,
                      price,
                      dateReservation,
                      timeReservation,
                      durationReservation,
                      state,
                      codeReservation,
                    }) => (
                      <TableRow key={codeReservation}>
                        <TableCell className="font">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <AppointmentTooltip
                              business={tradeName}
                              address={addressBusiness}
                            />
                            {tradeName}
                          </div>
                        </TableCell>
                        <TableCell className="font">{titleService}</TableCell>
                        <TableCell className="font">{nameCategory}</TableCell>
                        <TableCell className="font">{price}</TableCell>
                        <TableCell className="font">
                          {dateReservation}
                        </TableCell>
                        <TableCell className="font">
                          {timeReservation}
                        </TableCell>
                        <TableCell className="font">
                          {durationReservation}
                        </TableCell>
                        <TableCell className="font">
                          {codeReservation}{" "}
                        </TableCell>
                        <TableCell className="font">{state}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: { sm: "none", xs: "flex" } }}>
            <div className="shop-card-container">
              {data &&
                data.map(
                  ({
                    titleService,
                    nameCategory,
                    tradeName,
                    addressBusiness,
                    price,
                    dateReservation,
                    timeReservation,
                    durationReservation,
                    state,
                    codeReservation,
                  }) => (
                    <div className="shop-card" key={codeReservation}>
                      <div className="shop-card-title">
                        <p>Negocio</p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                        >
                          {tradeName}
                          <AppointmentTriggersTooltips
                            business={tradeName}
                            address={addressBusiness}
                          />
                        </div>
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
                          <p> {price} </p>
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
                          <p className="shop-card-bold">Duración:</p>
                          <p>{durationReservation} </p>
                        </div>
                        <div className="shop-card-text">
                          <p className="shop-card-bold">Código:</p>
                          <p>{codeReservation} </p>
                        </div>
                        <div className="shop-card-text">
                          <p className="shop-card-bold">Estado*:</p>
                          <p>{state} </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};
