import { handleEditDataBusiness } from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";

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
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};
