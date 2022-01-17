import { handleGetList } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const serviceList = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetList(id);
      dispatch(list(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const list = (list) => ({
  type: types.loadServiceList,
  payload: [...list],
});
