import { handleGetBusinessByCategory } from "../helpers/handlers";
import { types } from "../types/types";
import { modalErr } from "./modal";

export const loadBusinessCategorys = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await handleGetBusinessByCategory(id);
      dispatch(loadCategory(data));
    } catch (error) {
      console.log(error);
      dispatch(modalErr());
    }
  };
};

export const loadCategory = (category) => ({
  type: types.loadBusinessByCategory,
  payload: [...category.data],
});
