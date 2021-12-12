import { handleGetBanks } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const banksList = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBanks();
      dispatch(banks(data.data));
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

export const banks = (data) => ({
  type: types.loadBanks,
  payload: data,
});
