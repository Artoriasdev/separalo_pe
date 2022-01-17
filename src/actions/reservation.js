import {
  handleRegisterReservation,
  handleRegisterReservationInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr, modalOpen, modalRedirect } from "./modal";

export const reservation = (reserveModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterReservationInvited(reserveModel);
      if (data.response === "true") {
        dispatch(reserve(data));
        dispatch(
          modalOpen("¡Su reserva ha sido registrada de manera exitosa!")
        );
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const reservationClient = (reserveModel, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterReservation(reserveModel, token);
      if (data.response === "true") {
        dispatch(reserve(data));
        dispatch(
          modalOpen("¡Su reserva ha sido registrada de manera exitosa!")
        );
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      } else {
        dispatch(modalOpen("Ha ocurrido un error"));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const reserve = (reserve) => ({
  type: types.reservation,
  payload: reserve.data,
});
