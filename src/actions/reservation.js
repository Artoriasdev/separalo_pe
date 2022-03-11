import {
  handleRegisterReservation,
  handleRegisterReservationBusiness,
  handleRegisterReservationInvited,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr, modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";
import { emailReservation } from "./reservationEmailInvited";
import { checkShoppingItemsInvited } from "./shoppingCar";

export const reservation = (reserveModel, ...rest) => {
  return async (dispatch) => {
    try {
      const data = await handleRegisterReservationInvited(reserveModel);
      console.log(data);
      if (data.status === 206) {
        JSON.stringify(
          localStorage.setItem("email_registered", reserveModel.email)
        );
        localStorage.setItem("service_id", rest[0]);
        localStorage.setItem("business_id", rest[1]);
        localStorage.setItem("category_id", rest[2]);

        dispatch(modalErr());
        dispatch(modalOpen(data.data.message));
      } else if (data.data.response === "true") {
        JSON.stringify(localStorage.setItem("email", reserveModel.email));
        JSON.stringify(localStorage.setItem("name_invited", reserveModel.name));
        JSON.stringify(
          localStorage.setItem("lastname_invited", reserveModel.lastName)
        );
        JSON.stringify(
          localStorage.setItem("cell_invited", reserveModel.mobile)
        );

        dispatch(emailReservation(reserveModel.email));
        dispatch(reserve(data.data));
        dispatch(checkShoppingItemsInvited(reserveModel.email));
        dispatch(
          modalOpen("¡Su reserva ha sido registrada de manera exitosa!")
        );
        dispatch(modalRedirect());
      } else if (data.data.response === "false") {
        dispatch(modalOpen(data.data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
export const reservationBusiness = (reserveModel, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterReservationBusiness(
        reserveModel,
        token
      );
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
