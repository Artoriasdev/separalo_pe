import { handleEditService } from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";

export const serviceEdit = (dataModel, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleEditService(dataModel, token);
      console.log(data);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
