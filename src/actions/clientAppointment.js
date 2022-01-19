import { handleGetReservationByCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const clientAppointment = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByCustomer(token);
      if (data.response === "true") {
        dispatch(clientAppoint(data.data));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const clientAppoint = (data) => ({
  type: types.clientAppointments,
  payload: data,
});
