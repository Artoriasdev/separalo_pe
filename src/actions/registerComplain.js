import { handleRegisterComplaint } from "../helpers/handlers";
import { modalErr, modalOpen, modalRedirect } from "./modal";

export const registerComplain = (complainModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterComplaint(complainModel);
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
