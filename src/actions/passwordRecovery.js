import {
  handleGeneratePasswordRecovery,
  handlePasswordRestore,
  handleValidatePasswordRecovery,
} from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";

export const passwordRecovery = (recoveryModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGeneratePasswordRecovery(recoveryModel);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
        localStorage.setItem("Recover email", recoveryModel.email);
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
export const passwordRecoveryOTP = (recoveryModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handleValidatePasswordRecovery(recoveryModel);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
        localStorage.setItem("Recover email", recoveryModel.email);
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
export const passwordRestore = (recoveryModel) => {
  return async (dispatch) => {
    try {
      const { data } = await handlePasswordRestore(recoveryModel);
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
