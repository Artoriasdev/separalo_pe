import {
  handleGetReservationConfirmByBusiness,
  handleGetReservationHistoryByBusiness,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const reservationListConfirmed = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationConfirmByBusiness(id, token);
      dispatch(listConfirmed(data.data));
    } catch (error) {
      console.log(error);
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};
export const reservationListHistory = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationHistoryByBusiness(id, token);
      dispatch(listHistory(data.data));
    } catch (error) {
      console.log(error);
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};

export const listConfirmed = (list) => ({
  type: types.reservationConfirmList,
  payload: {
    reservationConfirm: [...list],
  },
});

export const listHistory = (list) => ({
  type: types.reservationHistoryList,
  payload: {
    reservationHistory: [...list],
  },
});
