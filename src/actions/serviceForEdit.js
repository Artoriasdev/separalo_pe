import { handleGetServiceForEdit } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

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
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};

const serviceData = (data) => ({
  type: types.serviceForEditData,
  payload: data,
});
