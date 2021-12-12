import { handleGetBanksAccountType } from "../helpers/handlers";
import { types } from "../types/types";
import { modalOpen } from "./modal";

export const banksTypeList = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBanksAccountType(id);

      dispatch(banksType(data.data));
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

export const banksType = (data) => ({
  type: types.loadBanksType,
  payload: data,
});
