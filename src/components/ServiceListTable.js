import React from "react";
import { useHistory } from "react-router";

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

export const ServiceListTable = ({ list, page, params }) => {
  const history = useHistory();

  if (page === 1) {
    var handleEdit = (id) => {
      history.push(`/business/services/details/${id}/1/0`);
    };
    var handleAppointment = (id) => {
      history.push(`/business/services/appointment/${id}/1/0`);
    };
  } else if (page === 2) {
    handleEdit = (id) => {
      history.push(`/business/services/details/${id}/2/${params}`);
    };
    handleAppointment = (id) => {
      history.push(`/business/services/appointment/${id}/2/${params}`);
    };
  }
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        className="table"
        sx={{ minWidth: 650, display: { xs: "none", sm: "flex" } }}
      >
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="font-tittle">Servicio</TableCell>
              <TableCell
                sx={{ display: { xs: "none", md: "table-cell" } }}
                className="font-tittle"
                width="25%"
              >
                Descripción
              </TableCell>
              <TableCell className="font-tittle">Categoría</TableCell>
              <TableCell className="font-tittle">Duración</TableCell>
              <TableCell className="font-tittle" width="12%">
                Precio
              </TableCell>
              <TableCell className="font-tittle" align="center">
                Citas
              </TableCell>
              <TableCell className="font-tittle" align="center">
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
              list.map(
                ({
                  id,
                  title,
                  description,
                  duration,
                  currencySymbol,
                  price,
                  category,
                }) => (
                  <TableRow key={id}>
                    <TableCell className="font">{title}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                      className="font"
                      width="25%"
                    >
                      {description}
                    </TableCell>
                    <TableCell className="font">{category}</TableCell>
                    <TableCell className="font">{duration}</TableCell>
                    <TableCell className="font">
                      {currencySymbol + " " + price}
                    </TableCell>
                    <TableCell className="font" align="center">
                      <button
                        className="font"
                        onClick={() => handleAppointment(id)}
                      >
                        Ver citas pendientes
                      </button>
                    </TableCell>
                    <TableCell className="font" align="center">
                      <button className="font" onClick={() => handleEdit(id)}>
                        Editar servicio
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: { sm: "none", xs: "flex" } }}>
        <div className="service-card-container">
          {list &&
            list.map(
              (
                {
                  id,
                  title,
                  description,
                  duration,
                  currencySymbol,
                  price,
                  category,
                },
                index
              ) => {
                return (
                  <div
                    className="service-card"
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : null,
                    }}
                  >
                    <div className="service-card-text">
                      <p style={{ fontWeight: "bold" }}>Categoría</p>
                      <p>{category} </p>
                    </div>
                    <div className="service-card-text">
                      <p style={{ fontWeight: "bold" }}>Servicio</p>
                      <p>{title} </p>
                    </div>
                    <div className="service-card-text">
                      <p style={{ fontWeight: "bold" }}>Duración</p>
                      <p> {duration} </p>
                    </div>
                    <div className="service-card-text">
                      <p style={{ fontWeight: "bold" }}>Precio</p>
                      <p>{currencySymbol + " " + price} </p>
                    </div>
                    <div className="service-card-text">
                      <p style={{ fontWeight: "bold" }}>Descripción</p>
                      <p>{description}</p>
                    </div>
                    <div className="service-button">
                      <button
                        className="font"
                        onClick={() => handleAppointment(id)}
                      >
                        Ver citas pendientes
                      </button>
                      <button className="font" onClick={() => handleEdit(id)}>
                        Editar servicio
                      </button>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </Box>
    </ThemeProvider>
  );
};
