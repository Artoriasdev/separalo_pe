import { handleRegisterService } from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";

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
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};
