import { types } from "../types/types";
import { handleUpdateBusinessBankData } from "../helpers/handlers";
import { modalOpen } from "./modal";

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
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
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
