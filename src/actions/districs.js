import { handleGetDistrics } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const districs = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDistrics(id);
      dispatch(loadDistrics(data.data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const loadDistrics = (data) => ({
  type: types.districsLoaded,
  payload: {
    districs: data,
  },
});
