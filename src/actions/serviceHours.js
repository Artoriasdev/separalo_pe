import { handleGetHoursDurationService } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const serviceHours = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetHoursDurationService();
      if (data.response === "true") {
        dispatch(serviceData(data.data));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
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

const serviceData = (data) => ({
  type: types.serviceHoursListLoad,
  payload: data,
});
