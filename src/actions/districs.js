import { handleGetDistrics } from "../helpers/handlers";
import { types } from "../types/types";
import history from "../helpers/history";

export const districs = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetDistrics(id);
      dispatch(loadDistrics(data.data));
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
};

export const loadDistrics = (data) => ({
  type: types.districsLoaded,
  payload: {
    districs: data,
  },
});
