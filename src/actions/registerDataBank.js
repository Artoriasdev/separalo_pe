import { handleRegisterBusinessBankData } from "../helpers/handlers";
import { bankUpdate } from "./editDataBank";
import { modalOpen } from "./modal";

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
      dispatch(
        modalOpen(
          "Ha ocurrido un error porfavor refresque la pagina o vuelva a intentarlo luego"
        )
      );
    }
  };
};
