import { handleGetAvailableScheduleService } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const hoursId = (id, date) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetAvailableScheduleService(id, date);
      dispatch(hours(data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const hours = (service, dates) => ({
  type: types.hoursById,
  payload: {
    hoursById: service,
  },
});
