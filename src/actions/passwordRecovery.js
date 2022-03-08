import {
  handleGeneratePasswordRecovery,
  handlePasswordRestore,
  handleValidatePasswordRecovery,
} from "../helpers/handlers";
import { modalOpen, modalRedirect } from "./modal";
import history from "../helpers/history";

export const passwordRecovery = (recoveryModel, setSend) => {
  return async (dispatch) => {
    try {
      setSend(true);
      const { data } = await handleGeneratePasswordRecovery(recoveryModel);
      if (data.response === "true") {
        dispatch(modalOpen(data.message));
        dispatch(modalRedirect());
        localStorage.setItem("Recover email", recoveryModel.email);
      } else if (data.response === "false") {
        dispatch(modalOpen(data.message));
        setSend(false);
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
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
      history.push("/error");
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
      history.push("/error");
    }
  };
};
