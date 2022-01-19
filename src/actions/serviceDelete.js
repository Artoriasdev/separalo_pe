import { handleDeleteService } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const serviceDelete = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleDeleteService(id, token);
      console.log(data);
      if (data.response === "true") {
        dispatch(deleteService());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

const deleteService = () => ({
  type: types.serviceDelete,
});

export const deleteServiceFinish = () => ({
  type: types.serviceDeleteFinish,
});
