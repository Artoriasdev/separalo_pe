import { handleRegisterService } from "../helpers/handlers";
import { modalErr, modalOpen, modalRedirect } from "./modal";

export const registerService = (dataModel, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterService(dataModel, token);
      console.log(data);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};
