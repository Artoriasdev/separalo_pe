import {
  handleGetAvailableDateService,
  handleGetServicesById,
} from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const serviceById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetServicesById(id);
      const hour = await handleGetAvailableDateService(id);
      dispatch(service(data.data, hour.data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
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
