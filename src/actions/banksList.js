import { handleGetBanks } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const banksList = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBanks();
      dispatch(banks(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const banks = (data) => ({
  type: types.loadBanks,
  payload: data,
});
