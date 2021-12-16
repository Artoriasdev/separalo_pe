import { handleChangePassword } from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";

export const changePassword = (PasswordModel, tk) => {
  return async (dispatch) => {
    try {
      const { data } = await handleChangePassword(PasswordModel, tk);
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
