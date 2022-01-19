import { handleUpdateCustomer } from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";

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
      history.push("/error");
    }
  };
};
