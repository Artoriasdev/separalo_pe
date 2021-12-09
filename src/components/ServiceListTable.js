import React from "react";
import { useHistory } from "react-router";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
    <TableContainer className="table">
      <Table sx={{ minWidth: 650 }}>
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
  );
};
