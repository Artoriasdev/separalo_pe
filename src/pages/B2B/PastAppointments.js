import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "animate.css";

import {
  Box,
  Card,
  CardContent,
  createTheme,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { Search, Timer } from "@mui/icons-material";

import Code from "../../assets/images/code.svg";
import Usuario from "../../assets/images/usuario.svg";
import Hora from "../../assets/images/hora.svg";
import fecha from "../../assets/images/fecha.svg";
import Cerrar from "../../assets/images/Cerrar.svg";

import { MyModal } from "../../components/Modal";
import { reservationListHistory } from "../../actions/reservationList";

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

export const PastAppointments = () => {
  const { token } = useSelector((state) => state.auth.data);
  const { reservationHistory } = useSelector((state) => state.reservationList);
  const params = useParams();
  const dispatch = useDispatch();

  const [card, setCard] = useState(false);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    dispatch(reservationListHistory(params.id, token));
  }, [dispatch, token, params.id]);

  const handleCard = (id) => {
    const data = reservationHistory.find(
      (arreglo) => arreglo.codeReservation === id
    );
    setCard(true);
    setCardData([data]);
  };

  const handleCardClose = () => {
    setCard(false);
  };

  return (
    <div>
      <MyModal />
      <div className="appointment-cards">
        <ThemeProvider theme={theme}>
          <TableContainer
            className="table"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="font-tittle">Categoría</TableCell>
                  <TableCell className="font-tittle">Servicio</TableCell>
                  <TableCell className="font-tittle">Fecha</TableCell>
                  <TableCell className="font-tittle">Hora</TableCell>
                  <TableCell className="font-tittle" width="12%">
                    Usuario
                  </TableCell>
                  <TableCell className="font-tittle">
                    Nombres y Apellidos
                  </TableCell>
                  <TableCell className="font-tittle">Número celular</TableCell>
                  <TableCell className="font-tittle">Código Reserva</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationHistory &&
                  reservationHistory.map(
                    ({
                      category,
                      titleService,
                      dateReservation,
                      timeReservation,
                      emailCustomer,
                      nameCustomer,
                      codeReservation,
                      mobileCustomer,
                    }) => (
                      <TableRow key={codeReservation}>
                        <TableCell className="font">{category}</TableCell>
                        <TableCell className="font">{titleService}</TableCell>
                        <TableCell className="font">
                          {dateReservation}
                        </TableCell>
                        <TableCell className="font">
                          {timeReservation}
                        </TableCell>
                        <TableCell
                          className="font"
                          style={{
                            textDecoration: "underline",
                            color: "#0862B5",
                          }}
                        >
                          {emailCustomer}
                        </TableCell>
                        <TableCell className="font">{nameCustomer}</TableCell>
                        <TableCell className="font">{mobileCustomer}</TableCell>
                        <TableCell
                          onClick={() => handleCard(codeReservation)}
                          className="font"
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {codeReservation}
                          <Search
                            style={{
                              marginBottom: "-4px",
                              color: "#5950A2",
                              marginLeft: "5px",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: { sm: "none", xs: "flex" } }}>
            <div
              className="service-card-container"
              style={{ marginTop: "10px" }}
            >
              {reservationHistory &&
                reservationHistory.map(
                  (
                    {
                      category,
                      titleService,
                      dateReservation,
                      timeReservation,
                      codeReservation,
                      nameCustomer,
                      mobileCustomer,
                    },
                    index
                  ) => (
                    <div
                      className="service-card"
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f5f5f5" : null,
                        borderRadius: "0",
                      }}
                    >
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>
                          Categoría
                        </p>
                        <p style={{ marginTop: "5px" }}>{category} </p>
                      </div>
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>
                          Servicio
                        </p>
                        <p style={{ marginTop: "5px" }}>{titleService} </p>
                      </div>
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>Fecha</p>
                        <p style={{ marginTop: "5px" }}> {dateReservation} </p>
                      </div>
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>Hora</p>
                        <p style={{ marginTop: "5px" }}>{timeReservation} </p>
                      </div>
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>
                          Nombres y apellidos
                        </p>
                        <p style={{ marginTop: "5px" }}>{nameCustomer}</p>
                      </div>
                      <div className="service-card-text">
                        <p style={{ fontWeight: "bold", margin: "0" }}>
                          Número celular
                        </p>
                        <p style={{ marginTop: "5px" }}>{mobileCustomer}</p>
                      </div>

                      <div className="service-button">
                        <button
                          className="font"
                          onClick={() => handleCard(codeReservation)}
                        >
                          Ver reserva
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>
          </Box>
        </ThemeProvider>
        {card ? (
          <div className="mdal animate__animated animate__fadeIn">
            <div className="overlay" onClick={() => handleCardClose()} />
            <div className="mdal_content">
              {cardData &&
                cardData.map(
                  ({
                    titleService,
                    emailCustomer,
                    dateReservation,
                    durationReservation,
                    timeReservation,
                    codeReservation,
                  }) => (
                    <Card
                      style={{
                        width: 275,
                        display: "inline-block",
                        padding: "20px",
                      }}
                      variant="elevation"
                      key={titleService}
                    >
                      <CardContent style={{ padding: "0", textAlign: "right" }}>
                        <IconButton
                          aria-label="close"
                          style={{ margin: "0" }}
                          onClick={handleCardClose}
                        >
                          <img src={Cerrar} alt="cerrar" />
                        </IconButton>
                      </CardContent>
                      <CardContent
                        className="font-p"
                        style={{
                          color: "#5950A2",
                          fontSize: "22px",
                          fontWeight: "bold",
                          lineHeight: "25px",
                          paddingTop: "0",
                        }}
                      >
                        Historial de citas
                      </CardContent>
                      <CardContent className="font-tittle">
                        {titleService}
                      </CardContent>
                      <hr style={{ width: "90%", margin: "0 auto" }} />
                      <CardContent className="font">
                        <img
                          src={Usuario}
                          alt="correo"
                          style={{
                            marginRight: "20px",
                            marginBottom: "-4px",
                          }}
                        />
                        {emailCustomer}
                      </CardContent>
                      <CardContent className="font">
                        <img
                          src={fecha}
                          alt="fecha"
                          style={{
                            marginRight: "20px",
                            marginBottom: "-4px",
                          }}
                        />
                        {dateReservation}
                      </CardContent>
                      <CardContent className="font">
                        <Timer
                          style={{
                            marginBottom: "-4px",
                            fontSize: "25px",
                            marginLeft: "-3px",
                            marginRight: "16px",
                            padding: "0",
                          }}
                        />
                        {durationReservation}
                      </CardContent>
                      <CardContent className="font">
                        <img
                          src={Hora}
                          alt="hora"
                          style={{
                            marginRight: "18px",
                            marginBottom: "-4px",
                          }}
                        />
                        {timeReservation}
                      </CardContent>
                      <CardContent className="font">
                        <img
                          src={Code}
                          alt="codigo"
                          style={{
                            marginRight: "20px",
                            marginBottom: "-4px",
                          }}
                        />
                        {codeReservation}
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
