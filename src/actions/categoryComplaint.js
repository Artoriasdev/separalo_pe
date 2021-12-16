import { handleGetCategoryComplaint } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const categoryComplaint = (value) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetCategoryComplaint(value);
      dispatch(complaint(data.data));
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

export const complaint = (payload) => ({
  type: types.categoryComplaintList,
  payload,
});
