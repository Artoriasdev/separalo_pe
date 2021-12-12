import { handleGetReservationByCustomer } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const clientAppointment = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetReservationByCustomer(token);

      dispatch(clientAppoint(...data.data));
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

export const clientAppoint = (data) => ({
  type: types.clientAppointments,
  payload: data,
});
