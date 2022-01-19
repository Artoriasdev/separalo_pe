import { types } from "../types/types";
import { handleUpdateBusinessBankData } from "../helpers/handlers";
import { modalOpen } from "./modal";
import history from "../helpers/history";

export const editBusinessBank = (dataModel, tk) => {
  return async (dispatch) => {
    try {
      const { data } = await handleUpdateBusinessBankData(dataModel, tk);
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

export const bankUpdate = (message) => ({
  type: types.banksUpdate,
  payload: message,
});

export const bankUpdateFinish = () => ({
  type: types.banksUpdateFinish,
});
