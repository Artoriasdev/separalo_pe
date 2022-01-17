import { handleGetBanksAccountType } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const banksTypeList = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBanksAccountType(id);
      dispatch(banksType(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const banksType = (data) => ({
  type: types.loadBanksType,
  payload: data,
});
