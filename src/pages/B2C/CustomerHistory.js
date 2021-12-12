import React, { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Event } from "@mui/icons-material";

import { MyModal } from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { clientAppointmentHistory } from "../../actions/clientAppointmentHistory";

// import FullPageLoader from "./FullPageLoader";

export const CustomerHistory = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clientAppointmentHistory);
  const { token } = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(clientAppointmentHistory(token));
  }, [dispatch, token]);
  return (
    <>
      <MyModal />

      <div className="page-container" style={{ padding: "0" }}>
        <div className="appointment-container">
          <Event fontSize="large" style={{ margin: "0 5px 0 0" }} />
          <h1>Mi historial de citas</h1>
        </div>
        {/* <TableContainer className="table">
          <Table sx={{ minWidth: 650 }}>
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="font-tittle">Servicio</TableCell>
                <TableCell className="font-tittle">Categoria</TableCell>
                <TableCell className="font-tittle">Negocio</TableCell>
                <TableCell className="font-tittle">Precio</TableCell>
                <TableCell className="font-tittle">Fecha</TableCell>
                <TableCell className="font-tittle">Hora</TableCell>
                <TableCell className="font-tittle">Duracion</TableCell>
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
                    price,
                    dateReservation,
                    timeReservation,
                    durationReservation,
                    state,
                    codeReservation,
                  }) => (
                    <TableRow key={titleService}>
                      <TableCell className="font">{titleService}</TableCell>
                      <TableCell className="font">{nameCategory}</TableCell>
                      <TableCell className="font">{tradeName}</TableCell>
                      <TableCell className="font">{price}</TableCell>
                      <TableCell className="font">{dateReservation}</TableCell>
                      <TableCell className="font">{timeReservation}</TableCell>
                      <TableCell className="font">
                        {durationReservation}
                      </TableCell>
                      <TableCell className="font">{codeReservation}</TableCell>
                      <TableCell className="font">{state}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
    </>
  );
};
