import { handleEditDataBusiness } from "../helpers/handlers";
import { modalErr, modalOpen, modalRedirect } from "./modal";

export const editBusiness = (dataModel, tk) => {
  return async (dispatch) => {
    try {
      const { data } = await handleEditDataBusiness(dataModel, tk);
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
