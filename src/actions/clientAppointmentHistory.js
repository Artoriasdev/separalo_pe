import { handleGetReservationHistoryByCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr, modalOpen } from "./modal";

export const clientAppointmentHistory = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationHistoryByCustomer(token);
      if (data.response === "true") {
        dispatch(clientAppointHistory(data.data));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const clientAppointHistory = (data) => ({
  type: types.clientAppointmentsHistory,
  payload: data,
});
