import { handleGetHoursDurationService } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr, modalOpen } from "./modal";

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
      dispatch(modalErr());
    }
  };
};

const serviceData = (data) => ({
  type: types.serviceHoursListLoad,
  payload: data,
});
