import { handleGetServiceForEdit } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr, modalOpen } from "./modal";

export const serviceForEdit = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetServiceForEdit(id, token);
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
  type: types.serviceForEditData,
  payload: data,
});
