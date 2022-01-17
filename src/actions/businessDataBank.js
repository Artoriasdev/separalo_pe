import { handleGetBusinessBankData } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const businessDataBank = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBusinessBankData(token);

      if (data.data !== undefined) {
        dispatch(business(...data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const business = (data) => ({
  type: types.businessDataBank,
  payload: data,
});
