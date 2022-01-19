import { handleGetBanks } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const banksList = () => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBanks();
      dispatch(banks(data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const banks = (data) => ({
  type: types.loadBanks,
  payload: data,
});
