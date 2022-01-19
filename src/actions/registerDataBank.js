import { handleRegisterBusinessBankData } from "../helpers/handlers";
import { bankUpdate } from "./editDataBank";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const registerDataBank = (dataModel, tk) => {
  return async (dispatch) => {
    try {
      const { data } = await handleRegisterBusinessBankData(dataModel, tk);
      if (data.response === "true") {
        dispatch(bankUpdate(data.message));
      } else {
        dispatch(modalOpen(data.message));
      }
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};
