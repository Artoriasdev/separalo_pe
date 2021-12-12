import { handleGetBusinessBankData } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const businessDataBank = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBusinessBankData(token);

      if (data.data !== undefined) {
        dispatch(business(...data.data));
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

export const business = (data) => ({
  type: types.businessDataBank,
  payload: data,
});
