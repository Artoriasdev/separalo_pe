import {
  handleRegisterReservation,
  handleRegisterReservationInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";
import { emailReservation } from "./reservationEmailInvited";
import { checkShoppingItemsInvited } from "./shoppingCar";

export const reservation = (reserveModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterReservationInvited(reserveModel);
      if (data.response === "true") {
        JSON.stringify(localStorage.setItem("email", reserveModel.email));
        dispatch(emailReservation(reserveModel.email));
        dispatch(reserve(data));
        dispatch(checkShoppingItemsInvited(reserveModel.email));
        dispatch(
          modalOpen("¡Su reserva ha sido registrada de manera exitosa!")
        );
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
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
      history.push("/error");
    }
  };
};

export const reserve = (reserve) => ({
  type: types.reservation,
  payload: reserve.data,
});
