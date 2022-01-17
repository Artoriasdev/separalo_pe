import { handleGetListByCategory } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const serviceListByCategory = (id, cat, tk) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetListByCategory(id, cat, tk);
      dispatch(list(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const list = (list) => ({
  type: types.loadServiceListCategory,
  payload: [...list],
});
