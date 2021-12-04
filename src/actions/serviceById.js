import {
  handleGetAvailableDateService,
  handleGetServicesById,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const serviceById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetServicesById(id);
      const hour = await handleGetAvailableDateService(id);
      dispatch(service(data.data, hour.data.data));
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

export const service = (service, dates) => ({
  type: types.serviceById,
  payload: {
    serviceId: service,
    serviceDate: dates,
  },
});
