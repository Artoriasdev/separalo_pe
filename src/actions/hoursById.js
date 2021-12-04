import { handleGetAvailableScheduleService } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const hoursId = (id, date) => {
  return async (dispatch) => {
    try {
      console.log(id, date);
      const { data } = await handleGetAvailableScheduleService(id, date);
      console.log(data);
      dispatch(hours(data.data));
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

export const hours = (service, dates) => ({
  type: types.hoursById,
  payload: {
    hoursById: service,
  },
});
