import { handleGetHoursAttentionService } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const serviceHoursAttention = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetHoursAttentionService();
      if (data.response === "true") {
        dispatch(serviceData(data.data));
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const serviceData = (data) => ({
  type: types.serviceHoursAttentionLoad,
  payload: data,
});
