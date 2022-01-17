import { handleUpdateCustomer } from "../helpers/handlers";
import { modalErr, modalOpen, modalRedirect } from "./modal";

export const clientDataUpdate = (dataModel, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleUpdateCustomer(dataModel, token);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
      } else {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};
